import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RecipeStackParamList } from '../../navigation/types';

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
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Recipe not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        
        <View style={styles.headerContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#666666" />
              <Text style={styles.metaText}>Prep: {recipe.prepTime}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={16} color="#666666" />
              <Text style={styles.metaText}>Cook: {recipe.cookTime}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={16} color="#666666" />
              <Text style={styles.metaText}>Serves: {recipe.servings}</Text>
            </View>
          </View>
          
          <View style={styles.tagsContainer}>
            {recipe.dietaryType.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>
                  {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.macroContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{recipe.calories}</Text>
              <Text style={styles.macroLabel}>Calories</Text>
            </View>
            
            <View style={styles.macroSeparator} />
            
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{recipe.protein}g</Text>
              <Text style={styles.macroLabel}>Protein</Text>
            </View>
            
            <View style={styles.macroSeparator} />
            
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{recipe.carbs}g</Text>
              <Text style={styles.macroLabel}>Carbs</Text>
            </View>
            
            <View style={styles.macroSeparator} />
            
            <View style={styles.macroItem}>
              <Text style={styles.macroValue}>{recipe.fat}g</Text>
              <Text style={styles.macroLabel}>Fat</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
            onPress={() => setActiveTab('ingredients')}
          >
            <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
              Ingredients
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'instructions' && styles.activeTab]}
            onPress={() => setActiveTab('instructions')}
          >
            <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>
              Instructions
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
            onPress={() => setActiveTab('nutrition')}
          >
            <Text style={[styles.tabText, activeTab === 'nutrition' && styles.activeTabText]}>
              Nutrition
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContent}>
          {activeTab === 'ingredients' && (
            <View>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'instructions' && (
            <View>
              {recipe.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.instructionNumber}>{index + 1}</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'nutrition' && (
            <View style={styles.nutritionContainer}>
              <Text style={styles.nutritionTitle}>Vitamins & Minerals</Text>
              
              {recipe.vitamins.map((vitamin, index) => (
                <View key={index} style={styles.vitaminItem}>
                  <Text style={styles.vitaminName}>{vitamin.name}</Text>
                  <View style={styles.vitaminBarContainer}>
                    <View 
                      style={[
                        styles.vitaminBar, 
                        { width: `${parseInt(vitamin.amount)}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.vitaminAmount}>{vitamin.amount}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {}}
        >
          <Ionicons name="bookmark-outline" size={24} color="#666666" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryActionButton]}
          onPress={() => {}}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={[styles.actionText, styles.primaryActionText]}>Add to Meal Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  recipeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  headerContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#F1F3F4',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  macroContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F4',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'space-between',
  },
  macroItem: {
    alignItems: 'center',
    flex: 1,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  macroSeparator: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#399AA8',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#399AA8',
    fontWeight: 'bold',
  },
  tabContent: {
    backgroundColor: 'white',
    padding: 15,
    minHeight: 300,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#399AA8',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#399AA8',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    lineHeight: 24,
  },
  nutritionContainer: {
    paddingVertical: 10,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  vitaminItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  vitaminName: {
    width: 100,
    fontSize: 14,
    color: '#333333',
  },
  vitaminBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#F1F3F4',
    borderRadius: 5,
    marginRight: 10,
  },
  vitaminBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#399AA8',
  },
  vitaminAmount: {
    width: 40,
    fontSize: 14,
    color: '#333333',
    textAlign: 'right',
  },
  actionBar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F1F3F4',
    marginRight: 10,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#399AA8',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  primaryActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#399AA8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen; 