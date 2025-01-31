import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PopoverRootProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
type NewBoardPopoverProps = {
  popoverRootProps?: Omit<PopoverRootProps, 'children'>;
  trigger: ReactNode;
  children: ReactNode;
};

export default function Popover({
  popoverRootProps,
  trigger,
  children,
}: NewBoardPopoverProps) {
  return (
    <PopoverRoot {...popoverRootProps}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{children}</PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
}
