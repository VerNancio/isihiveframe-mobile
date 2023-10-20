import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './src/routes/StackNavigation/main/';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}

