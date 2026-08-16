import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import GlassCard from '../../components/GlassCard';
import NeonButton from '../../components/NeonButton';
import DiaryBook3D from '../../components/DiaryBook3D';
export default function Home() {
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0D0820' }} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ color: '#FFD700', fontSize: 26, fontWeight: 'bold', marginTop: 40 }}>Le Journal Secret de Zoé 3D 💜</Text>
      <View style={{ marginVertical: 30 }}><DiaryBook3D /></View>
      <GlassCard style={{ width: '100%', marginBottom: 20 }}>
        <Text style={{ color: '#fff' }}>Barrière Honmoon Active ✨</Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>Ton journal est protégé par la magie HUNTR/X</Text>
      </GlassCard>
      <NeonButton title="📝 Nouvelle Entrée" onPress={() => router.push('/(new)')} />
    </ScrollView>
  );
}
