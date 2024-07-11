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
                <Text style={styles.text}>{answer.answer}</Text>
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
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedContainer: {
    borderColor: 'green',
  },
  correctContainer: {
    borderColor: 'green',
  },
  incorrectContainer: {
    borderColor: 'red',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
  },
  selectedText: {
    color: 'green',
  },
});

export default AnswerList;
