import { Stack, styled } from 'tamagui';

export const ScreenCard = styled(Stack, {
  name: 'ScreenCard',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  pl: '$4',
  pr: '$4',
  variants: {
    filed: {
      true: { bg: '$bg' },
    },
  },
});
