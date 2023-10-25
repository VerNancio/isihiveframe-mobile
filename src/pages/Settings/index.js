import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from '../../context'; 

import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";
import DropdownComponent from "../../components/DropdownComponent";
import ThemeSwitcher from "../../components/ThemeSwitcher";


import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import showToast from "../../assets/toast";

import jsonData from '../../data/product.json';

const SettingsView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const jsonDetails = jsonData[0];

    const [isBttnDisabled, setDisableState] = useState(false)

    const trySave = () => {

        const toastParams = {
            type: 'success',
            text1: 'Configurações atualizadas com sucesso!',
            text2: 'params.text2'
        };

        if (true) {
            showToast(toastParams);
            return
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: themeColor("primaryBg") }}>
            <View style={[styles.container, {backgroundColor: themeColor("secondaryBg")}]}>
                <ThemeSwitcher />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        height: 600,
        paddingTop: '8%',
        paddingBottom: '8%',
        paddingHorizontal: '6%',
        gap: 22
    },
    productInfoContainer: {
        width: '100%',
        paddingVertical: '5%',
        paddingHorizontal: '8%',
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
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
});

const stylesFieldContainer = StyleSheet.create({
    field: {
        // justifyContent: 'flex-start',
        width: '',
        height: 56, 
        gap: 6,
        marginVertical: 8,
    },
    fieldName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7E7E7E',
    },
    input: {
        fontSize: 20,
        fontWeight: '700',
        color: '#122736',
        width: '100%',
    },
});


const stylesField = StyleSheet.create({
    field: {
        gap: 6,
        // marginVertical: 8,
        marginTop: 14,
    },
    fieldName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#122736',
    },
    input: {
        width: '100%',
        backgroundColor: '#F1F5F9',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: '5%',
        borderRadius: 8,
        fontSize: 20,
        // fontWeight: '300',
        color: '#122736',
    },
});


const stylesDropdown = StyleSheet.create({
    field: {
        gap: 6,
        marginTop: 14,
    },
    fieldName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#122736',
    },
    dropdown: {
        paddingVertical: 14,
        paddingHorizontal: '5%',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
    selectedTextStyle: {
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
    },
});

export default SettingsView;