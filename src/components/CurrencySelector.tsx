import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency, currencies } from '@/context/CurrencyContext';

const CurrencySelector: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currency, setCurrency } = useCurrency();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCurrency = (newCurrency: typeof currencies[0]) => {
    setCurrency(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-1 text-gray-700 hover:text-brand-blue"
        onClick={toggleDropdown}
      >
        <span>{currency.symbol} {currency.code}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
          {currencies.map((currencyOption) => (
            <button
              key={currencyOption.code}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${
                currency.code === currencyOption.code ? 'bg-gray-50 font-medium' : ''
              }`}
              onClick={() => selectCurrency(currencyOption)}
            >
              <span className="mr-2">{currencyOption.symbol}</span>
              <span>{currencyOption.code} - {currencyOption.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
