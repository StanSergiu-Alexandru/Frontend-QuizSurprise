import React, {FC} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RouteKey from './Routes.ts';
import generalTabBarOptions from './screenOptions.tsx';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import {TabNavigatorParamsList} from '../Types/Types.ts';
import LoginScreen from '../Screens/LoginScreen/LoginScreen.tsx';

const {Navigator, Screen} = createBottomTabNavigator<TabNavigatorParamsList>();
const TabNavigator: FC = () => {
  const tabs: any = [
    {
      name: RouteKey.HOME_SCREEN,
      component: HomeScreen,
      title: 'Home',
    },
    {
      name: RouteKey.LOGIN_SCREEN,
      component: LoginScreen,
      title: 'Login',
    },
  ];

  return (
    <Navigator
      screenOptions={generalTabBarOptions}
      initialRouteName={RouteKey.HOME_SCREEN}>
      {tabs.map(tab => (
        <Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.title,
          }}
        />
      ))}
    </Navigator>
  );
};

export default TabNavigator;
