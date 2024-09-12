import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AnswerList from '../../Components/AnswerList.tsx';
import React, {useEffect, useState} from 'react';
import useGetCustomFetch from '../../Hooks/useGetCustomFetch.tsx';
import requestUrls from '../../Backend/requestUrls.tsx';
import useValidateUser from '../../Hooks/useValidateUser.tsx';
import usePostCustomFetch from '../../Hooks/usePostCustomFetch.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {useAppContext} from '../../Hooks/useAppContext.tsx';
import RouteKey from '../../Navigation/Routes.ts';
import usePersistentState from '../../Hooks/usePersistentState.tsx';
import {RootStackParamList} from '../../Types/Types.ts';

const QuestionScreen: React.FC = () => {
  const {
    subjectType,
    setHasUserWon,
    setQuestion: setQuestionContext,
  } = useAppContext();
  const {store: userId} = usePersistentState('user_id');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [question, setQuestion] = useState<any>();
  const [questionAnswer, setQuestionAnswer] = useState<boolean | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const {fetcher: getQuestionsRequest, response: questionsResponse} =
    useGetCustomFetch<any, any>(requestUrls.getQuestion(subjectType));
  const {fetcher: postAnswersRequest, response} = usePostCustomFetch<any, any>(
    requestUrls.validateQuestion(question?.id, userId),
  );
  const token = useValidateUser();

  useEffect(() => {
    console.log(requestUrls.validateQuestion(question?.id, userId));
    console.log(response);
  }, [response]);

  useEffect(() => {
    getQuestionsRequest(token.token);
  }, [subjectType]);

  useEffect(() => {
    if (questionsResponse) {
      setQuestion(questionsResponse);
      setQuestionContext(questionsResponse);
    }
  }, [questionsResponse]);

  const handleSelectAnswer = (id: string) => {
    setSelectedAnswers(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(answerId => answerId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const validateAnswers = () => {
    let newAnswers = selectedAnswers.map(answer => parseInt(answer, 10));
    postAnswersRequest({answers: newAnswers}, token.token);
  };

  useEffect(() => {
    setQuestionAnswer(response);
  }, [response]);

  useEffect(() => {
    if (questionAnswer === false || questionAnswer === true) {
      setHasUserWon(questionAnswer);
      navigation.dispatch(StackActions.replace(RouteKey.SPIN_WHEEL_SCREEN));
    }
  }, [questionAnswer]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Images/QuestionScreen_Background.png')}
        style={{flex: 1}}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeadline}>Intrebare:</Text>
          <Text style={styles.questionText}>{question?.question}</Text>
        </View>
      </ImageBackground>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnswerList
          answers={question?.answers}
          selectedAnswers={selectedAnswers}
          onSelectAnswer={handleSelectAnswer}
        />
        <TouchableOpacity style={styles.button} onPress={validateAnswers}>
          <Text style={styles.buttonText}>TRIMITE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    position: 'absolute',
    width: '80%',
    height: '50%',
    top: '75%',
    left: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
  },
  questionText: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    marginTop: 140,
  },
  button: {
    backgroundColor: 'red',
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 27,
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
});

export default QuestionScreen;
