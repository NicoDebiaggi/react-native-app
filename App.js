import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TaskProvider } from './contexts/TaskContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './pages/Main';
import CreateTask from './pages/CreateTask';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TaskProvider>
        <StatusBar style="auto" />

        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Main} />
          
          <Stack.Screen name="Create Task" component={CreateTask} />

        </Stack.Navigator>
        
      </TaskProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F7',
    width: '100%',
    minHeight: '100%',
  },
});
