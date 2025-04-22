// Define recipe stack param list
export type RecipeStackParamList = {
  RecipesList: undefined;
  RecipeDetail: { recipeId: string };
};

// Define workout stack param list
export type WorkoutStackParamList = {
  WorkoutsList: undefined;
  WorkoutDetail: { workoutId: string };
};

// Define tab param list
export type TabParamList = {
  Dashboard: undefined;
  Chatbot: undefined;
  Recipes: undefined;
  Tracking: undefined;
  Profile: undefined;
}; 