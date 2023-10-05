import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './src/routes/StackNavigation';
// import DrawerNavigator from './src/routes/DrawerNavigation';

export default function App() {
  return (
    // <NavigationContainer>
    //   <DrawerNavigator></DrawerNavigator>
    // </NavigationContainer>
    <MainStackNavigation />
  );
}

