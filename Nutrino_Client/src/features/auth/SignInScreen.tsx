import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

// Ensure OAuth redirection can complete properly
WebBrowser.maybeCompleteAuthSession();

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

const { width } = Dimensions.get('window');

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/kKDBM1T/nutrition-bg.jpg' }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 35, 25, 0.8)']}
          style={styles.gradient}
        >
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <Ionicons name="leaf" size={40} color="#7ED957" />
              </View>
              <Text style={styles.appName}>NutriLife</Text>
              <Text style={styles.tagline}>Your journey to healthier eating starts here</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to track your nutrition goals</Text>

              <View style={styles.oauthContainer}>
                <TouchableOpacity
                  style={styles.oauthButton}
                  onPress={() => handleOAuthSignIn(googleAuth, "Google")}
                  disabled={isLoading}
                >
                  {isGoogleLoading ? (
                    <ActivityIndicator color="#7ED957" size="small" />
                  ) : (
                    <>
                      <View style={[styles.iconContainer, { backgroundColor: '#DB4437' }]}>
                        <Ionicons name="logo-google" size={18} color="#FFFFFF" />
                      </View>
                      <Text style={styles.oauthButtonText}>Continue with Google</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.oauthButton}
                  onPress={() => handleOAuthSignIn(appleAuth, "Apple")}
                  disabled={isLoading}
                >
                  {isAppleLoading ? (
                    <ActivityIndicator color="#7ED957" size="small" />
                  ) : (
                    <>
                      <View style={[styles.iconContainer, { backgroundColor: '#000000' }]}>
                        <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                      </View>
                      <Text style={styles.oauthButtonText}>Continue with Apple</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.oauthButton}
                  onPress={() => handleOAuthSignIn(facebookAuth, "Facebook")}
                  disabled={isLoading}
                >
                  {isFacebookLoading ? (
                    <ActivityIndicator color="#7ED957" size="small" />
                  ) : (
                    <>
                      <View style={[styles.iconContainer, { backgroundColor: '#4267B2' }]}>
                        <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
                      </View>
                      <Text style={styles.oauthButtonText}>Continue with Facebook</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
              </View>

              <TouchableOpacity
                style={styles.emailButton}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
                <Text style={styles.emailButtonText}>Sign in with Email</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.accountText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By continuing, you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#263238',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#263238',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#546E7A',
  },
  oauthContainer: {
    width: '100%',
    gap: 12,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  oauthButtonText: {
    color: '#263238',
    fontWeight: '600',
    fontSize: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#78909C',
    fontSize: 13,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7ED957',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    gap: 10,
  },
  emailButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  accountText: {
    color: '#546E7A',
  },
  signupText: {
    color: '#7ED957',
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 20,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#78909C',
    lineHeight: 18,
  },
  termsLink: {
    color: '#7ED957',
    fontWeight: '500',
  }
});

export default SignInScreen;
