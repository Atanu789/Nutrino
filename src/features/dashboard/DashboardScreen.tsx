import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '../../context/AppContext';

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Hello, {state.user?.firstName || 'there'}!
          </Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>
        
        {/* Calories Overview */}
        <View style={styles.caloriesCard}>
          <Text style={styles.sectionTitle}>Daily Calories</Text>
          <View style={styles.caloriesContent}>
            <View style={styles.caloriesChart}>
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
              <View style={styles.caloriesChartLabel}>
                <Text style={styles.caloriesConsumed}>{dailyCalories.consumed}</Text>
                <Text style={styles.caloriesUnit}>kcal</Text>
              </View>
            </View>
            
            <View style={styles.caloriesSummary}>
              <View style={styles.caloriesItem}>
                <Text style={styles.caloriesItemLabel}>Goal</Text>
                <Text style={styles.caloriesItemValue}>{dailyCalories.goal} kcal</Text>
              </View>
              <View style={styles.caloriesItem}>
                <Text style={styles.caloriesItemLabel}>Remaining</Text>
                <Text style={styles.caloriesItemValue}>{dailyCalories.goal - dailyCalories.consumed} kcal</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Macronutrients Breakdown */}
        <View style={styles.macrosCard}>
          <Text style={styles.sectionTitle}>Macros Breakdown</Text>
          
          <View style={styles.macroContent}>
            {nutrientData.map((nutrient, index) => (
              <View key={index} style={styles.macroItem}>
                <View style={styles.macroIconContainer}>
                  <View style={[styles.macroIcon, { backgroundColor: nutrient.color }]} />
                </View>
                <View style={styles.macroDetail}>
                  <Text style={styles.macroTitle}>{nutrient.x}</Text>
                  <View style={styles.macroProgressContainer}>
                    <View 
                      style={[
                        styles.macroProgress, 
                        { width: `${nutrient.y}%`, backgroundColor: nutrient.color }
                      ]} 
                    />
                  </View>
                  <Text style={styles.macroPercentage}>{nutrient.y}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickActionItem}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Alerts */}
        <View style={styles.alertsCard}>
          <Text style={styles.sectionTitle}>Alerts & Reminders</Text>
          <View style={styles.alertsList}>
            {alertNotifications.map((alert) => (
              <View key={alert.id} style={styles.alertItem}>
                <View style={[styles.alertIconContainer, { backgroundColor: alert.color + '20' }]}>
                  <Ionicons name="alert-circle" size={22} color={alert.color} />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertDescription}>{alert.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
  date: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  caloriesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  caloriesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caloriesChart: {
    position: 'relative',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caloriesChartLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caloriesConsumed: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  caloriesUnit: {
    fontSize: 14,
    color: '#666666',
  },
  caloriesSummary: {
    flex: 1,
    marginLeft: 20,
  },
  caloriesItem: {
    marginBottom: 15,
  },
  caloriesItemLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  caloriesItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  macrosCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  macroContent: {
    marginTop: 5,
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  macroIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  macroIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  macroDetail: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroTitle: {
    width: 70,
    fontSize: 16,
    color: '#333333',
  },
  macroProgressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
  },
  macroProgress: {
    height: 8,
    borderRadius: 4,
  },
  macroPercentage: {
    width: 40,
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
  quickActionsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#399AA8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  alertsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  alertsList: {
    marginTop: 5,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 12,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default DashboardScreen;