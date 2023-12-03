import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';

import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";
import DropdownComponent from "../../components/DropdownComponent";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import showToast from "../../assets/toast";

import LoadingLogo from "../../components/Loading";

import { HoursRequest } from "../../requests/hours";
import { UserRequest } from "../../requests/user";


const HoursReq = new HoursRequest();
const UserReq = new UserRequest;

const HourLogDetailView = ({ route }) => {

    const navigation = useNavigation();

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const { idCargaHoraria } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    const [hourLog, setHourLog] = useState({});

    useEffect(() => {
        
        const fetchData = async () => {

            // Pegando o token jwt
            const token = await UserReq.getUserData(false, 'authToken');

            await HoursReq.getHourLog(setHourLog, idCargaHoraria, token);

            setIsLoading(false);
        }
        
        fetchData();
    }, []);



    return (
        <ScrollView style={{ backgroundColor: themeColor("secondaryBg") }}>
            <View style={[styles().container]}>

                {

                isLoading

                ?

                <View style={{ flex: 1, justifyContent: 'center', height: 350 }}>
                    <LoadingLogo width={80} height={80} isLoading={true} blockView={false} style={{ position: 'relative' }}/>
                </View>

                :

                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 22, color: themeColor("title"), fontWeight: '700' }}>HORA LANÇADA</Text>
                        <Text style={{ fontSize: 13, color: themeColor("grayText")}}>Visualize as informações de lançamento de hora</Text>
                    </View>
                    <View style={[styles().hourInfoContainer, {backgroundColor: themeColor("primaryBg")}]}>
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="NOME DO PRODUTO:" statement={hourLog['NomeProduto']} />
                        {/* <StatementField styleProp={stylesFieldContainer()} statementTitle="ID CARGA HORARIA:" statement={hourLog['idCargaHoraria']} /> */}

                        <StatementField styleProp={stylesFieldContainer()} widthByPerc={'100%'} statementTitle="NIF TÉCNICO:" statement={hourLog['fk_nifTecnico']} />
                        
                        <StatementField styleProp={stylesFieldContainer()} widthByPerc={'100%'} statementTitle="DATA DE LANÇAMENTO:" statement={hourLog['Datas']} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="HORAS-PESSOA:" statement={hourLog['HorasPessoa']} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="HORAS-MÁQUINA:" statement={hourLog['HorasMaquina']} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DATA DE INÍCIO:" statement={hourLog['DataInicial']} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DATA DE TÉRMINO:" statement={hourLog['DataFinal']} />
                        </View>

                        {/* <StatementField styleProp={stylesFieldContainer()} statementTitle="DATAS:" statement={hourLog['Datas']} /> */}
                        {/* <StatementField styleProp={stylesFieldContainer()} statementTitle="NIF TÉCNICO:" statement={hourLog['fk_nifTecnico']} /> */}
                        {/* <StatementField styleProp={stylesFieldContainer()} statementTitle="ID PRODUTO:" statement={hourLog['fk_idProduto']} /> */}
                        
                    </View>

                    {/* <View>
                       { hourLog['Status'] == 'Concluido'

                       ?
                       <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", {...hourLog['idProdut o']} ) } style={styles().bttnSubmit}>
                            <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Ir para o produto</Text>
                        </TouchableOpacity>
                       :
                        <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", {...hourLog['idProdut o']} ) } style={styles().bttnSubmit}>
                            <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Ir para o produto</Text>
                        </TouchableOpacity>
                       
                       }
                    </View> */}
                </View>

                }
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
            gap: 22,
        },
        hourInfoContainer: {
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

export default HourLogDetailView;