import { useClerk } from '@clerk/clerk-expo';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

type Props = {
  navigation: ForgotPasswordScreenNavigationProp;
};

function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { client } = useClerk();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      setLoading(true);

      // Start the password reset process
      await client.signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      Alert.alert(
        'Password Reset',
        'If an account exists with this email, you will receive instructions to reset your password.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn')
          }
        ]
      );
    } catch (err: any) {
      console.error('Error requesting password reset:', err);
      // We don't show specific errors for security reasons
      Alert.alert(
        'Password Reset',
        'If an account exists with this email, you will receive instructions to reset your password.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn')
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <View style={styles.form}>
        <Text style={styles.description}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.backButton}
        >
          <Text style={styles.backText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#399AA8',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#399AA8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  backText: {
    color: '#399AA8',
  },
});

export default ForgotPasswordScreen;
