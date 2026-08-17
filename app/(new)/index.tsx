import { View, Text, TextInput, Image, Pressable } from 'react-native';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import NeonButton from '../../components/NeonButton';
import { useRouter } from 'expo-router';
import { saveNewEntry } from '../../lib/storage';

export default function NewEntry() {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [audioUri, setAudioUri] = useState<string | undefined>();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!res.canceled) {
      const uri = res.assets[0].uri;
      const newPath = FileSystem.documentDirectory + Date.now() + '.jpg';
      await FileSystem.copyAsync({ from: uri, to: newPath });
      setImageUri(newPath);
    }
  };
  const startRec = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    setRecording(recording);
  };
  const stopRec = async () => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (uri) {
      const newPath = FileSystem.documentDirectory + Date.now() + '.m4a';
      await FileSystem.copyAsync({ from: uri, to: newPath });
      setAudioUri(newPath);
    }
    setRecording(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0820', padding: 20 }}>
      <Text style={{ color: '#FFD700', fontSize: 22, marginTop: 40, marginBottom: 20 }}>Nouvelle Entrée ✨</Text>
      <TextInput value={text} onChangeText={setText} placeholder="Cher journal..." placeholderTextColor="rgba(255,255,255,0.4)" multiline style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 15, padding: 15, height: 150, textAlignVertical: 'top' }} />
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 15 }}>
        <Pressable onPress={pickImage} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 12 }}><Text style={{ color: '#fff' }}>📸 Photo</Text></Pressable>
        <Pressable onPress={recording? stopRec : startRec} style={{ backgroundColor: recording? '#FF6EC7' : 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 12 }}><Text style={{ color: '#fff' }}>{recording? '⏹️ Stop' : '🎙️ Vocal'}</Text></Pressable>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: '100%', height: 150, borderRadius: 12, marginTop: 12 }} />}
      {audioUri && <Text style={{ color: '#FFD700', marginTop: 10 }}>🎧 Vocal enregistré</Text>}
      <View style={{ marginTop: 20 }}><NeonButton title="Sauvegarder 💜" onPress={async () => {
        if (!text.trim() &&!imageUri &&!audioUri) return;
        await saveNewEntry({ text, imageUri, audioUri });
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace('/(home)');
      }} /></View>
    </View>
  );
}
