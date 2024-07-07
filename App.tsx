import 'react-native-gesture-handler';
import React from 'react';
import RoutesMapping from './src/Navigation/Navigator.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/Hooks/useAuth.tsx';
import {AppProvider} from './src/Hooks/useAppContext.tsx';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppProvider>
        <AuthProvider>
          <RoutesMapping />
        </AuthProvider>
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
