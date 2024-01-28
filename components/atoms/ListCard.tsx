import { Image, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export type ListCardProps = {
  headerElement: React.ReactNode;
  middleElement: React.ReactNode;
  fixedHeight: number;
};

export function ListCard({
  fixedHeight,
  middleElement,
  headerElement,
}: ListCardProps) {
  const theme = useSelector(selectTheme);
  return (
    <View
      style={{ height: fixedHeight, maxHeight: fixedHeight }}
      className={`bg-white dark:bg-dark 
      border-dark dark:border-green border-2 border-solid rounded-2xl overflow-hidden `}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../../assets/HARVESTING.webp')}
      />
      <View className="flex-[2]">{middleElement}</View>
      <BlurView
        intensity={theme === Theme.dark ? 60 : 90}
        tint={theme === Theme.dark ? 'dark' : 'default'}
        className="h-[35%]"
      >
        {headerElement}
      </BlurView>
    </View>
  );
}
