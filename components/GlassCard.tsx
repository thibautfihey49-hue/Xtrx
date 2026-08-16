import { View, ViewProps } from 'react-native';
export default function GlassCard({ children, style, ...props }: ViewProps) {
  return <View style={[{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }, style]} {...props}>{children}</View>;
}
