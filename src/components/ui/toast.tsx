'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const toastTypeStyles = {
  success: 'bg-green-50 text-green-800 border-green-500',
  error: 'bg-red-50 text-red-800 border-red-500',
  info: 'bg-blue-50 text-blue-800 border-blue-500',
};

const toastIcons = {
  success: (
    <svg
      className="h-5 w-5 text-green-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5 text-red-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg
      className="h-5 w-5 text-blue-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function Toast({ toast, onDismiss }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border-l-4 shadow-lg ${
        toastTypeStyles[toast.type]
      }`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{toastIcons[toast.type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{toast.title}</p>
            <p className="mt-1 text-sm opacity-90">{toast.message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={() => onDismiss(toast.id)}
              className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm p-4 sm:p-6">
      <div className="space-y-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Context and Hook for managing toasts
const ToastContext = React.createContext<{
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    setToasts((prev) => [
      ...prev,
      { ...toast, id: Math.random().toString(36).substr(2, 9) },
    ]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}