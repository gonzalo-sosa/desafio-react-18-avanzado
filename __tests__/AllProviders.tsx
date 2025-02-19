import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function AllProviders({ children }: PropsWithChildren) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
