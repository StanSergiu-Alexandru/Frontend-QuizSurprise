import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Easing,
  Text, Alert
} from "react-native";
import {useAppContext} from '../../Hooks/useAppContext.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../../../../../Types/Types.ts';
import RouteKey from '../../Navigation/Routes.ts';
import RNBluetoothClassic from "react-native-bluetooth-classic";
import usePostCustomFetch from "../../Hooks/usePostCustomFetch.tsx";
import requestUrls from "../../Backend/requestUrls.tsx";
import useValidateUser from "../../Hooks/useValidateUser.tsx";
import usePersistentState from "../../Hooks/usePersistentState.tsx";

const SpinWheelScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {token} = useValidateUser();
  const {hasUserWon} = useAppContext();
  const {store: userId} = usePersistentState('user_id');
  const [redirect, setRedirect] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const {fetcher: postAnswersRequest, response, error} = usePostCustomFetch<any, any>(
    requestUrls.increaseUserPoint(userId),
  );

  const spin = () => {
    if(hasUserWon){
      sendDeviceData("A");
    } else {
      sendDeviceData("B");
    }
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setRedirect(true);
    }, 2300);
    if(hasUserWon && userId!==0) {
      fetch(requestUrls.increaseUserPoint(userId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "totalPoints": 1
        }),
      });
    }
  };

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '2000deg'],
  });

  const sendDeviceData = async (message:string)  => {
    await RNBluetoothClassic.writeToDevice(
      "98:D3:91:FD:F7:E2",
      message,
    );
  }

  useEffect(() => {
    if (redirect) {
      if (hasUserWon) {
        navigation.dispatch(StackActions.replace(RouteKey.VICTORY_SCREEN));
      } else {
        navigation.dispatch(StackActions.replace(RouteKey.LOSE_SCREEN));
      }
    }
  }, [redirect]);

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../Images/wheelBackground.webp')}>
      <ImageBackground
        source={require('../../Images/wheel.png')}
        style={styles.imageBackground}>
        <Animated.Image
          source={require('../../Images/wheelSpinner.png')}
          style={[styles.wheelCenter, {transform: [{rotate: spinAnimation}]}]}
        />
        <Image
          style={styles.wheelPointer}
          source={require('../../Images/wheelCenter.png')}
        />
      </ImageBackground>
      <TouchableOpacity style={styles.wheelButton} onPress={spin}>
        <Text style={styles.buttonText}>Invarte Roata</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    height: 600,
    width: 600,
  },
  wheelCenter: {
    height: 600,
    width: 600,
  },
  wheelPointer: {
    position: 'absolute',
    height: 850,
    width: 850,
    zIndex: 99,
    transform: [{translateX: -127}, {translateY: -90}],
  },

  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  wheelButton: {
    backgroundColor: '#14F201',
    width: '80%',
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    zIndex: 999,
  },
});

export default SpinWheelScreen;
