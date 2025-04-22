import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { chatbotStyles } from '../../styles/ChatbotStyles';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am Nutri AI. How can I help you with your nutrition goals today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I recommend increasing your protein intake by adding more lean meats, eggs, or plant-based alternatives to your diet.",
        "Based on your profile, you should aim for about 2,000 calories per day to maintain your current weight.",
        "Try to include more vegetables in your meals. They're high in nutrients and fiber, which helps with digestion.",
        "Make sure you're staying hydrated! Aim for at least 8 glasses of water per day.",
        "Consider meal prepping to make healthier choices throughout the week. It saves time too!"
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        chatbotStyles.messageBubble,
        item.sender === 'user' ? chatbotStyles.userMessage : chatbotStyles.botMessage
      ]}
    >
      <Text style={chatbotStyles.messageText}>{item.text}</Text>
      <Text style={chatbotStyles.timestamp}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={chatbotStyles.container}>
      <StatusBar style="auto" />
      <View style={chatbotStyles.header}>
        <Text style={chatbotStyles.headerTitle}>Nutri AI Assistant</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={chatbotStyles.messagesList}
        inverted={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={chatbotStyles.inputContainer}
      >
        <TextInput
          style={chatbotStyles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about nutrition, recipes, etc."
          multiline
        />
        <TouchableOpacity
          style={chatbotStyles.sendButton}
          onPress={handleSend}
          disabled={inputText.trim() === ''}
        >
          <Ionicons
            name="send"
            size={24}
            color={inputText.trim() === '' ? '#CCCCCC' : '#399AA8'}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ChatbotScreen;
