import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../DrawerNavigation';
import Login from '../../pages/Login';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {

    let loginStatus = true;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={loginStatus ? 'Main' : 'Login'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={DrawerNavigator} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStackNavigation;