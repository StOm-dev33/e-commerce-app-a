import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOrderConfirmationEmailParams {
  to: string;
  orderId: string;
  customerName: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  total: number;
}

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  customerName,
  items,
  shippingAddress,
  total,
}: SendOrderConfirmationEmailParams) {
  try {
    await resend.emails.send({
      from: 'Audiophile <orders@yourdomain.com>',
      to,
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Thank you for your order, ${customerName}!</h1>
          
          <p>Your order #${orderId} has been confirmed and is being processed.</p>
          
          <h2>Order Summary</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #eee;">
                <th style="text-align: left; padding: 10px;">Item</th>
                <th style="text-align: right; padding: 10px;">Quantity</th>
                <th style="text-align: right; padding: 10px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px;">${item.name}</td>
                  <td style="text-align: right; padding: 10px;">${
                    item.quantity
                  }</td>
                  <td style="text-align: right; padding: 10px;">$${item.price.toFixed(
                    2
                  )}</td>
                </tr>
              `
                )
                .join('')}
              <tr>
                <td colspan="2" style="text-align: right; padding: 10px;"><strong>Total:</strong></td>
                <td style="text-align: right; padding: 10px;"><strong>$${total.toFixed(
                  2
                )}</strong></td>
              </tr>
            </tbody>
          </table>
          
          <h2>Shipping Address</h2>
          <p>
            ${shippingAddress.address}<br>
            ${shippingAddress.city}<br>
            ${shippingAddress.country}<br>
            ${shippingAddress.zipCode}
          </p>
          
          <p>
            <a href="https://yourdomain.com/orders/${orderId}" style="color: #D87D4A;">View your order</a>
          </p>
          
          <p>If you have any questions about your order, please contact our support team.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="color: #666; font-size: 14px;">
            This email was sent from Audiophile. Please do not reply to this email.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}