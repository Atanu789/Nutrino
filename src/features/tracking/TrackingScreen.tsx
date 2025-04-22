import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trakingStyle } from '../../styles/TrackingStyles';
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
      <View style={trakingStyle.mealCard}>
        <View style={trakingStyle.mealHeader}>
          <View>
            <Text style={trakingStyle.mealType}>{item.type}</Text>
            <Text style={trakingStyle.mealTime}>{item.time}</Text>
          </View>
          <Text style={trakingStyle.mealCalories}>{totalCalories} cal</Text>
        </View>

        <View style={trakingStyle.mealItems}>
          {item.items.length > 0 ? (
            item.items.map((food, index) => (
              <View key={index} style={trakingStyle.foodItem}>
                <Text style={trakingStyle.foodName}>{food.name}</Text>
                <Text style={trakingStyle.foodCalories}>{food.calories} cal</Text>
              </View>
            ))
          ) : (
            <View style={trakingStyle.emptyMeal}>
              <Text style={trakingStyle.emptyText}>No food added yet</Text>
              <TouchableOpacity style={trakingStyle.addButton}>
                <Ionicons name="add" size={18} color="#399AA8" />
                <Text style={trakingStyle.addButtonText}>Add Food</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {item.items.length > 0 && (
          <TouchableOpacity style={trakingStyle.addMoreButton}>
            <Ionicons name="add" size={16} color="#399AA8" />
            <Text style={trakingStyle.addMoreText}>Add More</Text>
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
    <SafeAreaView style={trakingStyle.container}>
      <StatusBar style="auto" />

      <View style={trakingStyle.header}>
        <Text style={trakingStyle.headerTitle}>Track Your Day</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={trakingStyle.dateNavigation}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#666666" />
          </TouchableOpacity>
          <Text style={trakingStyle.dateText}>{formattedDate}</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={24} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={trakingStyle.summaryCard}>
          <Text style={trakingStyle.summaryTitle}>Daily Summary</Text>
          <View style={trakingStyle.macrosSummary}>
            <View style={trakingStyle.macroItem}>
              <Text style={trakingStyle.macroValue}>{PROGRESS_DATA.calories.consumed}</Text>
              <Text style={trakingStyle.macroLabel}>Calories</Text>
              <Text style={trakingStyle.macroGoal}>of {PROGRESS_DATA.calories.goal}</Text>
            </View>

            <View style={trakingStyle.macroDivider} />

            <View style={trakingStyle.macroItem}>
              <Text style={trakingStyle.macroValue}>{PROGRESS_DATA.protein.consumed}g</Text>
              <Text style={trakingStyle.macroLabel}>Protein</Text>
              <Text style={trakingStyle.macroGoal}>of {PROGRESS_DATA.protein.goal}g</Text>
            </View>

            <View style={trakingStyle.macroDivider} />

            <View style={trakingStyle.macroItem}>
              <Text style={trakingStyle.macroValue}>{PROGRESS_DATA.carbs.consumed}g</Text>
              <Text style={trakingStyle.macroLabel}>Carbs</Text>
              <Text style={trakingStyle.macroGoal}>of {PROGRESS_DATA.carbs.goal}g</Text>
            </View>

            <View style={trakingStyle.macroDivider} />

            <View style={trakingStyle.macroItem}>
              <Text style={trakingStyle.macroValue}>{PROGRESS_DATA.fat.consumed}g</Text>
              <Text style={trakingStyle.macroLabel}>Fat</Text>
              <Text style={trakingStyle.macroGoal}>of {PROGRESS_DATA.fat.goal}g</Text>
            </View>
          </View>
        </View>

        <View style={trakingStyle.waterCard}>
          <Text style={trakingStyle.waterTitle}>Water Intake</Text>
          <View style={trakingStyle.waterTracker}>
            <TouchableOpacity onPress={decreaseWater}>
              <Ionicons name="remove-circle" size={24} color="#399AA8" />
            </TouchableOpacity>

            <View style={trakingStyle.waterGlasses}>
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
          <Text style={trakingStyle.waterStatus}>
            {waterIntake} of {WATER_INTAKE.goal} glasses
          </Text>
        </View>

        <View style={trakingStyle.mealsSection}>
          <Text style={trakingStyle.sectionTitle}>Meals</Text>
          <FlatList
            data={MEALS_DATA}
            renderItem={renderMealItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity style={trakingStyle.addMealButton}>
          <Ionicons name="add-circle" size={20} color="white" />
          <Text style={trakingStyle.addMealButtonText}>Add Meal</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}



export default TrackingScreen;
