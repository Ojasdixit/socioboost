import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Pencil, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Policy {
  id: string;
  title: string;
  slug: string;
  content: string;
  last_updated: string;
}

const Policies = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [policyContent, setPolicyContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .order('title');
      
      if (error) throw error;
      
      if (data) {
        setPolicies(data);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
      toast.error('Failed to load policies');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (policy: Policy) => {
    setEditingPolicy(policy);
    setPolicyContent(policy.content);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingPolicy) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('policies')
        .update({
          content: policyContent,
          last_updated: new Date().toISOString(),
        })
        .eq('id', editingPolicy.id);
      
      if (error) throw error;
      
      toast.success('Policy updated successfully!');
      setIsDialogOpen(false);
      
      // Refresh policies
      fetchPolicies();
    } catch (error) {
      console.error('Error updating policy:', error);
      toast.error('Failed to update policy');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Policies</h1>
        <Button variant="outline" onClick={fetchPolicies} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading && !isDialogOpen ? (
        <div className="p-8 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p>Loading policies...</p>
        </div>
      ) : policies.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No policies found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-lg shadow-sm p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{policy.title}</h2>
                  <p className="text-sm text-gray-500">
                    Last updated: {formatDate(policy.last_updated)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(policy)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              <div className="prose max-w-none">
                {policy.content ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: policy.content }}
                    className="text-gray-600"
                  />
                ) : (
                  <p className="text-gray-400 italic">No content yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {editingPolicy?.title}
            </DialogTitle>
            <DialogDescription>
              Make changes to the policy content. The changes will be reflected on the public website.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={policyContent}
                onChange={(e) => setPolicyContent(e.target.value)}
                className="min-h-[400px]"
                placeholder="Enter policy content here..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Policies; 