import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecipeStackParamList } from '../../navigation/types';
import { recipeStyles } from '../../styles/RecipeStyles';
// Mock recipe data
const RECIPE_DETAILS = {
  '1': {
    id: '1',
    title: 'Greek Yogurt Bowl',
    image: 'https://via.placeholder.com/400',
    prepTime: '5 mins',
    cookTime: '0 mins',
    servings: 1,
    calories: 320,
    protein: 22,
    carbs: 38,
    fat: 10,
    mealType: 'breakfast',
    dietaryType: ['high-protein', 'vegetarian', 'gluten-free'],
    ingredients: [
      '1 cup Greek yogurt',
      '1/4 cup granola',
      '1 tbsp honey',
      '1/2 cup mixed berries',
      '1 tbsp chia seeds',
      '1 tbsp sliced almonds',
    ],
    instructions: [
      'Add the Greek yogurt to a bowl.',
      'Top with granola, berries, chia seeds, and almonds.',
      'Drizzle with honey.',
      'Enjoy immediately or refrigerate for up to 1 day.',
    ],
    vitamins: [
      { name: 'Calcium', amount: '25%' },
      { name: 'Vitamin D', amount: '15%' },
      { name: 'Iron', amount: '8%' },
      { name: 'Potassium', amount: '6%' },
    ],
  },
  '2': {
    id: '2',
    title: 'Salmon Avocado Salad',
    image: 'https://via.placeholder.com/400',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 2,
    calories: 450,
    protein: 28,
    carbs: 12,
    fat: 32,
    mealType: 'lunch',
    dietaryType: ['high-protein', 'low-carb', 'keto'],
    ingredients: [
      '8 oz salmon fillet',
      '4 cups mixed greens',
      '1 avocado, sliced',
      '1/4 red onion, thinly sliced',
      '1 tbsp olive oil',
      '1 tbsp lemon juice',
      'Salt and pepper to taste',
    ],
    instructions: [
      'Season salmon with salt and pepper and cook in a pan with olive oil for 3-4 minutes each side.',
      'In a large bowl, mix the greens, avocado, and red onion.',
      'Whisk together olive oil, lemon juice, salt, and pepper for the dressing.',
      'Flake the cooked salmon and add to the salad.',
      'Drizzle with dressing and serve immediately.',
    ],
    vitamins: [
      { name: 'Vitamin D', amount: '110%' },
      { name: 'Vitamin B12', amount: '95%' },
      { name: 'Omega-3', amount: '75%' },
      { name: 'Vitamin E', amount: '25%' },
    ],
  },
};

type RecipeDetailScreenProps = {
  navigation: StackNavigationProp<RecipeStackParamList, 'RecipeDetail'>;
  route: RouteProp<RecipeStackParamList, 'RecipeDetail'>;
};

