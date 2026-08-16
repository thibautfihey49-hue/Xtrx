import { View, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import PinPad from '../../components/PinPad';
export default function Lock() {
  const [pin, setPin] = useState('');
  const router = useRouter();
  const onPress = (n: string) => {
    if (n === '⌫') { setPin(p => p.slice(0,-1)); return; }
    const np = pin + n;
    setPin(np);
    if (np === '1234') router.replace('/(home)');
    if (np.length >= 4 && np !== '1234') setPin('');
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#0D0820', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 28, marginBottom: 20 }}>🔒 Journal Secret</Text>
      <Text style={{ color: '#FF6EC7', fontSize: 32, letterSpacing: 10, marginBottom: 30 }}>{'•'.repeat(pin.length)}</Text>
      <PinPad onPress={onPress} />
      <Text style={{ color: 'rgba(255,255,255,0.5)', marginTop: 20 }}>PIN: 1234</Text>
    </View>
  );
}
