import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';
import StackNavigation from './src/navigate/stack';
import { AlertNotificationRoot } from 'react-native-alert-notification';
const App = () => {
  return (
    <AlertNotificationRoot>
    <NavigationContainer>
      <NativeBaseProvider>
        <StackNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
    </AlertNotificationRoot>
  )
}

export default App;

