import React from 'react';
import { cssInterop } from 'nativewind';
import { 
  Text as RNText, 
  View as RNView, 
  ScrollView as RNScrollView,
  TouchableOpacity as RNTouchableOpacity,
  SafeAreaView as RNSafeAreaView
} from 'react-native';

// Styled components with NativeWind
export const Text = cssInterop(RNText, { className: 'style' });
export const View = cssInterop(RNView, { className: 'style' });
export const ScrollView = cssInterop(RNScrollView, { className: 'style' });
export const TouchableOpacity = cssInterop(RNTouchableOpacity, { className: 'style' });
export const SafeAreaView = cssInterop(RNSafeAreaView, { className: 'style' }); 