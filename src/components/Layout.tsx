import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from './SideBar';
import { Grid } from '@chakra-ui/react';

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <Grid templateColumns={'260px 1fr'} gap={2}>
        <SideBar />
        {children}
      </Grid>
    </>
  );
}
