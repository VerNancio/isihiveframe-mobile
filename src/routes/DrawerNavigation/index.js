import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import DrawerDisplay from "../../components/DrawerDisplay";
import Home from "../../pages/Home";
// import Login from "";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator
            // screenOptions={{
            //     drawerStyle: {
            //     backgroundColor: '#c6cbef',
            //     width: 240,
            //     },
            // }}
            initialRouteName="Home" 
            drawerContent={props => <DrawerDisplay {...props}/>}>
            <Drawer.Screen name="Home" component={Home} />
            {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;