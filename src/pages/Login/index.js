import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import jsonData from '../../data/login.json';

const LoginView = () => {

    const jsonLogin = jsonData;
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={{height: 80, resizeMode: 'contain'}} source={require('../../assets/image/LOGO-inst-tec-senai.png')} />
            </TouchableOpacity>
            <View>
                <InputField styleProp={stylesField} objState={setEmail} maxLength={30} fieldName="Email" placeholder="Insira seu email" />
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
        backgroundColor: '#F1F5F9',
        gap: 32,
        // backgroundColor: '#fff',
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

export default View;