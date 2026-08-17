import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import NeonButton from '../../../components/NeonButton';
import GlassCard from '../../../components/GlassCard';
import { getEntryById, updateEntry, deleteEntry } from '../../../lib/storage';

export default function Entry() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [text, setText] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const e = await getEntryById(id!);
      if (e) { setText(e.text); setLoaded(true); }
    })();
  }, [id]);

  if (!loaded) return <View style={{ flex: 1, backgroundColor: '#0D0820' }} />;

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0820', padding: 20 }}>
      <Text style={{ color: '#FFD700', fontSize: 18, marginTop: 40 }}>Entrée du {id}</Text>
      <GlassCard style={{ marginTop: 20, flex: 1 }}>
        <TextInput value={text} onChangeText={setText} multiline style={{ color: '#fff', flex: 1, textAlignVertical: 'top' }} />
      </GlassCard>
      <View style={{ gap: 12, marginTop: 20 }}>
        <NeonButton title="Mettre à jour" onPress={async () => { await updateEntry(id!, text); router.back(); }} />
        <Pressable onPress={() => Alert.alert('Supprimer?', 'Ton secret sera effacé.', [{ text: 'Annuler' }, { text: 'Supprimer', style: 'destructive', onPress: async () => { await deleteEntry(id!); router.replace('/(home)'); } }])} style={{ padding: 14, alignItems: 'center' }}>
          <Text style={{ color: '#FF6EC7' }}>🗑️ Supprimer</Text>
        </Pressable>
      </View>
    </View>
  );
}
