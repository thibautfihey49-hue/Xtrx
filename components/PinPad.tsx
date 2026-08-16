import { View, Pressable, Text } from 'react-native';
export default function PinPad({ onPress }: { onPress: (n: string) => void }) {
  const nums = ['1','2','3','4','5','6','7','8','9','', '0', '⌫'];
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, width: 260 }}>
      {nums.map((n,i) => (
        <Pressable key={i} onPress={() => n && onPress(n)} style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>{n}</Text>
        </Pressable>
      ))}
    </View>
  );
}
