import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Sample data for the day's tracking
const MEALS_DATA = [
  {
    id: '1',
    type: 'Breakfast',
    time: '08:30 AM',
    items: [
      { name: 'Greek Yogurt Bowl', calories: 320, protein: 22, carbs: 38, fat: 10 },
      { name: 'Black Coffee', calories: 5, protein: 0, carbs: 1, fat: 0 }
    ]
  },
  {
    id: '2',
    type: 'Lunch',
    time: '12:15 PM',
    items: [
      { name: 'Chicken Salad', calories: 380, protein: 28, carbs: 12, fat: 22 },
      { name: 'Apple', calories: 95, protein: 0, carbs: 25, fat: 0 }
    ]
  },
  {
    id: '3',
    type: 'Snack',
    time: '03:30 PM',
    items: [
      { name: 'Protein Bar', calories: 210, protein: 15, carbs: 22, fat: 9 },
    ]
  },
  {
    id: '4',
    type: 'Dinner',
    time: '07:00 PM',
    items: []
  },
];

// Water tracking data
const WATER_INTAKE = {
  goal: 8,
  current: 5
};

// Progress data
const PROGRESS_DATA = {
  calories: {
    consumed: 1010,
    goal: 2000
  },
  protein: {
    consumed: 65,
    goal: 120
  },
  carbs: {
    consumed: 98,
    goal: 220
  },
  fat: {
    consumed: 41,
    goal: 65
  }
};

function TrackingScreen() {
  const [date, setDate] = useState(new Date());
  const [waterIntake, setWaterIntake] = useState(WATER_INTAKE.current);
  
  const increaseWater = () => {
    if (waterIntake < WATER_INTAKE.goal) {
      setWaterIntake(prev => prev + 1);
    }
  };
  
  const decreaseWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(prev => prev - 1);
    }
  };
  
  const renderMealItem = ({ item }: { item: typeof MEALS_DATA[0] }) => {
    // Calculate total calories for this meal
    const totalCalories = item.items.reduce((sum, foodItem) => sum + foodItem.calories, 0);
    
    return (
      <View style={styles.mealCard}>
        <View style={styles.mealHeader}>
          <View>
            <Text style={styles.mealType}>{item.type}</Text>
            <Text style={styles.mealTime}>{item.time}</Text>
          </View>
          <Text style={styles.mealCalories}>{totalCalories} cal</Text>
        </View>
        
        <View style={styles.mealItems}>
          {item.items.length > 0 ? (
            item.items.map((food, index) => (
              <View key={index} style={styles.foodItem}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodCalories}>{food.calories} cal</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyMeal}>
              <Text style={styles.emptyText}>No food added yet</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={18} color="#399AA8" />
                <Text style={styles.addButtonText}>Add Food</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {item.items.length > 0 && (
          <TouchableOpacity style={styles.addMoreButton}>
            <Ionicons name="add" size={16} color="#399AA8" />
            <Text style={styles.addMoreText}>Add More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  // Format the date as a readable string
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long', 
    month: 'long', 
    day: 'numeric'
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Your Day</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#666666" />
          </TouchableOpacity>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Daily Summary</Text>
          <View style={styles.macrosSummary}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{PROGRESS_DATA.calories.consumed}</Text>
              <Text style={styles.macroLabel}>Calories</Text>
              <Text style={styles.macroGoal}>of {PROGRESS_DATA.calories.goal}</Text>
            </View>
            
            <View style={styles.macroDivider} />
            
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{PROGRESS_DATA.protein.consumed}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroGoal}>of {PROGRESS_DATA.protein.goal}g</Text>
            </View>
            
            <View style={styles.macroDivider} />
            
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{PROGRESS_DATA.carbs.consumed}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroGoal}>of {PROGRESS_DATA.carbs.goal}g</Text>
            </View>
            
            <View style={styles.macroDivider} />
            
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{PROGRESS_DATA.fat.consumed}g</Text>
              <Text style={styles.macroLabel}>Fat</Text>
              <Text style={styles.macroGoal}>of {PROGRESS_DATA.fat.goal}g</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.waterCard}>
          <Text style={styles.waterTitle}>Water Intake</Text>
          <View style={styles.waterTracker}>
            <TouchableOpacity onPress={decreaseWater}>
              <Ionicons name="remove-circle" size={24} color="#399AA8" />
            </TouchableOpacity>
            
            <View style={styles.waterGlasses}>
              {[...Array(WATER_INTAKE.goal)].map((_, index) => (
                <Ionicons 
                  key={index}
                  name={index < waterIntake ? "water" : "water-outline"}
                  size={24}
                  color={index < waterIntake ? "#399AA8" : "#CCCCCC"}
                />
              ))}
            </View>
            
            <TouchableOpacity onPress={increaseWater}>
              <Ionicons name="add-circle" size={24} color="#399AA8" />
            </TouchableOpacity>
          </View>
          <Text style={styles.waterStatus}>
            {waterIntake} of {WATER_INTAKE.goal} glasses
          </Text>
        </View>
        
        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Meals</Text>
          <FlatList
            data={MEALS_DATA}
            renderItem={renderMealItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
        
        <TouchableOpacity style={styles.addMealButton}>
          <Ionicons name="add-circle" size={20} color="white" />
          <Text style={styles.addMealButtonText}>Add Meal</Text>
        </TouchableOpacity>
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
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  macrosSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
    marginVertical: 4,
  },
  macroGoal: {
    fontSize: 11,
    color: '#999999',
  },
  macroDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  waterCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 15,
    marginTop: 0,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  waterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  waterTracker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  waterGlasses: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flex: 1,
    paddingHorizontal: 20,
  },
  waterStatus: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
  },
  mealsSection: {
    margin: 15,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  mealTime: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#399AA8',
  },
  mealItems: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  foodName: {
    fontSize: 14,
    color: '#333333',
  },
  foodCalories: {
    fontSize: 14,
    color: '#666666',
  },
  emptyMeal: {
    padding: 15,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 14,
    color: '#399AA8',
    marginLeft: 4,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addMoreText: {
    fontSize: 14,
    color: '#399AA8',
    marginLeft: 4,
  },
  addMealButton: {
    flexDirection: 'row',
    backgroundColor: '#399AA8',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    marginTop: 0,
    padding: 12,
    borderRadius: 25,
    marginBottom: 30,
  },
  addMealButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default TrackingScreen; 