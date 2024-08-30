import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../Hooks/useAppContext.tsx';
import React, {useEffect, useState} from 'react';
import AnswerList from '../../Components/AnswerList.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../../../../../Types/Types.ts';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const LoseScreen = () => {
  const [remainingTime, setRemainingTime] = useState<number>(15);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {question} = useAppContext();

  useEffect(() => {}, [question]);

  const sendDeviceData = async (message: string) => {
    await RNBluetoothClassic.writeToDevice('98:D3:91:FD:F7:E2', message);
  };

  const handleRedirectHome = () => {
    sendDeviceData('C');
    navigation.dispatch(StackActions.replace('LoginScreen'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => prevTime - 1);
    }, 1000);

    const timer = setTimeout(() => {
      handleRedirectHome();
      clearInterval(interval);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../Images/sadFace.png')}
        />
        <Text style={styles.text}>Oops! Ai raspuns gresit la intrebare.</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionHeadline}>Intrebare:</Text>
            <Text style={styles.questionText}>{question?.question}</Text>
          </View>
          <AnswerList
            answers={question?.answers}
            isOnLossScreen={true}
            onSelectAnswer={function (id: string): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Text style={styles.redirectText}>
            Revenire la pagina initiala in{' '}
            <Text style={{color: 'red'}}>{remainingTime} secunde.</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  redirectText: {
    marginVertical: 30,
    paddingLeft: 20,
    color: 'black',
    fontSize: 30,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 50,
  },
  image: {},
  textContainer: {
    flex: 1,
    width: '100%',
  },
  questionContainer: {
    position: 'absolute',
    width: '80%',
    height: '50%',
    top: -60,
    left: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
  },
  questionText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
  },
  text: {
    fontSize: 35,
    alignSelf: 'center',
    color: 'red',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 140,
  },
  button: {
    backgroundColor: 'red',
    width: 300,
    borderRadius: 30,
    paddingVertical: 5,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  questionHeadline: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
    textTransform: 'uppercase',
  },
  errorTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 40,
    color: 'red',
    alignSelf: 'center',
    zIndex: 999,
  },
  backHomeButton: {
    backgroundColor: 'red',
    width: '80%',
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    alignSelf: 'center',
  },
});

export default LoseScreen;
