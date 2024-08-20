import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const SendBluetoothScreenText = () => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // Request Bluetooth permissions for Android
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);
          if (
            granted['android.permission.BLUETOOTH_SCAN'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.BLUETOOTH_CONNECT'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_FINE_LOCATION'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Bluetooth permissions granted');
          } else {
            console.log('Bluetooth permissions denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    // Check Bluetooth status
    const checkBluetoothEnabled = async () => {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      setIsBluetoothEnabled(enabled);
      if (!enabled) {
        console.log('Bluetooth is not enabled');
      }
    };

    requestPermissions();
    checkBluetoothEnabled();
  }, []);

  const connectToDevice = async deviceId => {
    try {
      const bondedDevices = await RNBluetoothClassic.getBondedDevices();
      const selectedDevice = bondedDevices.find(d => d.address === deviceId);

      if (selectedDevice) {
        const connected = await selectedDevice.isConnected();
        if (!connected) {
          await selectedDevice.connect();
          console.log('Connected to device:', selectedDevice.name);
        } else {
          console.log('Already connected to device:', selectedDevice.name);
        }
        setDevice(selectedDevice);
        return selectedDevice;
      } else {
        console.log('Device not found');
        return null;
      }
    } catch (error) {
      console.error('Error connecting to device:', error);
      return null;
    }
  };

  async function writeToBluetoothDevice(device, data) {
    try {
      const success = await device.write(data + '\n'); // Append '\n' to the data
      if (success) {
        console.log('Data written successfully:', data);
      } else {
        console.log('Failed to write data:', data);
      }
    } catch (error) {
      console.error('Error writing data to device:', error);
    }
  }

  const sendMessageToDevice = async (deviceId, message) => {
    console.log('Attempting to send message to device:', deviceId);
    const connectedDevice = await connectToDevice(deviceId);
    if (connectedDevice) {
      await writeToBluetoothDevice(connectedDevice, message); // Removed '\n' here
    } else {
      console.log('Device connection failed.');
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Button
        title="Send Data"
        onPress={() =>
          sendMessageToDevice('98:D3:91:FD:F7:E2', 'Hello Arduino')
        }
      />
      {!isBluetoothEnabled && (
        <Text style={{color: 'red', marginTop: 20}}>
          Bluetooth is not enabled. Please enable it to send data.
        </Text>
      )}
    </View>
  );
};

export default SendBluetoothScreenText;
