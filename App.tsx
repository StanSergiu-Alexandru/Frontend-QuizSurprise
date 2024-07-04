import 'react-native-gesture-handler';
import React from 'react';
import RoutesMapping from './src/Navigation/Navigator.tsx';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {theme} from './src/Constants/Colors.ts';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.mainSurface,
  },
};

const App: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <RoutesMapping />
    </NavigationContainer>
  );
};

export default App;
