// type Props = {};

import List from '@/models/List';
import TasksList from '@/Tasks/components/TasksList';
import {
  CardRoot,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { LuDot } from 'react-icons/lu';

type ListCardProps = {
  list: List;
};

export default function ListCard({ list }: ListCardProps) {
  return (
    <CardRoot
      minW={'280px'}
      maxW={'280px'}
      rounded={'2xl'}
      borderWidth={1}
      backgroundColor={'gray.100'}
    >
      <CardHeader>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'sm'} fontWeight={'normal'}>
            {list.title}
          </Heading>
          <IconButton variant={'outline'} size={'xs'}>
            <LuDot />
          </IconButton>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <TasksList listId={list.id} />
      </CardBody>
    </CardRoot>
  );
}
