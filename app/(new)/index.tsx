import { View, Text, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { saveNewEntry } from '../../lib/storage';

export default function NewEntry() {
  const [text, setText] = useState("Today was amazing! ✨\nWe slayed our practice, and Zoey nailed that high note again! 💖\n\nI feel like anything is possible when we're together. HUNTR/X forever!\n\n- can't wait for our next mission! 🐱⚔️");
  const router = useRouter();
  return (
    <LinearGradient colors={['#151045','#0E0A24']} style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>⬅️</Text>
        <View style={{ alignItems: 'center' }}><Text style={{ color: '#FFD700', fontWeight: '800' }}>✨ NEW DIARY ENTRY ✨</Text><Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>✦ let your story shine ✦</Text></View>
        <Text style={{ color: '#fff' }}>✕</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 6, marginTop: 14 }}>
        {[{i:'🎙️',t:'VOICE NOTE',s:'tap to record',a:true},{i:'🖼️',t:'INSERT PHOTO',s:'add a memory'},{i:'📹',t:'INSERT VIDEO',s:'capture the vibe'},{i:'⭐',t:'STICKERS',s:'express yourself'}].map((b,idx)=>(
          <LinearGradient key={idx} colors={b.a?['#FF8FD6','rgba(255,255,255,0.1)']:['rgba(255,255,255,0.1)','rgba(255,255,255,0.05)']} style={{ flex: 1, borderRadius: 14, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <Text style={{ fontSize: 18 }}>{b.i}</Text><Text style={{ color: '#fff', fontSize: 7, fontWeight: '700', marginTop: 2, textAlign: 'center' }}>{b.t}</Text><Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 6, textAlign: 'center' }}>{b.s}</Text>
          </LinearGradient>
        ))}
      </View>

      <View style={{ marginTop: 14, backgroundColor: '#EDE8FF', borderRadius: 22, padding: 14, borderWidth: 3, borderColor: '#C9B6FF', minHeight: 360 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 11, fontWeight: '600' }}>✨ What's on your mind, hunter?</Text>
          <View style={{ backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: '#ddd' }}><Text style={{ fontSize: 8 }}>124/5000 📝</Text></View>
        </View>
        <TextInput value={text} onChangeText={setText} multiline style={{ marginTop: 10, fontSize: 13, lineHeight: 19, color: '#2A1B5D' }} />
        <View style={{ flexDirection: 'row', marginTop: 10, gap: 6 }}>
          <Text>💖</Text><Text>⭐</Text><Text>✨</Text>
        </View>
      </View>

      <Pressable onPress={async () => { await saveNewEntry({ text }); router.replace('/(home)'); }} style={{ marginTop: 12, backgroundColor: '#FFD700', borderRadius: 14, padding: 12, alignItems: 'center' }}>
        <Text style={{ fontWeight: '800' }}>✨ Sauvegarder HUNTR/X ✨</Text>
      </Pressable>
    </LinearGradient>
  );
}
