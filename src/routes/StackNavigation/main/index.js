import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../../pages/Login';
import { Foo } from '../../../pages/Teste';
import DrawerNavigator from '../../DrawerNavigation';


const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {

    let loginStatus = true;

    return (
        <Stack.Navigator initialRouteName={loginStatus ? 'Main' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export default MainStackNavigation;