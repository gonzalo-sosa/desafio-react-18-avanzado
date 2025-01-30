import { defineTextStyles } from '@chakra-ui/react';

export const textStyles = defineTextStyles({
  sidebar: {
    description: 'The sidebar text style - used in sidebars',
    value: {
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20',
      letterSpacing: '0',
      textDecoration: 'None',
    },
  },
  body: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '24',
      letterSpacing: '0',
      textDecoration: 'None',
      textTransform: 'None',
    },
  },
});
