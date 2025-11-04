'use client';

import React from 'react';
import { useCart } from '@/lib/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, X } from 'lucide-react';

export function CartItem({ item }: { item: any }) {
  const { dispatch } = useCart();

  return (
    <div className="flex items-center gap-4 py-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 rounded-lg object-cover"
      />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-2">
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) },
                })
              }
              className="text-gray-600 hover:text-gray-900"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity + 1 },
                })
              }
              className="text-gray-600 hover:text-gray-900"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() =>
              dispatch({ type: 'REMOVE_ITEM', payload: item.id })
            }
            className="text-gray-400 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Cart() {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="mb-4 text-gray-600">Your cart is empty</p>
        <Button variant="primary" size="lg" asChild>
          <a href="/products">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <p className="text-gray-600">{state.items.length} items</p>
      </div>

      <div className="divide-y">
        {state.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 space-y-4 border-t pt-8">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(state.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{formatPrice(state.shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatPrice(state.tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(state.total)}</span>
        </div>

        <Button variant="primary" size="lg" className="w-full" asChild>
          <a href="/checkout">Proceed to Checkout</a>
        </Button>
      </div>
    </div>
  );
}