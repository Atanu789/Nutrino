import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecipeStackParamList } from '../../navigation/types';
import { recipeScreenStyles } from '../../styles/RecipeScreenStyles';
// Mock data for recipes
const RECIPES = [
  {
    id: '1',
    title: 'Greek Yogurt Bowl',
    image: 'https://via.placeholder.com/150',
    prepTime: '5 mins',
    calories: 320,
    mealType: 'breakfast',
    dietaryType: ['high-protein', 'vegetarian', 'gluten-free'],
  },
  {
    id: '2',
    title: 'Salmon Avocado Salad',
    image: 'https://via.placeholder.com/150',
    prepTime: '15 mins',
    calories: 450,
    mealType: 'lunch',
    dietaryType: ['high-protein', 'low-carb', 'keto'],
  },
  {
    id: '3',
    title: 'Chicken Stir Fry',
    image: 'https://via.placeholder.com/150',
    prepTime: '20 mins',
    calories: 380,
    mealType: 'dinner',
    dietaryType: ['high-protein', 'low-carb'],
  },
  {
    id: '4',
    title: 'Vegetable Quinoa Bowl',
    image: 'https://via.placeholder.com/150',
    prepTime: '25 mins',
    calories: 340,
    mealType: 'lunch',
    dietaryType: ['vegan', 'gluten-free', 'high-fiber'],
  },
  {
    id: '5',
    title: 'Berry Protein Smoothie',
    image: 'https://via.placeholder.com/150',
    prepTime: '5 mins',
    calories: 280,
    mealType: 'breakfast',
    dietaryType: ['high-protein', 'vegetarian', 'low-calorie'],
  },
  {
    id: '6',
    title: 'Lentil Soup',
    image: 'https://via.placeholder.com/150',
    prepTime: '30 mins',
    calories: 320,
    mealType: 'dinner',
    dietaryType: ['vegan', 'high-fiber', 'high-protein'],
  },
];

// Filter categories
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];
const DIETARY_TYPES = ['high-protein', 'low-carb', 'vegetarian', 'vegan', 'gluten-free', 'keto', 'low-calorie', 'high-fiber'];

type RecipesScreenProps = {
  navigation: StackNavigationProp<RecipeStackParamList, 'RecipesList'>;
};

function RecipesScreen({ navigation }: RecipesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [selectedDietaryType, setSelectedDietaryType] = useState<string | null>(null);

  // Filter recipes based on search and filters
  const filteredRecipes = RECIPES.filter(recipe => {
    // Apply search filter
    if (searchQuery && !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply meal type filter
    if (selectedMealType && recipe.mealType !== selectedMealType) {
      return false;
    }

    // Apply dietary type filter
    if (selectedDietaryType && !recipe.dietaryType.includes(selectedDietaryType)) {
      return false;
    }

    return true;
  });

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const renderRecipeItem = ({ item }: { item: typeof RECIPES[0] }) => (
    <TouchableOpacity
      style={recipeScreenStyles.recipeCard}
      onPress={() => handleRecipePress(item.id)}
    >
      <Image source={{ uri: item.image }} style={recipeScreenStyles.recipeImage} />
      <View style={recipeScreenStyles.recipeContent}>
        <Text style={recipeScreenStyles.recipeTitle}>{item.title}</Text>

        <View style={recipeScreenStyles.recipeMetaContainer}>
          <View style={recipeScreenStyles.recipeMeta}>
            <Ionicons name="time-outline" size={14} color="#666666" />
            <Text style={recipeScreenStyles.recipeMetaText}>{item.prepTime}</Text>
          </View>

          <View style={recipeScreenStyles.recipeMeta}>
            <Ionicons name="flame-outline" size={14} color="#666666" />
            <Text style={recipeScreenStyles.recipeMetaText}>{item.calories} cal</Text>
          </View>
        </View>

        <View style={recipeScreenStyles.tagContainer}>
          {item.dietaryType.slice(0, 2).map((tag, index) => (
            <View key={index} style={recipeScreenStyles.tag}>
              <Text style={recipeScreenStyles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={recipeScreenStyles.container}>
      <StatusBar style="auto" />

      <View style={recipeScreenStyles.header}>
        <View style={recipeScreenStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#666666" style={recipeScreenStyles.searchIcon} />
          <TextInput
            style={recipeScreenStyles.searchInput}
            placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={recipeScreenStyles.filtersContainer}>
        <Text style={recipeScreenStyles.filterTitle}>Meal Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={recipeScreenStyles.filterScrollContent}
        >
          <TouchableOpacity
            style={[
              recipeScreenStyles.filterChip,
              selectedMealType === null && recipeScreenStyles.filterChipSelected
            ]}
            onPress={() => setSelectedMealType(null)}
          >
            <Text
              style={[
                recipeScreenStyles.filterChipText,
                selectedMealType === null && recipeScreenStyles.filterChipTextSelected
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {MEAL_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                recipeScreenStyles.filterChip,
                selectedMealType === type && recipeScreenStyles.filterChipSelected
              ]}
              onPress={() => setSelectedMealType(type === selectedMealType ? null : type)}
            >
              <Text
                style={[
                  recipeScreenStyles.filterChipText,
                  selectedMealType === type && recipeScreenStyles.filterChipTextSelected
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={recipeScreenStyles.filterTitle}>Dietary Needs</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={recipeScreenStyles.filterScrollContent}
        >
          <TouchableOpacity
            style={[
              recipeScreenStyles.filterChip,
              selectedDietaryType === null && recipeScreenStyles.filterChipSelected
            ]}
            onPress={() => setSelectedDietaryType(null)}
          >
            <Text
              style={[
                recipeScreenStyles.filterChipText,
                selectedDietaryType === null && recipeScreenStyles.filterChipTextSelected
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {DIETARY_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                recipeScreenStyles.filterChip,
                selectedDietaryType === type && recipeScreenStyles.filterChipSelected
              ]}
              onPress={() => setSelectedDietaryType(type === selectedDietaryType ? null : type)}
            >
              <Text
                style={[
                  recipeScreenStyles.filterChipText,
                  selectedDietaryType === type && recipeScreenStyles.filterChipTextSelected
                ]}
              >
                {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredRecipes}
        renderItem={renderRecipeItem}
        keyExtractor={item => item.id}
        contentContainerStyle={recipeScreenStyles.recipeList}
        ListEmptyComponent={
          <View style={recipeScreenStyles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color="#CCCCCC" />
            <Text style={recipeScreenStyles.emptyText}>No recipes found for your search.</Text>
            <Text style={recipeScreenStyles.emptySubtext}>Try changing your filters or search term.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}



export default RecipesScreen;
