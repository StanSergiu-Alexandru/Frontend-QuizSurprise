import React from 'react';
import RouteKey from './Routes';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../Types/Types.ts';
import {theme} from '../Constants/Colors.ts';
import QuestionScreen from '../Screens/QuestionScreen/QuestionScreen.tsx';
import LoginScreen from '../Screens/LoginScreen/LoginScreen.tsx';
import VictoryScreen from '../Screens/VictoryScreen/VictoryScreen.tsx';
import RegisterScreen from '../Screens/RegisterScreen/RegisterScreen.tsx';
import SpinWheelScreen from '../Screens/SpinWheelScreen/SpinWheelScreen.tsx';
import LoseScreen from '../Screens/LoseScreen/LoseScreen.tsx';
import RankingsScreen from "../Screens/RankingsScreen/RankingsScreen.tsx";

const screenRoutes = [
  {name: RouteKey.QUESTION_SCREEN, component: QuestionScreen},
  {name: RouteKey.LOGIN_SCREEN, component: LoginScreen},
  {name: RouteKey.VICTORY_SCREEN, component: VictoryScreen},
  {name: RouteKey.REGISTER_SCREEN, component: RegisterScreen},
  {name: RouteKey.SPIN_WHEEL_SCREEN, component: SpinWheelScreen},
  {name: RouteKey.LOSE_SCREEN, component: LoseScreen},
  {name: RouteKey.RANKINGS_SCREEN, component: RankingsScreen},
];

const RoutesMapping: React.FC = () => {
  const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
  const screenOptions = {
    cardStyle: {backgroundColor: theme.fontColor},
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
