import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import DrawerDisplay from "../../components/DrawerDisplay";
import TabNavigator from "../TabNavigator";
import Home from "../../pages/Home";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerDisplay {...props}/>}>
            <Drawer.Screen name="Home" component={Home} />
            {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;