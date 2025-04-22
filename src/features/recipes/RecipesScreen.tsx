import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  StyleSheet,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RecipeStackParamList } from '../../navigation/types';

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
      style={styles.recipeCard}
      onPress={() => handleRecipePress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        
        <View style={styles.recipeMetaContainer}>
          <View style={styles.recipeMeta}>
            <Ionicons name="time-outline" size={14} color="#666666" />
            <Text style={styles.recipeMetaText}>{item.prepTime}</Text>
          </View>
          
          <View style={styles.recipeMeta}>
            <Ionicons name="flame-outline" size={14} color="#666666" />
            <Text style={styles.recipeMetaText}>{item.calories} cal</Text>
          </View>
        </View>
        
        <View style={styles.tagContainer}>
          {item.dietaryType.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
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
      
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Meal Type</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity 
            style={[
              styles.filterChip,
              selectedMealType === null && styles.filterChipSelected
            ]}
            onPress={() => setSelectedMealType(null)}
          >
            <Text 
              style={[
                styles.filterChipText,
                selectedMealType === null && styles.filterChipTextSelected
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          {MEAL_TYPES.map((type) => (
            <TouchableOpacity 
              key={type}
              style={[
                styles.filterChip,
                selectedMealType === type && styles.filterChipSelected
              ]}
              onPress={() => setSelectedMealType(type === selectedMealType ? null : type)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  selectedMealType === type && styles.filterChipTextSelected
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.filterTitle}>Dietary Needs</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity 
            style={[
              styles.filterChip,
              selectedDietaryType === null && styles.filterChipSelected
            ]}
            onPress={() => setSelectedDietaryType(null)}
          >
            <Text 
              style={[
                styles.filterChipText,
                selectedDietaryType === null && styles.filterChipTextSelected
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          {DIETARY_TYPES.map((type) => (
            <TouchableOpacity 
              key={type}
              style={[
                styles.filterChip,
                selectedDietaryType === type && styles.filterChipSelected
              ]}
              onPress={() => setSelectedDietaryType(type === selectedDietaryType ? null : type)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  selectedDietaryType === type && styles.filterChipTextSelected
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
        contentContainerStyle={styles.recipeList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color="#CCCCCC" />
            <Text style={styles.emptyText}>No recipes found for your search.</Text>
            <Text style={styles.emptySubtext}>Try changing your filters or search term.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333333',
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  filterScrollContent: {
    paddingBottom: 15,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F3F4',
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#399AA8',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666666',
  },
  filterChipTextSelected: {
    color: 'white',
  },
  recipeList: {
    padding: 15,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  recipeContent: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  recipeMetaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F1F3F4',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 15,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default RecipesScreen; 