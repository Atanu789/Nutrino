import { useAuth, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileStyles } from '../../styles/ProfileStyles';

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
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut, isLoaded: isAuthLoaded } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Mock data - in a real app, this would come from your backend
  const USER_STATS = {
    daysActive: 28,
    mealsLogged: 84,
    workoutsCompleted: 15
  };

  const USER_GOALS = {
    current: 'Lose weight',
    target: '10 lbs in 3 months',
    progress: 40 // percentage
  };

  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await signOut();
              // The auth state change will automatically redirect to the login screen
              // thanks to the RootNavigator we set up earlier
            } catch (error) {
              console.error("Error signing out:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            } finally {
              setIsLoggingOut(false);
            }
          }
        }
      ]
    );
  };

  if (!isUserLoaded || !isAuthLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#399AA8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar style="auto" />

      <View style={profileStyles.header}>
        <Text style={profileStyles.headerTitle}>Profile</Text>
      </View>

      <ScrollView>
        <View style={profileStyles.profileHeader}>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              style={profileStyles.avatar}
            />
          ) : (
            <View style={[profileStyles.avatar, { backgroundColor: '#399AA8', justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                {user?.firstName?.[0] || ''}{user?.lastName?.[0] || ''}
              </Text>
            </View>
          )}
          <View style={profileStyles.profileInfo}>
            <Text style={profileStyles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={profileStyles.userEmail}>
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
          <TouchableOpacity style={profileStyles.editButton}>
            <Ionicons name="pencil" size={16} color="#399AA8" />
          </TouchableOpacity>
        </View>

        <View style={profileStyles.statsCard}>
          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{USER_STATS.daysActive}</Text>
            <Text style={profileStyles.statLabel}>Days Active</Text>
          </View>

          <View style={profileStyles.statDivider} />

          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{USER_STATS.mealsLogged}</Text>
            <Text style={profileStyles.statLabel}>Meals Logged</Text>
          </View>

          <View style={profileStyles.statDivider} />

          <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{USER_STATS.workoutsCompleted}</Text>
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

          <Text style={profileStyles.goalType}>{USER_GOALS.current}</Text>
          <Text style={profileStyles.goalTarget}>{USER_GOALS.target}</Text>

          <View style={profileStyles.progressContainer}>
            <View style={profileStyles.progressBar}>
              <View style={[profileStyles.progressFill, { width: `${USER_GOALS.progress}%` }]} />
            </View>
            <Text style={profileStyles.progressText}>{USER_GOALS.progress}% complete</Text>
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

        <TouchableOpacity
          style={profileStyles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#FF5252" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color="#FF5252" />
              <Text style={profileStyles.logoutText}>Log Out</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={profileStyles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
