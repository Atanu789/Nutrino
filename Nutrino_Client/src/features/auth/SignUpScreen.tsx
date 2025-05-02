import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Platform,
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

type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }: Props) => {
  const { startOAuthFlow: googleAuth, isLoading: isGoogleLoading } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth, isLoading: isAppleLoading } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth, isLoading: isFacebookLoading } = useOAuth({ strategy: "oauth_facebook" });
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Animation values
  const scaleValue = new Animated.Value(1);
  const opacityValue = new Animated.Value(0);
  const translateYValue = new Animated.Value(30);

  React.useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleOAuthSignIn = async (
    authMethod: () => Promise<{
      createdSessionId: string | null;
      setActive: ({ session }: { session: string }) => Promise<void>;
    }>,
    provider: string
  ) => {
    setActiveButton(provider);
    try {
      const { createdSessionId, setActive } = await authMethod();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error(`Error signing in with ${provider}:`, err);
      Alert.alert("Authentication Error", `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setActiveButton(null);
    }
  };

  const isLoading = isGoogleLoading || isAppleLoading || isFacebookLoading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.3)', 'rgba(14, 65, 41, 0.9)']}
          locations={[0, 0.7]}
          style={styles.gradient}
        >
          {/* Animated decorative elements */}
          <Animated.View style={[styles.decorativeCircle1, {
            opacity: opacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.15]
            })
          }]} />
          <Animated.View style={[styles.decorativeCircle2, {
            opacity: opacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.1]
            })
          }]} />

          <View style={styles.container}>
            <Animated.View style={[styles.headerContainer, {
              opacity: opacityValue,
              transform: [{ translateY: translateYValue }]
            }]}>
              <View style={styles.logoOuterContainer}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.75)']}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={40} color="#4CAF50" />
                  </View>
                </LinearGradient>
              </View>
              <Text style={styles.appName}>NutriLife</Text>
              <Text style={styles.tagline}>Nourish your body, enrich your life</Text>
            </Animated.View>

            {Platform.OS === 'ios' ? (
              <Animated.View style={[styles.formContainer, {
                opacity: opacityValue,
                transform: [{ translateY: translateYValue }]
              }]}>
                <BlurView intensity={25} tint="systemThinMaterialLight" style={styles.blurView}>
                  <View style={styles.formInnerContainer}>
                    <Text style={styles.title}>Get Started</Text>
                    <Text style={styles.subtitle}>Join our community of health-conscious individuals</Text>

                    <View style={styles.oauthContainer}>
                      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                        <TouchableOpacity
                          style={[
                            styles.oauthButton,
                            activeButton === "Google" && styles.activeButton
                          ]}
                          onPress={() => handleOAuthSignIn(googleAuth, "Google")}
                          onPressIn={handlePressIn}
                          onPressOut={handlePressOut}
                          disabled={isLoading}
                          activeOpacity={0.7}
                        >
                          {isGoogleLoading || activeButton === "Google" ? (
                            <ActivityIndicator color="#4CAF50" size="small" />
                          ) : (
                            <>
                              <View style={[styles.iconContainer, styles.googleIcon]}>
                                <Ionicons name="logo-google" size={18} color="#FFFFFF" />
                              </View>
                              <Text style={styles.oauthButtonText}>Continue with Google</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      </Animated.View>

                      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                        <TouchableOpacity
                          style={[
                            styles.oauthButton,
                            activeButton === "Apple" && styles.activeButton
                          ]}
                          onPress={() => handleOAuthSignIn(appleAuth, "Apple")}
                          onPressIn={handlePressIn}
                          onPressOut={handlePressOut}
                          disabled={isLoading}
                          activeOpacity={0.7}
                        >
                          {isAppleLoading || activeButton === "Apple" ? (
                            <ActivityIndicator color="#4CAF50" size="small" />
                          ) : (
                            <>
                              <View style={[styles.iconContainer, styles.appleIcon]}>
                                <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                              </View>
                              <Text style={styles.oauthButtonText}>Continue with Apple</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      </Animated.View>

                      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                        <TouchableOpacity
                          style={[
                            styles.oauthButton,
                            activeButton === "Facebook" && styles.activeButton
                          ]}
                          onPress={() => handleOAuthSignIn(facebookAuth, "Facebook")}
                          onPressIn={handlePressIn}
                          onPressOut={handlePressOut}
                          disabled={isLoading}
                          activeOpacity={0.7}
                        >
                          {isFacebookLoading || activeButton === "Facebook" ? (
                            <ActivityIndicator color="#4CAF50" size="small" />
                          ) : (
                            <>
                              <View style={[styles.iconContainer, styles.facebookIcon]}>
                                <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
                              </View>
                              <Text style={styles.oauthButtonText}>Continue with Facebook</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      </Animated.View>
                    </View>

                    <View style={styles.dividerContainer}>
                      <View style={styles.divider} />
                      <Text style={styles.dividerText}>or</Text>
                      <View style={styles.divider} />
                    </View>



                    <View style={styles.termsContainer}>
                      <Text style={styles.termsText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms</Text>,{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>, and{' '}
                        <Text style={styles.termsLink}>Cookie Use</Text>.
                      </Text>
                    </View>
                  </View>
                </BlurView>
              </Animated.View>
            ) : (
              <Animated.View style={[styles.formContainer, styles.androidFormContainer, {
                opacity: opacityValue,
                transform: [{ translateY: translateYValue }]
              }]}>
                <View style={styles.formInnerContainer}>
                  <Text style={styles.title}>Get Started</Text>
                  <Text style={styles.subtitle}>Join our community of health-conscious individuals</Text>

                  <View style={styles.oauthContainer}>
                    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                      <TouchableOpacity
                        style={[
                          styles.oauthButton,
                          activeButton === "Google" && styles.activeButton
                        ]}
                        onPress={() => handleOAuthSignIn(googleAuth, "Google")}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        disabled={isLoading}
                        activeOpacity={0.7}
                      >
                        {isGoogleLoading || activeButton === "Google" ? (
                          <ActivityIndicator color="#4CAF50" size="small" />
                        ) : (
                          <>
                            <View style={[styles.iconContainer, styles.googleIcon]}>
                              <Ionicons name="logo-google" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={styles.oauthButtonText}>Continue with Google</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                      <TouchableOpacity
                        style={[
                          styles.oauthButton,
                          activeButton === "Apple" && styles.activeButton
                        ]}
                        onPress={() => handleOAuthSignIn(appleAuth, "Apple")}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        disabled={isLoading}
                        activeOpacity={0.7}
                      >
                        {isAppleLoading || activeButton === "Apple" ? (
                          <ActivityIndicator color="#4CAF50" size="small" />
                        ) : (
                          <>
                            <View style={[styles.iconContainer, styles.appleIcon]}>
                              <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={styles.oauthButtonText}>Continue with Apple</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                      <TouchableOpacity
                        style={[
                          styles.oauthButton,
                          activeButton === "Facebook" && styles.activeButton
                        ]}
                        onPress={() => handleOAuthSignIn(facebookAuth, "Facebook")}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        disabled={isLoading}
                        activeOpacity={0.7}
                      >
                        {isFacebookLoading || activeButton === "Facebook" ? (
                          <ActivityIndicator color="#4CAF50" size="small" />
                        ) : (
                          <>
                            <View style={[styles.iconContainer, styles.facebookIcon]}>
                              <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
                            </View>
                            <Text style={styles.oauthButtonText}>Continue with Facebook</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                  <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>
                      By continuing, you agree to our{' '}
                      <Text style={styles.termsLink}>Terms</Text>,{' '}
                      <Text style={styles.termsLink}>Privacy Policy</Text>, and{' '}
                      <Text style={styles.termsLink}>Cookie Use</Text>.
                    </Text>
                  </View>
                </View>
              </Animated.View>
            )}

            {/* Decorative nutrition icon elements */}
            <Animated.View style={[styles.decorIcon1, {
              opacity: opacityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3]
              })
            }]}>
              <Ionicons name="nutrition" size={24} color="#FFFFFF" />
            </Animated.View>
            <Animated.View style={[styles.decorIcon2, {
              opacity: opacityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.25]
              })
            }]}>
              <Ionicons name="leaf" size={20} color="#FFFFFF" />
            </Animated.View>
            <Animated.View style={[styles.decorIcon3, {
              opacity: opacityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.2]
              })
            }]}>
              <Ionicons name="water" size={18} color="#FFFFFF" />
            </Animated.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D5C36',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: 20,
  },
  logoOuterContainer: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  logoGradient: {
    borderRadius: 44,
    padding: 3,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 18,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '500',
  },
  formContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
  },
  blurView: {
    width: '100%',
    height: '100%',
  },
  androidFormContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  formInnerContainer: {
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    color: '#263238',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    color: '#546E7A',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '500',
  },
  oauthContainer: {
    width: '100%',
    gap: 16,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  activeButton: {
    borderColor: '#4CAF50',
    borderWidth: 1.5,
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  googleIcon: {
    backgroundColor: '#DB4437',
  },
  appleIcon: {
    backgroundColor: '#000000',
  },
  facebookIcon: {
    backgroundColor: '#4267B2',
  },
  oauthButtonText: {
    color: '#263238',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
    marginHorizontal: 16,
    color: '#78909C',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  emailButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  emailButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    gap: 12,
  },
  emailButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  accountText: {
    color: '#546E7A',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  signInText: {
    color: '#4CAF50',
    fontWeight: '700',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  termsContainer: {
    marginTop: 24,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#78909C',
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  termsLink: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    top: -width * 0.3,
    right: -width * 0.2,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    bottom: -width * 0.15,
    left: -width * 0.15,
  },
  decorIcon1: {
    position: 'absolute',
    top: height * 0.15,
    right: 30,
  },
  decorIcon2: {
    position: 'absolute',
    bottom: height * 0.3,
    left: 25,
  },
  decorIcon3: {
    position: 'absolute',
    bottom: height * 0.12,
    right: 45,
  }
});

export default SignUpScreen;
