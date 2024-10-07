import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/Baatr_logo_green2.png';

const { height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const [logoPosition] = useState(new Animated.Value(height)); // Start off-screen from the bottom

  useEffect(() => {
    // Animate the logo to bounce to the center
    Animated.sequence([
      Animated.timing(logoPosition, {
        toValue: (height / 2) - 100, // Center position
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoPosition, {
        toValue: (height / 2) - 200, // Increased bounce height
        friction: 1, // Lower friction for a bigger bounce
        tension: 33, // Adjust tension to increase bounce effect
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation, navigate to the intro screen
      setTimeout(() => {
        navigation.replace('Intro'); // Navigate to the Intro screen
      }, 800); // Small delay for effect
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoPosition }] }]}>
        <Image source={logo} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top', // Center content vertically
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
