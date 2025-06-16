'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query for managing data fetching and caching

// Providers component to wrap app with global context providers
export default function Providers({ children }: { children: ReactNode }) {
  // Create a new QueryClient instance and memoize it to avoid re-creating on each render
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Provide the QueryClient instance to all children components via QueryClientProvider
    <QueryClientProvider client={queryClient}>
      {children} {/* Render children with React Query context */}
    </QueryClientProvider>
  );
}
