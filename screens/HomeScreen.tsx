import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, SafeAreaView } from '../components/NativeWindWrapper';

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1 px-4 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800">Daily Affirmations</Text>
          <Text className="text-base text-gray-600 mt-1">
            Positive thoughts for a better day
          </Text>
        </View>
        
        <View className="bg-blue-100 p-5 rounded-xl mb-5">
          <Text className="text-xl text-blue-800 font-semibold">
            "Every day is a new beginning. Take a deep breath and start again."
          </Text>
          <Text className="text-blue-700 mt-2 text-right italic">- Today's Affirmation</Text>
        </View>
        
        <View className="bg-gray-100 p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold text-gray-800">Featured Categories</Text>
          <View className="flex-row flex-wrap mt-3 justify-between">
            {['Confidence', 'Success', 'Mindfulness', 'Health'].map((category) => (
              <View key={category} className="bg-white p-3 rounded-lg mb-3 w-[48%] shadow-sm">
                <Text className="text-center text-gray-700">{category}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 