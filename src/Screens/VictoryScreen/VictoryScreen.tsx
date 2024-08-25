import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePersistentState from '../../Hooks/usePersistentState.tsx';
import React from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const VictoryScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {store: first_name} = usePersistentState('first_name');

  const sendDeviceData = async (message: string) => {
    await RNBluetoothClassic.writeToDevice('98:D3:91:FD:F7:E2', message);
  };

  const handleBackHome = () => {
    sendDeviceData('C');
    AsyncStorage.clear().then(() =>
      navigation.dispatch(StackActions.replace('LoginScreen')),
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/WinScreen_Illusion.jpg')}
        style={styles.imageStyle}
        resizeMode={'cover'}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Felicitari, {first_name}!</Text>
        <Text style={styles.text}>Ai raspuns corect la intrebare!</Text>

        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={handleBackHome}>
          <Text style={styles.buttonText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    color: 'black',
  },

  backHomeButton: {
    backgroundColor: 'red',
    width: '80%',
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  imageStyle: {flex: 1, width: '100%', height: '100%'},
});
export default VictoryScreen;
