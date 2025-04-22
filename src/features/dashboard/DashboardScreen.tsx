import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryPie } from 'victory-native';
import { useAppContext } from '../../context/AppContext';
import { dashboardStyles } from '../../styles/DashboardStyles';
function DashboardScreen() {
  const { state } = useAppContext();

  // Sample data for the dashboard
  const dailyCalories = {
    consumed: 1800,
    goal: 2400
  };

  const nutrientData = [
    { x: 'Protein', y: 30, color: '#399AA8' },
    { x: 'Carbs', y: 45, color: '#F49525' },
    { x: 'Fat', y: 25, color: '#9C27B0' }
  ];

  const quickActions = [
    {
      title: 'Chat with Nutri AI',
      icon: 'chatbubble-ellipses',
      screen: 'Chatbot',
      color: '#4CB6C4'
    },
    {
      title: 'Find Recipes',
      icon: 'restaurant',
      screen: 'Recipes',
      color: '#F5A742'
    },
    {
      title: 'Track Meals',
      icon: 'nutrition',
      screen: 'Tracking',
      color: '#9C27B0'
    },
    {
      title: 'Workouts',
      icon: 'fitness',
      screen: 'Workouts',
      color: '#4CAF50'
    }
  ];

  const alertNotifications = [
    {
      id: '1',
      title: 'Low protein intake',
      description: 'You\'re below your protein goal for today',
      color: '#F5A742'
    },
    {
      id: '2',
      title: 'Drink water',
      description: 'You\'re below your hydration goal by 500ml',
      color: '#399AA8'
    }
  ];

  return (
    <SafeAreaView style={dashboardStyles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={dashboardStyles.header}>
          <Text style={dashboardStyles.greeting}>
            Hello, {state.user?.firstName || 'there'}!
          </Text>
          <Text style={dashboardStyles.date}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {/* Calories Overview */}
        <View style={dashboardStyles.caloriesCard}>
          <Text style={dashboardStyles.sectionTitle}>Daily Calories</Text>
          <View style={dashboardStyles.caloriesContent}>
            <View style={dashboardStyles.caloriesChart}>
              <VictoryPie
                data={[
                  { x: 1, y: dailyCalories.consumed },
                  { x: 2, y: dailyCalories.goal - dailyCalories.consumed }
                ]}
                width={140}
                height={140}
                innerRadius={50}
                colorScale={['#399AA8', '#E0E0E0']}
                padding={0}
                labels={() => null}
              />
              <View style={dashboardStyles.caloriesChartLabel}>
                <Text style={dashboardStyles.caloriesConsumed}>{dailyCalories.consumed}</Text>
                <Text style={dashboardStyles.caloriesUnit}>kcal</Text>
              </View>
            </View>

            <View style={dashboardStyles.caloriesSummary}>
              <View style={dashboardStyles.caloriesItem}>
                <Text style={dashboardStyles.caloriesItemLabel}>Goal</Text>
                <Text style={dashboardStyles.caloriesItemValue}>{dailyCalories.goal} kcal</Text>
              </View>
              <View style={dashboardStyles.caloriesItem}>
                <Text style={dashboardStyles.caloriesItemLabel}>Remaining</Text>
                <Text style={dashboardStyles.caloriesItemValue}>{dailyCalories.goal - dailyCalories.consumed} kcal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Macronutrients Breakdown */}
        <View style={dashboardStyles.macrosCard}>
          <Text style={dashboardStyles.sectionTitle}>Macros Breakdown</Text>

          <View style={dashboardStyles.macroContent}>
            {nutrientData.map((nutrient, index) => (
              <View key={index} style={dashboardStyles.macroItem}>
                <View style={dashboardStyles.macroIconContainer}>
                  <View style={[dashboardStyles.macroIcon, { backgroundColor: nutrient.color }]} />
                </View>
                <View style={dashboardStyles.macroDetail}>
                  <Text style={dashboardStyles.macroTitle}>{nutrient.x}</Text>
                  <View style={dashboardStyles.macroProgressContainer}>
                    <View
                      style={[
                        dashboardStyles.macroProgress,
                        { width: `${nutrient.y}%`, backgroundColor: nutrient.color }
                      ]}
                    />
                  </View>
                  <Text style={dashboardStyles.macroPercentage}>{nutrient.y}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={dashboardStyles.quickActionsCard}>
          <Text style={dashboardStyles.sectionTitle}>Quick Actions</Text>
          <View style={dashboardStyles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={dashboardStyles.quickActionItem}
              >
                <View style={[dashboardStyles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="white" />
                </View>
                <Text style={dashboardStyles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Alerts */}
        <View style={dashboardStyles.alertsCard}>
          <Text style={dashboardStyles.sectionTitle}>Alerts & Reminders</Text>
          <View style={dashboardStyles.alertsList}>
            {alertNotifications.map((alert) => (
              <View key={alert.id} style={dashboardStyles.alertItem}>
                <View style={[dashboardStyles.alertIconContainer, { backgroundColor: alert.color + '20' }]}>
                  <Ionicons name="alert-circle" size={22} color={alert.color} />
                </View>
                <View style={dashboardStyles.alertContent}>
                  <Text style={dashboardStyles.alertTitle}>{alert.title}</Text>
                  <Text style={dashboardStyles.alertDescription}>{alert.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



export default DashboardScreen;
