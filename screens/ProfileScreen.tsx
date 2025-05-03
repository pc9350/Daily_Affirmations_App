import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from '../components/NativeWindWrapper';
import { useProgress } from '../components/ProgressContext';

type ProfileScreenProps = {
  navigation: any;
};

// Calculate badges earned based on progress
const calculateBadges = (level: number, streak: number) => {
  const badges = [];
  
  if (streak >= 7) badges.push("Streak 7");
  if (streak >= 30) badges.push("Streak 30");
  if (level >= 5) badges.push("Level 5");
  if (level >= 20) badges.push("Level 20");
  
  return badges;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { xp, level, streak } = useProgress();
  const badges = calculateBadges(level, streak);
  
  // Calculate progress to next level
  const progressToNextLevel = (xp % 100) / 100;
  const xpToNextLevel = 100 - (xp % 100);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-3">
            <Text className="text-3xl text-blue-500">JD</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800">John Doe</Text>
          <Text className="text-gray-600">john.doe@example.com</Text>
          <TouchableOpacity className="mt-2 bg-gray-100 px-4 py-2 rounded-full">
            <Text className="text-gray-700">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* User Level Progress */}
        <View className="bg-gradient-to-r from-[#FF9A8B] to-[#FAD0C4] rounded-xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-bold text-white">Level {level}</Text>
            <Text className="text-white">{xp} XP</Text>
          </View>
          
          <View className="bg-white/30 h-3 rounded-full w-full mb-1">
            <View 
              className="bg-white h-3 rounded-full" 
              style={{ width: `${progressToNextLevel * 100}%` }}
            />
          </View>
          
          <Text className="text-white text-right text-sm">
            {xpToNextLevel} XP to Level {level + 1}
          </Text>
        </View>

        <View className="bg-gray-100 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Statistics</Text>
          <View className="flex-row justify-between">
            <View className="items-center bg-white p-3 rounded-lg flex-1 mr-2">
              <Text className="text-2xl font-bold text-blue-500">{streak}</Text>
              <Text className="text-gray-600 text-sm">Days Streak</Text>
            </View>
            <View className="items-center bg-white p-3 rounded-lg flex-1 ml-2">
              <Text className="text-2xl font-bold text-indigo-500">{Math.floor(xp / 10)}</Text>
              <Text className="text-gray-600 text-sm">Affirmations</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        {badges.length > 0 && (
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Badges Earned</Text>
            <View className="flex-row flex-wrap">
              {badges.map((badge, index) => (
                <View 
                  key={index} 
                  className="bg-yellow-100 px-3 py-2 rounded-lg mr-2 mb-2"
                >
                  <Text className="text-yellow-800">🏆 {badge}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Account Settings</Text>
          {[
            'Notification Preferences',
            'Theme Settings',
            'Privacy & Security',
            'Subscription Details',
            'Language Preferences'
          ].map((setting, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row justify-between items-center py-3 border-b border-gray-200"
            >
              <Text className="text-gray-700">{setting}</Text>
              <View className="h-4 w-4 rounded-full bg-gray-300" />
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Support</Text>
          {[
            'Help Center',
            'Contact Support',
            'Terms of Service',
            'Privacy Policy'
          ].map((item, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row justify-between items-center py-3 border-b border-gray-200"
            >
              <Text className="text-gray-700">{item}</Text>
              <View className="h-4 w-4 rounded-full bg-gray-300" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="bg-red-50 py-3 rounded-lg mb-10">
          <Text className="text-red-600 font-semibold text-center">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 