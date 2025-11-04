'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold">
          audiophile
        </Link>
        
        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="hover:text-orange-500">
            HOME
          </Link>
          <Link href="/headphones" className="hover:text-orange-500">
            HEADPHONES
          </Link>
          <Link href="/speakers" className="hover:text-orange-500">
            SPEAKERS
          </Link>
          <Link href="/earphones" className="hover:text-orange-500">
            EARPHONES
          </Link>
        </nav>

        <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-black">
          <ShoppingCart className="h-5 w-5" />
          <span className="ml-2">Cart</span>
        </Button>
      </div>
    </header>
  );
}