function RecipeDetailScreen({ navigation, route }: RecipeDetailScreenProps) {
  const { recipeId } = route.params;
  const recipe = RECIPE_DETAILS[recipeId as keyof typeof RECIPE_DETAILS];

  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');

  if (!recipe) {
    return (
      <SafeAreaView style={recipeStyles.container}>
        <StatusBar style="auto" />
        <View style={recipeStyles.errorContainer}>
          <Text style={recipeStyles.errorText}>Recipe not found</Text>
          <TouchableOpacity
            style={recipeStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={recipeStyles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={recipeStyles.container}>
      <StatusBar style="auto" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: recipe.image }} style={recipeStyles.recipeImage} />

        <View style={recipeStyles.headerContainer}>
          <Text style={recipeStyles.recipeTitle}>{recipe.title}</Text>

          <View style={recipeStyles.metaContainer}>
            <View style={recipeStyles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#666666" />
              <Text style={recipeStyles.metaText}>Prep: {recipe.prepTime}</Text>
            </View>

            <View style={recipeStyles.metaItem}>
              <Ionicons name="flame-outline" size={16} color="#666666" />
              <Text style={recipeStyles.metaText}>Cook: {recipe.cookTime}</Text>
            </View>

            <View style={recipeStyles.metaItem}>
              <Ionicons name="people-outline" size={16} color="#666666" />
              <Text style={recipeStyles.metaText}>Serves: {recipe.servings}</Text>
            </View>
          </View>

          <View style={recipeStyles.tagsContainer}>
            {recipe.dietaryType.map((tag, index) => (
              <View key={index} style={recipeStyles.tag}>
                <Text style={recipeStyles.tagText}>
                  {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Text>
              </View>
            ))}
          </View>

          <View style={recipeStyles.macroContainer}>
            <View style={recipeStyles.macroItem}>
              <Text style={recipeStyles.macroValue}>{recipe.calories}</Text>
              <Text style={recipeStyles.macroLabel}>Calories</Text>
            </View>

            <View style={recipeStyles.macroSeparator} />

            <View style={recipeStyles.macroItem}>
              <Text style={recipeStyles.macroValue}>{recipe.protein}g</Text>
              <Text style={recipeStyles.macroLabel}>Protein</Text>
            </View>

            <View style={recipeStyles.macroSeparator} />

            <View style={recipeStyles.macroItem}>
              <Text style={recipeStyles.macroValue}>{recipe.carbs}g</Text>
              <Text style={recipeStyles.macroLabel}>Carbs</Text>
            </View>

            <View style={recipeStyles.macroSeparator} />

            <View style={recipeStyles.macroItem}>
              <Text style={recipeStyles.macroValue}>{recipe.fat}g</Text>
              <Text style={recipeStyles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>

        <View style={recipeStyles.tabsContainer}>
          <TouchableOpacity
            style={[recipeStyles.tab, activeTab === 'ingredients' && recipeStyles.activeTab]}
            onPress={() => setActiveTab('ingredients')}
          >
            <Text style={[recipeStyles.tabText, activeTab === 'ingredients' && recipeStyles.activeTabText]}>
              Ingredients
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[recipeStyles.tab, activeTab === 'instructions' && recipeStyles.activeTab]}
            onPress={() => setActiveTab('instructions')}
          >
            <Text style={[recipeStyles.tabText, activeTab === 'instructions' && recipeStyles.activeTabText]}>
              Instructions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[recipeStyles.tab, activeTab === 'nutrition' && recipeStyles.activeTab]}
            onPress={() => setActiveTab('nutrition')}
          >
            <Text style={[recipeStyles.tabText, activeTab === 'nutrition' && recipeStyles.activeTabText]}>
              Nutrition
            </Text>
          </TouchableOpacity>
        </View>

        <View style={recipeStyles.tabContent}>
          {activeTab === 'ingredients' && (
            <View>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={recipeStyles.ingredientItem}>
                  <View style={recipeStyles.bullet} />
                  <Text style={recipeStyles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'instructions' && (
            <View>
              {recipe.instructions.map((instruction, index) => (
                <View key={index} style={recipeStyles.instructionItem}>
                  <Text style={recipeStyles.instructionNumber}>{index + 1}</Text>
                  <Text style={recipeStyles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'nutrition' && (
            <View style={recipeStyles.nutritionContainer}>
              <Text style={recipeStyles.nutritionTitle}>Vitamins & Minerals</Text>

              {recipe.vitamins.map((vitamin, index) => (
                <View key={index} style={recipeStyles.vitaminItem}>
                  <Text style={recipeStyles.vitaminName}>{vitamin.name}</Text>
                  <View style={recipeStyles.vitaminBarContainer}>
                    <View
                      style={[
                        recipeStyles.vitaminBar,
                        { width: `${parseInt(vitamin.amount)}%` }
                      ]}
                    />
                  </View>
                  <Text style={recipeStyles.vitaminAmount}>{vitamin.amount}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={recipeStyles.actionBar}>
        <TouchableOpacity
          style={recipeStyles.actionButton}
          onPress={() => {}}
        >
          <Ionicons name="bookmark-outline" size={24} color="#666666" />
          <Text style={recipeStyles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[recipeStyles.actionButton, recipeStyles.primaryActionButton]}
          onPress={() => {}}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={[recipeStyles.actionText, recipeStyles.primaryActionText]}>Add to Meal Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}



export default RecipeDetailScreen;
