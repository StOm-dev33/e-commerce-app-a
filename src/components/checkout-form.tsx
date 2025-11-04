"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, type CheckoutFormValues } from '@/lib/validations/checkout';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/hooks/use-cart';
import { useToast } from '@/components/ui/toast';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const { state, dispatch } = useCart();
  const router = useRouter();
  const { addToast } = useToast();
  const createOrder = useMutation(api.orders.createOrder);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // Create the order in Convex
  const orderId = await createOrder({
        userId: 'guest', // Since we don't have auth
        customerName: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        zipCode: data.zipCode,
        items: state.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: state.subtotal,
        shipping: state.shipping,
        tax: state.tax,
        total: state.total,
      });

      // Send confirmation email
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: data.email,
          orderId,
          customerName: data.name,
          items: state.items,
          shippingAddress: {
            address: data.address,
            city: data.city,
            country: data.country,
            zipCode: data.zipCode,
          },
          total: state.total,
        }),
      });

      // Clear the cart
      dispatch({ type: 'CLEAR_CART' });

      // Show success toast
      addToast({
        title: 'Order Placed Successfully',
        message: 'Check your email for order confirmation',
        type: 'success',
      });

  // Redirect to order confirmation page
  router.push(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      addToast({
        title: 'Error',
        message: 'Failed to place order. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input
            {...register('address')}
            type="text"
            id="address"
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <input
              {...register('city')}
              type="text"
              id="city"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium">
              Country
            </label>
            <input
              {...register('country')}
              type="text"
              id="country"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium">
              ZIP Code
            </label>
            <input
              {...register('zipCode')}
              type="text"
              id="zipCode"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                {...register('paymentMethod')}
                type="radio"
                id="card"
                value="card"
                className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="card" className="ml-2 block text-sm">
                Credit/Debit Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                {...register('paymentMethod')}
                type="radio"
                id="cash"
                value="cash"
                className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="cash" className="ml-2 block text-sm">
                Cash on Delivery
              </label>
            </div>
          </div>
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" isLoading={isSubmitting}>
        Complete Order
      </Button>
    </form>
  );
}