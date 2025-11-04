'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProductCategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export function ProductCategoryCard({ title, image, href }: ProductCategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative rounded-lg bg-gray-100 p-6 text-center"
    >
      <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <a
        href={href}
        className="inline-flex items-center text-sm font-semibold text-orange-500 group-hover:text-orange-600"
      >
        Shop Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </motion.div>
  );
}

export function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  action?: {
    label: string;
    href: string;
  };
}

export function HeroSection({ title, description, image, action }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-50"
        />
      </div>
      <div className="relative">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-4xl font-bold sm:text-5xl"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-lg text-gray-300"
            >
              {description}
            </motion.p>
            {action && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href={action.href}
                  className="inline-block rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  {action.label}
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeaturedProductProps {
  title: string;
  description: string;
  image: string;
  price: number;
  href: string;
  reverse?: boolean;
}

export function FeaturedProduct({
  title,
  description,
  image,
  price,
  href,
  reverse = false,
}: FeaturedProductProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100">
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 ${
          reverse ? 'lg:flex-row-reverse' : ''
        }`}
      >
        <div className="aspect-square">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          <p className="mb-6 text-gray-600">{description}</p>
          <p className="mb-6 text-2xl font-bold text-orange-500">
            ${price.toLocaleString()}
          </p>
          <a
            href={href}
            className="inline-block rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}