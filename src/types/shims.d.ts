// Lightweight module shims to reduce TypeScript errors when dev dependencies are not installed
declare module 'convex/react';
declare module 'convex/values';
declare module 'convex/server';
declare module 'lucide-react';
declare module 'clsx';
declare module 'tailwind-merge';
declare module 'zod';
declare module 'react-hook-form';
declare module '@hookform/resolvers/zod';
declare module 'framer-motion';
declare module 'resend';
declare module 'next/navigation';
declare module 'next/link';
declare module 'next/image';
declare module 'next/font/google';
// Any generated Convex API modules
declare module '*_generated/api';
declare module '*_generated/server';

// Fallback for imports using absolute @/convex path (maps to root convex in some setups)
declare module '@/convex/_generated/api';

export {};
