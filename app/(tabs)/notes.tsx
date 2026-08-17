import { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function Notes(){
  const [notes,setNotes]=useState<any[]>([]);
  const [sound,setSound]=useState<Audio.Sound|null>(null);
  const [playingId,setPlayingId]=useState<number|null>(null);

  const load = async () => {
    const n=JSON.parse(await AsyncStorage.getItem('notes')||'[]'); setNotes(n);
  }
  useEffect(()=>{ load(); const i=setInterval(load,1000); return()=>clearInterval(i); },[]);

  const play = async (item:any) => {
    if(sound){ await sound.stopAsync(); await sound.unloadAsync(); setSound(null); }
    if(playingId===item.id){ setPlayingId(null); return; }
    const { sound: s } = await Audio.Sound.createAsync({ uri: item.audioUri });
    setSound(s); setPlayingId(item.id);
    await s.playAsync();
    s.setOnPlaybackStatusUpdate(st=>{ if((st as any).didJustFinish){ setPlayingId(null); } });
  }

  const del = async (id:number) => {
    const n = notes.filter(x=>x.id!==id);
    await AsyncStorage.setItem('notes', JSON.stringify(n)); setNotes(n);
  }

  return (
    <FlatList data={notes} keyExtractor={i=>String(i.id)} contentContainerStyle={{ padding:12, gap:12 }}
      renderItem={({item})=>(
        <View style={{ backgroundColor:'white', borderRadius:16, padding:14, gap:8, elevation:2 }}>
          <Text style={{ opacity:0.5, fontSize:12 }}>{new Date(item.date).toLocaleString()}</Text>
          {item.text? <Text style={{ fontSize:16 }}>{item.text}</Text> : null}
          {item.photo && <Image source={{uri:item.photo}} style={{ height:220, borderRadius:12 }} />}
          {item.audioUri && <Pressable onPress={()=>play(item)} style={{ backgroundColor: playingId===item.id?'#ff5252':'#E3F2FD', padding:12, borderRadius:10 }}><Text style={{ fontWeight:'bold' }}>{playingId===item.id?'⏸️ Pause vocal':'▶️ Écouter vocal'}</Text></Pressable>}
          <Pressable onPress={()=>del(item.id)}><Text style={{ color:'red', textAlign:'right' }}>Supprimer</Text></Pressable>
        </View>
      )}
      ListEmptyComponent={<Text style={{ textAlign:'center', marginTop:40, opacity:0.5 }}>Aucune note</Text>}
    />
  )
}
