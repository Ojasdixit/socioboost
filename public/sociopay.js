class SocioPay {
  constructor(merchantId, options = {}) {
    this.merchantId = merchantId;
    this.environment = options.environment || 'production';
    this.baseUrl = this.environment === 'sandbox' 
      ? 'https://sandbox.yourdomain.com/api' 
      : 'https://yourdomain.com/api';
    this.loadStyles();
  }

  loadStyles() {
    if (!document.getElementById('sociopay-styles')) {
      const style = document.createElement('style');
      style.id = 'sociopay-styles';
      style.textContent = `
        #sociopay-button {
          background: #4F46E5;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        #sociopay-button:hover {
          background: #4338CA;
        }
        #sociopay-button:disabled {
          background: #9CA3AF;
          cursor: not-allowed;
        }
      `;
      document.head.appendChild(style);
    }
  }

  async initPayment(amount, currency = 'USD', metadata = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/payments/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchantId: this.merchantId,
          amount,
          currency,
          metadata
        })
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const { paymentId } = await response.json();
      this.redirectToPayment(paymentId);
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw error;
    }
  }

  redirectToPayment(paymentId) {
    window.location.href = `${this.baseUrl}/pay/checkout/${paymentId}`;
  }

  createButton(options = {}) {
    const button = document.createElement('button');
    button.id = 'sociopay-button';
    button.textContent = options.text || 'Pay Now';
    button.disabled = options.disabled || false;
    
    if (options.element) {
      const container = typeof options.element === 'string' 
        ? document.querySelector(options.element) 
        : options.element;
      
      if (container) {
        container.appendChild(button);
      } else {
        console.warn('Container element not found');
      }
    }

    return button;
  }
}

// Initialize global SocioPay instance
window.SocioPay = SocioPay;
