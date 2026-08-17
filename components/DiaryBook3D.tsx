import { View, Text, Pressable } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

export default function DiaryBook3D() {
  const progress = useSharedValue(0);
  const [open, setOpen] = useState(false);

  const toggle = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    progress.value = withTiming(open? 0 : 1, { duration: 700 });
    setOpen(!open);
  };

  const coverStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateY: `${interpolate(progress.value, [0, 1], [0, -135])}deg` }],
  }));

  return (
    <Pressable onPress={toggle}>
      <View style={{ width: 200, height: 280, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', width: 190, height: 270, backgroundColor: '#fff', borderRadius: 12, left: 8, top: 6 }} />
        <Animated.View style={[{ width: 200, height: 280, backgroundColor: '#FF6EC7', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#FFD700', zIndex: 10 } as any, coverStyle]}>
          <Text style={{ fontSize: 50 }}>📔</Text>
          <Text style={{ color: '#FFD700', fontWeight: 'bold', marginTop: 10 }}>HUNTR/X</Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4 }}>{open? 'fermer' : 'ouvrir ✨'}</Text>
        </Animated.View>
        <View style={{ position: 'absolute', width: 190, height: 260, backgroundColor: '#0D0820', borderRadius: 12, justifyContent: 'center', alignItems: 'center', left: 10 }}>
          <Text style={{ color: '#FFD700', fontSize: 12 }}>✨ Secrets de Zoé ✨</Text>
        </View>
      </View>
    </Pressable>
  );
}
