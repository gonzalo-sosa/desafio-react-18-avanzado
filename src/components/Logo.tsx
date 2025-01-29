import TrelloLogo from '@/assets/trello-logo.gif';
import TrelloLogoAnimated from '@/assets/trello-logo-animated.gif';
import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box
      alignContent={'center'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        htmlWidth={80}
        src={TrelloLogo}
        display={isHovered ? 'none' : 'block'}
      />
      <Image
        htmlWidth={80}
        src={TrelloLogoAnimated}
        display={isHovered ? 'block' : 'none'}
      />
    </Box>
  );
}
