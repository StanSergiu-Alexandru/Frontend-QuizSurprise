import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {theme} from '../../Constants/Colors.ts';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Types/Types.ts';
import RouteKey from '../../Navigation/Routes.ts';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: RouteKey.TAB_NAVIGATOR}]}),
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title={'redirect'} onPress={handlePress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.fontColor,
  },
});

export default LoginScreen;
