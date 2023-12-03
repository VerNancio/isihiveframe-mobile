import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { ProductRequest } from "../../requests/products";

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';
import Toast from "react-native-toast-message";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoadingLogo from "../Loading";
import { UserRequest } from "../../requests/user";

//


const SLIDER_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_WIDTH = Dimensions.get('window').width * 0.8;

const HEIGHT = Dimensions.get('screen').height * 0.01;


const ProductsReq = new ProductRequest();
const UserReq = new UserRequest();


const ProductList = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //
    

    const isCarousel = useRef(null)

    const [isLoading, setIsLoading] = useState(true);
    const [listMessage, setListMessage] = useState(null);

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {

            try {

                // Pegando o token jwt
                const token = await UserReq.getUserData(false, 'authToken');

                const userNIF = await UserReq.getUserData(false, 'userNIF');
                
                await ProductsReq.getProductsRequest(setProductsData, userNIF, token);
            } 
            catch (err) {

                // console.log('deu erro porra deu erro:', err)

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

    const productsPerView = HEIGHT > 7.4 ? 6 : 5; // Quantidade de produtos por View

    const numViews =  Math.ceil(productsData.length / productsPerView)

    const [activeIndex,setActiveIndex] = useState(0); // View em uso
    const [firstIndex, lastIndex] = [0, numViews - 1] // Primeira e última view

    const jsonPerView = () => {

        let arrResult = [];
        let arrTemp = [];

        let isInt = (number) => number % 1 == 0 ? true : false;

        for (const [index, value] of productsData.entries()) {

            if (isInt(index / productsPerView) && index !== 0 ) {

                arrResult.push(arrTemp);
                arrTemp = [];
            }
            
            arrTemp.push(value);
            
            if (index == productsData.length - 1) {
                arrResult.push(arrTemp);
            }
        }

        return arrResult;
    }

    return (

        isLoading

        ?

        <View style={{ flex: 1, justifyContent: 'center' }}>
            <LoadingLogo width={80} height={80} isLoading={true} blockView={false} style={{ position: 'relative' }}/>
        </View>

        :

        <View style={{paddingHorizontal: '4.5%'}}>
            {/* <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity style={{padding: 5, backgroundColor: 'cyan', display: (firstIndex === activeIndex ? 'none' : 'flex')}}>
                    <Text>{firstIndex}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5, backgroundColor: 'cyan', display: 'flex'}}>
                    <Text>{activeIndex}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 5, backgroundColor: 'cyan', display: (lastIndex === activeIndex ? 'none' : 'flex')}}>
                    <Text>{lastIndex}</Text>
                </TouchableOpacity>
            </View> */}

            {
                productsData.length === 0

                ?

                <>
                    <TouchableOpacity onPress={() => {
                            Toast.show({
                                type: 'success',
                                props: { 
                                    title: 'Nenhum produto a ser feito pelo técnico',
                                    style: { marginTop: 300 },
                                    darkTheme: theme !== 'light'
                                }
                            });
                        }}>
                        <View style={[styles().noReturnContainer]}>
                            <Text style={{ color: themeColor('primaryText'), fontSize: 15 }}>Sem produtos em andamento...</Text>
                        </View>
                    </TouchableOpacity>
                </>


                :

                <>
                    <Carousel 
                    ref={isCarousel}
                    index={activeIndex}
                    data={jsonPerView()}
                    renderItem={(jsonList, index) => {

                        return (
                        <View key={('view' + index)} style={{gap: 4, width: '100%'}}>
                            {jsonList.item.map(data => {
                                return (<Product key={data.idProduto} data={data}/>);
                            })}
                        </View>
                        );
                    }}
                    keyExtractor={(item) => item.idProduto}
                    sliderWidth={SLIDER_WIDTH}
                    sliderHeight={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem = { index =>setActiveIndex(index) }
                    />
                    <Pagination
                    dotsLength={numViews}
                    activeDotIndex={activeIndex}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 4,
                        marginHorizontal: 0,
                        backgroundColor: themeColor("primary"),
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                    />
                </>
            }

        </View>
    );
}


const Product = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const navigation = useNavigation();


    //

    const data = props.data;
    const productId = data.idProduto;

    return (
        <TouchableOpacity onPress={() => { navigation.navigate("ProductDetail", { productId }) } }>
            <View style={[styles().container, {backgroundColor: themeColor("secondaryBg")}]}>
                <View style={styles().icon}>
                    <Icon name="checkbox-multiple-outline" color={themeColor("primary")} size={30} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                    <View style={styles().productInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 18, fontWeight: 600}}>{data.NomeProduto}</Text>
                        <Text style={{color: themeColor("grayText"), fontSize: 12}}>{data.Area}</Text>
                    </View>
                    <View style={styles().divider}>
                        <Text></Text>
                    </View>

                    <View style={styles().dateInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 18, fontWeight: 600}}>Data</Text>
                        <Text style={{color: themeColor("grayText"), fontSize: 12}}>{data.DataFinal}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = () => {
    
    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


    //
        
    return StyleSheet.create ({

    container: {
        flexDirection: 'row',
        gap: 8,
        borderRadius: 6,
        paddingVertical: HEIGHT > 7.4 ? HEIGHT * 1.7 : HEIGHT * 1.2,
        paddingHorizontal: '4%',
    },
    noReturnContainer: {
        flexDirection: 'row',
        marginTop: '4%',
        marginHorizontal: '2%',
        paddingVertical: HEIGHT > 7.4 ? HEIGHT * 3.0 : HEIGHT * 2.5,
        paddingHorizontal: '8%',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderColor: themeColor("primary"),
        backgroundColor: themeColor("secondaryBg"),
        borderRadius: 4,
    },
    icon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: themeColor("contrastBg"),
    },
    productInfo: {
        paddingLeft: '2%',
        width: '55%',
    },
    dateInfo: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '30%',
    },
    divider: {
        marginHorizontal: '8%',
        alignSelf: 'center',
        height: '55%', 
        width: 0.4,
        backgroundColor: themeColor("primaryText"),
        borderRadius: 50,
    },
});
}

export default ProductList;