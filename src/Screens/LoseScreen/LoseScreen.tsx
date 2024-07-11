import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useAppContext} from '../../Hooks/useAppContext.tsx';
import React, {useEffect} from 'react';
import AnswerList from '../../Components/AnswerList.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from '../../../../../../Types/Types.ts';

const LoseScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {question} = useAppContext();

  useEffect(() => {
    console.log(question);
  }, [question]);

  const handleRedirectHome = () => {
    navigation.dispatch(StackActions.replace('LoginScreen'));
  };

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
        </View>
        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={handleRedirectHome}>
          <Text style={styles.buttonText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
