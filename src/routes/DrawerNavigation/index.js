import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerItem, DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../../template/Home";
import WorkManagement from "../../template/WorkManagement";
import Config from "../../template/Config";
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
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
                        <Text style={{ fontSize: 25, fontWeight: '700' }}>
                            <Text style={{ color: '#3976D1' }}>HIVE</Text>
                            <Text style={{ color: '#1E293B' }}>FRAME</Text>
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation}>
                            <Icon color='#3976D1' name="bell-outline" size={30} />
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
                <View>
                    <TouchableOpacity>
                        <Image style={{height: 80, resizeMode: 'contain'}} source={require('../../assets/image/LOGO-inst-tec-senai.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userContent}>
                    <TouchableOpacity>
                        <Image style={styles.userProfilePhoto} source={require('../../assets/image/teste/asukaringa.jpg')} />
                    </TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 20, color: '#1E293B', fontWeight: '800'}}>Asuka_Strikes</Text>
                            <Text style={{ fontSize: 13, color: '#7E7E7E'}}>venan07@gmail.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerItem
                    icon={({color = 'black', size = 40}) => (
                        <Icon 
                        name="home"
                        color={color}
                        size={size}
                        />
                    )} 
                    label={"Home"}
                    onPress={() => { navigation.navigate('Home') }}
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
                onPress={() => { navigation.navigate('WorkManagement') }}
                />
                <DrawerItem
                icon={({color, size}) => (
                    <Icon 
                    name="cog"
                    color={color}
                    size={size}
                    />
                )} 
                label={"Configurações"}
                onPress={() => { navigation.navigate('Config') }}
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

const styles = StyleSheet.create({
    userContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userProfilePhoto: {
        height: 70,
        width: 70,
        borderRadius: 100,
        resizeMode: 'contain',
    },
});

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
        drawerLabel={{ focused: false, color: 'blue' }} drawerIcon={{color: 'blue', size: 40 }}
        initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" options={DrawerHeader} component={Home} />
            <Drawer.Screen name="WorkManagement" options={DrawerHeader} component={WorkManagement} /> 
            <Drawer.Screen name="Config" options={DrawerHeader} component={Config} /> 
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;