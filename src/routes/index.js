import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Home from '../pages/Home';

const Stack = createNativeStackNavigator();

const Routes = () => {

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

export default Routes;