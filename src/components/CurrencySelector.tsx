
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

const CurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCurrency = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    // In a real application, you would update the global state or context here
    // to reflect the currency change across the application
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-1 text-gray-700 hover:text-brand-blue"
        onClick={toggleDropdown}
      >
        <span>{selectedCurrency.symbol} {selectedCurrency.code}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${
                selectedCurrency.code === currency.code ? 'bg-gray-50 font-medium' : ''
              }`}
              onClick={() => selectCurrency(currency)}
            >
              <span className="mr-2">{currency.symbol}</span>
              <span>{currency.code} - {currency.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
