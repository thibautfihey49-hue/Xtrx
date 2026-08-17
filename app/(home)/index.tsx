import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getEntries, DiaryEntry } from '../../lib/storage';

export default function Home() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const router = useRouter();
  useEffect(() => { getEntries().then(setEntries); }, []);
  return (
    <LinearGradient colors={['#1E1246','#0E0A24']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 110 }}>
        <LinearGradient colors={['rgba(255,255,255,0.15)','rgba(255,255,255,0.05)']} style={{ borderRadius: 20, padding: 14, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
          <View><Text style={{ color: '#FFD700', fontSize: 18, fontWeight: '800' }}>✨ Zoey's Diary 💜</Text><Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>Capture your magic. Keep it forever.</Text></View>
          <View><Text>⭐</Text><Text>👑</Text></View>
        </LinearGradient>

        <View style={{ marginTop: 12, height: 400 }}>
          <View style={{ position: 'absolute', left: 8, top: 0, width: 140, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <Text style={{ color: '#fff', fontSize: 9 }}>Cherry Blossoms & Dreams{'\n'}May 18</Text><Text style={{ marginTop: 4 }}>〰️▶️</Text>
          </View>
          <View style={{ position: 'absolute', right: 8, top: 0, width: 140, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <Text style={{ color: '#fff', fontSize: 9 }}>Neon City Lights{'\n'}May 20</Text><Text style={{ marginTop: 4 }}>〰️▶️</Text>
          </View>

          <LinearGradient colors={['#F5E6C8','#E8D5A8']} style={{ position: 'absolute', left: '10%', right: '10%', top: 90, height: 200, borderRadius: 18, flexDirection: 'row', borderWidth: 2, borderColor: '#FFD700' }}>
            <View style={{ flex: 1, padding: 10, borderRightWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
              <Text style={{ fontSize: 9, fontWeight: '700' }}>Today's Win 💜</Text><Text style={{ fontSize: 8, marginTop: 6 }}>Nailed the new choreography! Felt like I was flying. ☆</Text><View style={{ height: 40, backgroundColor: '#2A1B5D', borderRadius: 8, marginTop: 8, justifyContent: 'center', alignItems: 'center' }}><Text>🎤</Text></View><Text style={{ fontSize: 7, textAlign: 'right', marginTop: 6 }}>— Zoey 💜</Text>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={{ fontSize: 9, fontWeight: '700' }}>Demon Hunter Vibes 🔥</Text><Text style={{ fontSize: 8, marginTop: 6 }}>Hunter training was intense today, but we're getting stronger together! 🔥</Text><Text style={{ textAlign: 'center', marginTop: 10 }}>🍂</Text><Text style={{ fontSize: 7, textAlign: 'right', marginTop: 6 }}>— Zoey 💜</Text>
            </View>
          </LinearGradient>

          <View style={{ position: 'absolute', left: 8, bottom: 40, width: 120, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <Text style={{ color: '#fff', fontSize: 9 }}>Midnight Beats{'\n'}May 15</Text><Text>〰️▶️</Text>
          </View>
          <View style={{ position: 'absolute', right: 8, bottom: 40, width: 120, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <Text style={{ color: '#fff', fontSize: 9 }}>Hunter Training{'\n'}May 17 ⭐</Text><Text>〰️▶️</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: -60 }}>
          <Text style={{ fontSize: 100 }}>💜🧚‍♀️👾</Text>
          <LinearGradient colors={['#A78BFA','#FFD700']} style={{ width: 200, height: 60, borderRadius: 30, opacity: 0.5, marginTop: -20 }} />
          <View style={{ backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: -20 }}><Text style={{ fontSize: 10, fontWeight: '700' }}>Every entry is a power-up!</Text></View>
        </View>
      </ScrollView>

      <LinearGradient colors={['rgba(255,255,255,0.15)','rgba(255,255,255,0.05)']} style={{ position: 'absolute', bottom: 10, left: 10, right: 10, height: 72, borderRadius: 24, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
        <Pressable onPress={() => router.push('/(new)')} style={{ alignItems: 'center' }}><Text style={{ fontSize: 20 }}>✨</Text><Text style={{ color: '#fff', fontSize: 8 }}>New Entry</Text></Pressable>
        <Pressable style={{ alignItems: 'center' }}><Text style={{ fontSize: 20 }}>🎙️</Text><Text style={{ color: '#fff', fontSize: 8 }}>Voice Note</Text></Pressable>
        <Pressable style={{ alignItems: 'center', backgroundColor: '#FFD700', width: 52, height: 52, borderRadius: 26, justifyContent: 'center' }}><Text style={{ fontSize: 22 }}>📷</Text></Pressable>
        <Pressable style={{ alignItems: 'center' }}><Text style={{ fontSize: 20 }}>🖼️</Text><Text style={{ color: '#fff', fontSize: 8 }}>Gallery</Text></Pressable>
        <Pressable style={{ alignItems: 'center' }}><Text style={{ fontSize: 20 }}>⚙️</Text><Text style={{ color: '#fff', fontSize: 8 }}>Settings</Text></Pressable>
      </LinearGradient>
    </LinearGradient>
  );
}
