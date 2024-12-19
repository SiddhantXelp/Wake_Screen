import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { StyleSheet } from 'react-native';

import { useEffect, useState } from 'react';


import { NativeModules } from 'react-native';

const { WakeScreen } = NativeModules;

const wakeUpScreen = () => {
    WakeScreen.wakeUp();
};



const usePushNotification = () => {

const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log('result.............', res);
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
    return fcmToken;
  };


   const handleForegroundNotifications = () => {
    // Listen for messages while the app is in the foreground
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
  
      // Extract notification data
      const { notification, data } = remoteMessage;
  
      // Display an alert (or handle it however you want)
      Alert.alert(
        notification?.title || 'Notification',
        notification?.body || 'You have a new message',
        [
          { text: 'Dismiss', onPress: () => console.log('Dismiss pressed') },
          {
            text: 'Custom Action',
            onPress: () => console.log('Perform custom action with data:', data),
          },
        ]
      );
  
      // Additional custom handling of data
      if (data && data.customData) {
        console.log('Custom Data:', data.customData);
        // Perform any additional actions with customData
      }
    });
    wakeUpScreen()

  };
 
 

  return {
    requestUserPermission,
    getFCMToken,
    handleForegroundNotifications



  };
};

export default usePushNotification;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});