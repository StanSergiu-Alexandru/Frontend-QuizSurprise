import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import RoutesMapping from './src/Navigation/Navigator.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/Hooks/useAuth.tsx';
import {AppProvider} from './src/Hooks/useAppContext.tsx';
import {PermissionsAndroid, Platform} from 'react-native';

function App(): React.JSX.Element {
  async function checkPermissions() {
    try {
      // Check location permission
      const locationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (locationPermission) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission not granted');
        const locationRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Need Location Access',
            message: 'ArduiNode wants access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        console.log(locationRequest);
      }

      // Check Bluetooth scan permission
      const bluetoothScanPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );

      if (bluetoothScanPermission) {
        console.log('Bluetooth scan permission granted');
      } else {
        console.log('Bluetooth scan permission not granted');
        const bluetoothScanRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: 'Need Bluetooth Scan Access',
            message: 'ArduiNode wants access to Bluetooth scanning',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        console.log(bluetoothScanRequest);
      }

      // Check Bluetooth connect permission
      const bluetoothConnectPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );

      if (bluetoothConnectPermission) {
        console.log('Bluetooth connect permission granted');
      } else {
        console.log('Bluetooth connect permission not granted');
        const bluetoothConnectRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: 'Need Bluetooth Connect Access',
            message: 'ArduiNode wants access to Bluetooth connection',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        console.log(bluetoothConnectRequest);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    checkPermissions();
  }, []);

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
