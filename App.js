import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './firebaseConfig'; // Make sure this is the correct path to your firebaseConfig.js
import SplashScreen from './src/screens/IntroScreens/SplashScreen';
import IntroScreen from './src/screens/IntroScreens/IntroScreen'; // Import your intro screen
import PhoneAuthScreen from './src/screens/Registration/PhoneAuthScreen';
import OtpInputScreen from './src/screens/Registration/OtpInputScreen';
import BasicInfoScreen from './src/screens/Registration/BasicInfoScreen';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen with Logo Animation */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* Intro Screens after Logo Animation */}
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
        <Stack.Screen name="OtpInput" component={OtpInputScreen} />
        <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
