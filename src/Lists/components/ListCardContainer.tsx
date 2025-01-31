import { ListRoot } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ListCardContainerProps = {
  id: string;
  children: ReactNode | ReactNode[];
};

export default function ListCardContainer({
  children,
}: ListCardContainerProps) {
  return (
    <ListRoot listStyle={'none'} flexDirection={'row'} gap={4}>
      {children}
    </ListRoot>
  );
}
