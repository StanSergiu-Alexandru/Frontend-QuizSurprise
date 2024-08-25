import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Platform,
  Image,
  ToastAndroid,
} from 'react-native';
import {theme} from '../../Constants/Colors.ts';
import {useAuth} from '../../Hooks/useAuth.tsx';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useAppContext} from '../../Hooks/useAppContext.tsx';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import routes from '../../Navigation/Routes.ts';

const LoginScreen = () => {
  const [showDev, setShowDev] = useState<boolean>(false);
  const [number, setNumber] = useState<string>('0');
  const {setSubjectType: setSubjectTypeContext} = useAppContext();
  const navigation = useNavigation<NavigationProp<any>>();
  const {logUserIn, loginError} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subjectType, setSubjectType] = useState<string | null>(null);
  const [connectionSuccess, setConnectionSuccess] = useState(false);

  const data = [
    {key: '1', value: 'Optiunea 1'},
    {key: '2', value: 'Optiunea 2'},
    {key: '3', value: 'Optiunea 3'},
    {key: '4', value: 'sfi'},
  ];

  const sendData = () => {
    sendDeviceData(number);
  };

  const handleInputChange = (input: any) => {
    setNumber(input);
  };

  const sendDeviceData = async (message: string) => {
    await RNBluetoothClassic.writeToDevice('98:D3:91:FD:F7:E2', message);
  };

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
    logUserIn(username, password);
  };

  const handleRegisterRedirect = () => {
    navigation.dispatch(StackActions.replace(routes.REGISTER_SCREEN));
  };

  const handleRankingsRedirect = () => {
    navigation.navigate(routes.RANKINGS_SCREEN);
  };

  useEffect(() => {
    if (loginError !== null) {
      Alert.alert('eroare login');
    }
  }, [loginError]);

  const handleConnectToDevice = async () => {
    const deviceAddress = '98:D3:91:FD:F7:E2';
    try {
      let connection = await RNBluetoothClassic.isDeviceConnected(
        deviceAddress,
      );
      if (!connection) {
        ToastAndroid.show(
          `Attempting connection with device at address: ${deviceAddress}`,
          ToastAndroid.SHORT,
        );
        try {
          await RNBluetoothClassic.connectToDevice(deviceAddress, {
            //@ts-ignore
            CONNECTOR_TYPE: 'rfcomm',
            DELIMITER: '\n',
            DEVICE_CHARSET: Platform.OS === 'ios' ? 1536 : 'utf-8',
          });
          ToastAndroid.show('Connection successful', ToastAndroid.SHORT);
          setConnectionSuccess(true);
        } catch (e) {
          ToastAndroid.show('Connection error', ToastAndroid.SHORT);
        } finally {
        }
      } else {
        ToastAndroid.show('Already connected to device', ToastAndroid.SHORT);
        setConnectionSuccess(true);
      }
    } catch (e) {
      ToastAndroid.show('Error checking connection', ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      source={require('../../Images/QuestionScreen_Background.png')}
      style={styles.imageBackground}>
      <TouchableOpacity
        style={styles.trophyContainer}
        onPress={handleRankingsRedirect}>
        <Text style={styles.buttonText}>CLASAMENT</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.showDevButton}
          onPress={() => setShowDev(!showDev)}>
          <Text style={styles.buttonText}>DEV</Text>
        </TouchableOpacity>
        <View style={styles.middleContainer}>
          <TextInput
            style={styles.inputField}
            placeholder={'Nume utilizator'}
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
          <SelectList
            setSelected={(val: React.SetStateAction<any>) => {
              setSubjectType(val);
              setSubjectTypeContext(val);
            }}
            data={data}
            save="value"
            placeholder={'Selectati Materia'}
            boxStyles={styles.dropdown}
            dropdownStyles={styles.dropdown}
            inputStyles={{color: 'black'}}
            dropdownTextStyles={{color: 'black'}}
            search={false}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={connectionSuccess ? styles.button : styles.buttonConnect}
            onPress={connectionSuccess ? handleLogin : handleConnectToDevice}>
            <Text style={styles.buttonText}>
              {connectionSuccess ? 'LOGIN' : 'CONECTARE LA SISTEM'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterRedirect}>
            <Text style={styles.buttonText}>INREGISTREAZA-TE</Text>
          </TouchableOpacity>
          {showDev && (
            <>
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                value={number !== null ? String(number) : ''}
                onChangeText={handleInputChange}
                placeholder="Type a number"
              />
              <TouchableOpacity style={styles.button} onPress={sendData}>
                <Text style={styles.buttonText}>Trimite numar</Text>
              </TouchableOpacity>
            </>
          )}
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
  showDevButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    borderRadius: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 450,
  },
  bottomContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 150,
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
  button: {
    backgroundColor: theme.startButton,
    width: 300,
    borderRadius: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonConnect: {
    backgroundColor: theme.hyperlink,
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
    fontWeight: 'bold',
  },
  trophyContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#8B8000',
    borderRadius: 30,
    paddingVertical: 10,
    marginBottom: 20,
  },
  trophy: {
    width: 100,
    height: 100,
  },
});

export default LoginScreen;
