import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";
import DropdownComponent from "../../components/DropdownComponent";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import showToast from "../../assets/toast";

import jsonData from '../../data/product.json';

const SettingsView = () => {

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
            <View style={styles.container}>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 22, color: '#092030', fontWeight: '700' }}>INFORMAÇÕES</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Visualize, edite ou exclua as informações do produto.</Text>
                    </View>
                    <View style={styles.productInfoContainer}>
                        <StatementField styleProp={stylesFieldContainer} statementTitle="NOME DO TÉCNICO:" statement={jsonDetails['technician']} />
                        <StatementField styleProp={stylesFieldContainer} statementTitle="MÁQUINA:" statement={jsonDetails['machinery']} />
                        <StatementField styleProp={stylesFieldContainer} statementTitle="ÁREA DO SERVIÇO:" statement={jsonDetails['serviceArea']} />
                        <StatementField styleProp={stylesFieldContainer} statementTitle="CATEGORIA DO SERVIÇO:" statement={jsonDetails['serviceCategory']} />
                        <StatementField styleProp={stylesFieldContainer} statementTitle="UNIDADES:" statement={jsonDetails['unitQnt']} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer} widthByPerc={'50%'} statementTitle="HORAS-PESSOA:" statement={jsonDetails['hours-person']} />
                            <StatementField styleProp={stylesFieldContainer} widthByPerc={'50%'} statementTitle="HORAS-MÁQUINA:" statement={jsonDetails['hours-mach']} />
                        </View>
                        <StatementField styleProp={stylesFieldContainer} statementTitle="VALOR:" statement={"R$ ".concat(jsonDetails['value'])} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer} widthByPerc={'50%'} statementTitle="DATA DE INÍCIO:" statement={jsonDetails['startDate']} />
                            <StatementField styleProp={stylesFieldContainer} widthByPerc={'50%'} statementTitle="DATA DE TÉRMINO:" statement={jsonDetails['deliveryDate']} />
                        </View>
                    </View>
                </View>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#092030', fontWeight: '700'}}>CONFIGURÇÕES DE LEMBRETE</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Insira a quantidade de horas trabalhadas no produto.</Text>
                    </View>
                    <View>
                        <StatementField styleProp={stylesField} statementTitle="HORAS-PESSOA TOTAL:" statement={jsonDetails['productName']} />
                        <DropdownComponent styleProp={stylesDropdown} statementTitle="HORAS TRABALHADAS (DIA):" statement={jsonDetails['productName']} />
                        <StatementField styleProp={stylesField} statementTitle="HORAS-PESSOA ACUMULADAS:" statement={jsonDetails['productName']} />
                    </View>
                </View>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#092030', fontWeight: '700'}}>TEMA</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Insira a quantidade de horas-máquina trabalhadas no produto.</Text>
                    </View>
                    <View>
                        <StatementField styleProp={stylesField} statementTitle="HORAS-MÁQUINA TOTAL:" statement={jsonDetails['productName']} />
                        <DropdownComponent styleProp={stylesDropdown} statementTitle="HORAS-MÁQUINA TRABALHADAS (DIA):" statement={jsonDetails['productName']} />
                        <StatementField styleProp={stylesField} statementTitle="HORAS-MÁQUINA ACUMULADAS:" statement={jsonDetails['productName']} />
                    </View>
                </View>
                <TouchableOpacity disabled={isBttnDisabled} onPress={() => trySave()} 
                style={[styles.bttnSubmit, (isBttnDisabled ? styles.bttnSubmitDisabled : styles.bttnSubmitEnabled) ]}>
                    <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#fff',
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