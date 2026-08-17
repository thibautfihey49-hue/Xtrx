import { Tabs } from 'expo-router';
export default () => (
  <Tabs>
    <Tabs.Screen name="index" options={{ title: 'Carnet' }} />
    <Tabs.Screen name="notes" options={{ title: 'Mes notes' }} />
  </Tabs>
)
