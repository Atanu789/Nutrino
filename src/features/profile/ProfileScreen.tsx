import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileStyles } from '../../styles/ProfileStyles';
// Mock user data
const USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/100',
  stats: {
    daysActive: 28,
    mealsLogged: 84,
    workoutsCompleted: 15
  },
  goals: {
    current: 'Lose weight',
    target: '10 lbs in 3 months',
    progress: 40 // percentage
  },
  preferences: {
    diet: 'Balanced',
    allergies: ['Peanuts', 'Shellfish'],
    favoriteRecipes: 8
  }
};

// Menu items
const MENU_ITEMS = [
  {
    id: '1',
    icon: 'settings-outline',
    title: 'Account Settings',
    description: 'Update personal information and preferences',
    screen: 'Settings'
  },
  {
    id: '2',
    icon: 'fitness-outline',
    title: 'Goals',
    description: 'Set and track your nutrition and fitness goals',
    screen: 'Goals'
  },
  {
    id: '3',
    icon: 'bookmark-outline',
    title: 'Saved Recipes',
    description: 'View and manage your saved recipes',
    screen: 'SavedRecipes'
  },
  {
    id: '4',
    icon: 'calendar-outline',
    title: 'Meal Plans',
    description: 'Create and view your meal plans',
    screen: 'MealPlans'
  },
  {
    id: '5',
    icon: 'notifications-outline',
    title: 'Notifications',
    description: 'Manage reminders and notifications',
    screen: 'Notifications'
  },
  {
    id: '6',
    icon: 'help-circle-outline',
    title: 'Help Center',
    description: 'FAQs and customer support',
    screen: 'Help'
  }
];

function ProfileScreen() {
  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar style="auto" />

      <View style={profileStyles.header}>
        <Text style={profileStyles.headerTitle}>Profile</Text>
      </View>

      <ScrollView>
        <View style={profileStyles.profileHeader}>
          <Image
            source={{ uri: USER.avatar }}
            style={profileStyles.avatar}
          />
          <View style={profileStyles.profileInfo}>
            <Text style={profileStyles.userName}>{USER.name}</Text>
            <Text style={profileStyles.userEmail}>{USER.email}</Text>
          </View>
          <TouchableOpacity style={profileStyles.editButton}>
            <Ionicons name="pencil" size={16} color="#399AA8" />
          </TouchableOpacity>
        </View>

        <View style={profileStyles.statsCard}>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{USER.stats.daysActive}</Text>
            <Text style={profileStyles.statLabel}>Days Active</Text>
          </View>

          <View style={profileStyles.statDivider} />

          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{USER.stats.mealsLogged}</Text>
            <Text style={profileStyles.statLabel}>Meals Logged</Text>
          </View>

          <View style={profileStyles.statDivider} />

          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{USER.stats.workoutsCompleted}</Text>
            <Text style={profileStyles.statLabel}>Workouts</Text>
          </View>
        </View>

        <View style={profileStyles.goalCard}>
          <View style={profileStyles.goalHeader}>
            <Text style={profileStyles.goalTitle}>Current Goal</Text>
            <TouchableOpacity>
              <Text style={profileStyles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <Text style={profileStyles.goalType}>{USER.goals.current}</Text>
          <Text style={profileStyles.goalTarget}>{USER.goals.target}</Text>

          <View style={profileStyles.progressContainer}>
            <View style={profileStyles.progressBar}>
              <View style={[profileStyles.progressFill, { width: `${USER.goals.progress}%` }]} />
            </View>
            <Text style={profileStyles.progressText}>{USER.goals.progress}% complete</Text>
          </View>
        </View>

        <View style={profileStyles.menuSection}>
          <Text style={profileStyles.sectionTitle}>Settings</Text>

          {MENU_ITEMS.map(item => (
            <TouchableOpacity key={item.id} style={profileStyles.menuItem}>
              <View style={profileStyles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={22} color="#399AA8" />
              </View>
              <View style={profileStyles.menuContent}>
                <Text style={profileStyles.menuTitle}>{item.title}</Text>
                <Text style={profileStyles.menuDescription}>{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={profileStyles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#FF5252" />
          <Text style={profileStyles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={profileStyles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}


export default ProfileScreen;
