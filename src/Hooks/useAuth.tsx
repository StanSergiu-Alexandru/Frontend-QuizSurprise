import {createContext, FC, useContext, useEffect} from 'react';
import usePostCustomFetch from './usePostCustomFetch';
import usePersistentState, {removeStorage} from './usePersistentState.tsx';
import requestUrls from '../Backend/requestUrls';
import {StackActions, useNavigation} from '@react-navigation/native';
import RouteKey from '../Navigation/Routes.ts';

const useAuthService = () => {
  const {set: setToken} = usePersistentState('token');
  const navigation = useNavigation();
  const {
    response: loginResponse,
    error: loginError,
    loading: loginLoading,
    fetcher: sendLoginPayload,
  } = usePostCustomFetch<any, any>(requestUrls.authLogin);

  const logUserIn = (username: string, password: string) => {
    const payload = {
      username: username,
      password: password,
    };
    sendLoginPayload(payload);
  };

  const logUserOut = async () => {
    await removeStorage('token');
    navigation.dispatch(StackActions.replace(RouteKey.LOGIN_SCREEN));
    setToken('');
  };

  useEffect(() => {
    if (loginResponse) {
      if (loginResponse.token != null) {
        setToken(loginResponse.token);
        navigation.dispatch(StackActions.replace(RouteKey.QUESTION_SCREEN));
      }
    }
  }, [loginError, loginResponse, loginLoading]);

  useEffect(() => {
    console.log('loginresponse.token', loginResponse);
  }, [loginResponse]);

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
