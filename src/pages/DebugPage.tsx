import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { forceReseedPackages } from '@/utils/seedPackages';
import { toast } from 'sonner';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price: number | null;
  is_featured: boolean;
}

interface ServiceCounts {
  [key: string]: number;
}

const DebugPage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [isSeedingPackages, setIsSeedingPackages] = useState(false);
  const [serviceCounts, setServiceCounts] = useState<ServiceCounts>({});

  const fetchAllPackages = async () => {
    setLoading(true);
    try {
      // Test connection first
      const { error: connectionError } = await supabase.from('product_packages').select('count');
      if (connectionError) {
        setError(`Connection error: ${connectionError.message}`);
        setLoading(false);
        return;
      }

      // Get all packages
      const { data, error } = await supabase
        .from('product_packages')
        .select('*')
        .order('name');
      
      if (error) {
        setError(`Query error: ${error.message}`);
      } else if (data) {
        setPackages(data);
        
        // Count packages by service type
        const counts: ServiceCounts = {};
        const serviceTypes = ['YouTube', 'Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Google', 'Trustpilot'];
        
        serviceTypes.forEach(serviceType => {
          counts[serviceType] = data.filter(pkg => 
            pkg.name.startsWith(serviceType)
          ).length;
        });
        
        setServiceCounts(counts);
      } else {
        setPackages([]);
      }
    } catch (err) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackages();
  }, []);

  const handleReseedPackages = async () => {
    setIsSeedingPackages(true);
    setSeedStatus('Reseeding packages...');
    
    try {
      const result = await forceReseedPackages();
      setSeedStatus(result);
      toast.success('Database reseeded successfully');
      
      // Refresh the package list
      await fetchAllPackages();
    } catch (err) {
      setSeedStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
      toast.error('Failed to reseed database');
    } finally {
      setIsSeedingPackages(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Debug Database</h1>
          <p className="text-gray-600 mb-10 text-lg">Displaying all packages from the database</p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Database Actions</h2>
            <div className="flex gap-4 flex-wrap">
              <Button 
                onClick={handleReseedPackages} 
                disabled={isSeedingPackages}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                {isSeedingPackages ? 'Reseeding...' : 'Reseed Database with Sample Packages'}
              </Button>
              <Button 
                onClick={fetchAllPackages} 
                disabled={loading}
                variant="outline"
              >
                Refresh Package List
              </Button>
            </div>
            
            {seedStatus && (
              <div className={`mt-4 p-4 rounded ${seedStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {seedStatus}
              </div>
            )}
          </div>

          {!loading && !error && Object.keys(serviceCounts).length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Package Counts by Service</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(serviceCounts).map(([service, count]) => (
                  <div key={service} className={`p-4 rounded-lg border ${count > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <h3 className="font-semibold">{service}</h3>
                    <p className={count > 0 ? 'text-green-600' : 'text-red-600'}>
                      {count} packages
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500 mb-6">Loading packages...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          ) : packages.length > 0 ? (
            <div>
              <p className="mb-4">Found {packages.length} packages in database.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">ID</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Description</th>
                      <th className="py-2 px-4 border-b">Price</th>
                      <th className="py-2 px-4 border-b">Discounted Price</th>
                      <th className="py-2 px-4 border-b">Featured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{pkg.id}</td>
                        <td className="py-2 px-4 border-b">{pkg.name}</td>
                        <td className="py-2 px-4 border-b">{pkg.description}</td>
                        <td className="py-2 px-4 border-b">${pkg.price}</td>
                        <td className="py-2 px-4 border-b">{pkg.discounted_price ? `$${pkg.discounted_price}` : '-'}</td>
                        <td className="py-2 px-4 border-b">{pkg.is_featured ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500 mb-6">No packages found in the database.</p>
              <p className="mb-4">Click the "Reseed Database" button above to add sample packages.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DebugPage; 