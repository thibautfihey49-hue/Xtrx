import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getEntryById, DiaryEntry } from '../../../lib/storage';

export default function EntryDetail() {
  const { id } = useLocalSearchParams();
  const [e, setE] = useState<DiaryEntry | null>(null);
  useEffect(() => { getEntryById(id as string).then(setE); }, []);
  return (
    <LinearGradient colors={['#2A1B6A','#1A1040']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 12, paddingTop: 44 }}>
        <LinearGradient colors={['rgba(255,255,255,0.2)','rgba(255,255,255,0.05)']} style={{ borderRadius: 20, padding: 10, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
          <Text style={{ color: '#fff' }}>⬅️ Zoey's Diary</Text><Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>May 24, 2025 • Saturday 💗</Text><Text>⤴️ 🔒</Text>
        </LinearGradient>

        <View style={{ marginTop: 14, backgroundColor: '#F5E6C8', borderRadius: 18, flexDirection: 'row', overflow: 'hidden', borderWidth: 2, borderColor: '#C9B6FF', minHeight: 520 }}>
          <View style={{ flex: 1, padding: 12 }}>
            <Text style={{ fontSize: 11 }}>May 24, 2025 ♡</Text><Text style={{ marginTop: 6, fontSize: 13, fontStyle: 'italic' }}>Dear Diary,</Text>
            <Text style={{ marginTop: 8, fontSize: 12, lineHeight: 17 }}>{e?.text || "Today was AMAZING! 💜\nWe danced, sang our hearts out, and Zoey was the best hype partner ever! 🥰\nI love our little adventures.\nCan't wait for more magic tomorrow! ⭐"}</Text>
            <LinearGradient colors={['rgba(200,160,255,0.3)','rgba(255,255,255,0.3)']} style={{ marginTop: 18, borderRadius: 14, padding: 10, borderWidth: 1, borderColor: 'rgba(180,140,255,0.5)' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#A78BFA', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff', fontSize: 10 }}>▶️</Text></View>
                <Text style={{ fontSize: 9 }}>〰️〰️〰️📊〰️〰️〰️</Text>
              </View>
              <Text style={{ fontSize: 9, marginTop: 6 }}>Voice Note • 0:28 🎙️</Text>
            </LinearGradient>
            <Text style={{ marginTop: 10 }}>💜</Text>
          </View>
          <View style={{ flex: 1, padding: 12, backgroundColor: '#F0E2B8', borderLeftWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }}>
            <View style={{ backgroundColor: '#E6C6FF', borderRadius: 10, padding: 6, alignSelf: 'flex-start' }}><Text style={{ fontSize: 8 }}>✦ Cute Moments with Zoey 💜</Text></View>
            <View style={{ width: '100%', height: 120, borderRadius: 12, marginTop: 8, backgroundColor: '#D8B4FE', borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 30 }}>👩‍❤️‍👩</Text><Text style={{ position: 'absolute', bottom: 4, right: 4 }}>📹</Text></View>
            <View style={{ marginTop: 18, alignItems: 'center' }}>
              <Text style={{ fontSize: 70 }}>💃✨</Text>
              <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#FFD700', borderStyle: 'dashed', position: 'absolute', top: 10 }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
