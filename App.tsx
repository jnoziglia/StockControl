import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stock from './Stock';
import Shopping from './Shopping';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Stock"
          component={Stock}
        />
        <Stack.Screen name="Shopping" component={Shopping} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;