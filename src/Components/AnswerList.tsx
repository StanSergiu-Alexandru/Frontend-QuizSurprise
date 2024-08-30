import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {FC} from 'react';
import {AnswerType} from '../../../../../Types/Types.ts';

interface AnswerListProps {
  answers: AnswerType[] | undefined;
  selectedAnswers?: string[];
  onSelectAnswer: (id: string) => void;
  isOnLossScreen?: boolean;
}

const AnswerList: FC<AnswerListProps> = ({
  answers,
  selectedAnswers,
  onSelectAnswer,
  isOnLossScreen,
}) => {
  return (
    <>
      {answers &&
        answers.map(answer => {
          const isSelected = selectedAnswers?.includes(answer.id.toString());
          const isCorrect = answer.isCorrect;
          const isIncorrect = !answer.isCorrect;

          if (isOnLossScreen) {
            return (
              <View
                key={answer.id}
                style={[
                  styles.container,
                  isCorrect && styles.correctContainer,
                  isIncorrect && styles.incorrectContainer,
                ]}>
                <Text
                  style={[
                    styles.text,
                    isCorrect && styles.correctText,
                    isIncorrect && styles.incorrectText,
                  ]}>
                  {answer.answer}
                </Text>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={answer.id}
              style={[styles.container, isSelected && styles.selectedContainer]}
              onPress={() => onSelectAnswer(answer.id.toString())}>
              <Text style={[styles.text, isSelected && styles.selectedText]}>
                {answer.answer}
              </Text>
            </TouchableOpacity>
          );
        })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedContainer: {
    borderColor: 'green',
  },
  correctContainer: {
    borderColor: 'green',
    borderWidth: 3,
  },
  incorrectContainer: {
    borderColor: 'red',
    borderWidth: 3,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
  },
  selectedText: {
    color: 'green',
  },
  correctText: {
    color: 'green',
  },
  incorrectText: {
    color: 'red',
  },
});

export default AnswerList;
