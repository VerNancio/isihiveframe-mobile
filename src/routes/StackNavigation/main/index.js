import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../../../context/Theme';
import themeColors from '../../../assets/styles/color/colors.json';

import DrawerNavigator from '../../DrawerNavigation';
import LoginView from '../../../pages/Login';

import LoadingLogo from '../../../components/Loading';

import { UserRequest } from '../../../requests/user';

//


const UserReq = new UserRequest();

const Stack = createNativeStackNavigator();


const MainStackNavigation = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];
    
    //
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true)

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    

    useEffect( async () => {
        
        await UserReq.getUserData(setIsAuthenticated, 'authToken');

        setIsLoading(false);
        
    }, []);


    if (isLoading) {
        return (
        <View style={{flex: 1, backgroundColor: themeColor('secondaryBg')}}>
            <LoadingLogo width={60} height={80} isLoading={true} blockView={true} style={{ position: 'absolute'}}/>
        </View>
        );
    }
   
    return (
        <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={DrawerNavigator} />
            <Stack.Screen name="Login" component={LoginView} />
        </Stack.Navigator>
    );
};

export default MainStackNavigation;