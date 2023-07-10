import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Stock}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Shopping List" component={Shopping} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;