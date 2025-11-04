'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'default', isLoading, disabled, asChild = false, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-lg font-bold transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-orange-500 text-white hover:bg-orange-400': variant === 'primary',
        'bg-black text-white hover:bg-gray-900': variant === 'secondary',
        'border-2 border-black bg-transparent text-black hover:bg-black hover:text-white': variant === 'outline',
        'h-10 px-4 py-2': size === 'default',
        'h-8 px-3 text-sm': size === 'sm',
        'h-12 px-6': size === 'lg',
      },
      className
    );

    // If asChild is true, clone the child element and apply button props to it
    if (asChild && React.isValidElement(children)) {
      // cast to any to avoid typing conflicts with arbitrary child element props
      return React.cloneElement(children as React.ReactElement, {
        ...(props as any),
        className: cn((children as any).props?.className, classes),
        ref,
      } as any);
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };