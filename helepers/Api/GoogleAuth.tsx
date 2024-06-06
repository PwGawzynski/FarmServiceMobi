import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

export type OnIdTokenCallBack = (idToken: string) => void;

export const googleSignIn = async (onIdTokenCallBack: OnIdTokenCallBack) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn({});
    if (userInfo) {
      if (userInfo.idToken) {
        onIdTokenCallBack(userInfo.idToken);
      }
    }
  } catch (e) {
    Alert.alert(
      "Couldn't sign in with Google",
      'Something went wrong, try again later',
    );
  }
};
