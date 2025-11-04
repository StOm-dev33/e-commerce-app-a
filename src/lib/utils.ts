// Lightweight `cn` helper without external dependencies to avoid missing-module errors in this environment
export function cn(...inputs: any[]) {
  return inputs
    .flatMap((v) => (Array.isArray(v) ? v : [v]))
    .filter(Boolean)
    .join(' ');
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function generateOrderId() {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}