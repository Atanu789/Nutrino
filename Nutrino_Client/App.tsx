import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';

// Clerk token cache using SecureStore
const tokenCache = {
  getToken: (key) => {
    return SecureStore.getItemAsync(key);
  },
  saveToken: (key, value) => {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function App() {
  // Replace with your Clerk publishable key
  const clerkPublishableKey = 'pk_test_aW5maW5pdGUtY2hpcG11bmstNzMuY2xlcmsuYWNjb3VudHMuZGV2JA';

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <AppProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </AppProvider>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
