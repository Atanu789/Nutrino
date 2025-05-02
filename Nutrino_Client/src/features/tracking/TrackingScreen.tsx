import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trackingStyle } from '../../styles/TrackingStyles';

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
  const [pressed, setPressed] = useState({});

  const handlePressIn = (id) => {
    setPressed(prev => ({ ...prev, [id]: true }));
  };

  const handlePressOut = (id) => {
    setPressed(prev => ({ ...prev, [id]: false }));
  };

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

  const renderMealItem = ({ item }) => {
    // Calculate total calories for this meal
    const totalCalories = item.items.reduce((sum, foodItem) => sum + foodItem.calories, 0);
    const buttonId = `meal-${item.id}`;

    return (
      <Pressable
        style={[
          trackingStyle.mealCard,
          pressed[buttonId] && trackingStyle.mealCardPressed
        ]}
        onPressIn={() => handlePressIn(buttonId)}
        onPressOut={() => handlePressOut(buttonId)}
      >
        <View style={trackingStyle.mealCardContent}>
          <View style={trackingStyle.mealHeader}>
            <View>
              <Text style={trackingStyle.mealType}>{item.type}</Text>
              <Text style={trackingStyle.mealTime}>{item.time}</Text>
            </View>
            <Text style={trackingStyle.mealCalories}>{totalCalories} cal</Text>
          </View>

          <View style={trackingStyle.mealItems}>
            {item.items.length > 0 ? (
              item.items.map((food, index) => (
                <View key={index} style={trackingStyle.foodItem}>
                  <Text style={trackingStyle.foodName}>{food.name}</Text>
                  <Text style={trackingStyle.foodCalories}>{food.calories} cal</Text>
                </View>
              ))
            ) : (
              <View style={trackingStyle.emptyMeal}>
                <Text style={trackingStyle.emptyText}>No food added yet</Text>
                <TouchableOpacity 
                  style={trackingStyle.addButton}
                  activeOpacity={0.7}
                >
                  <View style={trackingStyle.addButtonContent}>
                    <Ionicons name="add" size={18} color="#E2F5EA" />
                    <Text style={trackingStyle.addButtonText}>Add Food</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {item.items.length > 0 && (
            <TouchableOpacity 
              style={trackingStyle.addMoreButton}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color="#4CD471" />
              <Text style={trackingStyle.addMoreText}>Add More</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  };

  // Format the date as a readable string
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <SafeAreaView style={trackingStyle.container}>
      <StatusBar style="light" />

      <View style={trackingStyle.header}>
        <Text style={trackingStyle.headerTitle}>Track Your Day</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={trackingStyle.dateNavigation}>
          <TouchableOpacity 
            style={trackingStyle.dateButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#A3E2B8" />
          </TouchableOpacity>
          <Text style={trackingStyle.dateText}>{formattedDate}</Text>
          <TouchableOpacity 
            style={trackingStyle.dateButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={24} color="#A3E2B8" />
          </TouchableOpacity>
        </View>

        <View style={trackingStyle.summaryCard}>
          <View style={trackingStyle.cardContent}>
            <Text style={trackingStyle.summaryTitle}>Daily Summary</Text>
            <View style={trackingStyle.macrosSummary}>
              <View style={trackingStyle.macroItem}>
                <Text style={trackingStyle.macroValue}>{PROGRESS_DATA.calories.consumed}</Text>
                <Text style={trackingStyle.macroLabel}>Calories</Text>
                <Text style={trackingStyle.macroGoal}>of {PROGRESS_DATA.calories.goal}</Text>
              </View>

              <View style={trackingStyle.macroDivider} />

              <View style={trackingStyle.macroItem}>
                <Text style={trackingStyle.macroValue}>{PROGRESS_DATA.protein.consumed}g</Text>
                <Text style={trackingStyle.macroLabel}>Protein</Text>
                <Text style={trackingStyle.macroGoal}>of {PROGRESS_DATA.protein.goal}g</Text>
              </View>

              <View style={trackingStyle.macroDivider} />

              <View style={trackingStyle.macroItem}>
                <Text style={trackingStyle.macroValue}>{PROGRESS_DATA.carbs.consumed}g</Text>
                <Text style={trackingStyle.macroLabel}>Carbs</Text>
                <Text style={trackingStyle.macroGoal}>of {PROGRESS_DATA.carbs.goal}g</Text>
              </View>

              <View style={trackingStyle.macroDivider} />

              <View style={trackingStyle.macroItem}>
                <Text style={trackingStyle.macroValue}>{PROGRESS_DATA.fat.consumed}g</Text>
                <Text style={trackingStyle.macroLabel}>Fat</Text>
                <Text style={trackingStyle.macroGoal}>of {PROGRESS_DATA.fat.goal}g</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={trackingStyle.waterCard}>
          <View style={trackingStyle.cardContent}>
            <Text style={trackingStyle.waterTitle}>Water Intake</Text>
            <View style={trackingStyle.waterTracker}>
              <TouchableOpacity 
                onPress={decreaseWater}
                style={trackingStyle.waterButton}
                activeOpacity={0.7}
              >
                <Ionicons name="remove-circle" size={24} color="#4CD471" />
              </TouchableOpacity>

              <View style={trackingStyle.waterGlasses}>
                {[...Array(WATER_INTAKE.goal)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name={index < waterIntake ? "water" : "water-outline"}
                    size={24}
                    color={index < waterIntake ? "#4CD471" : "#2A5439"}
                  />
                ))}
              </View>

              <TouchableOpacity 
                onPress={increaseWater}
                style={trackingStyle.waterButton}
                activeOpacity={0.7}
              >
                <Ionicons name="add-circle" size={24} color="#4CD471" />
              </TouchableOpacity>
            </View>
            <Text style={trackingStyle.waterStatus}>
              {waterIntake} of {WATER_INTAKE.goal} glasses
            </Text>
          </View>
        </View>

        <View style={trackingStyle.mealsSection}>
          <Text style={trackingStyle.sectionTitle}>Meals</Text>
          <FlatList
            data={MEALS_DATA}
            renderItem={renderMealItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity 
          style={trackingStyle.addMealButton}
          activeOpacity={0.8}
        >
          <View style={trackingStyle.addMealContent}>
            <Ionicons name="add-circle" size={20} color="white" />
            <Text style={trackingStyle.addMealButtonText}>Add Meal</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TrackingScreen;