import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

export const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.93 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.38 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  convertCurrency: (amount: number, fromCurrency?: string) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get saved currency from localStorage or default to USD
  const getSavedCurrency = (): Currency => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      try {
        const parsed = JSON.parse(savedCurrency);
        // Validate that the parsed object has the required properties
        if (parsed && parsed.code && parsed.symbol && parsed.name) {
          // Make sure we have the latest exchange rate
          const currencyWithRate = currencies.find(c => c.code === parsed.code);
          if (currencyWithRate) {
            return currencyWithRate;
          }
        }
      } catch (error) {
        console.error('Error parsing saved currency:', error);
      }
    }
    return currencies[0]; // Default to USD
  };

  const [currency, setCurrency] = useState<Currency>(getSavedCurrency());

  // Save currency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  // Convert currency from USD to the selected currency
  const convertCurrency = (amount: number, fromCurrency: string = 'USD'): number => {
    // If the amount is already in the target currency, return it as is
    if (fromCurrency === currency.code) {
      return amount;
    }
    
    // Find the source currency rate (default to USD with rate 1 if not found)
    const sourceCurrency = currencies.find(c => c.code === fromCurrency);
    const sourceRate = sourceCurrency ? sourceCurrency.rate : 1;
    
    // Convert to USD first (if not already USD)
    const amountInUSD = fromCurrency === 'USD' ? amount : amount / sourceRate;
    
    // Then convert from USD to target currency
    return amountInUSD * currency.rate;
  };

  // Format currency based on the selected currency
  const formatCurrency = (amount: number): string => {
    // Convert the amount to the selected currency
    const convertedAmount = convertCurrency(amount);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      currencyDisplay: 'symbol'
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatCurrency,
        convertCurrency
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}; 