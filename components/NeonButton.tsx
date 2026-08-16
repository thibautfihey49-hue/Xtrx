import { Pressable, Text } from 'react-native';
export default function NeonButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ backgroundColor: '#9D4DFF', padding: 16, borderRadius: 30, alignItems: 'center', shadowColor: '#9D4DFF', shadowOpacity: 0.6, shadowRadius: 15 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}
