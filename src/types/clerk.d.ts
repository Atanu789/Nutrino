declare module '@clerk/clerk-expo' {
  export interface ClerkProviderProps {
    publishableKey: string;
    tokenCache?: {
      getToken: (key: string) => Promise<string | null>;
      saveToken: (key: string, value: string) => Promise<void>;
    };
    children: React.ReactNode;
  }

  export const ClerkProvider: React.FC<ClerkProviderProps>;
  
  export function useSignIn(): {
    signIn: any;
    setActive: (params: { session: string }) => Promise<void>;
    isLoaded: boolean;
  };
  
  export function useSignUp(): {
    signUp: any;
    isLoaded: boolean;
    prepareEmailAddressVerification: (params: { strategy: string }) => Promise<void>;
  };
} 