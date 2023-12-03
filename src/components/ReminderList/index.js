import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as Animatable from 'react-native-animatable';

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';
import Toast from "react-native-toast-message";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { differenceInDays, parse } from 'date-fns';

import { ProductRequest } from "../../requests/products";
import { UserRequest } from "../../requests/user";


const HEIGHT = Dimensions.get('screen').height * 0.01;


const ProductsReq = new ProductRequest();
const UserReq = new UserRequest


//

const ReminderList = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    const drawerItemColor = theme === 'light' ? themeColor("grayText") : themeColor("primary");

    //


    const [isLoading, setIsLoading] = useState(true);

    const [productsData, setProductsData] = useState([]);



    // Ao renderizar...
    useEffect(() => {
        
        const fetchData = async () => {

            try {

                // Pegando o token jwt
                const token = await UserReq.getUserData(false, 'authToken');

                const userNIF = await UserReq.getUserData(false, 'userNIF');

                await ProductsReq.getReminderProductsRequest(setProductsData, userNIF, token);
            } 
            catch (err) {

                Toast.show({
                    type: 'error',
                    props: { 
                        title: 'Erro ao puxar produtos',
                        style: { marginTop: 300 },
                        darkTheme: theme !== 'light'
                    }
                });
            } 
            finally {

                setIsLoading(false);
            }
        }
        
        fetchData();
    }, []);


    //


    const numReminders = 8;
    
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const [isOpenDropdown, setDropdownStatus] = useState(0);

    const dropdownCallerRef = useRef(null);
    const expanderArrowRef = useRef(null);


    //


    const heightDropdown = 2.66 / (numReminders / 2);

    Animatable.initializeRegistryWithDefinitions({
        rotate180: 
        {
            from: { transform: [{ rotate: '0deg' }] },
            to: { transform: [{ rotate: '180deg' }] },
        },
        derotate180: 
        {
            from: { transform: [{ rotate: '180deg' }] },
            to: { transform: [{ rotate: '0deg' }] },
        },
    });

    const expandDropdown = () => {

        // Se o dropdown está fechado (0) ou aberto no primeiro nível (1)...
        if (isOpenDropdown < ( productsData.length <= 4 ? 1 : 2 )) {


            if (isOpenDropdown == 0) {
                dropdownCallerRef.current.transitionTo({borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }, 100);
            }

            if (isOpenDropdown == 1 || productsData.length <= 4) {
                expanderArrowRef.current.rotate180(500)
            }

            // LOOP PARA REVELAR PRIMARIAMENTE OS QUATRO PRIMEIROS REMENDAR, E EM SEGUIDA LOOP PARA REVELAR MAIS 4
            for (let i = 1; i <= 4; i++) {
                dropdownRef.current.transitionTo({ height: HEIGHT * ((5 * (i * (isOpenDropdown + 1))) + heightDropdown * i)}, 500);
            }

            props.scrollRef.current.scrollToEnd({ animated: true });

            setDropdownStatus(isOpenDropdown + 1);
        }
    };
    
    const collapseDropdown = (closeDropdown=false) => {

    if (isOpenDropdown == 1) {
        dropdownRef.current.transitionTo({ height: HEIGHT * 0 }, 200);
        dropdownCallerRef.current.transitionTo({ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }, 750);

        setDropdownStatus(0);
        return
    }

    if (isOpenDropdown == 2 && closeDropdown) {
        dropdownRef.current.transitionTo({ height: HEIGHT * 0 }, 200);
        dropdownCallerRef.current.transitionTo({ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }, 750);
        expanderArrowRef.current.derotate180(500);

        setDropdownStatus(0);
        return
    }
    
    if (isOpenDropdown == 2) {
        dropdownRef.current.transitionTo({ height: HEIGHT * (20 + (heightDropdown * 4)) }, 200);
        expanderArrowRef.current.derotate180(500);


        setDropdownStatus(isOpenDropdown - 1);
    }

    };
    
    const onDropdownTransitionEnd = () => {
        if (isOpenDropdown == 0) {
            listRef.current.transitionTo({ height: HEIGHT * (20 + heightDropdown)  }, 500);
        } else {
            listRef.current.transitionTo({ height: 0 }, 500);
        }
    };

    return (

        <View style={stylesDropdown().container}>
            <Animatable.View>
                <TouchableOpacity
                    onPress={() => isOpenDropdown == 0 ? expandDropdown() : collapseDropdown(true)}>
                    <Animatable.View ref={dropdownCallerRef} style={stylesDropdown().dropdownCaller}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: themeColor('primaryText') }}>Lembretes</Text>
                        <Icon name="bell" size={24} color={ isOpenDropdown == 0 ? themeColor("grayText") : themeColor("primary")} />
                    </Animatable.View>
                </TouchableOpacity>
            </Animatable.View>
            <Animatable.View ref={dropdownRef} onAnimationEnd={onDropdownTransitionEnd} style={{ height: 0, overflow: 'hidden' }}>
                {

                productsData.length === 0

                ?

                <>
                    <View style={[ stylesDropdown().reminderRow, { 
                        backgroundColor: 'white', height: 40, 
                        alignItems: 'center', justifyContent: 'center' } ]}>
                        <Text style={{ color: themeColor('grayText'), fontWeight: '600' }}>Sem produtos...</Text>
                    </View>
                </>

                :
                    <FlatList
                        scrollEnabled={false}
                        ref={listRef} 
                        style={[ stylesDropdown().reminderRow, { height: 0, overflow: 'hidden' } ]}
                        data={productsData.slice(0, numReminders)}
                        renderItem={({ item, index }) => <Reminder key={('view' + index)} data={item}/>}
                    />

                }
                <View>
                    <TouchableOpacity onPress={() => isOpenDropdown == 2 || productsData.length <= 4 ? collapseDropdown() : expandDropdown()} style={stylesDropdown().resizeBttn}>
                        <Animatable.View ref={expanderArrowRef}>
                            <Icon name="menu-down" color={drawerItemColor} size={20} />
                            {/* { isOpenDropdown == 2 ?
                                <Icon name="menu-up" color={drawerItemColor} size={20} />
                            :
                            } */}
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>

    );
}


