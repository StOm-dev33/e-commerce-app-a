# Audiophile E-commerce Website

A pixel-perfect implementation of the Audiophile e-commerce website using Next.js, TypeScript, and Convex.

## Features

- Responsive design (mobile, tablet, and desktop)
- Product catalog with categories
- Shopping cart functionality
- Secure checkout process
- Order confirmation emails
- Order history and tracking

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Convex (Backend)
- Resend (Email)
- React Hook Form with Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   yarn dev
   ```
5. Start Convex development server:
   ```bash
   npx convex dev
   ```

## Project Structure

```
src/
├── app/           # Next.js app router pages
├── components/    # Reusable components
│   ├── ui/       # UI components
│   └── ...       # Feature components
├── lib/          # Utility functions and shared logic
└── convex/       # Backend API and database schemas
```

## Environment Variables

```
NEXT_PUBLIC_CONVEX_URL=
RESEND_API_KEY=
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.