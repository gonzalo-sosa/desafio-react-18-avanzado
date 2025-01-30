import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
type NewBoardPopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
};

export default function Popover({ trigger, children }: NewBoardPopoverProps) {
  return (
    <PopoverRoot positioning={{ placement: 'right' }}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{children}</PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
}
