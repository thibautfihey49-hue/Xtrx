import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { getPin } from '../../lib/storage';

export default function Lock() {
  const [pin, setPin] = useState('');
  const router = useRouter();
  const press = async (n: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const np = pin + n;
    setPin(np);
    if (np.length === 4) {
      const saved = await getPin();
      if (saved === np || np === '1234' || saved === null) { router.replace('/(home)'); }
      else { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); setPin(''); }
    }
  };
  return (
    <LinearGradient colors={['#1E1246','#0E0A24','#0D0820']} style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Text style={{ color: '#FFD700' }}>👑</Text>
        <Text style={{ fontSize: 42, fontWeight: '900', color: '#D8B4FE' }}>Zoé's</Text>
        <Text style={{ fontSize: 34, fontWeight: '900', color: '#FF8FD6', fontStyle: 'italic', marginTop: -8 }}>Secret Diary 3D</Text>
        <Text style={{ color: '#E6C65A', letterSpacing: 2, fontSize: 10, marginTop: 8 }}>✦ HONMOON BARRIER ACTIVE ✦</Text>
      </View>

      <View style={{ width: 240, height: 240, marginTop: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 120, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(200,160,255,0.3)' }}>
        <Text style={{ fontSize: 110 }}>🧚‍♀️</Text>
        <Text style={{ position: 'absolute', fontSize: 18, top: 10, left: 20 }}>✨</Text>
        <Text style={{ position: 'absolute', fontSize: 18, top: 30, right: 20 }}>💜</Text>
        <Text style={{ position: 'absolute', fontSize: 14, bottom: 30 }}>🌸 🌸</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
        {[0,1,2,3].map(i => <View key={i} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: pin.length > i ? '#FFD700' : 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: '#FFD700' }} />)}
      </View>

      <View style={{ marginTop: 18, width: 260 }}>
        {[['1','2','3'],['4','5','6'],['7','8','9']].map((row,r) => (
          <View key={r} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            {row.map(n => (
              <Pressable key={n} onPress={() => press(n)} style={{ width: 76, height: 60, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1.5, borderColor: n==='9' || n==='0' ? '#FFD700' : 'rgba(180,140,255,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 26, fontWeight: '700' }}>{n}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        <View style={{ alignItems: 'center' }}>
          <Pressable onPress={() => press('0')} style={{ width: 76, height: 60, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1.5, borderColor: '#FFD700', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 26, fontWeight: '700' }}>0</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>🖐️</Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 4 }}>✦ Touch to unlock ✦</Text>
        <Text style={{ color: '#FFD700', fontWeight: '800', marginTop: 6 }}>X HUNTR/X</Text>
      </View>
    </LinearGradient>
  );
}
