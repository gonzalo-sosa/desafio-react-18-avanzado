// type Props = {};

import List from '@/models/List';
import TasksList from '@/Tasks/components/TasksList';
import { CardRoot, CardBody, CardHeader, Heading } from '@chakra-ui/react';

type ListCardProps = {
  list: List;
};

export default function ListCard({ list }: ListCardProps) {
  return (
    <CardRoot maxW={'280px'}>
      <CardHeader>
        <Heading>{list.title}</Heading>
      </CardHeader>
      <CardBody>
        <TasksList listId={list.id} />
      </CardBody>
    </CardRoot>
  );
}
