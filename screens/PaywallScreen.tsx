import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from '../components/NativeWindWrapper';

type PaywallScreenProps = {
  navigation: any;
};

export default function PaywallScreen({ navigation }: PaywallScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 text-center">
            Unlock Premium Affirmations
          </Text>
          <Text className="text-base text-gray-600 mt-2 text-center">
            Get unlimited access to all premium content
          </Text>
        </View>

        <View className="bg-gray-100 rounded-xl p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">Premium Benefits</Text>
          
          {[
            'Access to 500+ exclusive affirmations',
            'Personalized daily recommendations',
            'Download affirmations for offline use',
            'Ad-free experience',
            'Create custom affirmation playlists'
          ].map((benefit, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <View className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
              <Text className="text-gray-700">{benefit}</Text>
            </View>
          ))}
        </View>

        <View className="mb-6">
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
            <Text className="text-lg font-semibold text-blue-800 mb-1">Monthly</Text>
            <Text className="text-2xl font-bold text-gray-800">$4.99 <Text className="text-base font-normal text-gray-600">/month</Text></Text>
            <TouchableOpacity className="bg-blue-500 py-3 rounded-lg mt-3">
              <Text className="text-white font-semibold text-center">Subscribe Monthly</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <View className="absolute -top-2 right-4 bg-indigo-600 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-white">BEST VALUE</Text>
            </View>
            <Text className="text-lg font-semibold text-indigo-800 mb-1">Yearly</Text>
            <Text className="text-2xl font-bold text-gray-800">$39.99 <Text className="text-base font-normal text-gray-600">/year</Text></Text>
            <Text className="text-indigo-700 text-sm mb-2">Save 33% compared to monthly</Text>
            <TouchableOpacity className="bg-indigo-600 py-3 rounded-lg mt-3">
              <Text className="text-white font-semibold text-center">Subscribe Yearly</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity className="mb-8">
          <Text className="text-center text-gray-500 underline">Restore Purchases</Text>
        </TouchableOpacity>
        
        <Text className="text-xs text-gray-400 text-center mb-4">
          Subscriptions will automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
} 