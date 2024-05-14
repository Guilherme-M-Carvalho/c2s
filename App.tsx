import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import BottomNavigate from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <BottomNavigate />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
