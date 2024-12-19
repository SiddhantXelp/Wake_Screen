/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { NativeModules } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const { WakeScreen } = NativeModules;

// Function to call the native wake-up screen method
const wakeUpScreen = () => {
  if (WakeScreen && typeof WakeScreen.wakeUp === 'function') {
    console.log('Waking up the screen...');
    WakeScreen.wakeUp();
  } else {
    console.error('WakeScreen module or wakeUp method not available');
  }
};

// Background message handler (when the app is in the background or killed state)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notification received in the background/killed state:', remoteMessage);

  // Call the wake-up function if needed
  if (remoteMessage?.data?.wakeUp === 'true') {
    wakeUpScreen();
  }
});

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
