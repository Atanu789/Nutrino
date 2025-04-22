import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

// Ensure OAuth redirection can complete properly
WebBrowser.maybeCompleteAuthSession();

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

function SignInScreen({ navigation }: Props) {
  const { startOAuthFlow: googleAuth, isLoading: isGoogleLoading } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth, isLoading: isAppleLoading } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth, isLoading: isFacebookLoading } = useOAuth({ strategy: "oauth_facebook" });

  const handleOAuthSignIn = async (
    authMethod: () => Promise<{
      createdSessionId: string | null;
      setActive: ({ session }: { session: string }) => Promise<void>;
    }>,
    provider: string
  ) => {
    try {
      const { createdSessionId, setActive } = await authMethod();

      if (createdSessionId) {
        // User successfully authenticated
        await setActive({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error(`Error signing in with ${provider}:`, err);
      Alert.alert("Authentication Error", `Failed to sign in with ${provider}`);
    }
  };

  const isLoading = isGoogleLoading || isAppleLoading || isFacebookLoading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Text style={styles.subtitle}>Continue with your social account</Text>

      <View style={styles.oauthContainer}>
        <TouchableOpacity
          style={[styles.oauthButton, styles.googleButton]}
          onPress={() => handleOAuthSignIn(googleAuth, "Google")}
          disabled={isLoading}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Ionicons name="logo-google" size={24} color="#ffffff" />
              <Text style={styles.oauthButtonText}>Google</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.oauthButton, styles.appleButton]}
          onPress={() => handleOAuthSignIn(appleAuth, "Apple")}
          disabled={isLoading}
        >
          {isAppleLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Ionicons name="logo-apple" size={24} color="#ffffff" />
              <Text style={styles.oauthButtonText}>Apple</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.oauthButton, styles.facebookButton]}
          onPress={() => handleOAuthSignIn(facebookAuth, "Facebook")}
          disabled={isLoading}
        >
          {isFacebookLoading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <>
              <Ionicons name="logo-facebook" size={24} color="#ffffff" />
              <Text style={styles.oauthButtonText}>Facebook</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Sign Up</Text>
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#399AA8',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  oauthContainer: {
    width: '100%',
    gap: 15,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    gap: 10,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  oauthButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#399AA8',
    fontWeight: 'bold',
  },
});

export default SignInScreen;
