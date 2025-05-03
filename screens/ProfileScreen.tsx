import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from '../components/NativeWindWrapper';

type ProfileScreenProps = {
  navigation: any;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
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

        <View className="bg-gray-100 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Statistics</Text>
          <View className="flex-row justify-between">
            <View className="items-center bg-white p-3 rounded-lg flex-1 mr-2">
              <Text className="text-2xl font-bold text-blue-500">28</Text>
              <Text className="text-gray-600 text-sm">Days Streak</Text>
            </View>
            <View className="items-center bg-white p-3 rounded-lg flex-1 ml-2">
              <Text className="text-2xl font-bold text-indigo-500">145</Text>
              <Text className="text-gray-600 text-sm">Affirmations</Text>
            </View>
          </View>
        </View>

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