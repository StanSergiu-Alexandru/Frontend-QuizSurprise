import {createContext, FC, useContext, useEffect} from 'react';
import usePostCustomFetch from './usePostCustomFetch';
import usePersistentState, {removeStorage} from './usePersistentState.tsx';
import requestUrls from '../Backend/requestUrls';
import {StackActions, useNavigation} from '@react-navigation/native';
import RouteKey from '../Navigation/Routes.ts';

const useAuthService = () => {
  const {set: setToken} = usePersistentState('token');
  const {set: setFirstName} = usePersistentState('first_name');
  const {set: setUserId} = usePersistentState('user_id');
  const navigation = useNavigation();
  const {
    response: loginResponse,
    error: loginError,
    loading: loginLoading,
    fetcher: sendLoginPayload,
    clear: clearLogin,
  } = usePostCustomFetch<any, any>(requestUrls.authLogin);

  const logUserIn = (username: string, password: string) => {
    const payload = {
      username: username,
      password: password,
    };
    console.log(payload);
    sendLoginPayload(payload);
  };

  const logUserOut = async () => {
    await removeStorage('token');
    navigation.dispatch(StackActions.replace(RouteKey.LOGIN_SCREEN));
    setToken('');
  };

  useEffect(() => {}, [loginError, loginResponse, loginLoading]);

  useEffect(() => {
    if (loginResponse) {
      if (loginResponse.token) {
        setToken(loginResponse.token);
        setFirstName(loginResponse.first_name);
        setUserId(loginResponse.user_id);
        clearLogin();
        navigation.dispatch(StackActions.replace(RouteKey.QUESTION_SCREEN));
      }
    }
  }, [loginError, loginResponse, loginLoading]);

  useEffect(() => {
    console.log(loginResponse, loginError, loginLoading);
  }, [loginError, loginResponse, loginLoading]);

  return {
    logUserIn,
    logUserOut,
    loginResponse,
    loginError,
  };
};

const initialState = {
  logUserIn: (user: string, pass: string) => undefined,
  logUserOut: () => undefined,
  loginResponse: '',
  loginError: '',
};

export const AuthContext = createContext<
  ReturnType<typeof useAuthService> | typeof initialState
>(initialState);

export const AuthProvider: FC<any> = ({children}) => {
  const auth = useAuthService();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
