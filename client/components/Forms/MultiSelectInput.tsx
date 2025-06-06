import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HorizontalScrollRadioButtonInput from "@/components/Forms/HorizontalRadioButton";
import MultiSelectInput from "@/components/Forms/MultiSelectInput";
import RadioButtonInput from "@/components/Forms/RadioButtonInput";
import TextInput from "@/components/Forms/TextInput";
import NumberInput from "@/components/Forms/NumberInput";

const HealthProfileScreen = () => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, setError, setValue, watch } = useForm({
    defaultValues: {
      // Basic Info
      full_name: "",
      date_of_birth: "",
      gender: "",
      contact_number: "",
      emergency_contact: "",
      
      // Physical Attributes
      height: "",
      weight: "",
      blood_type: "",
      body_fat_percentage: "",
      
      // Medical History
      allergies: [],
      medications: [],
      chronic_conditions: [],
      surgeries: [],
      family_history: [],
      
      // Lifestyle
      activity_level: "",
      exercise_frequency: "",
      exercise_type: [],
      sleep_quality: "",
      sleep_hours: "",
      stress_level: "",
      smoking_status: "",
      alcohol_consumption: "",
      
      // Dietary Preferences
      dietary_restrictions: [],
      food_allergies: [],
      preferred_cuisines: [],
      disliked_foods: [],
      eating_habits: "",
      water_intake: "",
      
      // Nutrition Goals
      primary_goal: "",
      weight_goal: "",
      target_calories: "",
      macro_preferences: "",
      meal_preparation_time: "",
      
      // Health Metrics
      blood_pressure: "",
      cholesterol: "",
      blood_sugar: "",
      recent_lab_results: "",
      
      // Special Considerations
      pregnancy_status: false,
      breastfeeding: false,
      digestive_issues: [],
      food_intolerances: [],
      
      // Tracking Preferences
      tracking_method: "",
      wearable_device: "",
      health_apps: [],
    },
  });

  const pregnancyStatus = watch("pregnancy_status");

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Update Clerk user profile with health data
      await user?.update({
        unsafeMetadata: {
          health_profile: data,
          health_onboarding_completed: true,
        },
      });

      await user?.reload();

      // Create or update health profile in your database
      const email = user?.primaryEmailAddress?.emailAddress;
      if (email) {
        const response = await fetch("https://your-api-endpoint.com/api/health/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            ...data
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update health profile");
        }
      }

      return router.push("/(health-tabs)");
    } catch (error) {
      console.error("Error updating health profile:", error);
      setError("root", { message: "An error occurred while saving your profile" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !user) return;

    setValue("full_name", user?.fullName || "");
    
    const metadata = user?.unsafeMetadata?.health_profile;
    if (metadata) {
      Object.keys(metadata).forEach(key => {
        setValue(key, metadata[key]);
      });
    }
  }, [isLoaded, user]);

  // Option arrays for various fields
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
    { label: "Prefer not to say", value: "undisclosed" },
  ];

  const bloodTypeOptions = [
    { label: "A+", value: "a_positive" },
    { label: "A-", value: "a_negative" },
    { label: "B+", value: "b_positive" },
    { label: "B-", value: "b_negative" },
    { label: "AB+", value: "ab_positive" },
    { label: "AB-", value: "ab_negative" },
    { label: "O+", value: "o_positive" },
    { label: "O-", value: "o_negative" },
    { label: "Don't know", value: "unknown" },
  ];

  const allergyOptions = [
    { label: "Peanuts", value: "peanuts" },
    { label: "Tree nuts", value: "tree_nuts" },
    { label: "Shellfish", value: "shellfish" },
    { label: "Fish", value: "fish" },
    { label: "Eggs", value: "eggs" },
    { label: "Milk", value: "milk" },
    { label: "Soy", value: "soy" },
    { label: "Wheat", value: "wheat" },
    { label: "Sesame", value: "sesame" },
    { label: "Latex", value: "latex" },
    { label: "Pollen", value: "pollen" },
    { label: "Dust mites", value: "dust_mites" },
    { label: "Pet dander", value: "pet_dander" },
    { label: "Mold", value: "mold" },
    { label: "Insect stings", value: "insect_stings" },
    { label: "Penicillin", value: "penicillin" },
  ];

  const conditionOptions = [
    { label: "Diabetes", value: "diabetes" },
    { label: "Hypertension", value: "hypertension" },
    { label: "Heart disease", value: "heart_disease" },
    { label: "High cholesterol", value: "high_cholesterol" },
    { label: "Asthma", value: "asthma" },
    { label: "Arthritis", value: "arthritis" },
    { label: "Thyroid disorder", value: "thyroid" },
    { label: "Autoimmune disease", value: "autoimmune" },
    { label: "Depression/Anxiety", value: "mood_disorder" },
    { label: "Osteoporosis", value: "osteoporosis" },
    { label: "Cancer", value: "cancer" },
    { label: "Kidney disease", value: "kidney_disease" },
    { label: "Liver disease", value: "liver_disease" },
    { label: "PCOS", value: "pcos" },
    { label: "Endometriosis", value: "endometriosis" },
  ];

  const activityLevelOptions = [
    { label: "Sedentary", value: "sedentary" },
    { label: "Lightly active", value: "light" },
    { label: "Moderately active", value: "moderate" },
    { label: "Very active", value: "very_active" },
    { label: "Extremely active", value: "extreme" },
  ];

  const exerciseFrequencyOptions = [
    { label: "Never", value: "never" },
    { label: "1-2 times/week", value: "1-2" },
    { label: "3-4 times/week", value: "3-4" },
    { label: "5+ times/week", value: "5+" },
  ];

  const exerciseTypeOptions = [
    { label: "Walking", value: "walking" },
    { label: "Running", value: "running" },
    { label: "Cycling", value: "cycling" },
    { label: "Swimming", value: "swimming" },
    { label: "Weight training", value: "weights" },
    { label: "Yoga", value: "yoga" },
    { label: "Pilates", value: "pilates" },
    { label: "HIIT", value: "hiit" },
    { label: "Team sports", value: "team_sports" },
    { label: "Dancing", value: "dancing" },
  ];

  const sleepQualityOptions = [
    { label: "Excellent", value: "excellent" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" },
    { label: "Very poor", value: "very_poor" },
  ];

  const stressLevelOptions = [
    { label: "Very low", value: "very_low" },
    { label: "Low", value: "low" },
    { label: "Moderate", value: "moderate" },
    { label: "High", value: "high" },
    { label: "Very high", value: "very_high" },
  ];

  const dietaryRestrictionOptions = [
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Vegan", value: "vegan" },
    { label: "Pescatarian", value: "pescatarian" },
    { label: "Gluten-free", value: "gluten_free" },
    { label: "Dairy-free", value: "dairy_free" },
    { label: "Kosher", value: "kosher" },
    { label: "Halal", value: "halal" },
    { label: "Low-carb", value: "low_carb" },
    { label: "Keto", value: "keto" },
    { label: "Paleo", value: "paleo" },
    { label: "Low-FODMAP", value: "low_fodmap" },
  ];

  const primaryGoalOptions = [
    { label: "Weight loss", value: "weight_loss" },
    { label: "Weight gain", value: "weight_gain" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Muscle building", value: "muscle_building" },
    { label: "Improved energy", value: "energy" },
    { label: "Better digestion", value: "digestion" },
    { label: "Disease management", value: "disease_management" },
    { label: "Sports performance", value: "sports_performance" },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
        ]}
      >
        <View style={styles.headingContainer}>
          <Text style={styles.label}>Health & Nutrition Profile</Text>
          <Text style={styles.description}>
            Complete your profile to get personalized meal plans, nutrition advice, 
            and health tracking. Your information helps us create the best experience for you.
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* Basic Information Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <TextInput
              control={control}
              placeholder="Full name"
              label="Full Name"
              required
              name="full_name"
            />

            <TextInput
              control={control}
              placeholder="MM/DD/YYYY"
              label="Date of Birth"
              required
              name="date_of_birth"
            />

            <RadioButtonInput
              control={control}
              label="Gender"
              required
              name="gender"
              options={genderOptions}
            />

            <TextInput
              control={control}
              placeholder="Phone number"
              label="Contact Number"
              name="contact_number"
              keyboardType="phone-pad"
            />

            <TextInput
              control={control}
              placeholder="Name and phone"
              label="Emergency Contact"
              name="emergency_contact"
            />
          </View>

          {/* Physical Attributes Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Physical Attributes</Text>

            <View style={styles.row}>
              <View style={[styles.halfInput, { marginRight: 10 }]}>
                <NumberInput
                  control={control}
                  placeholder="cm"
                  label="Height"
                  required
                  name="height"
                  unit="cm"
                />
              </View>
              <View style={styles.halfInput}>
                <NumberInput
                  control={control}
                  placeholder="kg"
                  label="Weight"
                  required
                  name="weight"
                  unit="kg"
                />
              </View>
            </View>

            <NumberInput
              control={control}
              placeholder="%"
              label="Body Fat Percentage (optional)"
              name="body_fat_percentage"
              unit="%"
            />

            <RadioButtonInput
              control={control}
              label="Blood Type"
              name="blood_type"
              options={bloodTypeOptions}
            />
          </View>

          {/* Medical History Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Medical History</Text>

            <MultiSelectInput
              control={control}
              label="Allergies"
              name="allergies"
              options={allergyOptions}
            />

            <TextInput
              control={control}
              placeholder="List current medications"
              label="Current Medications"
              name="medications"
              multiline
            />

            <MultiSelectInput
              control={control}
              label="Chronic Conditions"
              name="chronic_conditions"
              options={conditionOptions}
            />

            <TextInput
              control={control}
              placeholder="List any major surgeries"
              label="Surgical History"
              name="surgeries"
              multiline
            />

            <TextInput
              control={control}
              placeholder="Family medical history"
              label="Family History"
              name="family_history"
              multiline
            />
          </View>

          {/* Lifestyle Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Lifestyle</Text>

            <RadioButtonInput
              control={control}
              label="Activity Level"
              required
              name="activity_level"
              options={activityLevelOptions}
            />

            <RadioButtonInput
              control={control}
              label="Exercise Frequency"
              name="exercise_frequency"
              options={exerciseFrequencyOptions}
            />

            <MultiSelectInput
              control={control}
              label="Exercise Types"
              name="exercise_type"
              options={exerciseTypeOptions}
            />

            <RadioButtonInput
              control={control}
              label="Sleep Quality"
              name="sleep_quality"
              options={sleepQualityOptions}
            />

            <NumberInput
              control={control}
              placeholder="hours/night"
              label="Average Sleep Hours"
              name="sleep_hours"
              unit="hours"
            />

            <RadioButtonInput
              control={control}
              label="Stress Level"
              name="stress_level"
              options={stressLevelOptions}
            />

            <View style={styles.row}>
              <View style={[styles.halfInput, { marginRight: 10 }]}>
                <RadioButtonInput
                  control={control}
                  label="Smoking Status"
                  name="smoking_status"
                  options={[
                    { label: "Non-smoker", value: "non_smoker" },
                    { label: "Smoker", value: "smoker" },
                    { label: "Former smoker", value: "former_smoker" },
                  ]}
                />
              </View>
              <View style={styles.halfInput}>
                <RadioButtonInput
                  control={control}
                  label="Alcohol Consumption"
                  name="alcohol_consumption"
                  options={[
                    { label: "None", value: "none" },
                    { label: "Occasional", value: "occasional" },
                    { label: "Regular", value: "regular" },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Dietary Preferences Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Dietary Preferences</Text>

            <MultiSelectInput
              control={control}
              label="Dietary Restrictions"
              name="dietary_restrictions"
              options={dietaryRestrictionOptions}
            />

            <MultiSelectInput
              control={control}
              label="Food Allergies"
              name="food_allergies"
              options={allergyOptions}
            />

            <TextInput
              control={control}
              placeholder="List disliked foods"
              label="Disliked Foods"
              name="disliked_foods"
              multiline
            />

            <RadioButtonInput
              control={control}
              label="Eating Habits"
              name="eating_habits"
              options={[
                { label: "Regular meals", value: "regular" },
                { label: "Irregular meals", value: "irregular" },
                { label: "Frequent snacking", value: "snacking" },
                { label: "Intermittent fasting", value: "fasting" },
              ]}
            />

            <NumberInput
              control={control}
              placeholder="glasses/day"
              label="Water Intake"
              name="water_intake"
              unit="glasses"
            />
          </View>

          {/* Nutrition Goals Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Nutrition Goals</Text>

            <RadioButtonInput
              control={control}
              label="Primary Goal"
              required
              name="primary_goal"
              options={primaryGoalOptions}
            />

            <View style={styles.row}>
              <View style={[styles.halfInput, { marginRight: 10 }]}>
                <NumberInput
                  control={control}
                  placeholder="kg"
                  label="Current Weight"
                  name="weight"
                  unit="kg"
                />
              </View>
              <View style={styles.halfInput}>
                <NumberInput
                  control={control}
                  placeholder="kg"
                  label="Target Weight"
                  name="weight_goal"
                  unit="kg"
                />
              </View>
            </View>

            <NumberInput
              control={control}
              placeholder="calories/day"
              label="Target Daily Calories"
              name="target_calories"
              unit="calories"
            />

            <RadioButtonInput
              control={control}
              label="Macronutrient Preferences"
              name="macro_preferences"
              options={[
                { label: "Balanced", value: "balanced" },
                { label: "High protein", value: "high_protein" },
                { label: "Low carb", value: "low_carb" },
                { label: "High carb", value: "high_carb" },
                { label: "Flexible", value: "flexible" },
              ]}
            />

            <RadioButtonInput
              control={control}
              label="Meal Preparation Time"
              name="meal_preparation_time"
              options={[
                { label: "<15 min", value: "under15" },
                { label: "15-30 min", value: "15to30" },
                { label: "30-60 min", value: "30to60" },
                { label: ">60 min", value: "over60" },
              ]}
            />
          </View>

          {/* Special Considerations Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Special Considerations</Text>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Currently Pregnant</Text>
              <Switch
                value={pregnancyStatus}
                onValueChange={(value) => setValue("pregnancy_status", value)}
              />
            </View>

            {pregnancyStatus && (
              <>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>Breastfeeding</Text>
                  <Switch
                    value={watch("breastfeeding")}
                    onValueChange={(value) => setValue("breastfeeding", value)}
                  />
                </View>

                <NumberInput
                  control={control}
                  placeholder="weeks"
                  label="Pregnancy Week"
                  name="pregnancy_week"
                  unit="weeks"
                />
              </>
            )}

            <TextInput
              control={control}
              placeholder="List any digestive issues"
              label="Digestive Issues"
              name="digestive_issues"
              multiline
            />

            <TextInput
              control={control}
              placeholder="List food intolerances"
              label="Food Intolerances"
              name="food_intolerances"
              multiline
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : null}
              <Text style={styles.buttonText}>
                {isLoading ? "Saving..." : "Complete Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HealthProfileScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 15,
    gap: 15,
  },
  headingContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3748",
  },
  description: {
    fontSize: 15,
    color: "#4a5568",
    lineHeight: 22,
  },
  formContainer: {
    width: "100%",
    gap: 15,
  },
  sectionContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    gap: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: "#4a5568",
  },
  button: {
    width: "100%",
    backgroundColor: "#4299e1",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#4299e1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});