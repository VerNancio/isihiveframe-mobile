import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';
// import showToast from '../../assets/toast';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import InputField from '../../components/InputField';

import { LoginRequest } from '../../requests/login';
import Toast from 'react-native-toast-message';

import LoadingLogo from '../../components/Loading';

const LoginReq = new LoginRequest();

const LoginView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const emailInputRef = useRef(null);

    const [password, setPassword] = useState('');
    const pwInputRef = useRef(null);

    const [hidePw, setHidePw] = useState(true);

    const tryLogin = async () => {


        if (email.length < 3) {
            Toast.show({
                type: 'warning',
                props: { 
                    title: 'Email precisa ter mais que 3 caracteres',
                    style: { marginTop: 300 },
                    darkTheme: theme !== 'light'
                }
            });
            return
        }

        if (password.length < 8) {
            Toast.show({
                type: 'warning',
                props: { 
                    text: 'Senha precisa ter mais que 8 caracteres',
                    style: { marginTop: 300 }
                }
            });
            return
        }


        //
    
        setIsLoading(true);

        const res = await LoginReq.tryLogin(`${email}@sp.senai.br`, password);


        setTimeout( async () => {

            if (res.login) {

                try {

                    await LoginReq.storeUserSession({...res, email: `${email}@sp.senai.br`})

                    Toast.show({
                        type: 'success',
                        props: { 
                            title: res.mensagem,
                            style: { marginTop: 300 },
                            darkTheme: theme !== 'light'
                        }
                    });

                    setTimeout(() => {

                        Toast.hide()
                        navigation.replace('Main')
                    }, 1000)
                    
                } 
                catch (err) {

                    alert('ss')

                    Toast.show({
                        type: 'error',
                        props: { 
                            title: 'Erro ao efetuar o login',
                            style: { marginTop: 300 },
                            darkTheme: theme !== 'light'
                        }
                    });

                }
                finally {

                    setIsLoading(false);
                }
    
            } else {

                setIsLoading(false);
    
                Toast.show({
                    type: 'error',
                    props: { 
                        title: 'Credênciais incorretas',
                        style: { marginTop: 300 },
                        darkTheme: theme !== 'light'
                    }
                });

            }
        }, 2200);

    };


    const inputRef = useRef(null);

    const handleFocus = (elemFocused) => {
        // Aplicar estilos quando o TextInput está em foco
        // elemFocused.current.setNativeProps({
        //     style: stylesField().inputFocused,
        // });
    };

    const handleBlur = (elemBlured) => {
        // Remover estilos quando o TextInput perde o foco
        // elemBlured.current.setNativeProps({
        //     style: stylesField().input,
        // });
    };


    return(
        <View style={[styles.container, {backgroundColor: themeColor("secondaryBg")}]}>

            <LoadingLogo width={80} height={80} isLoading={isLoading} blockView={true} style={{ position: 'absolute'}}/>

            <TouchableOpacity>
                <Image style={{height: 55, resizeMode: 'contain'}} source={require('../../assets/image/isi.png')} />
            </TouchableOpacity>
            <View style={styles.inputsBox}>
                <View style={stylesField().field}>
                    <Text style={stylesField().fieldName}>Email: </Text>
                    <View ref={emailInputRef} onFocus={handleFocus(emailInputRef)} onBlur={handleBlur(emailInputRef)}
                        style={[stylesField().input,  {flexDirection: 'row'}]}>
                        <TextInput placeholderTextColor={themeColor('grayText')} style={ stylesField().inputText } onChangeText={(text) => setEmail(text)} maxLength={20} placeholder={"Insira sua senha"}></TextInput>      
                        <Text style={{ color: themeColor("primaryHigh"), alignContent: 'center' }}>@sp.senai.br</Text>
                    </View>
                </View>
               
                <View style={stylesField().field}>
                    <Text style={stylesField().fieldName}>Senha: </Text>
                    <View ref={pwInputRef} onFocus={handleFocus(pwInputRef)} onBlur={handleBlur(pwInputRef)}
                        style={[stylesField().input, {flexDirection: 'row'}]}>
                        <TextInput placeholderTextColor={themeColor('grayText')} style={ stylesField().inputText } secureTextEntry={hidePw} onChangeText={(text) => setPassword(text)} maxLength={20} placeholder={"Insira sua senha"}></TextInput>      
                        <TouchableOpacity onPress={() => hidePw ? setHidePw(false) : setHidePw(true)}>
                            <Icon name={hidePw ? "eye-off" : "eye"} size={24} color={themeColor("primaryHigh")} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={tryLogin} style={[styles.bttnSubmit, { backgroundColor: themeColor('primary') }]}>
                    <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        gap: 130,
    },
    inputsBox: {
        width: '100%',
        paddingHorizontal: '12%',
        gap: 20
    },
    bttnSubmit: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
        marginTop: 20,
        borderRadius: 8,
    },
});

const stylesField = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    return StyleSheet.create({
        field: {
            width: '100%',
            gap: 6,
        },
        fieldName: {
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            color: themeColor('primaryText')
        },
        input: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: '5%',
            borderRadius: 8,
            backgroundColor: themeColor('primaryBg'),
        },
        inputFocused: {
            borderColor: 'blue',
            borderWidth: 2
        },
        inputText: {
            flex: 1,
            paddingHorizontal: '3%',
            fontSize: 16,
            color:  themeColor('primaryText'),
        }
    });
}

export default LoginView;