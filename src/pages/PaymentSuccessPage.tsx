import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for your payment. Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            A receipt for your purchase has been emailed to you.
          </p>
          <div className="mt-6 bg-green-50 p-4 rounded-md">
            <p className="text-sm text-green-700">
              <strong>Note:</strong> This is a demo transaction. No real payment was processed.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
