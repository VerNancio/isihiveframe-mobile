import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";
import jsonData from '../../data/product.json';

const ProductDetail = ({ route }) => {

    const idProduct = route.params;

    const jsonDetails = jsonData[0];

    const [isBttnDisabled, setDisableState] = useState(false)

    const trySave = () => {
        console.log('aaa')
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{}}>
                    <Text style={{ fontSize: 20, color: '#092030', fontWeight: '700'}}>DETALHES DO PRODUTO</Text>
                    <Text style={{ fontSize: 12, color: '#7E7E7E'}}>Visualize, edite ou exclua as informações do produto.</Text>
                </View>
                <View style={styles.productInfoContainer}>
                    <StatementField styleProp={stylesField} statementTitle="NOME DO PRODUTO:" statement={jsonDetails['productName']} />
                    <StatementField styleProp={stylesField} statementTitle="NOME DO TÉCNICO:" statement={jsonDetails['technician']} />
                    <StatementField styleProp={stylesField} statementTitle="MÁQUINA:" statement={jsonDetails['machinery']} />
                    <StatementField styleProp={stylesField} statementTitle="ÁREA DO SERVIÇO:" statement={jsonDetails['serviceArea']} />
                    <StatementField styleProp={stylesField} statementTitle="CATEGORIA DO SERVIÇO:" statement={jsonDetails['serviceCategory']} />
                    <StatementField styleProp={stylesField} statementTitle="UNIDADES:" statement={jsonDetails['unitQnt']} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <StatementField styleProp={stylesField} widthByPerc={'50%'} statementTitle="HORAS-PESSOA:" statement={jsonDetails['hours-person']} />
                        <StatementField styleProp={stylesField} widthByPerc={'50%'} statementTitle="HORAS-MÁQUINA:" statement={jsonDetails['hours-mach']} />
                    </View>
                    <StatementField styleProp={stylesField} statementTitle="VALOR:" statement={"R$ ".concat(jsonDetails['value'])} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <StatementField styleProp={stylesField} widthByPerc={'50%'} statementTitle="DATA DE INÍCIO:" statement={jsonDetails['startDate']} />
                        <StatementField styleProp={stylesField} widthByPerc={'50%'} statementTitle="DATA DE TÉRMINO:" statement={jsonDetails['deliveryDate']} />
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 16, color: '#092030', fontWeight: '800'}}>LANÇAMENTO DE HORAS TRABALHADAS</Text>
                    <Text style={{ fontSize: 12, color: '#7E7E7E'}}>Insira a quantidade de horas trabalhadas no produto.</Text>
                </View>
                <TouchableOpacity disabled={isBttnDisabled} onPress={trySave} 
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
        gap: 14
    },
    productInfoContainer: {
        height: '90%',
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

const stylesField = StyleSheet.create({
    field: {
        // justifyContent: 'flex-start',
        width: '',
        height: 60, 
        gap: 6,
        marginVertical: 5,
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

export default ProductDetail;