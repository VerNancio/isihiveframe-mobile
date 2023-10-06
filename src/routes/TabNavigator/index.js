import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Products from '../../pages/Products';
import Account from "../../pages/Account";

const Tab = createMaterialTopTabNavigator();

const TabNavigator = (props) => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Products" component={Products} listeners={{tabPress: () => {props.state = "products"}}}/>
            <Tab.Screen name="Account" component={Account} listeners={{tabPress: () => {props.state = "account"}}}/>
        </Tab.Navigator>
    );
};

export default TabNavigator