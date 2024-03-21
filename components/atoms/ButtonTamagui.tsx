import { Button, ButtonProps } from 'tamagui';

export type IconButtonProps = {
  icon?: React.ReactNode;
  text: string;
  buttonProps?: ButtonProps;
  textProps?: ButtonProps['textProps'];
  bgColor?: string;
  elementColor?: string;
};

export function ButtonTamagui({
  icon,
  text,
  buttonProps,
  textProps,
  bgColor,
  elementColor,
}: IconButtonProps) {
  return (
    <Button
      pressStyle={
        {
          color: bgColor || '$color4',
          borderColor: bgColor || '$color4',
        } as never
      }
      backgroundColor={bgColor || '$color4'}
      color={elementColor}
      {...buttonProps}
    >
      <Button.Icon>{icon}</Button.Icon>
      <Button.Text {...textProps} textTransform="uppercase" fontWeight="bold">
        {text}
      </Button.Text>
    </Button>
  );
}
