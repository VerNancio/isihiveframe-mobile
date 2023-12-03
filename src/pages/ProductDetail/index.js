import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';

import InputField from "../../components/InputField";
import StatementField from "../../components/StatementField";
import DropdownComponent from "../../components/DropdownComponent";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LoadingLogo from "../../components/Loading";

import { differenceInDays, parse} from 'date-fns';
import { ProductRequest } from "../../requests/products";
import { HoursRequest } from "../../requests/hours";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserRequest } from "../../requests/user";
import Toast from "react-native-toast-message";



const ProductReq = new ProductRequest();
const HoursReq = new HoursRequest();
const UserReq = new UserRequest();

const ProductDetailView = ({ route }) => {


    const navigation = useNavigation();

    //


    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const [userNif, setUserNif] = useState(null);
    const { productId } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    const [productDetails, setProductDetails] = useState({})

    const [hoursDayPerson, setHoursDayPerson] = useState(null);
    const [hoursDayMach, setHoursDayMach] = useState(null);

    const [authToken, setAuthToken] = useState(null);

    
    useEffect(() => {
        
        const fetchData = async () => {

            try {

                // Pegando o token jwt
                const token = await UserReq.getUserData(false, 'authToken');
                setAuthToken(token)

                await ProductReq.getProductDetailRequest(setProductDetails, productId, token);

                const nif = await UserReq.getUserData(false, 'userNIF');
                setUserNif(nif);


                const workedHoursDay = await HoursReq.getWorkedHoursDayRequest(
                    {
                        setHoursDayPerson: setHoursDayPerson, 
                        setHoursDayMach: setHoursDayMach
                    }, 
                    nif, productId, token);

                // alert('sjsj')
                // console.log(workedHoursDay)
                // setHoursDayPerson(hoursDay);
                // setHoursDayMach(hoursMach);

                setIsLoading(false);
            }
            catch (err) {

                console.log('errooooo: ', err)

                Toast.show({
                    type: 'error',
                    props: { 
                        title: 'Falha ao puxar dados do produto',
                        style: { marginTop: 300 }
                    }
                });

                navigation.goBack();
            }

            
        }

        
        fetchData();
    }, []);



    // Formato da string de data (yyyy/MM/dd)
    const dateFormat = 'yyyy-MM-dd';
    const parsedDate = parse(productDetails['DataFinal'], dateFormat, new Date());

    // Dias úteis
    const workingDays = differenceInDays(parsedDate, new Date())

                        
    //

    const [hoursPerson, setHoursPerson] = useState(0);
    const [hoursMach, setHoursMach] = useState(0);


    const postWorkedHours = async () => {

        if (hoursPerson == 0 && hoursMach == 0) {

            Toast.show({
                type: 'warning',
                props: { 
                    title: 'Mínimo de uma hora trabalhada para salvar',
                    style: { marginTop: 300 }
                }
            });

            return
        }

        try {

            setIsLoading(true);

            const res = await HoursReq.postHoursRequest(hoursPerson, hoursMach, productId, userNif, authToken);


            if (res.mensagem == 'Horas lançadas com sucesso') {

                Toast.show({
                    type: 'success',
                    props: { 
                        // text: 'Horas salvas com sucesso!',
                        title: res.mensagem,
                        style: { marginTop: 300 }
                    }
                });

                setIsLoading(false);

                navigation.navigate('Products');
                
            } 
            else {

                alert('ssjsj')

                Toast.show({
                    type: 'warning',
                    props: { 
                        // text: 'Horas salvas com sucesso!',
                        title: res.mensagem,
                        style: { marginTop: 300 }
                    }
                });

                setIsLoading(false);

            }
            
        }
        catch (err) {

            console.log('erro: ', err)

            Toast.show({
                type: 'error',
                props: { 
                    title: 'Erro ao salvar horas trabalhadas',
                    style: { marginTop: 300 }
                }
            });

            setIsLoading(false);

        }
    };


    //

    const concludeProduct = async () => {


        if (productDetails['HorasPessoa'] == 0 && productDetails['HorasMaquina'] == 0) {

            Toast.show({
                type: 'warning',
                props: { 
                    title: 'Não foi trabalhado o mínimo de necessárias (1 hora)',
                    style: { marginTop: 300 }
                }
            });

            return
        }

        try {

            const res = await ProductReq.concludeProductRequest(productId, authToken);
            console.log(res)


            if (res.status === 'success') {

                Toast.show({
                    type: 'success',
                    props: { 
                        title: 'Produto concluído com sucesso!',
                        style: { marginTop: 300 }
                    }
                });
    
            } 
            else if (res.status === 'error') {

                Toast.show({
                    type: 'error',
                    props: { 
                        title: res.mensagem,
                        style: { marginTop: 300 }
                    }
                });
            }

            navigation.navigate('Products');

        }
        catch (err){

            Toast.show({
                type: 'error',
                props: { 
                    title: 'Erro ao concluir produto',
                    style: { marginTop: 300 }
                }
            });
        }
    };

    return (
        
        isLoading

        ?

        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: themeColor("secondaryBg") }}>
            <LoadingLogo width={80} height={80} isLoading={true} blockView={false} style={{ position: 'relative' }}/>
        </View>
        
        :
        
        <ScrollView style={{ flex: 1 }}>
            <View style={[styles().container, {backgroundColor: themeColor("secondaryBg")}]}>
                <View style={{gap: 12}}>
                    <View>
                        <Text style={{ fontSize: 22, color: themeColor("title"), fontWeight: '700' }}>DETALHES DO PRODUTO</Text>
                        <Text style={{ fontSize: 13, color: themeColor("grayText")}}>Visualize as informações do produto</Text>
                    </View>
                    <View style={[styles().productInfoContainer, {backgroundColor: themeColor("primaryBg")}]}>
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="NOME DO PRODUTO:" statement={productDetails['NomeProduto']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="NOME DO TÉCNICO:" statement={productDetails['Nome']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="MÁQUINA:" statement={productDetails['Maquina']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="ÁREA DO SERVIÇO:" statement={productDetails['Area']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="CATEGORIA DO SERVIÇO:" statement={productDetails['ServicoCategoria']} />
                        <StatementField styleProp={stylesFieldContainer()} statementTitle="STATUS:" statement={productDetails['Situacao']} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="HORAS-PESSOA:" statement={productDetails['HoraPessoa']} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="HORAS-MÁQUINA:" statement={productDetails['HoraMaquina']} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DATA DE INÍCIO:" statement={productDetails['DataInicial']} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DATA DE TÉRMINO:" statement={productDetails['DataFinal']} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="DIAS ÚTEIS" statement={`${workingDays * (workingDays < 0 ? 0 : 1)} d`} />
                            <StatementField styleProp={stylesFieldContainer()} widthByPerc={'50%'} statementTitle="VALOR:" statement={"R$ ".concat(productDetails['Valor'])} />
                        </View>
                    </View>
                </View>
                <View style={{gap: 10}}>
                    <View>
                        <Text style={{ fontSize: 20, color: themeColor("title"), fontWeight: '700'}}>LANÇAMENTO DE HORAS TRABALHADAS</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Insira a quantidade de horas trabalhadas no produto</Text>
                    </View>
                    <View>
                        <DropdownComponent setState={setHoursPerson} statementTitle="LANÇAR HORAS-PESSOA TRABALHADAS:" statement={productDetails['productName']} />
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-PESSOA ACUMULADAS (DIA):" statement={hoursDayPerson} />
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-PESSOA TOTAL:" statement={productDetails['HorasPessoa']} />
                    </View>
                </View>
                <View style={{gap: 10}}>
                    <View>
                        <Text style={{ fontSize: 20, color: themeColor("title"), fontWeight: '700'}}>LANÇAMENTO DE HORAS-MÁQUINA</Text>
                        <Text style={{ fontSize: 13, color: '#7E7E7E'}}>Insira a quantidade de horas-máquina trabalhadas no produto</Text>
                    </View>
                    <View>
                        <DropdownComponent setState={setHoursMach} statementTitle="LANÇAR HORAS-MÁQUINA TRABALHADAS:" statement={productDetails['productName']} />
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-MÁQUINA ACUMULADAS (DIA):" statement={hoursDayMach} />
                        <StatementField styleProp={stylesField()} statementTitle="HORAS-MÁQUINA TOTAL:" statement={productDetails['HorasMaquina']} />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => postWorkedHours()} 
                    style={[styles().bttnSubmit, 
                    (hoursPerson != 0 || hoursMach != 0 ? 
                    {backgroundColor: themeColor('primary')} 
                    : 
                    {backgroundColor: themeColor('primaryDisabled')}
                    )]}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => concludeProduct()} 
                    style={[styles().bttnSubmit, 
                    (
                    productDetails['HorasPessoa'] != 0 || productDetails['HorasMaquina'] != 0 ? 
                    {backgroundColor: themeColor('successColor')} 
                    : 
                    {backgroundColor: `${themeColor('successColor')}80`}
                    )]}>
                        <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Finalizar produto</Text>
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
    
    return StyleSheet.create ({
        container: {
            flex: 1,
            paddingTop: '8%',
            paddingBottom: '8%',
            paddingHorizontal: '6%',
            gap: 32
        },
        productInfoContainer: {
            width: '100%',
            paddingVertical: '5%',
            paddingHorizontal: '8%',
            borderRadius: 10,
        },
        bttnSubmit: {
            height: 54,
            width: '100%',
            marginTop: 20,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        bttnSubmitEnabled: {
            backgroundColor: themeColor('primary'),
        }, 
        bttnSubmitDisabled: {
            backgroundColor: themeColor('primaryDisabled'),
        }
    });
}


const stylesFieldContainer = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    return StyleSheet.create({
        
        field: {
            // width: '',
            // height: 56, 
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
            color: themeColor("primaryText"),
            backgroundColor: themeColor("inputBg"),
        },
    });
}


export default ProductDetailView;