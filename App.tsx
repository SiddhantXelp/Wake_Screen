import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import usePushNotification from './src/utilites/usePushNotification';






const App = () => {
  const {
    requestUserPermission,
    getFCMToken,
    // handleForegroundNotifications

  } = usePushNotification();

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        await getFCMToken();
        await requestUserPermission();
        // handleForegroundNotifications();

        console.log("Calling?????????????>>>>>>>>>s")
      } catch (error) {
        console.log(error);
      }
    };
    setupNotifications();
  }, []);






  return (
<View>
  <Text>Hello World</Text>
</View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 49.22,
    letterSpacing: 0.24,
    textAlign: 'center',
    color: 'black',
  },
});


export default App;

