import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomNavigate from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { StudentProvider } from './src/contexts/student.context';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SQLiteProvider } from 'expo-sqlite';
import { useCreateDatabase } from './src/hooks/useCreateDatabase'; 

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SQLiteProvider databaseName='InnovateTech' onInit={useCreateDatabase} >
          <StudentProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <BottomNavigate />
            </NavigationContainer>
          </StudentProvider>
        </SQLiteProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}