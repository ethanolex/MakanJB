import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantReviews from './RestaurantReviews';
import LeaveReview from './LeaveReview';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="RestaurantReviews" 
          component={RestaurantReviews} 
          options={{ title: 'Restaurant Reviews' }}
        />
        <Stack.Screen 
          name="LeaveReview" 
          component={LeaveReview} 
          options={{ title: 'Leave a Review' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
