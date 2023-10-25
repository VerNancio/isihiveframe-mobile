import { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerItem, DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from '../../context'; 

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeTemplate from "../../template/HomeTemplate";
import ProfileTemplate from "../../template/ProfileTemplate";
import ConfigTemplate from "../../template/ConfigTemplate";


// 


const DrawerHeader = () => {

    const navigation = useNavigation();
    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark]
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style]

    return (
        {
        headerStyle: {
        backgroundColor: themeColor('primaryBg'), 
        },
        headerTintColor: themeColor('primary'), 
        headerTitle: () => {
            return (
                <View style={{ marginLeft: (Dimensions.get('window').width)/100 * 2, width: (Dimensions.get('window').width)/100 * 74 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', alignContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
                            <Text style={{ fontSize: 25, fontWeight: '700' }}>
                                <Text style={{ color: themeColor('primary') }}>HIVE</Text>
                                <Text style={{ color: themeColor('secondary') }}>FRAME</Text>
                            </Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => navigation}>
                                <Icon color={themeColor('primary')} name="bell-outline" size={30} />
                            </TouchableOpacity>
                        </View>
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
    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    const drawerItemColor = theme === 'light' ? themeColor("grayText") : themeColor("primary");

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView style={{backgroundColor: themeColor("primaryBg")}}>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                        <Image style={{height: 80, resizeMode: 'contain'}} source={require('../../assets/image/LOGO-inst-tec-senai.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userContent}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                        <Image style={styles.userProfilePhoto} source={require('../../assets/image/teste/asukaringa.jpg')} />
                    </TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                            <Text style={{ fontSize: 20, color: themeColor("primaryText"), fontWeight: '800'}}>Asuka_Strikes</Text>
                            <Text style={{ fontSize: 13, color: themeColor("grayText")}}>venan07@gmail.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DrawerItem
                icon={({size}) => (
                    <Icon 
                    name="home"
                    color={drawerItemColor}
                    size={size}
                    />
                )} 
                label={"Home"}
                labelStyle={{color: drawerItemColor}}
                onPress={() => { navigation.navigate('Home') }}
                />
                <DrawerItem
                icon={({size}) => (
                    <Icon 
                    name="account-circle"
                    color={drawerItemColor}
                    size={size}
                    />
                )} 
                label={"Perfil"}
                labelStyle={{color: drawerItemColor}}
                onPress={() => { navigation.navigate('Profile') }}
                />
                <DrawerItem
                icon={({size}) => (
                    <Icon 
                    name="cog"
                    color={drawerItemColor}
                    size={size}
                    />
                )} 
                label={"Configurações"}
                labelStyle={{color: drawerItemColor}}
                onPress={() => { navigation.navigate('Config') }}
                />
            </DrawerContentScrollView>
            <View style={{backgroundColor: themeColor("primaryBg")}}>
                <DrawerItem 
                    icon={({size}) => (
                        <Icon 
                        name="exit-to-app"
                        color={drawerItemColor}
                        size={size}
                        />
                    )} 
                    label={"Sign out"}
                    labelStyle={{color: drawerItemColor}}
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
        paddingHorizontal: '8%',
        gap: 10,
    },
    userProfilePhoto: {
        height: 50,
        width: 50,
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
            <Drawer.Screen name="Home" options={DrawerHeader} component={HomeTemplate} />
            <Drawer.Screen name="Profile" options={DrawerHeader} component={ProfileTemplate} /> 
            <Drawer.Screen name="Config" options={DrawerHeader} component={ConfigTemplate} /> 
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;