import { useEffect, useState } from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Notes(){
  const [notes,setNotes]=useState<any[]>([]);
  useEffect(()=>{ (async()=>{ const n=JSON.parse(await AsyncStorage.getItem('notes')||'[]'); setNotes(n); })() },[]);
  return (
    <FlatList data={notes} keyExtractor={i=>String(i.id)}
      contentContainerStyle={{ padding:10 }}
      renderItem={({item})=>(
        <View style={{ padding:16, borderBottomWidth:1, borderColor:'#eee', gap:8, backgroundColor:'white', borderRadius:12, marginBottom:10 }}>
          <Text style={{ opacity:0.6 }}>{new Date(item.date).toLocaleString()}</Text>
          <Text style={{ fontSize:16 }}>{item.text}</Text>
          {item.photo && <Image source={{uri:item.photo}} style={{ height:180, borderRadius:10 }} />}
          {item.audioUri && <Text>🎤 vocal</Text>}
        </View>
      )} />
  )
}
