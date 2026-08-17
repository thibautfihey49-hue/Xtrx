import { useState } from 'react';
import { View, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Carnet(){
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<string|null>(null);
  const [recording, setRecording] = useState<Audio.Recording|null>(null);
  const [audioUri, setAudioUri] = useState<string|null>(null);
  const pickPhoto = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });
    if(!r.canceled) setPhoto(r.assets[0].uri);
  }
  const startRec = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await rec.startAsync();
    setRecording(rec);
  }
  const stopRec = async () => {
    if(!recording) return;
    await recording.stopAndUnloadAsync();
    setAudioUri(recording.getURI());
    setRecording(null);
  }
  const save = async () => {
    const notes = JSON.parse(await AsyncStorage.getItem('notes')||'[]');
    notes.unshift({ id: Date.now(), text, photo, audioUri, date: new Date().toISOString() });
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    setText(''); setPhoto(null); setAudioUri(null);
    Alert.alert('Sauvé');
  }
  return (
    <View style={{ flex:1, padding:16, gap:12, backgroundColor:'white' }}>
      <TextInput value={text} onChangeText={setText} placeholder="Écris ici..." multiline style={{ flex:1, fontSize:18, textAlignVertical:'top' }} />
      {photo && <Image source={{uri:photo}} style={{ height:200, borderRadius:12 }} />}
      <Button title="📷 Photo" onPress={pickPhoto} />
      <Button title={recording? "⏹️ Stop vocal" : "🎤 Note vocale"} onPress={recording?stopRec:startRec} />
      <Button title="💾 Sauver" onPress={save} />
    </View>
  )
}
