import React from 'react';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">audiophile</h2>
            <p className="text-gray-400">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 font-bold uppercase">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="/headphones" className="hover:text-orange-500">
                  Headphones
                </a>
              </li>
              <li>
                <a href="/speakers" className="hover:text-orange-500">
                  Speakers
                </a>
              </li>
              <li>
                <a href="/earphones" className="hover:text-orange-500">
                  Earphones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold uppercase">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold uppercase">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="hover:text-orange-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-orange-500">
                  Shipping
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-orange-500">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Audiophile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}