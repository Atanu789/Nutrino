import React, { createContext, useContext, useReducer } from 'react';

// Define app state types
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
  allergies: string[];
  dietaryRestrictions: string[];
  fitnessGoals: string[];
}

interface NutrientIntake {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: {
    [key: string]: number;
  };
  minerals: {
    [key: string]: number;
  };
}

interface AppState {
  user: User | null;
  dailyNutrientIntake: NutrientIntake | null;
  weeklyNutrientIntake: NutrientIntake[];
  isLoading: boolean;
  theme: 'light' | 'dark';
  notifications: boolean;
  emergencyContacts: string[];
}

// Define action types
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_DAILY_NUTRIENT_INTAKE'; payload: NutrientIntake }
  | { type: 'ADD_WEEKLY_NUTRIENT_INTAKE'; payload: NutrientIntake }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'SET_EMERGENCY_CONTACTS'; payload: string[] };

// Initial state
const initialState: AppState = {
  user: null,
  dailyNutrientIntake: null,
  weeklyNutrientIntake: [],
  isLoading: false,
  theme: 'light',
  notifications: true,
  emergencyContacts: [],
};

// Create reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    case 'SET_DAILY_NUTRIENT_INTAKE':
      return { ...state, dailyNutrientIntake: action.payload };
    case 'ADD_WEEKLY_NUTRIENT_INTAKE':
      return { 
        ...state, 
        weeklyNutrientIntake: [...state.weeklyNutrientIntake, action.payload] 
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notifications: !state.notifications };
    case 'SET_EMERGENCY_CONTACTS':
      return { ...state, emergencyContacts: action.payload };
    default:
      return state;
  }
}

// Create context
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Create provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Create hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 