import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
export default function Entry() {
  const { id } = useLocalSearchParams();
  return <View style={{ flex: 1, backgroundColor: '#0D0820', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Entrée {id}</Text></View>;
}
