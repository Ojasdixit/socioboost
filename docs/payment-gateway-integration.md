# SocioPay - Plug and Play Payment Gateway

SocioPay allows you to add a payment button to your website with just one line of code. It handles the entire payment flow securely.

## Quick Start

Add this code to your HTML file to get started:

```html
<!-- Add this to your HTML head -->
<script src="https://yourdomain.com/sociopay.js"></script>

<!-- Add a payment button -->
<button 
  onclick="new SocioPay('YOUR_MERCHANT_ID').initPayment(10.99, 'USD')"
  style="background: #4F46E5; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer;"
>
  Pay Now
</button>
```

## Installation

### Option 1: CDN (Recommended)
Add this script to your HTML's `<head>` section:

```html
<script src="https://yourdomain.com/sociopay.js"></script>
```

### Option 2: NPM (Coming Soon)
```bash
npm install sociopay-js
```

## Usage

### Basic Usage

```javascript
// Initialize payment
const payment = new SocioPay('YOUR_MERCHANT_ID');

// Handle payment button click
document.getElementById('pay-button').addEventListener('click', () => {
  payment.initPayment(10.99, 'USD', {
    orderId: '12345',
    description: 'Premium Plan',
    // Add any custom metadata
  });
});
```

### Advanced Usage

```javascript
// With options
const payment = new SocioPay('YOUR_MERCHANT_ID', {
  environment: 'sandbox', // or 'production'
  onSuccess: (payment) => {
    console.log('Payment successful:', payment);
  },
  onError: (error) => {
    console.error('Payment failed:', error);
  },
  onClose: () => {
    console.log('Payment window closed');
  }
});

// Programmatically create a button
const button = payment.createButton({
  text: 'Pay $10.99',
  element: '#payment-container', // or DOM element
  amount: 10.99,
  currency: 'USD',
  metadata: {
    orderId: '12345',
    userId: 'user_123'
  }
});
```

## API Reference

### `new SocioPay(merchantId, options)`

Creates a new SocioPay instance.

**Parameters:**
- `merchantId` (String): Your unique merchant ID
- `options` (Object, optional):
  - `environment` (String): 'sandbox' or 'production' (default: 'production')
  - `onSuccess` (Function): Callback when payment is successful
  - `onError` (Function): Callback when payment fails
  - `onClose` (Function): Callback when payment window is closed

### `initPayment(amount, currency, metadata)`

Initializes a payment.

**Parameters:**
- `amount` (Number): Payment amount
- `currency` (String, optional): Currency code (default: 'USD')
- `metadata` (Object, optional): Additional data to store with the payment

### `createButton(options)`

Creates a payment button.

**Parameters:**
- `options` (Object):
  - `text` (String): Button text
  - `element` (String|HTMLElement): CSS selector or DOM element to append button to
  - `amount` (Number): Payment amount
  - `currency` (String, optional): Currency code (default: 'USD')
  - `metadata` (Object, optional): Additional payment data

## Security

- All card data is processed securely and never touches your servers
- Uses industry-standard encryption
- PCI DSS compliant

## Support

For support, please contact support@yourdomain.com
