![image](https://github.com/pratham-stack/Push-Notification-React-Native/assets/75517066/145bab93-7c44-4b61-8f35-f5de06b876b0)This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
Push Notification Implementation Using Firebase (React native )


![WhatsApp Image 2024-04-04 at 8 41 08 PM](https://github.com/pratham-stack/Push-Notification-React-Native/assets/75517066/f02e4022-334b-4e65-b7c0-44c9361e3620)

Create a Notification Service File

---------------------------------------->>>>>>>>>>>>>>>

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('The old FCM token', fcmToken);
  try {
    if (!fcmToken) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('The new FCM Token', fcmToken);
        // await setItem('fcmToken', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch (error) {
    console.log('fcmToken error', error);
  }
};

export const notificationListener = async () => {

  console.log("hello i am inside Notification Listener");
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  //for foreground
  messaging().onMessage(async remoteMessage => {
    console.log('received in foreground', remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });
};


------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


App.js 

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { notificationListener, requestUserPermission } from './src/utils/notificationService';
import {PermissionsAndroid} from 'react-native';

function App() {

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    requestUserPermission();
    notificationListener();
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
        <Text style={{ fontSize: 32 }}>Push Notification </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


------------------------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
