import Head from 'next/head';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../utils/store';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const {cart} = state;
  return (
    <>
      <Head>
        <title>{title ? title + ' - Easy buy' : 'Easy buy'}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 px-4 justify-between shadow-md items-center">
            <Link href="/">
              <a className="text-lg font-bold">easy buy</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart{' '}
                  {cart.cartItems.length > 0 && (
                    <span className='ml-1 text-white bg-red-600 rounded-full px-2 py-1 font-bold text-xs'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright easy buy
        </footer>
      </div>
    </>
  );
}
