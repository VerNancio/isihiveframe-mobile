import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackNavigation from '../StackNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Main" component={MainStackNavigation} />
            {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;



