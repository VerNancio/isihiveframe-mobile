import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../../../pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../../../template';


const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {

    let loginStatus = true;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={loginStatus ? 'Main' : 'Login'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStackNavigation;