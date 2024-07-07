import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {theme} from '../../Constants/Colors.ts';
import {StackActions, useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import requestUrls from "../../Backend/requestUrls.tsx";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userGroup, setUserGroup] = useState('');

  const data = [
    {key: '1', value: '30141'},
    {key: '2', value: '30142'},
    {key: '3', value: '30143'},
    {key: '4', value: '30144'},
  ];

  const handleFirstNameChange = useCallback((text: string) => {
    setFirstName(text);
  }, []);

  const handleLastNameChange = useCallback((text: string) => {
    setLastName(text);
  }, []);

  const handleUsernameChange = useCallback((text: string) => {
    setUsername(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const handleRegister = async () => {
    try {
      const response = await fetch(requestUrls.authRegister, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          userGroup: parseInt(userGroup),
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Inregistrare cu succes.');
        navigation.dispatch(StackActions.replace('LoginScreen'));
      } else {
        Alert.alert('Error', 'Inregistrare esuata.');
      }
    } catch (error) {
      console.error('Register failed', error);
      Alert.alert('Error', 'A apărut o eroare.');
    }
  };

  const handleLoginRedirect = () => {
    navigation.dispatch(StackActions.replace('LoginScreen'));
  };

  return (
    <LinearGradient
      colors={['#232526', '#414345']}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <TextInput
            style={styles.inputField}
            placeholder={'Username'}
            onChangeText={handleUsernameChange}
          />
          <TextInput
            style={styles.inputField}
            placeholder={'Parola'}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputField}
            placeholder={'Nume'}
            onChangeText={handleLastNameChange}
          />
          <TextInput
            style={styles.inputField}
            placeholder={'Prenume'}
            onChangeText={handleFirstNameChange}
          />
          <SelectList
            setSelected={(val: React.SetStateAction<string>) =>
              setUserGroup(val)
            }
            data={data}
            save="value"
            boxStyles={styles.dropdown} // Aplică stilul pentru dropdown
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>INREGISTREAZA-TE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginRedirect}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between', // Distribuie spațiul între containere
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Ocupă spațiul rămas pentru a centra conținutul vertical
    marginTop: 100,
  },
  bottomContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 100, // Adaugă un spațiu dedesubtul containerului inferior
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 30,
    margin: 16,
    fontSize: 20,
    width: 300, // Ajustează lățimea câmpului de input
    textAlign: 'center',
    backgroundColor: 'white',
  },
  dropdown: {
    width: 300, // Ajustează lățimea dropdown-ului
    marginTop: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: theme.startButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
    borderWidth: 0, // Elimină conturul
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: theme.registerButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
    borderWidth: 0, // Elimină conturul
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
});

export default RegisterScreen;
