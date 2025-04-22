# Nutrition App

A modern React Native Expo app that helps users track their nutrition, discover recipes, and get personalized health advice through an AI chatbot.

## Features

### Authentication
- Login/Signup via email and social OAuth providers (using Clerk.dev)
- Forgot password functionality
- Secure routing and persistent user sessions

### Dashboard
- Daily nutrient intake overview
- Fitness goals tracking
- Quick actions shortcuts
- Alerts and reminders

### Chatbot Assistant
- Text and voice input for nutrition questions
- Visual responses for food information
- Dietary advice and recipe suggestions

### Recipe Hub
- Search and filter recipes by meal type and dietary needs
- Detailed recipe view with ingredients and instructions
- Nutritional breakdown of recipes

### Nutrient & Fitness Tracking
- Log meals and track nutrient intake
- Visualize nutrition data with charts and graphs

### Profile & Settings
- Customize user profile with health goals and dietary preferences
- Emergency contact settings
- Notification preferences

### Yoga & Workouts
- Access workout routines and yoga poses
- Filter by difficulty level
- Step-by-step instructions

## Technology Stack

- **React Native** with Expo (latest SDK)
- **TypeScript** with strict typing
- **Clerk.dev** for authentication
- **React Navigation** for routing
- **Zustand** for state management
- **TailwindCSS** (via nativewind) for styling
- **React Native SVG** and **Victory Native** for data visualization
- **Expo Speech** for text-to-speech functionality

## Project Structure

```
NutritionApp/
├── App.tsx                  # Main app component
├── src/
│   ├── components/          # Shared UI components
│   │   └── common/          # Common/shared UI elements
│   ├── context/             # React Context providers
│   ├── features/            # Feature-based modules
│   │   ├── auth/            # Authentication screens
│   │   ├── chatbot/         # Chatbot interface
│   │   ├── dashboard/       # Dashboard/overview screens
│   │   ├── emergency/       # Emergency alert features
│   │   ├── profile/         # User profile settings
│   │   ├── recipes/         # Recipe search and details
│   │   ├── tracking/        # Nutrition tracking features
│   │   └── workouts/        # Yoga and workout features
│   ├── hooks/               # Custom React hooks
│   ├── navigation/          # Navigation configuration
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── assets/                  # Images, fonts, etc.
└── package.json             # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (>= 14.0.0)
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nutrition-app.git
cd nutrition-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
- Create a `.env` file in the root directory
- Add your Clerk publishable key:
```
CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

4. Start the development server:
```bash
npm start
```

5. Open the app on your device:
- Scan the QR code with the Expo Go app on your phone
- Press 'a' to open in an Android emulator
- Press 'i' to open in an iOS simulator

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern nutrition tracking apps
- Expo team for the excellent React Native tooling
- Clerk.dev for the authentication system 