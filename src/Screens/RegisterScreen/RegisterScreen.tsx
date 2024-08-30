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
import {StackActions, useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import requestUrls from '../../Backend/requestUrls.tsx';
import {userGroups} from '../../Constants/UserGroupData.ts';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userGroup, setUserGroup] = useState('');

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
        Alert.alert(
          'Error',
          'Inregistrare esuata.Nume de utilizator existent!',
        );
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
    <ImageBackground
      source={require('../../Images/QuestionScreen_Background.png')}
      style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={'Username'}
              placeholderTextColor={'#A9A9A9'}
              onChangeText={handleUsernameChange}
            />
            <TextInput
              style={styles.inputField}
              placeholder={'Parola'}
              placeholderTextColor={'#A9A9A9'}
              onChangeText={handlePasswordChange}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={'Nume'}
              placeholderTextColor={'#A9A9A9'}
              onChangeText={handleLastNameChange}
            />
            <TextInput
              style={styles.inputField}
              placeholder={'Prenume'}
              placeholderTextColor={'#A9A9A9'}
              onChangeText={handleFirstNameChange}
            />
          </View>
          <SelectList
            setSelected={(val: React.SetStateAction<string>) =>
              setUserGroup(val)
            }
            data={userGroups}
            save="value"
            boxStyles={styles.dropdown}
            dropdownStyles={styles.dropdown}
            inputStyles={{color: 'black'}}
            dropdownTextStyles={{color: 'black'}}
            maxHeight={150}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>INREGISTREAZA-TE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginRedirect}>
            <Text style={styles.buttonText}>AUTENTIFICARE</Text>
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
    marginTop: 450,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField: {
    borderWidth: 2,
    borderRadius: 30,
    margin: 16,
    fontSize: 20,
    width: 300,
    textAlign: 'center',
    backgroundColor: 'white',
    color: 'black',
  },
  dropdown: {
    width: 300,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: 'white',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 150,
  },
  button: {
    backgroundColor: theme.startButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
    borderWidth: 0,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: theme.registerButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
