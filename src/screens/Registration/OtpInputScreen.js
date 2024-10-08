import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const OtpInputScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();

  const confirmOtp = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth().signInWithCredential(credential);
      navigation.navigate('BasicInfo'); // Navigate to BasicInfoScreen on successful login
    } catch (error) {
      console.error(error);
      Alert.alert('Invalid OTP', 'Please check your OTP and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        style={styles.input}
      />
      <Button title="Submit" onPress={confirmOtp} />
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

export default OtpInputScreen;
