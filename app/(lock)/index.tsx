import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import PinPad from '../../components/PinPad';
import { getPin, setPin } from '../../lib/storage';

export default function Lock() {
  const [pin, setPinState] = useState('');
  const [savedPin, setSavedPin] = useState<string | null>(null);
  const [step, setStep] = useState<'loading'|'check'|'setup'|'confirm'>('loading');
  const [firstPin, setFirstPin] = useState('');
  const [bioOk, setBioOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const p = await getPin();
      setSavedPin(p);
      if (!p) setStep('setup');
      else {
        setStep('check');
        const hasHw = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setBioOk(hasHw && enrolled);
        if (hasHw && enrolled) {
          const res = await LocalAuthentication.authenticateAsync({ promptMessage: 'Déverrouiller Zoé' });
          if (res.success) router.replace('/(home)');
        }
      }
    })();
  }, []);

  const onPress = async (n: string) => {
    if (n === '⌫') { setPinState(p => p.slice(0,-1)); return; }
    const np = (pin + n).slice(0,4);
    setPinState(np);
    if (np.length < 4) return;

    if (step === 'setup') {
      setFirstPin(np);
      setPinState('');
      setStep('confirm');
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (step === 'confirm') {
      if (np === firstPin) {
        await setPin(np);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace('/(home)');
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setPinState(''); setFirstPin(''); setStep('setup');
      }
    } else {
      if (np === savedPin) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.replace('/(home)');
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setPinState('');
      }
    }
  };

  const title = step === 'setup'? 'Crée ton code secret' : step === 'confirm'? 'Confirme ton code' : '🔒 Journal Secret';
  if (step === 'loading') return <View style={{ flex: 1, backgroundColor: '#0D0820' }} />;

  return (
    <View style={{ flex: 1, backgroundColor: '#0D0820', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 28, marginBottom: 10 }}>{title}</Text>
      <Text style={{ color: '#FF6EC7', fontSize: 32, letterSpacing: 12, marginBottom: 30 }}>{'•'.repeat(pin.length).padEnd(4,' ')}</Text>
      <PinPad onPress={onPress} />
      {bioOk && step === 'check' && (
        <Pressable onPress={async () => {
          const r = await LocalAuthentication.authenticateAsync({ promptMessage: 'Déverrouiller' });
          if (r.success) router.replace('/(home)');
        }} style={{ marginTop: 20 }}>
          <Text style={{ color: '#FFD700' }}>✨ Utiliser FaceID / Empreinte</Text>
        </Pressable>
      )}
    </View>
  );
}
