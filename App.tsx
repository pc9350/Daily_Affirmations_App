import React from 'react';
import { View } from 'react-native';
import Navigation from './components/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressProvider } from './components/ProgressContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProgressProvider>
          <Navigation />
        </ProgressProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
