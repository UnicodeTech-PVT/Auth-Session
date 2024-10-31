import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function App() {
  const [code, setCode] = useState<string | null>('');
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'ZKUJxBMSfOWN3RhYZsOKcw',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        native: 'testscheme://redirect',
      }),
    },
    discovery
  );


  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      setCode(code);
    }
  }, [response]);

  if (code) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>You are now logged in!</Text>
        <Text>{code}</Text>
        <Button
          title="Logout"
          onPress={ () => {
            setCode(null);
          }}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
