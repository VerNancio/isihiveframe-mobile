import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";

const ProductDetail = ({ route }) => {

    const idProduct = route.params;

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{ fontSize: 16, color: '#092030', fontWeight: '800'}}>DETALHES DO PRODUTO</Text>
                    <Text style={{ fontSize: 12, color: '#7E7E7E'}}>Visualize, edite ou exclua as informações do produto.</Text>
                </View>
                <View style={styles.productInfoContainer}>
                    <StatementField styleProp statementTitle statement />
                </View>
                <View style={{alignItems: 'center'}}>
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
        alignItems: 'center',
        backgroundColor: '#fff',
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
    productInfoContainer: {
        height: '90%',
        width: '100%',
        paddingVertical: '3%',
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

export default ProductDetail;