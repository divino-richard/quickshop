import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { ImageSourcePropType, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Colors from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false 
            }} 
          />
          <Stack.Screen 
            name="account" 
            options={{ 
              title: "Account", 
              presentation: 'modal'
            }} 
          />
          <Stack.Screen 
            name="product/[id]" 
            options={{
              title: "Product Details",
              headerStyle: {
                backgroundColor: Colors.secondary_first,
              },
              headerTitleStyle: {
                color: Colors.primary,
              },
              headerLeft: () => {
                return (
                  <AntDesign 
                    size={25} 
                    style={{paddingRight: 25}} 
                    color={Colors.accent} 
                    name='back'
                    onPress={() => router.back()}
                  />
                )
              }
            }}
          />
          <Stack.Screen 
            name="product/search" 
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="auth/login" 
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: Colors.secondary_first
              },
              headerTitleStyle: {
                color: Colors.primary,
              },
              headerLeft: () => {
                return (
                  <AntDesign 
                    size={25} 
                    style={{paddingRight: 25}} 
                    color={Colors.accent} 
                    name='back'
                    onPress={() => router.back()}
                  />
                )
              }
            }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
