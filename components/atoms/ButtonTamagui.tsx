import { Button, ButtonProps } from 'tamagui';

export type IconButtonProps = {
  icon: React.ReactNode;
  text: string;
  buttonProps?: ButtonProps;
  textProps?: ButtonProps['textProps'];
};

export function ButtonTamagui({
  icon,
  text,
  buttonProps,
  textProps,
}: IconButtonProps) {
  return (
    <Button
      pressStyle={
        {
          color: '$color4',
        } as never
      }
      {...buttonProps}
    >
      <Button.Icon>{icon}</Button.Icon>
      <Button.Text {...textProps} textTransform="uppercase" fontWeight="bold">
        {text}
      </Button.Text>
    </Button>
  );
}
