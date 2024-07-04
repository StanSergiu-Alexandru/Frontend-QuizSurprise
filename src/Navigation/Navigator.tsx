import React from 'react';
import RouteKey from './Routes.ts';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import TabNavigator from './TabNavigator.tsx';
import {RootStackParamList} from '../Types/Types';
import {theme} from '../Constants/Colors.ts';

const screenRoutes = [
  {name: RouteKey.HOME_SCREEN, component: HomeScreen},
  {name: RouteKey.LOGIN_SCREEN, component: LoginScreen},
  {name: RouteKey.TAB_NAVIGATOR, component: TabNavigator},
];

const RoutesMapping: React.FC = () => {
  const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
  const screenOptions = {
    cardStyle: {backgroundColor: theme.mainSurface},
    headerShown: false,
  };

  return (
    <Navigator
      screenOptions={screenOptions}
      initialRouteName={RouteKey.LOGIN_SCREEN}>
      {screenRoutes.map(route => (
        <Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Navigator>
  );
};

export default RoutesMapping;
