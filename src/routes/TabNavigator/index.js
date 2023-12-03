import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import themeColors from '../../assets/styles/color/colors.json';
import { useTheme } from "../../context/Theme";

import ProductStackNavigation from "../StackNavigation/product";
import HoursStackNavigation from "../StackNavigation/hours";

//

const Tab = createMaterialTopTabNavigator();

const TabHeader = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    return({
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 120 },
        tabBarStyle: { backgroundColor: themeColor('primaryBg') },
        tabBarActiveTintColor: themeColor("primaryHigh"),
        tabBarInactiveTintColor: theme === 'light' ? themeColor("grayText") : themeColor("primaryDisabled"),
    });
}

const TabNavigator = (props) => {
    return(
        <Tab.Navigator 
            tabBarOptions={{
                
            }}
        >
            <Tab.Screen 
                name="ProductsStack" 
                component={ProductStackNavigation} 
                options={{ tabBarLabel: 'Produtos', ...TabHeader()}} 
                // screenOption={{ tabBarLabel: 'Produtos', ...TabHeader() }}
                listeners={{tabPress: () => {props.state("products")}}}/>
            <Tab.Screen 
                name="HoursLog" 
                component={HoursStackNavigation} 
                options={{ tabBarLabel: 'Horas', ...TabHeader() }} 
                // screenOption={{ tabBarLabel: 'Produtos', ...TabHeader() }}

                listeners={{tabPress: () => {props.state("hourslog")}}}/>
        </Tab.Navigator>
    );
};

export default TabNavigator