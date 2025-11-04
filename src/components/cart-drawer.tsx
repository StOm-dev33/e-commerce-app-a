'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/lib/hooks/use-cart';
import { formatPrice } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity },
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
            onClick={onClose}
          />

          {/* Cart drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-6">
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm text-gray-500">
                      Add some items to start shopping
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y">
                    {state.items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-4"
                      >
                        <div className="flex gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-600">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center rounded-lg bg-gray-100 px-2 py-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="p-1 text-gray-600 hover:text-gray-900"
                                >
                                  -
                                </button>
                                <span className="mx-2 min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="p-1 text-gray-600 hover:text-gray-900"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: 'REMOVE_ITEM',
                                    payload: item.id,
                                  })
                                }
                                className="text-sm text-red-500 hover:text-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer with totals and checkout button */}
              {state.items.length > 0 && (
                <div className="border-t bg-gray-50 p-6">
                  <div className="space-y-2">
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
                    <div className="flex justify-between border-t pt-2 text-base font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(state.total)}</span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full"
                    asChild
                  >
                    <a href="/checkout">Proceed to Checkout</a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}