import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { useTheme } from "../../context";
import themeColors from '../../assets/styles/color/colors.json';

import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";
import DropdownComponent from "../../components/DropdownComponent";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import showToast from "../../assets/toast";

import jsonData from '../../data/product.json';

const ProductDetailView = ({ route }) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const idProduct = route.params;

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
        <ScrollView style={{ flex: 1 }}>
            <View style={[styles().container, {backgroundColor: themeColor("secondaryBg")}]}>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 22, color: themeColor("title"), fontWeight: '700' }}>DETALHES DO PRODUTO</Text>
                        <Text style={{ fontSize: 13, color: themeColor("grayText")}}>Visualize, edite ou exclua as informações do produto.</Text>
                    </View>
                    <View style={[styles().productInfoContainer, {backgroundColor: themeColor("primaryBg")}]}>
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="NOME DO TÉCNICO:" statement={jsonDetails['technician']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="MÁQUINA:" statement={jsonDetails['machinery']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="ÁREA DO SERVIÇO:" statement={jsonDetails['serviceArea']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="CATEGORIA DO SERVIÇO:" statement={jsonDetails['serviceCategory']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="UNIDADES:" statement={jsonDetails['unitQnt']} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="HORAS-PESSOA:" statement={jsonDetails['hours-person']} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="HORAS-MÁQUINA:" statement={jsonDetails['hours-mach']} />
                        </View>
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="VALOR:" statement={"R$ ".concat(jsonDetails['value'])} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DATA DE INÍCIO:" statement={jsonDetails['startDate']} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DATA DE TÉRMINO:" statement={jsonDetails['deliveryDate']} />
                        </View>
                    </View>
                </View>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 20, color: themeColor("title"), fontWeight: '700'}}>LANÇAMENTO DE HORAS TRABALHADAS</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Insira a quantidade de horas trabalhadas no produto.</Text>
                    </View>
                    <View>
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-PESSOA TOTAL:" statement={jsonDetails['productName']} />
                        <DropdownComponent styleProp={stylesDropdown()} statementTitle="HORAS TRABALHADAS (DIA):" statement={jsonDetails['productName']} />
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-PESSOA ACUMULADAS:" statement={jsonDetails['productName']} />
                    </View>
                </View>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 20, color: themeColor("title"), fontWeight: '700'}}>LANÇAMENTO DE HORAS-MÁQUINA</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Insira a quantidade de horas-máquina trabalhadas no produto.</Text>
                    </View>
                    <View>
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-MÁQUINA TOTAL:" statement={jsonDetails['productName']} />
                        <DropdownComponent styleProp={stylesDropdown()} statementTitle="HORAS-MÁQUINA TRABALHADAS (DIA):" statement={jsonDetails['productName']} />
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-MÁQUINA ACUMULADAS:" statement={jsonDetails['productName']} />
                    </View>
                </View>
                <TouchableOpacity disabled={isBttnDisabled} onPress={trySave} 
                style={[styles().bttnSubmit, (isBttnDisabled ? styles.bttnSubmitDisabled : styles.bttnSubmitEnabled) ]}>
                    <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];
    
    return StyleSheet.create ({
        container: {
            flex: 1,
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
}


const stylesFieldContainer = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    return StyleSheet.create({
        
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
            color: themeColor("grayText"),
        },
        input: {
            fontSize: 20,
            fontWeight: '700',
            color: themeColor("primaryText"),
            width: '100%',
        },
    });
}

const stylesField = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    return StyleSheet.create({
        field: {
            gap: 6,
            // marginVertical: 8,
            marginTop: 14,
        },
        fieldName: {
            fontSize: 16,
            fontWeight: '700',
            color: themeColor("primaryText"),
        },
        input: {
            width: '100%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 14,
            paddingHorizontal: '5%',
            borderRadius: 8,
            fontSize: 20,
            // fontWeight: '300',
            color: themeColor("primaryText"),
            backgroundColor: themeColor("inputBg"),
        },
    });
}


const stylesDropdown = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];
    
    return StyleSheet.create({
        field: {
            gap: 6,
            marginTop: 14,
        },
        fieldName: {
            fontSize: 16,
            fontWeight: '700',
            color: themeColor("primaryText"),
        },
        dropdown: {
            paddingVertical: 14,
            paddingHorizontal: '5%',
            backgroundColor: themeColor("inputBg"),
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
            color: themeColor("primaryText"),
        },
        placeholderStyle: {
            backgroundColor: themeColor("inputBg"),
            borderRadius: 8,
            color: themeColor("primaryText"),
        },
        selectedTextStyle: {
            backgroundColor: themeColor("inputBg"),
            borderRadius: 8,
            color: themeColor("primaryText"),
        },
    });
}

export default ProductDetailView;