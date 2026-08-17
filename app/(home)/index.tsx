import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import GlassCard from '../../components/GlassCard';
import NeonButton from '../../components/NeonButton';
import DiaryBook3D from '../../components/DiaryBook3D';
import { getEntries, DiaryEntry } from '../../lib/storage';

export default function Home() {
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useFocusEffect(useCallback(() => {
    (async () => setEntries(await getEntries()))();
  }, []));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0D0820' }} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ color: '#FFD700', fontSize: 26, fontWeight: 'bold', marginTop: 40 }}>Le Journal Secret de Zoé 3D 💜</Text>
      <View style={{ marginVertical: 30 }}><DiaryBook3D /></View>
      <GlassCard style={{ width: '100%', marginBottom: 20 }}>
        <Text style={{ color: '#fff' }}>Barrière Honmoon Active ✨</Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>{entries.length} secrets protégés par HUNTR/X</Text>
      </GlassCard>
      <NeonButton title="📝 Nouvelle Entrée" onPress={() => router.push('/(new)')} />
      <View style={{ width: '100%', marginTop: 25, gap: 12 }}>
        {entries.map(e => (
          <Pressable key={e.id} onPress={() => router.push(`/(entry)/${e.id}`)}>
            <GlassCard>
              <Text style={{ color: '#fff' }} numberOfLines={2}>{e.text}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.5)', marginTop: 6, fontSize: 12 }}>{new Date(e.createdAt).toLocaleString()}</Text>
            </GlassCard>
          </Pressable>
        ))}
        {entries.length === 0 && <Text style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 20 }}>Aucune entrée encore. Écris ton premier secret...</Text>}
      </View>
    </ScrollView>
  );
}
