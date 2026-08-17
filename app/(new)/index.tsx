import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import NeonButton from '../../components/NeonButton';
import { useRouter } from 'expo-router';
import { saveNewEntry } from '../../lib/storage';

export default function NewEntry() {
  const [text, setText] = useState('');
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0820', padding: 20 }}>
      <Text style={{ color: '#FFD700', fontSize: 22, marginTop: 40, marginBottom: 20 }}>Nouvelle Entrée ✨</Text>
      <TextInput value={text} onChangeText={setText} placeholder="Cher journal..." placeholderTextColor="rgba(255,255,255,0.4)" multiline autoFocus style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 15, padding: 15, height: 260, textAlignVertical: 'top' }} />
      <View style={{ marginTop: 20 }}>
        <NeonButton title="Sauvegarder 💜" onPress={async () => {
          if (!text.trim()) return;
          await saveNewEntry(text);
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.replace('/(home)');
        }} />
      </View>
    </View>
  );
}
