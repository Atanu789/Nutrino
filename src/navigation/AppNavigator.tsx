import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

// Import screens
import DashboardScreen from '../features/dashboard/DashboardScreen';
import ChatbotScreen from '../features/chatbot/ChatbotScreen';
import TrackingScreen from '../features/tracking/TrackingScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import RecipesScreen from '../features/recipes/RecipesScreen';
import RecipeDetailScreen from '../features/recipes/RecipeDetailScreen';

// Import types
import { RecipeStackParamList, TabParamList } from './types';

// Create stack navigators for nested screens
const RecipeStack = createStackNavigator<RecipeStackParamList>();

function RecipesStackNavigator() {
  return (
    <RecipeStack.Navigator screenOptions={{ headerShown: false }}>
      <RecipeStack.Screen name="RecipesList" component={RecipesScreen} />
      <RecipeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </RecipeStack.Navigator>
  );
}

// Tab navigator
const Tab = createBottomTabNavigator<TabParamList>();

function AppNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Recipes') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Chatbot') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Tracking') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#399AA8',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Recipes" component={RecipesStackNavigator} />
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator; 