import * as SecureStore from 'expo-secure-store';

// Token cache for Clerk
export const tokenCache = {
  getToken: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  saveToken: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  clearToken: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

// Clerk publishable key
export const CLERK_PUBLISHABLE_KEY = "pk_test_bGliZXJhbC1tb2xsdXNrLTk0LmNsZXJrLmFjY291bnRzLmRldiQ";

// Check if the session token exists in secure storage
export async function hasActiveSession(): Promise<boolean> {
  try {
    const sessionToken = await SecureStore.getItemAsync('clerk-session-token');
    return sessionToken !== null;
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
} 