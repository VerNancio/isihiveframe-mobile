import { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DrawerItem, DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from '../../context/Theme'; 

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LogoSvg from "../../assets/image/logo.svg";

import HomeTemplate from "../../template/HomeTemplate";
import ProfileTemplate from "../../template/ProfileTemplate";
import ConfigTemplate from "../../template/ConfigTemplate";

import { ProfilePic } from "../../components/ProfilePic";
import ReminderList from "../../components/ReminderList";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserRequest } from "../../requests/user";

// 


const UserReq = new UserRequest();

const DrawerHeader = () => {

    const navigation = useNavigation();
    const route = useRoute();

    //

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark]
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style]

    //

    const returnToHome = () => navigation.navigate("Home");
    

    return (
        {
        headerStyle: {
            backgroundColor: themeColor('primaryBg'), 
        },
        headerTintColor: themeColor('primary'), 
        headerTitle: () => {
            return (
                <View style={{ width: (Dimensions.get('window').width)/100 * 76 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }} onPress={() => returnToHome()}>
                        <LogoSvg width={40} height={40} />
                        <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: '1.5%' }}>
                                <Text style={{ color: themeColor('primary') }}>HIVE</Text>
                                <Text style={{ color: themeColor('secondary') }}>FRAME</Text>
                            </Text>
                        </TouchableOpacity>
                        { /* 
                        <View style={{ flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => navigation}>
                                <Icon color={themeColor('primary')} name="bell-outline" size={30} />
                            </TouchableOpacity>
                        </View> 
                        */ }
                    </View>
                </View>
                
              );
        }, 
    }
    );
};

const CustomDrawerContent = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    const drawerItemColor = theme === 'light' ? themeColor("grayText") : themeColor("primary");


    //

    const navigation = useNavigation();

    const scrollViewRef = useRef(null);


    //


    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userNIF, setUserNIF] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            // User name e formatação
            const name = await UserReq.getUserData(false, 'userName')

            const splitedName = name.split(' ');
            setUserName(`${splitedName[0]} ${splitedName[1][0]}.`);

            // NIF e email

            UserReq.getUserData(setUserEmail, 'userEmail');
            UserReq.getUserData(setUserNIF, 'userNIF');
            UserReq.getProfilePicRequest(userNIF);
        }
        
        fetchData();
    }, []);


    //

    // const goToHome = () => {

    //     navigation

    //     navigation.navigate("Home");
    // }


    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView ref={scrollViewRef} style={{backgroundColor: themeColor("primaryBg")}}>

                <View style={stylesHeader.headerContainer}>
                    <TouchableOpacity style={stylesHeader.headerLogo} onPress={() => {navigation.navigate("Home")}}>
                        <LogoSvg width={48} height={48} />
                        <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: '0.5%' }}>
                            <Text style={{ color: themeColor('primary') }}>HIVE</Text>
                            <Text style={{ color: themeColor('secondary') }}>FRAME</Text>
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles().menuContent}>

                    <View style={styles().navSection}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
                            <View style={styles().userContent}>
                                <View>
                                    <ProfilePic static={true} style={styles().userProfilePhoto} />
                                </View>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{ fontSize: 20, color: themeColor("primaryText"), fontWeight: '800'}}>{userName}</Text>
                                    <Text style={{ fontSize: 13, color: themeColor("grayText")}}>{userEmail}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles().navSection}>
                    
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
                        label={"Config"}
                        labelStyle={{color: drawerItemColor}}
                        onPress={() => { navigation.navigate('Config') }}
                        />
                    </View>

                    <ReminderList scrollRef={scrollViewRef}/>

                </View>
            </DrawerContentScrollView>

            <View style={[styles().exitSection, {backgroundColor: themeColor("primaryBg")}]}>
                <DrawerItem 
                    icon={({size}) => (
                        <Icon 
                        name="exit-to-app"
                        color={drawerItemColor}
                        size={size}
                        />
                    )} 
                    label={"Sair da conta"}
                    labelStyle={{color: drawerItemColor}}
                    onPress={ async () => {
                        await AsyncStorage.clear();
                        navigation.replace('Login')
                    }}
                />
            </View>
        </View>
    );
};

const stylesHeader = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        paddingVertical: '4%',
        paddingHorizontal: '8%',
        marginBottom: '8%'
    },
    headerLogo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
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

const styles = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


    //
    
    return StyleSheet.create({
        menuContent: {
            paddingHorizontal: '8%',
            gap: 6,
        },
        navSection: {
            justifyContent: 'center',
            gap: 4,
            paddingVertical: '6%',
            paddingHorizontal: '8%',
            borderRadius: 15,
            backgroundColor: themeColor('secondaryBg'),
            
        },
        upperPart: {
            gap: 0
        },
        userContent: {
            flexDirection: 'row',
            gap: 10,

            backgroundColor: themeColor('secondaryBg'),
            borderRadius: 15,
        },
        userProfilePhoto: {
            height: 46,
            width: 46,
            borderRadius: 100,
            resizeMode: 'contain',
        },
        exitSection: {
            paddingBottom: '3%',
            paddingHorizontal: '8%'
        },
    });
}

const Aa = () => {

    return (
        <View>
            <Text>sjjsj</Text>
        </View>
    )
}

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