import { useState, useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';
import Toast from "react-native-toast-message";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoadingLogo from "../Loading";

import { HoursRequest } from "../../requests/hours";
import { UserRequest } from "../../requests/user";


const SLIDER_WIDTH = Dimensions.get('window').width * 0.8;
const ITEM_WIDTH = Dimensions.get('window').width * 0.8;

const HEIGHT = Dimensions.get('screen').height * 0.01;

const UserReq = new UserRequest();
const HoursReq = new HoursRequest();

const HoursList = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //


    const isCarousel = useRef(null)

    const [isLoading, setIsLoading] = useState(true);

    const [hoursLog, setHoursLog] = useState([]);
    

    useEffect(() => {

        const fetchData = async () => {

            try {

                // Pegando o token jwt
                const token = await UserReq.getUserData(false, 'authToken');
                
                const userNIF = await UserReq.getUserData(false, 'userNIF');
            
                await HoursReq.getHoursRequest(setHoursLog, userNIF, token);
            } 
            catch (err) {

                Toast.show({
                    type: 'error',
                    props: { 
                        title: 'Erro ao puxar histórico de horas',
                        style: { marginTop: 300 },
                        darkTheme: theme !== 'light'
                    }
                });
            }
            finally {

                setIsLoading(false);
            }

            
    
            setIsLoading(false);
        }

        fetchData();
    }, []);



    //


    const hoursPerViews = HEIGHT > 7.4 ? 6 : 5; // Quantidade de log de horas por View
    
    const numViews =  Math.ceil(hoursLog.length / hoursPerViews)

    const [activeIndex,setActiveIndex] = useState(0); // View em uso
    const [firstIndex, lastIndex] = [0, numViews - 1] // Primeira e última view

    const jsonPerView = () => {

        let arrResult = [];
        let arrTemp = [];

        let isInt = (number) => number % 1 == 0 ? true : false;

        for (const [index, value] of hoursLog.entries()) {

            if (isInt(index / hoursPerViews) && index !== 0 ) {

                arrResult.push(arrTemp);
                arrTemp = [];
            }
            
            arrTemp.push(value);
            
            if (index == hoursLog.length - 1) {
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
            {
                hoursLog.length === 0

                ?

                <>
                    <TouchableOpacity onPress={() => {
                            Toast.show({
                                type: 'success',
                                props: { 
                                    title: 'Sem horas lançadas',
                                    style: { marginTop: 300 },
                                    darkTheme: theme !== 'light'
                                }
                            });
                        }}>
                        <View style={[styles().noReturnContainer]}>
                            <Text style={{ color: themeColor('primaryText'), fontSize: 15 }}>Sem horas lançadas...</Text>
                        </View>
                    </TouchableOpacity>
                </>

                :
            
                <>
                    <Carousel 
                    // layout="stack"
                    // vertical
                    // activeSlideOffset={0}
                    ref={isCarousel}
                    index={activeIndex}
                    data={jsonPerView()}
                    // keyExtractor={(item) => item.idCargaHoraria}
                    renderItem={(jsonList, index) => {
                        // {console.log(jsonList.item)}
                        return (
                        <View key={('view' + index)} style={{gap: 4, width: '100%'}}>
                            {jsonList.item.map(data => {
                                return (<WorkedHoursLog key={data.idCargaHoraria} data={data}/>);
                            })}
                        </View>
                        );
                    }}
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


const WorkedHoursLog = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const navigation = useNavigation();

    
    //

    const data = props.data;
    const idCargaHoraria = data.idCargaHoraria;

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("HourDetail", { idCargaHoraria })}}>
            <View style={[styles().container, {backgroundColor: themeColor("secondaryBg")}]}>
                <View style={styles().icon}>
                    <Icon name="clock-outline" color={themeColor("primary")} size={30} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                    <View style={styles().productInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 16, fontWeight: 600}}>Pessoa: {data.HorasPessoa} h</Text>
                        <Text style={{color: themeColor("grayText"), fontSize: 14}}>Máquina: {data.HorasMaquina} h</Text>
                    </View>
                    <View style={styles().divider}>
                        <Text></Text>
                    </View>

                    <View style={styles().dateInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 18, fontWeight: 600}}>Data</Text>
                        <Text style={{color: themeColor("grayText"), fontSize: 12}}>{data.Datas}</Text>
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
    productName: {},
    productCategory: {},
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

export default HoursList;