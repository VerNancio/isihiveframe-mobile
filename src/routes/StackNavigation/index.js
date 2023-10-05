import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../pages/Home';
import Login from '../../pages/Login';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {

    let loginStatus = false;

    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName={loginStatus ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}> */}
            <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStackNavigation;