// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { auth, firestore } from '../firebase';

const SignupScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const checkEmailExists = async (email) => {
    try {
      const snapshot = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();
      return !snapshot.empty;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSignup = async () => {
    if (!phoneNumber || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        Alert.alert('Error', 'Email already exists');
        return;
      }

      const verificationCode = generateVerificationCode();
      
      navigation.navigate('Verification', {
        phoneNumber,
        email,
        password,
        verificationCode,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        label="Phone Number"
        mode="outlined"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        mode="contained"
        onPress={handleSignup}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});

export default SignupScreen;
