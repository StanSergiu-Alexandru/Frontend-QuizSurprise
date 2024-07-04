import {theme} from '../Constants/Colors';
import {typography} from '../Constants/Typography';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const generalTabBarOptions = () => {
  const insets = useSafeAreaInsets();
  return {
    tabBarInactiveTintColor: theme.secondaryFontColor,
    tabBarInactiveBackgroundColor: theme.mainSurface,
    tabBarActiveTintColor: theme.fontColor,
    tabBarActiveBackgroundColor: theme.aboutSubscreenButtonsInactive,
    tabBarShowLabel: true,
    tabBarItemStyle: {
      borderRadius: 8,
      ...typography.body_s,
      padding: 5,
      margin: 1,
    },
    tabBarStyle: {
      borderTopWidth: 0,
      backgroundColor: theme.mainSurface,
      height: 80,
      paddingHorizontal: 10,
      paddingBottom: 0,
      paddingTop: 10,
      marginBottom: insets.bottom,
    },
    headerShown: false,
  };
};

export default generalTabBarOptions;
