'use client';

import { useState } from 'react';
import WillForm from '@/components/WillForm';
import Script from 'next/script';

export default function Home() {
  const [paid, setPaid] = useState(false);

  return (
    <>
      <Script src="https://gumroad.com/js/gumroad.js" />

      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-center mb-4">Simple Last Will & Testament</h1>
          <p className="text-center text-gray-600 mb-8">
            Create a basic will in minutes — one-time payment of $19.99
          </p>

          {!paid ? (
            <div className="bg-white rounded-xl shadow-lg p-10 text-center">
              <p className="text-lg mb-8">Unlock the will generator now</p>

              {/* ←←← REPLACE THIS LINK WITH YOUR REAL GUMROAD LINK LATER ←←← */}
              <a
                href="https://gumroad.com" 
                data-gumroad-product-id="YOUR_PRODUCT_ID"
                className="gumroad-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-10 rounded-xl text-xl"
              >
                Buy for $19.99
              </a>

              <p className="text-xs text-gray-500 mt-8">
                Instant access • PDF emailed immediately after payment
              </p>
            </div>
          ) : (
            <WillForm />
          )}

          <footer className="mt-16 text-center text-xs text-gray-500 leading-relaxed">
            <p className="font-bold">⚠️ LEGAL DISCLAIMER</p>
            <p>This is a simple template only • Not legal advice • Consult an attorney for validity in your jurisdiction</p>
          </footer>
        </div>
      </main>
    </>
  );
}
