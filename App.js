import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from './src/context';
import Toast from 'react-native-toast-message';

import MainStackNavigation from './src/routes/StackNavigation/main/';

export default function App() {
  return (
    <>
    <ThemeProvider>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
      <Toast />
    </ThemeProvider>  
    </>
  );
}

