import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from '../../context/Theme'; 

import StatementField from "../../components/StatementField";

import ThemeSwitcher from "../../components/ThemeSwitcher";
import JwtComponent from "../../components/JwtComponent";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import showToast from "../../assets/toast";

import JwtSvg from "../../assets/image/jwt_icon.svg";

import { LoginRequest } from "../../requests/login";
import { UserRequest } from "../../requests/user";


const LoginReq = new LoginRequest();
const UserReq = new UserRequest();

const SettingsView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const [isBttnDisabled, setDisableState] = useState(false);


    // Token JWT armazenado
    const [userToken, setUserToken] = useState(null);

    // Datetime de expiração do token
    const [tokenExp, setTokenExp] = useState(null);


    const setWhenTokenExpires = () => {

        LoginReq.getWhenTokenExp(userToken);

        return;
    }


    useEffect( async() => {

        // Pegando o token jwt
        const token = await UserReq.getUserData(setUserToken, 'authToken');
        // setUserToken(token);

        setWhenTokenExpires();

    },[])

    

    const trySave = () => {

        // const toastParams = {
        //     type: 'success',
        //     title: 'Configurações atualizadas com sucesso!',
        //     text2: 'params.text2'
        // };

        // if (true) {
        //     showToast(toastParams);
        //     return
        // }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: themeColor('secondaryBg') }}>
            <View style={[styles().container]}>
                <View style={[styles().settingsField, { backgroundColor: themeColor('primaryBg') }]}>
                    <ThemeSwitcher />
                </View>
                <View style={[styles().settingsField, { backgroundColor: '#05131C' }]}>
                    <JwtComponent />
                </View>
            </View>
            

        </ScrollView>
    );
}

const styles = () => {
    
    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    return StyleSheet.create ({
        container: {
            paddingVertical: '8%',
            paddingHorizontal: '6%',
            gap: 22
        },
        productInfoContainer: {
            width: '100%',
            paddingVertical: '5%',
            paddingHorizontal: '8%',
            borderRadius: 10,
            backgroundColor: themeColor('secondaryBg'),
        },
        settingsField: {
            width: '100%',
            borderRadius: 12,
            gap: 20,
            backgroundColor: themeColor('primaryBg'),
        },
        bttnSubmit: {
            height: 45,
            width: '100%',
            marginTop: 18,
            borderRadius: 8,
            backgroundColor: '#3976D1',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bttnSubmitEnabled: {
            backgroundColor: '#3976D1',
        }, 
        bttnSubmitDisabled: {
            backgroundColor: '#3976D180',
        }
    })
};

// const stylesFieldContainer = StyleSheet.create({
//     field: {
//         // justifyContent: 'flex-start',
//         width: '',
//         height: 56, 
//         gap: 6,
//         marginVertical: 8,
//     },
//     fieldName: {
//         fontSize: 14,
//         fontWeight: '700',
//         color: '#7E7E7E',
//     },
//     input: {
//         fontSize: 20,
//         fontWeight: '700',
//         color: '#122736',
//         width: '100%',
//     },
// });



export default SettingsView;