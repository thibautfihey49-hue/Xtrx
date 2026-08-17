import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import NeonButton from '../../../components/NeonButton';
import GlassCard from '../../../components/GlassCard';
import { getEntryById, updateEntry, deleteEntry, DiaryEntry } from '../../../lib/storage';

export default function Entry() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [text, setText] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  useEffect(() => { (async () => { const e = await getEntryById(id!); if (e) { setEntry(e); setText(e.text); } })(); }, [id]);
  const playAudio = async () => {
    if (!entry?.audioUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: entry.audioUri });
    setSound(sound);
    await sound.playAsync();
  };
  if (!entry) return <View style={{ flex: 1, backgroundColor: '#0D0820' }} />;
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0820', padding: 20 }}>
      <Text style={{ color: '#FFD700', marginTop: 40 }}>{new Date(entry.createdAt).toLocaleString()}</Text>
      <GlassCard style={{ marginTop: 20, flex: 1 }}>
        <TextInput value={text} onChangeText={setText} multiline style={{ color: '#fff', flex: 1, textAlignVertical: 'top' }} />
        {entry.imageUri && <Image source={{ uri: entry.imageUri }} style={{ width: '100%', height: 200, borderRadius: 12, marginTop: 12 }} />}
        {entry.audioUri && <Pressable onPress={playAudio} style={{ marginTop: 12, backgroundColor: 'rgba(255,215,0,0.2)', padding: 12, borderRadius: 12 }}><Text style={{ color: '#FFD700' }}>▶️ Écouter vocal</Text></Pressable>}
      </GlassCard>
      <View style={{ gap: 12, marginTop: 20 }}>
        <NeonButton title="Mettre à jour" onPress={async () => { await updateEntry(id!, { text }); router.back(); }} />
        <Pressable onPress={() => Alert.alert('Supprimer?', 'Effacer ce secret?', [{ text: 'Annuler' }, { text: 'Supprimer', style: 'destructive', onPress: async () => { if (sound) await sound.unloadAsync(); await deleteEntry(id!); router.replace('/(home)'); } }])} style={{ padding: 14, alignItems: 'center' }}><Text style={{ color: '#FF6EC7' }}>🗑️ Supprimer</Text></Pressable>
      </View>
    </View>
  );
}
