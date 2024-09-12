import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePersistentState from '../../Hooks/usePersistentState.tsx';
import React, {useEffect, useState} from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const VictoryScreen = () => {
  const [remainingTime, setRemainingTime] = useState<number>(15);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => prevTime - 1);
    }, 1000);

    const timer = setTimeout(() => {
      handleBackHome();
      clearInterval(interval);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

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
        <Text style={styles.victoryText}>
          Mai ai <Text style={styles.redText}>{remainingTime} secunde </Text>
          pentru a revendica premiul
        </Text>

        {/*<TouchableOpacity*/}
        {/*  style={styles.backHomeButton}*/}
        {/*  onPress={handleBackHome}>*/}
        {/*  <Text style={styles.buttonText}>Back Home</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  victoryText: {
    paddingTop: 40,
    fontSize: 35,
    color: 'black',
  },
  redText: {
    color: 'red',
  },
  imageStyle: {flex: 1, width: '100%', height: '100%'},
});
export default VictoryScreen;
