import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from "../../context";
import themeColors from '../../assets/styles/color/colors.json';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import InputField from '../../components/InputField';
import jsonData from '../../data/login.json';

const LoginView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const jsonLogin = jsonData;
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePw, setHidePw] = useState(true);

    const tryLogin = () => {

        if (email.length < 10) {
            console.log('email necessario ser maior que 10 caracteres')
            return
        }

        if (password.length < 8) {
            console.log('senha necessaria ser maior que 8 caracteres')
            return
        }

        for (let account of jsonLogin ) {
            console.log(account)
            if (email === account.email && password === account.password) {
                console.log(email)
                console.log(password)
                console.log('logado')

                navigation.replace('Main');
            } else {
                alert('login incorreto');
            }
        }
    };



    return(
        <View style={[styles.container, {backgroundColor: themeColor("primaryBg")}]}>
            <TouchableOpacity>
                <Image style={{height: 80, resizeMode: 'contain'}} source={require('../../assets/image/LOGO-inst-tec-senai.png')} />
            </TouchableOpacity>
            <View>
                <InputField styleProp={stylesField} objState={setEmail} maxLength={30} fieldName="Email" placeholder="Insira seu email" />
                {/* <View>
                    <TextInput  styleProp={stylesField} objState={setEmail} maxLength={30} fieldName="Email" placeholder="Insira seu email"/>
                    <TouchableOpacity>
                        { hidePw ? <Icon name="eye-off" size={24} color="white" /> : <Icon name="eye" size={24} color="white" />}
                    </TouchableOpacity>
                </View> */}
                <View style={stylesField.fieldName}>
                    <Text style={stylesField.fieldName}>Senha: </Text>
                    <View style={[stylesField.input, {flexDirection: 'row'}]}>
                        <TextInput secureTextEntry={hidePw} onChangeText={(text) => setPassword(text)} maxLength={20} placeholder={"Insira sua senha"}></TextInput>      
                        <TouchableOpacity onPress={() => hidePw ? setHidePw(false) : setHidePw(true)}>
                            <Icon name={hidePw ? "eye-off" : "eye"} size={24} color={themeColor("primaryHigh")} />
                        </TouchableOpacity>
                    </View>
                </View>
                <InputField styleProp={stylesField} objState={setPassword} maxLength={20} fieldName="Senha" placeholder="Insira sua senha" />
                <TouchableOpacity onPress={tryLogin} style={styles.bttnSubmit}>
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
        gap: 32,
    },
    bttnSubmit: {
        height: 45,
        marginTop: 28,
        borderRadius: 8,
        backgroundColor: '#3976D1',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const stylesField = StyleSheet.create({
    field: {
        // justifyContent: 'flex-start',
        width: 280,
        height: 60, 
        gap: 6,
        marginVertical: 10,
    },
    fieldName: {
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});

export default LoginView;