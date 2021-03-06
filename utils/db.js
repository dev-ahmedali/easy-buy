import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = {};
async function connect() {
  if (connection.isConnected) {
    console.log('is already connected');
    return;
  }
  if(mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if(connection.isConnected === 1) {
        console.log('use previews connection')
        return
    }
    await mongoose.disconnect()
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('New connection')
  connection.isConnected = db.connections[0].readyState
}
async function disconnect() {
    if(connection.isConnected) {
        if(process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('Not connected')
        }
    }
}
const db = {connect, disconnect};
export default db;