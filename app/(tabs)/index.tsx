import { useState, useRef } from 'react';
import { View, TextInput, Pressable, Text, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carnet(){
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<string|null>(null);
  const [recording, setRecording] = useState<Audio.Recording|null>(null);
  const [audioUri, setAudioUri] = useState<string|null>(null);
  const [secs, setSecs] = useState(0);
  const timer = useRef<any>(null);

  const pickPhoto = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ quality: 0.6, allowsEditing: true });
    if(r.canceled) return;
    const src = r.assets[0].uri;
    const dest = FileSystem.documentDirectory + `photo_${Date.now()}.jpg`;
    await FileSystem.copyAsync({ from: src, to: dest });
    setPhoto(dest);
  }

  const startRec = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const rec = new Audio.Recording();
    await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await rec.startAsync();
    setRecording(rec);
    setSecs(0);
    timer.current = setInterval(()=>setSecs(s=>s+1),1000);
  }
  const stopRec = async () => {
    if(!recording) return;
    clearInterval(timer.current);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if(!uri) return;
    const dest = FileSystem.documentDirectory + `vocal_${Date.now()}.m4a`;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setAudioUri(dest);
    setRecording(null);
  }

  const save = async () => {
    if(!text &&!photo &&!audioUri){ Alert.alert('Vide'); return; }
    const notes = JSON.parse(await AsyncStorage.getItem('notes')||'[]');
    notes.unshift({ id: Date.now(), text, photo, audioUri, date: new Date().toISOString() });
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    setText(''); setPhoto(null); setAudioUri(null);
    Alert.alert('Sauvé dans Mes notes ✅');
  }

  return (
    <View style={{ flex:1, backgroundColor:'#fdf6ff', padding:12 }}>
      {/* ZONE TEXTE VRAIE PLEINE PAGE */}
      <View style={{ flex:1, backgroundColor:'white', borderRadius:16, padding:12, elevation:2 }}>
        <TextInput value={text} onChangeText={setText} placeholder="What's on your mind, hunter?..."
          multiline style={{ flex:1, fontSize:17, textAlignVertical:'top' }} maxLength={5000} />
        <Text style={{ textAlign:'right', opacity:0.4 }}>{text.length}/5000</Text>
        {photo && <View><Image source={{uri:photo}} style={{ height:200, borderRadius:12, marginTop:8 }} /><Pressable onPress={()=>setPhoto(null)}><Text style={{color:'red', textAlign:'right', marginTop:4}}>Supprimer photo</Text></Pressable></View>}
        {audioUri && <View style={{ marginTop:8, backgroundColor:'#e8f5e9', padding:8, borderRadius:10 }}><Text>🎤 Vocal ajouté • {audioUri.split('/').pop()}</Text><Pressable onPress={()=>setAudioUri(null)}><Text style={{color:'red'}}>Supprimer vocal</Text></Pressable></View>}
        {recording && <Text style={{ color:'red', marginTop:8 }}>● REC {secs}s — appuie sur NOTE VOCALE pour arrêter</Text>}
      </View>

      <View style={{ gap:10, marginTop:12 }}>
        <Pressable onPress={pickPhoto} style={{ backgroundColor:'#2196F3', padding:14, borderRadius:10, alignItems:'center' }}><Text style={{color:'white', fontWeight:'bold'}}>📷 PHOTO</Text></Pressable>
        <Pressable onPress={recording?stopRec:startRec} style={{ backgroundColor: recording?'#f44336':'#2196F3', padding:14, borderRadius:10, alignItems:'center' }}><Text style={{color:'white', fontWeight:'bold'}}>{recording?'⏹️ STOP VOCAL':'🎤 NOTE VOCALE'}</Text></Pressable>
        <Pressable onPress={save} style={{ backgroundColor:'#673AB7', padding:14, borderRadius:10, alignItems:'center' }}><Text style={{color:'white', fontWeight:'bold'}}>💾 SAUVER</Text></Pressable>
      </View>
    </View>
  )
}
