import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './src/routes/StackNavigation/main/';

export default function App() {
  return (
    <MainStackNavigation />
  );
}

