import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import MainStackNavigation from './src/routes/StackNavigation/main/';

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <MainStackNavigation />
    </NavigationContainer>
  );
}

