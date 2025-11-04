"use client";

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { HeroSection, ProductCategoryCard, FeaturedProduct } from '@/components/ui/product-components';

export default function Home() {
  const products = useQuery(api.products.list);
  
  return (
    <div className="relative">
      <HeroSection 
        title="XX99 Mark II Headphones"
        description="Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast."
        image="/images/hero-headphones.jpg"
        action={{
          label: "See Product",
          href: "/products/xx99-mark-two-headphones"
        }}
      />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <ProductCategoryCard
              title="Headphones"
              image="/images/category-headphones.jpg"
              href="/headphones"
            />
            <ProductCategoryCard
              title="Speakers"
              image="/images/category-speakers.jpg"
              href="/speakers"
            />
            <ProductCategoryCard
              title="Earphones"
              image="/images/category-earphones.jpg"
              href="/earphones"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="space-y-12">
            {products?.slice(0, 3).map((product: any) => (
              <FeaturedProduct
                key={product._id}
                title={product.name}
                description={product.description}
                image={product.images[0]}
                price={product.price}
                href={`/products/${product._id}`}
                reverse={products.indexOf(product) % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}