const Reminder = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const data = props.data;
    const navigation = useNavigation();


    // Formato da string de data (yyyy/MM/dd)
    const dateFormat = 'yyyy-MM-dd';
    const parsedFinalDate = parse(data['DataFinal'], dateFormat, new Date());
    const parsedInitialDate = parse(data['DataInicial'], dateFormat, new Date());


    // Dias úteis
    const workingDays = differenceInDays(parsedFinalDate, new Date());
    const totalDays = differenceInDays(parsedFinalDate, parsedInitialDate);


    //

    const productId = data.idProduto;

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('ProductDetail', { productId }) }}>
            <View style={styles().container}>
                <View>
                    <Icon name="clock-outline" size={15}
                          color={workingDays < 0 ? themeColor('errorColor') : 
                          ( workingDays < Math.ceil(totalDays / 10) ? themeColor("warningColor") : themeColor("primary") )} />
                    {/* <Icon name="clock-alert-outline" color={themeColor("primary")} size={30} /> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                    <View style={styles().productInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 18, fontWeight: 600}}>{data.NomeProduto}</Text>
                    </View>

                    <View style={styles().dateInfo}>
                        <Text style={{color: workingDays < 0 ? themeColor('errorColor') : 
                        ( workingDays < Math.ceil(totalDays / 10) ? themeColor("warningColor") : themeColor("grayText") )
                        , fontSize: 12}}>
                            {/* Um ternário feito para ver se dia é negativo, se for, é tornado positivo e tem 
                                a cor mudada, e outro para definir se será 'dia' ou 'dias' */}
                            {workingDays * (workingDays < 0 ? -1 : 1 ) } dia{workingDays == 1 || workingDays == -1 ? '' : 's'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const stylesDropdown = () => {
    
    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


    //
        
    return StyleSheet.create ({

        container: {
            paddingVertical: HEIGHT * 1,
            // paddingHorizontal: '2%',
        },
        dropdownCaller: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: HEIGHT * 1,
            paddingHorizontal: '12%',
            backgroundColor: themeColor('secondaryBg'),
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },
        reminderRow: {
            backgroundColor: themeColor('secondaryBg'),
        },
        resizeBttn: {
            paddingHorizontal: 4.5,
            paddingVertical: HEIGHT * 0.2,
            alignItems: 'center',
            backgroundColor: themeColor('secondaryBg'),
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            // borderRadius: 40,

        },
        
    });
}

const styles = () => {
    
    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


    //
        
    return StyleSheet.create ({

        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: HEIGHT * 5,
            gap: 8,
            // borderColor: 'gray',
            // borderWidth: 0.4,
            // borderRadius: 6,
            // paddingVertical: HEIGHT * 2,
            paddingHorizontal: '4%',
        },
        icon: {
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            color: themeColor("primaryHigh"),
            backgroundColor: themeColor("secondaryHigh"),
        },
        productInfo: {
            paddingLeft: '2%',
            width: '55%',
        },
        productName: {},
        productCategory: {},
        dateInfo: {
            alignContent: 'center',
            justifyContent: 'center',
            width: '22%',
        },
        divider: {
            marginHorizontal: '8%',
            alignSelf: 'center',
            height: '55%', 
            width: 0.4,
            backgroundColor: themeColor("detailColor"),
            borderRadius: 50,
          },
    });
}

export default ReminderList;
