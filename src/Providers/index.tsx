import { AuthProvider } from '@/Auth';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { PropsWithChildren } from 'react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </AuthProvider>
  );
}
