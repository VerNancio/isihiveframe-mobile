import { View, Text, Drawer, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerItem, DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../../pages/Home";
import { useState } from "react";


const DrawerHeader = () => {

    const navigation = useNavigation();

    return (
        {
        headerStyle: {
        backgroundColor: "#F1F5F9", 
        },
        headerTintColor: "#3976D1", 
        headerTitle: () => {
            return (
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 24 }}>
                            <Text style={{ color: '#3976D1' }}>HIVE</Text>
                            <Text style={{ color: '#1E293B' }}>FRAME</Text>
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation}>
                            <Icon color='#3976D1' name="white-balance-sunny" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation}>
                            <Icon color='#3976D1' name="bell-outline" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ height: 30, width: 30, borderRadius: 100, resizeMode: 'contain' }} source={require('../../assets/image/teste/asukaringa.jpg')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
              );
        }, 
        headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
        },}
    );
};

const CustomDrawerContent = () => {

    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <View>
                <View>
                    {/* Image */}
                </View>
            </View>
            <DrawerContentScrollView>
            <DrawerItem
                    icon={({color = 'black', size = 40}) => (
                        <Icon 
                        name="account-circle-outline"
                        color={color}
                        size={size}
                        />
                    )} 
                    label={"Perfil"}
                    onPress={() => {}}
                />
                <DrawerItem
                icon={({color, size}) => (
                    <Icon 
                    name="clock-outline"
                    color={color}
                    size={size}
                    />
                )} 
                label={"Banco de horas"}
                onPress={() => {}}
            />
            </DrawerContentScrollView>
            <View style={{}}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )} 
                    label={"Sign out"}
                    onPress={() => {navigation.replace('Login')}}
                />

            </View>
        </View>
    );
};

const stylesHeader = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 100,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      fontSize: 16,
      color: 'blue',
    },
});

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
        drawerLabel={{ focused: false, color: 'blue' }} drawerIcon={{color: 'blue', size: 40 }}
        initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" options={DrawerHeader} component={Home} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;