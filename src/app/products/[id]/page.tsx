"use client";

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useCart } from '@/lib/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const product = useQuery(api.products.get, { id: params.id as string });
  const { dispatch } = useCart();

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0],
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image: string, index: number) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-orange-500">
            {formatPrice(product.price)}
          </p>
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">Features</h2>
            <ul className="list-inside list-disc space-y-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">In the Box</h2>
            <ul className="space-y-2">
              {product.inBox.map((item: any, index: number) => (
                <li key={index} className="flex justify-between">
                  <span className="text-orange-500">{item.quantity}x</span>
                  <span>{item.item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={addToCart}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}