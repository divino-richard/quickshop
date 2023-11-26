import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) {
  return <Feather size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarHideOnKeyboard: true,

          tabBarLabelStyle: {color: Colors.secondary_first},
          tabBarIcon: ({focused}) => {
            const color = focused ? Colors.accent : Colors.secondary_second;
            return <TabBarIcon name="home" color={color} />
          },
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'My Order',
          tabBarLabelStyle: {color: Colors.secondary_first},
          tabBarIcon: ({focused}) => {
            const color = focused ? Colors.accent : Colors.secondary_second;
            return <TabBarIcon name="shopping-bag" color={color} />
          },
        }}
      />
    </Tabs>
  );
}
