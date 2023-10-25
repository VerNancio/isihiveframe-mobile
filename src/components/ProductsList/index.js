import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../context";
import themeColors from '../../assets/styles/color/colors.json';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import jsonData from '../../data/product.json';
import { FlatList } from "react-native-gesture-handler";

const ProductList = (props) => {

    const json = jsonData;
    const productsPerView = 7; // Quantidade de produtos por View

    const jsonPerView = () => {

        let arrResult = [];
        let arrTemp = [];

        let isInt = (number) => number % 1 == 0 ? true : false;

        for (const [index, value] of json.entries()) {

            if (isInt(index / productsPerView) && index !== 0 ) {

                arrResult.push(arrTemp);
                arrTemp = [];
            }
            
            arrTemp.push(value);
            
            if (index == json.length - 1) {
                arrResult.push(arrTemp);
            }
        }


        return arrResult;
    }

    // Função para criar uma nova View quando necessário
    // const createNewView = () => {
    //     const newView = [];
    //     setViews([...views, newView]);
    // };

    console.log(jsonPerView().length)

    return (

        <View>
            <FlatList
            // horizontal
            data={jsonPerView()}
            keyExtractor={(item) => item.id}
            renderItem={(jsonList) => {
                // {console.log(jsonList.item)}
                return (
                <View style={{gap: 4, width: '100%'}}>
                    {jsonList.item.map(data => {
                        return (<Product data={data}/>);
                    })}
                </View>
                );
            }}
            />
        </View>
    );

    // {jsonPerView().map(() => {

    //     <View style={{gap: 4}}>
    //         {json.map(data => {
    //             return (<Product data={data}/>);
    //         })}
    //         <Text>aaaaa</Text>
    //     </View>

    // })}
    

}

// const ProductRow

const Product = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const data = props.data;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={(data) => {navigation.navigate("ProductDetail", data.id)}}>
            <View style={[styles().container, {backgroundColor: themeColor("secondaryBg")}]}>
                <View style={styles().icon}>
                    <Icon name="checkbox-multiple-outline" color={themeColor("primary")} size={30} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                    <View style={styles().productInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 18, fontWeight: 600}}>{data.productName}</Text>
                        <Text style={{color: themeColor("grayText"), fontSize: 12}}>{data.serviceCategory}</Text>
                    </View>
                    <View style={styles().divider}>
                        <Text></Text>
                    </View>

                    <View style={styles().dateInfo}>
                        <Text style={{color: themeColor("primaryText"), fontSize: 18, fontWeight: 600}}>Data</Text>
                        <Text style={{color: themeColor("grayText"), fontSize: 12}}>{data.deliveryDate}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// const productListing = (props) => {}

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
        paddingVertical: '4%',
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
        width: '30%',
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

export default ProductList;