import { Button, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Redirect() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Success! You are now signed in. This screen is not super useful but it shows you how to redirect to the home screen.</Text>
      <Button title="OK" onPress={() => router.navigate('/')} />
    </View>
  )
}