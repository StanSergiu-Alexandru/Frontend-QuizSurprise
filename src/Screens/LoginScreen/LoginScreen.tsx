import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {theme} from '../../Constants/Colors.ts';
import {useAuth} from '../../Hooks/useAuth.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {RootStackParamList} from '../../Types/Types.ts';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {logUserIn} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subjectType, setSubjectType] = useState<string | null>(null);

  const data = [
    {key: '1', value: 'Optiunea 1'},
    {key: '2', value: 'Optiunea 2'},
    {key: '3', value: 'Optiunea 3'},
    {key: '4', value: 'sfi'},
  ];

  const handleUsernameChange = useCallback((text: string) => {
    setUsername(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleLogin = async () => {
    if (!username || !password || !subjectType) {
      Alert.alert('Validation Error', 'Toate câmpurile sunt obligatorii.');
      return;
    }

    console.log('Subject Type:', subjectType); // Log subjectType-ul selectat

    try {
      await logUserIn(username, password);
      navigation.dispatch(
        StackActions.replace('QuestionScreen', {subjectType}),
      );
    } catch (error) {
      console.error('Login failed', error);
      Alert.alert('Login Error', 'Username sau parola gresita.');
    }
  };

  const handleRegisterRedirect = () => {
    navigation.dispatch(StackActions.replace('RegisterScreen'));
  };

  return (
    <ImageBackground
      source={require('../../Images/QuestionScreen_Background.png')}
      style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <TextInput
            style={styles.inputField}
            placeholder={'Nume utilizator'}
            onChangeText={handleUsernameChange}
          />
          <TextInput
            style={styles.inputField}
            placeholder={'Parola'}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
          />
          <SelectList
            setSelected={(val: React.SetStateAction<string>) =>
              setSubjectType(val)
            }
            data={data}
            save="value"
            boxStyles={styles.dropdown}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterRedirect}>
            <Text style={styles.buttonText}>INREGISTREAZA-TE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 200,
  },
  bottomContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 150,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  inputField: {
    borderWidth: 2,
    borderRadius: 30,
    margin: 16,
    fontSize: 20,
    width: 300,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  dropdown: {
    width: 300,
    marginTop: 20,
    borderWidth: 3,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: theme.startButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: theme.registerButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
});

export default LoginScreen;
