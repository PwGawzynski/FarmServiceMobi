import { ActivityIndicator } from 'react-native';
import { Button, ButtonProps } from 'tamagui';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { TranslationNames } from '../../locales/TranslationNames';

export type IconButtonProps = {
  icon?: React.ReactNode;
  text?: string;
  buttonProps?: ButtonProps;
  textProps?: ButtonProps['textProps'];
  bgColor?: string;
  elementColor?: string;
  isPending?: boolean;
};

export function ButtonTamagui({
  icon,
  text,
  buttonProps,
  textProps,
  isPending,
  bgColor,
  elementColor,
}: IconButtonProps) {
  const theme = useSelector(selectTheme);
  return (
    <Button
      pressStyle={
        {
          color: bgColor || '$color4',
          borderColor: bgColor || '$color4',
        } as never
      }
      backgroundColor={bgColor || '$color4'}
      color={elementColor || '$color9'}
      disabled={isPending}
      {...buttonProps}
    >
      {!isPending && (
        <>
          <Button.Icon>{icon}</Button.Icon>
          <Button.Text
            ml={icon ? '$2' : '0'}
            {...textProps}
            textTransform="uppercase"
            fontWeight="bold"
          >
            {text}
          </Button.Text>
        </>
      )}
      {isPending && (
        <>
          <ActivityIndicator
            size="small"
            color={theme === Theme.dark ? '#000' : '$color8'}
          />
          <Button.Text
            {...textProps}
            textTransform="uppercase"
            fontWeight="bold"
            ml="$2"
          >
            {t(TranslationNames.components.buttonTamagui.processing)}
          </Button.Text>
        </>
      )}
    </Button>
  );
}
