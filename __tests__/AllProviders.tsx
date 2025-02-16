import { Provider as ChakraProvider } from '@/components/ui/provider';
import { AuthProvider } from '@/Auth';
import { ReactNode } from 'react';

export default function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
