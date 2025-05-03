import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { useProgress } from '../components/ProgressContext';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

// Gesture handler context type
type GestureContext = {
  startX: number;
  startY: number;
};

// Sample affirmations - in a real app these would come from an API or database
const AFFIRMATIONS = [
  {
    id: '1',
    text: "Every day is a new beginning. Take a deep breath and start again.",
    author: "Today's Affirmation"
  },
  {
    id: '2',
    text: "You are capable of amazing things. Believe in yourself.",
    author: "Daily Wisdom"
  },
  {
    id: '3',
    text: "Small steps every day lead to big changes over time.",
    author: "Progress Mantra"
  }
];

type HomeScreenProps = {
  navigation: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { xp, level, streak, checkIn, gainXP } = useProgress();
  const confettiRef = useRef(null);
  const [affirmationCompleted, setAffirmationCompleted] = useState(false);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  
  // Animated values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const cardScale = useSharedValue(1);
  
  // Check in when component mounts
  useEffect(() => {
    if (streak === 0) {
      checkIn();
    }
  }, []);
  
  const handleAffirmationComplete = () => {
    if (!affirmationCompleted) {
      // Gain XP when user swipes right on the affirmation
      const leveledUp = gainXP(10);
      
      // Trigger haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Show completion overlay
      setShowCompletionOverlay(true);
      setTimeout(() => {
        setShowCompletionOverlay(false);
      }, 1500);
      
      // Mark as completed
      setAffirmationCompleted(true);
      
      if (leveledUp) {
        // Show confetti celebration on level up
        if (confettiRef.current) {
          // @ts-ignore - Confetti cannon has a start method but TypeScript doesn't recognize it
          confettiRef.current.start();
          
          // Stronger haptic for level up
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
      
      // Reset completion status after some time (for demo purposes)
      // In a real app, this would be tied to a new day
      setTimeout(() => {
        setAffirmationCompleted(false);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        cardOpacity.value = withTiming(1);
        cardScale.value = withTiming(1);
      }, 5000); // 5 seconds for demo, would be 24 hours in real app
    }
  };
  
  // Gesture handler for swipe
  const gestureHandler = useAnimatedGestureHandler<any, GestureContext>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      if (!affirmationCompleted) {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY * 0.3; // Reduce vertical movement
      }
    },
    onEnd: (event) => {
      if (!affirmationCompleted) {
        // Handle right swipe
        if (translateX.value > SWIPE_THRESHOLD) {
          translateX.value = withSpring(width * 1.5);
          translateY.value = withSpring(50);
          cardOpacity.value = withTiming(0, { duration: 300 });
          cardScale.value = withTiming(0.8, { duration: 300 });
          
          // Call the JS function to update state
          runOnJS(handleAffirmationComplete)();
        } 
        // Handle left swipe (return to center)
        else if (translateX.value < -SWIPE_THRESHOLD) {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        } 
        // Return to center if not enough swipe distance
        else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      }
    }
  });
  
  // Animated styles for the card
  const cardAnimatedStyle = useAnimatedStyle(() => {
    // Rotation based on horizontal swipe
    const rotation = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-10, 0, 10],
      Extrapolate.CLAMP
    );
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: cardScale.value }
      ],
      opacity: cardOpacity.value,
    };
  });
  
  // Animated style for the "Like" overlay
  const likeAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    return {
      opacity,
      transform: [
        { scale: interpolate(
            translateX.value,
            [0, width / 4],
            [0.5, 1],
            Extrapolate.CLAMP
          ) 
        }
      ]
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Affirmations</Text>
        <Text style={styles.subtitle}>
          Positive thoughts for a better day
        </Text>
      </View>
      
      {/* User Progress */}
      <LinearGradient
        colors={['#FF9A8B', '#FAD0C4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.progressCard}
      >
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>Level {level}</Text>
          <Text style={styles.progressText}>{xp} XP</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${(xp % 100) / 100 * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.streakText}>
          {streak > 0 ? `${streak} day streak! 🔥` : 'Start your streak today!'}
        </Text>
      </LinearGradient>
      
      {/* Swipeable Card */}
      <View style={styles.cardContainer}>
        <PanGestureHandler 
          onGestureEvent={gestureHandler}
          enabled={!affirmationCompleted}
        >
          <Animated.View style={[styles.card, cardAnimatedStyle]}>
            <Text style={styles.cardText}>{AFFIRMATIONS[0].text}</Text>
            <Text style={styles.cardAuthor}>- {AFFIRMATIONS[0].author}</Text>
            
            {!affirmationCompleted && (
              <View style={styles.swipeHint}>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                <Text style={styles.swipeText}>Swipe right to affirm</Text>
              </View>
            )}
            
            {/* Like Overlay */}
            <Animated.View style={[styles.likeOverlay, likeAnimatedStyle]}>
              <View style={styles.likeContainer}>
                <Ionicons name="checkmark-circle" size={60} color="white" />
                <Text style={styles.likeText}>AFFIRM</Text>
              </View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Featured Categories</Text>
        <View style={styles.categoriesGrid}>
          {['Confidence', 'Success', 'Mindfulness', 'Health'].map((category) => (
            <View key={category} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Completion Overlay */}
      {showCompletionOverlay && (
        <View style={styles.completionOverlay}>
          <View style={styles.completionContent}>
            <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
            <Text style={styles.completionText}>Affirmed!</Text>
            <Text style={styles.completionXp}>+10 XP</Text>
          </View>
        </View>
      )}
      
      <ConfettiCannon ref={confettiRef} count={100} origin={{x: width/2, y: 0}} fallSpeed={2500} autoStart={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  progressCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    color: 'white',
    fontWeight: '600',
  },
  progressBarBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 8,
    borderRadius: 4,
    width: '100%',
  },
  progressBarFill: {
    backgroundColor: 'white',
    height: 8,
    borderRadius: 4,
  },
  streakText: {
    color: 'white',
    marginTop: 8,
    textAlign: 'right',
  },
  cardContainer: {
    height: 330,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width - 40,
    height: 300,
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e40af',
    lineHeight: 32,
  },
  cardAuthor: {
    fontSize: 16,
    color: '#3b82f6',
    marginTop: 16,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  swipeHint: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 8,
    borderRadius: 20,
  },
  swipeText: {
    color: '#6b7280',
    fontSize: 12,
    marginLeft: 4,
  },
  likeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.7)',
    borderRadius: 16,
  },
  likeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  categoriesContainer: {
    padding: 16,
    marginTop: 0,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    margin: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    color: '#4b5563',
  },
  completionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  completionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 16,
  },
  completionXp: {
    fontSize: 18,
    color: '#16a34a',
    marginTop: 8,
  },
}); 