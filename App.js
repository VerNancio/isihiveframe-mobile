import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
// import { useNavigationState } from '@react-navigation/hooks';

import { ThemeProvider } from './src/context/Theme';
import Toast from 'react-native-toast-message';
import toastConfig from './src/assets/toast';

import MainStackNavigation from './src/routes/StackNavigation/main/';


export default function App() {
  
  return (
    <>
    <ThemeProvider>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
      <Toast config={toastConfig}/>
    </ThemeProvider>  
    </>
  );
}

