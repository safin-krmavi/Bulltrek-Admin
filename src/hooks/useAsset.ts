import { assetApi } from '@/api/tradeMaster';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useAssets = () => {
  const queryClient = useQueryClient();

  // Get all assets
  const { data: rawAssets, isLoading, error } = useQuery({
    queryKey: ['tradeAssets'],
    queryFn: () => assetApi.getAll().then((res: any) => Array.isArray(res.data) ? res.data : res.data?.data || []),
  });
  const assets = Array.isArray(rawAssets) ? rawAssets : [];

  // Create asset
  const createAsset = useMutation({
    mutationFn: (symbol: string) => 
      assetApi.create(symbol).then(res => res.data),
    onSuccess: () => {
      toast.success('Asset created');
      queryClient.invalidateQueries({ queryKey: ['tradeAssets'] });
    },
    onError: () => {
      toast.error('Failed to create asset');
    }
  });

  // Update asset
  const updateAsset = useMutation({
    mutationFn: ({ id, symbol }: { id: number; symbol: string }) =>
      assetApi.update(id, symbol).then(res => res.data),
    onSuccess: (updatedAsset) => {
      toast.success(`Asset updated to ${updatedAsset.symbol}`);
      queryClient.invalidateQueries({ queryKey: ['tradeAssets'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update asset');
    }
  });

  // Delete asset
  const deleteAsset = useMutation({
    mutationFn: (id: number) => assetApi.delete(id),
    onSuccess: () => {
      toast.success('Asset deleted');
      queryClient.invalidateQueries({ queryKey: ['tradeAssets'] });
    },
    onError: () => {
      toast.error('Failed to delete asset');
    }
  });

  return { 
    assets, 
    isLoading, 
    error, 
    createAsset, 
    updateAsset,
    deleteAsset 
  };
};