// screens/VerificationScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { auth, firestore } from '../firebase';

const VerificationScreen = ({ navigation, route }) => {
  const { phoneNumber, email, password, verificationCode } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    if (code !== verificationCode) {
      Alert.alert('Error', 'Invalid verification code');
      return;
    }

    setLoading(true);
    try {
      // Create auth user
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      
      // Store additional user data in Firestore
      await firestore.collection('users').doc(user.uid).set({
        phoneNumber,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Phone Number</Text>
      <Text style={styles.subtitle}>
        We've sent a verification code to {phoneNumber}
      </Text>
      
      <TextInput
        label="Verification Code"
        mode="outlined"
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      
      <Button
        mode="contained"
        onPress={handleVerification}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Verify
      </Button>
      
      <Button
        mode="text"
        onPress={() => Alert.alert('Info', 'New code sent!')}
        style={styles.resendButton}
      >
        Didn't receive a code? Resend
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  resendButton: {
    marginTop: 20,
  },
});

export default VerificationScreen;
