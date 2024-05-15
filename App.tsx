import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomNavigate from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { StudentProvider } from './src/contexts/student.context';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StudentProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <BottomNavigate />
          </NavigationContainer>
        </StudentProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}