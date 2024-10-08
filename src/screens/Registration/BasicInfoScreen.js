import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const BasicInfoScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('volunteer'); // Default role
  const navigation = useNavigation();

  const saveUserInfo = async () => {
    const userId = auth().currentUser.uid; // Get the current user's ID
    await firestore().collection('users').doc(userId).set({
      firstName,
      lastName,
      role,
      phoneNumber: auth().currentUser.phoneNumber, // Save the user's phone number
    });
    navigation.navigate('NextScreen'); // Navigate to the next screen after saving
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Role (influencer or volunteer)"
        value={role}
        onChangeText={setRole}
        style={styles.input}
      />
      <Button title="Save" onPress={saveUserInfo} />
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

export default BasicInfoScreen;
