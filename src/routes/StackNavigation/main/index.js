import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from '../../../pages/Login';
import DrawerNavigator from '../../DrawerNavigation';


const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {

    let loginStatus = true;

    return (
        <Stack.Navigator initialRouteName={loginStatus ? 'Main' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen name="Login" component={LoginView} />
        </Stack.Navigator>
    );
};

export default MainStackNavigation;