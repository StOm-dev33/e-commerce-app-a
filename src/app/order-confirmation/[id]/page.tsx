'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const order = useQuery(api.orders.get, { id: params.id as string });

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-lg border p-8">
        <div className="mb-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We've sent a confirmation email to{' '}
            {order.email}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Order Details</h2>
          <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Order Number</p>
              <p className="font-medium">{order._id}</p>
            </div>
            <div>
              <p className="text-gray-600">Order Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Items</h2>
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 space-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatPrice(order.subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{formatPrice(order.shipping)}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax</p>
            <p>{formatPrice(order.tax)}</p>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <p>Total</p>
            <p>{formatPrice(order.total)}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Shipping Address</h2>
          <p>{order.customerName}</p>
          <p>{order.address}</p>
          <p>
            {order.city}, {order.zipCode}
          </p>
          <p>{order.country}</p>
        </div>

        <div className="flex justify-center">
          <Button variant="primary" size="lg" asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      </div>
    </div>
  );
}