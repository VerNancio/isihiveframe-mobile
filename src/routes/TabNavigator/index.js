import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductStackNavigation from "../StackNavigation/product";
import Account from "../../pages/Account";

const Tab = createMaterialTopTabNavigator();

const TabHeader = () => {

    return({
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 120 },
        tabBarStyle: { backgroundColor: '#F1F5F9' },
        tabBarActiveTintColor: '#3976D1',
        tabBarInactiveTintColor: '#1E293B',
    });
}

const TabNavigator = (props) => {
    return(
        <Tab.Navigator screenOptions={TabHeader}>
            <Tab.Screen name="ProductsStack" component={ProductStackNavigation} options={{ tabBarLabel: 'Produtos' }} listeners={{tabPress: () => {props.state = "products"}}}/>
            <Tab.Screen name="Account" component={Account}  options={{ tabBarLabel: 'Informações' }} listeners={{tabPress: () => {props.state = "account"}}}/>
        </Tab.Navigator>
    );
};

export default TabNavigator