import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { useTheme } from "../../context";
import themeColors from '../../assets/styles/color/colors.json';

import InputField from "../../components/InputField";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import showToast from "../../assets/toast";

const AccountView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const currentName = '';
    const currentEmail = '';
    const currentPhone = '';

    const [name, setName] = useState(currentName);
    const [email, setEmail] = useState(currentEmail);
    const [phone, setPhone] = useState(currentPhone);

    const [isBttnDisabled, setDisableState] = useState(false);

    useEffect(() => {
        if (name != currentName || email != currentEmail || phone != currentPhone) {
            setDisableState(false);
            return;
        }

        setDisableState(true);

    }, [name, email, phone]);

    const trySave = () => {
        const toastParams = {
            type: 'success',
            text1: 'Informações atualizadas com sucesso!',
            text2: 'params.text2'
        };

        if (true) {
            showToast(toastParams);
            return
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={[styles().container, {backgroundColor: themeColor("secondaryBg")}]}>
                <TouchableOpacity>
                    <Image style={styles().userProfilePhoto} source={require('../../assets/image/teste/asukaringa.jpg')} />
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                    <Text style={{ fontSize: 24, color: themeColor("primaryHigh"), fontWeight: '800'}}>Asuka_Strikes</Text>
                    <Text style={{ fontSize: 16, color: themeColor("grayText")}}>Gerente</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <View style={styles().contactInfo}>
                        <TouchableOpacity>
                            <Icon color={themeColor("primaryHigh")} name="email-outline" size={30} />
                        </TouchableOpacity>
                        <Text style={{ color: themeColor("grayText") }}>doge@host.com</Text>
                    </View>
                    <View style={styles().contactInfo}>
                        <TouchableOpacity>
                            <Icon color={themeColor("primaryHigh")} name="phone-outline" size={30} />
                        </TouchableOpacity>
                        <Text style={{ color: themeColor("grayText") }}>(11) 95555-5555</Text>
                    </View>
                </View>
                <View style={[styles().userInfoContainer, {backgroundColor: themeColor("primaryBg")}]}>
                    <InputField styleProp={stylesField()} objState={setName} initValue={currentName} 
                                placeholderTextColor={themeColor("grayText")} maxLength={20} fieldName="Nome" placeholder="Insira seu nome" />

                    <InputField styleProp={stylesField()} objState={setEmail} initValue={currentEmail} 
                                placeholderTextColor={themeColor("grayText")} maxLength={20} fieldName="Email" placeholder="Insira seu email" />

                    <InputField styleProp={stylesField()} objState={setPhone} initValue={currentPhone} 
                                placeholderTextColor={themeColor("grayText")} maxLength={20} fieldName="Telefone" placeholder="Insira seu telefone" />

                    <TouchableOpacity disabled={isBttnDisabled} onPress={trySave} 
                    style={[styles().bttnSubmit, {backgroundColor: isBttnDisabled ? themeColor("primaryDisabled") : themeColor("primary")}]}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Salvar</Text>
                    </TouchableOpacity>
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
            flex: 1,
            alignItems: 'center',
            paddingTop: '8%',
            paddingBottom: '8%',
            paddingHorizontal: '6%',
            gap: 14
        },
        userProfilePhoto: {
            height: 150,
            width: 150,
            borderRadius: 100,
            resizeMode: 'contain',
        },
        contactInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6
        },
        userInfoContainer: {
            height: '56%',
            width: '100%',
            paddingVertical: '3%',
            paddingHorizontal: '8%',
            borderRadius: 10,
            backgroundColor: '#F1F5F9', // themeColor("secondaryBg")
        },
        bttnSubmit: {
            height: 45,
            width: '47%',
            marginTop: 18,
            borderRadius: 8,
            backgroundColor: '#3976D1',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
}

const stylesField = () =>  {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //
    
    return StyleSheet.create({
        field: {
            width: 280,
            height: 60, 
            gap: 6,
            marginVertical: 10,
        },
        fieldName: {
            fontSize: 16,
            fontWeight: '700',
            alignSelf: 'flex-start',
            color: themeColor("primaryText"),
        },
        input: {
            width: '100%',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
            color: themeColor("primaryText"),
            backgroundColor: themeColor("secondaryBg"),
        },
    });
}


export default AccountView;