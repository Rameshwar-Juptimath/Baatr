import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const sendOtp = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId); // Store the verification ID
      navigation.navigate('OtpInput'); // Navigate to OTP input screen
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title="Submit" onPress={sendOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PhoneAuthScreen;
