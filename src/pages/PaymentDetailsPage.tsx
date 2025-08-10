import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { processPayment, savePaymentDetails } from '@/lib/payments';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ArrowLeft, Check, X, AlertCircle, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

// Type for card validation result
interface CardValidationResult {
  valid: boolean;
  type?: string; // visa, mastercard, etc.
  scheme?: string; // card scheme
  bank?: string; // issuing bank
  country?: string; // issuing country
  message?: string; // validation message
}

export default function PaymentDetailsPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardValidation, setCardValidation] = useState<CardValidationResult | null>(null);
  const [isValidatingCard, setIsValidatingCard] = useState(false);
  const navigate = useNavigate();
  
  const amount = searchParams.get('amount');
  
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    country: 'US',
    address: '',
    zipCode: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      navigate('/payments');
    }
  }, [amount, navigate]);

  

  // Validate card number format
  const validateCardNumber = (cardNumber: string): boolean => {
    // Remove all non-digit characters
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // Check if it's empty or not a number
    if (!cleanNumber || isNaN(Number(cleanNumber))) return false;
    
    // Luhn algorithm check
    let sum = 0;
    let shouldDouble = false;
    
    // Loop through values from right to left
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + 1;
        }
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
  };

  // Validate card expiry
  const validateExpiry = (expiry: string): boolean => {
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is 0-indexed
    
    // Check if month is valid (1-12)
    if (month < 1 || month > 12) return false;
    
    // Check if card is expired
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  };

  // Validate CVV
  const validateCVV = (cvv: string, scheme?: string): boolean => {
    if (!cvv) return false;
    if (scheme === 'amex') {
      return /^\d{4}$/.test(cvv);
    }
    return /^\d{3}$/.test(cvv);
  };

  // Basic local detection of card scheme from PAN (prefix ranges)
  const detectCardScheme = (digits: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' => {
    if (!digits) return 'unknown';
    // American Express: 34, 37
    if (/^(34|37)/.test(digits)) return 'amex';
    // Visa: 4
    if (/^4/.test(digits)) return 'visa';
    // MasterCard: 51-55, 2221-2720
    if (/^(5[1-5])/.test(digits)) return 'mastercard';
    if (/^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(digits)) return 'mastercard';
    // Discover: 6011, 65, 644-649, 622126-622925
    if (/^(6011|65|64[4-9])/.test(digits)) return 'discover';
    if (/^(622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9([01]\d|2[0-5])))/.test(digits)) return 'discover';
    return 'unknown';
  };

  // Derive current scheme from validation or local detection (must be after detectCardScheme is declared)
  const currentScheme = (cardValidation?.scheme as 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown' | undefined) 
    || detectCardScheme(formData.cardNumber.replace(/\s/g, ''));

  // Validate card using Binlist API
  const validateCard = useCallback(async (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s+/g, '');
    const bin = cleanNumber.substring(0, 6);
    if (cleanNumber.length < 6) {
      setCardValidation(null);
      return;
    }
    try {
      setIsValidatingCard(true);
      const response = await fetch(`https://lookup.binlist.net/${bin}`, {
        headers: {
          'Accept-Version': '3',
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        // If API fails, fallback to Luhn check
        setCardValidation({
          valid: validateCardNumber(cleanNumber),
          message: validateCardNumber(cleanNumber)
            ? 'Card validation unavailable, but number looks valid'
            : 'Invalid card number'
        });
        return;
      }
      const data = await response.json();
      setCardValidation({
        valid: true,
        type: data.type || 'unknown',
        scheme: data.scheme || 'unknown',
        bank: data.bank?.name || 'unknown',
        country: data.country?.name || 'unknown',
        message: `Card validated (${data.scheme || 'unknown'})`
      });
    } catch (error) {
      // On network/API error, fallback to Luhn check
      setCardValidation({
        valid: validateCardNumber(cleanNumber),
        message: validateCardNumber(cleanNumber)
          ? 'Card validation unavailable, but number looks valid'
          : 'Invalid card number'
      });
    } finally {
      setIsValidatingCard(false);
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      // Remove all non-digits and keep up to 19 digits (max PAN length)
      let digits = value.replace(/\D/g, '').slice(0, 19);
      const scheme = detectCardScheme(digits);
      // Apply scheme-specific max length and formatting
      let formattedValue = '';
      if (scheme === 'amex') {
        digits = digits.slice(0, 15); // Amex is 15 digits
        // Format 4-6-5
        const p1 = digits.slice(0, 4);
        const p2 = digits.slice(4, 10);
        const p3 = digits.slice(10, 15);
        formattedValue = [p1, p2, p3].filter(Boolean).join(' ');
      } else {
        // Group into blocks of 4
        formattedValue = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      // Trigger card validation when we have at least 6 digits
      if (digits.length >= 6) {
        validateCard(digits);
      } else {
        setCardValidation(null);
      }
      
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      // Remove all non-digits
      let cleanValue = value.replace(/\D/g, '');
      
      // Limit to 4 digits
      cleanValue = cleanValue.slice(0, 4);
      
      // Add slash after first 2 digits
      if (cleanValue.length > 2) {
        cleanValue = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: cleanValue
      }));
      
      return;
    }
    
    // Handle CVV with scheme-aware length
    if (name === 'cvv') {
      const rawNumber = formData.cardNumber.replace(/\s/g, '');
      const scheme = cardValidation?.scheme || detectCardScheme(rawNumber);
      const digits = value.replace(/\D/g, '');
      const max = scheme === 'amex' ? 4 : 3;
      setFormData(prev => ({
        ...prev,
        [name]: digits.slice(0, max)
      }));
      return;
    }

    // Handle phone number (only allow digits, max 10)
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: digits.slice(0, 10)
      }));
      return;
    }

    // Handle zip code
    if (name === 'zipCode') {
      // Remove any non-alphanumeric characters
      const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      setFormData(prev => ({
        ...prev,
        [name]: cleaned.slice(0, 10) // Limit to 10 characters
      }));
      return;
    }

    // For all other fields
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.cardNumber) {
      setError('Please enter a valid card number');
      return;
    }
    const rawNumber = formData.cardNumber.replace(/\s/g, '');
    const scheme = cardValidation?.scheme || detectCardScheme(rawNumber);
    // Length rules: Amex 15, others 13-19. Also pass Luhn check from validateCardNumber
    const lengthOk = scheme === 'amex' ? rawNumber.length === 15 : (rawNumber.length >= 13 && rawNumber.length <= 19);
    if (!lengthOk || !validateCardNumber(rawNumber)) {
      setError('Please enter a valid card number');
      return;
    }
    
    if (!formData.expiryDate || !/\d{2}\/\d{2}/.test(formData.expiryDate)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return;
    }
    
    if (!formData.cvv) {
      setError('Please enter a valid CVV');
      return;
    }
    if (!validateCVV(formData.cvv, scheme)) {
      setError(scheme === 'amex' ? 'Please enter a 4-digit CVV for American Express' : 'Please enter a 3-digit CVV');
      return;
    }
    
    if (!formData.cardholderName) {
      setError('Please enter the cardholder name');
      return;
    }
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate zip code (at least 5 characters)
    if (!formData.zipCode || formData.zipCode.length < 5) {
      setError('Please enter a valid zip code (minimum 5 characters)');
      return;
    }

    // Validate phone number (must be at least 10 digits, allowing for country code and formatting)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone || phoneDigits.length < 10) {
      setError('Please enter a valid phone number (minimum 10 digits)');
      return;
    }

    setIsLoading(true);
    
    try {
      const paymentDetails = {
        card_number: formData.cardNumber.replace(/\s/g, ''),
        expiry_date: formData.expiryDate,
        cvv: formData.cvv,
        cardholder_name: formData.cardholderName,
        country: formData.country,
        address: formData.address,
        zip_code: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
        amount: parseFloat(amount || '0')
      };

      // First save the payment attempt
      const saveResult = await savePaymentDetails(paymentDetails);
      if (!saveResult.success) {
        throw new Error('Failed to save payment details');
      }

      // Process the payment (will simulate failure)
      const result = await processPayment(paymentDetails);
      if (!result.success) {
        setError('Transaction Declined');
      }
    } catch (err) {
      setError('Transaction Declined');
    } finally {
      setIsLoading(false);
    }
  };

  if (!amount) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-4">
        <Button variant="ghost" asChild className="px-0">
          <Link to="/payments">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to amount
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Complete your payment of ${parseFloat(amount).toFixed(2)}</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Number */}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    {isValidatingCard && (
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Validating...
                      </span>
                    )}
                    {cardValidation && !isValidatingCard && (
                      <span className={cn(
                        "text-xs flex items-center",
                        cardValidation.valid ? "text-green-600" : "text-red-600"
                      )}>
                        {cardValidation.valid ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            {cardValidation.scheme || 'Card'} • {cardValidation.bank || 'Bank'}
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 mr-1" />
                            {cardValidation.message || 'Invalid card'}
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={cn(
                        "pr-10",
                        cardValidation && !cardValidation.valid && "border-red-500"
                      )}
                      required
                    />
                    {formData.cardNumber && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {cardValidation?.valid ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : cardValidation && !cardValidation.valid ? (
                          <X className="h-4 w-4 text-red-500" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                  {/* Card brand logos */}
                  <div className="flex gap-2 mt-2">
                    {/* Visa SVG */}
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="24" rx="4" fill="#fff"/>
                      <text x="8" y="16" fontSize="12" fontWeight="bold" fill="#1A1F71">VISA</text>
                    </svg>
                    {/* MasterCard SVG */}
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="24" rx="4" fill="#fff"/>
                      <circle cx="16" cy="12" r="8" fill="#EB001B"/>
                      <circle cx="24" cy="12" r="8" fill="#F79E1B" fillOpacity="0.8"/>
                    </svg>
                    {/* American Express SVG */}
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="24" rx="4" fill="#2E77BC"/>
                      <text x="4" y="16" fontSize="8" fontWeight="bold" fill="#fff">AMEX</text>
                    </svg>
                    {/* Discover SVG */}
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="24" rx="4" fill="#fff"/>
                      <circle cx="28" cy="12" r="6" fill="#FF6000"/>
                      <text x="4" y="16" fontSize="8" fontWeight="bold" fill="#000">DISC</text>
                    </svg>
                  </div>
                  {cardValidation?.valid && cardValidation.type && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {cardValidation.scheme && <div>Type: {cardValidation.scheme}</div>}
                      {cardValidation.bank && <div>Bank: {cardValidation.bank}</div>}
                      {cardValidation.country && <div>Country: {cardValidation.country}</div>}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Expiry Date */}
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={cn(
                      formData.expiryDate && !validateExpiry(formData.expiryDate) ? "border-red-500" : ""
                    )}
                    required
                  />
                  {formData.expiryDate && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {validateExpiry(formData.expiryDate) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.expiryDate && !validateExpiry(formData.expiryDate) && (
                  <p className="text-xs text-red-500">Please enter a valid expiry date (MM/YY)</p>
                )}
              </div>
              
              {/* CVV */}
              <div className="grid gap-2">
                <Label htmlFor="cvv">Security Code (CVV)</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder={currentScheme === 'amex' ? '1234' : '123'}
                    maxLength={currentScheme === 'amex' ? 4 : 3}
                    value={formData.cvv}
                    onChange={handleChange}
                    className={cn(
                      formData.cvv && !validateCVV(formData.cvv, currentScheme) ? "border-red-500" : ""
                    )}
                    required
                  />
                  {formData.cvv && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {validateCVV(formData.cvv, currentScheme) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.cvv && !validateCVV(formData.cvv, currentScheme) && (
                  <p className="text-xs text-red-500">{currentScheme === 'amex' ? 'Enter 4-digit CVV for American Express' : 'Enter 3-digit CVV'}</p>
                )}
              </div>
              
              {/* Cardholder Name */}
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.cardholderName}
                  onChange={handleChange}
                />
              </div>
              
              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Billing Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              {/* ZIP / Postal Code */}
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                <div className="relative">
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={cn(
                      formData.zipCode && formData.zipCode.length < 5 ? "border-red-500" : ""
                    )}
                  />
                  {formData.zipCode && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {formData.zipCode.length >= 5 ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.zipCode && formData.zipCode.length < 5 && (
                  <p className="text-xs text-red-500">ZIP code must be at least 5 characters</p>
                )}
              </div>
              
              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10 digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                      formData.phone && formData.phone.length < 10 ? "border-red-500" : ""
                    )}
                    maxLength={10}
                  />
                  {formData.phone && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {formData.phone.length === 10 ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.phone && formData.phone.length < 10 && (
                  <p className="text-xs text-red-500">Phone number must be exactly 10 digits</p>
                )}
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#635BFF] hover:bg-[#5548c8] text-white font-bold rounded-lg shadow-md px-6 py-2 w-full md:w-auto transition-colors duration-150"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay $${parseFloat(amount).toFixed(2)}`
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="flex items-center justify-center mt-6 opacity-80">
        <svg width="72" height="24" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="18" fontSize="20" fontWeight="bold" fill="#635BFF">stripe</text>
        </svg>
        <span className="ml-2 text-sm text-gray-600">Powered by Stripe</span>
      </div>
    </div>
  );
}
