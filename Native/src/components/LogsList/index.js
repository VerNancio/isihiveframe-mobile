import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import jsonData from '../../data/product.json';
// import { FlatList } from "react-native-gesture-handler"

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

const LogList = (props) => {

    const json = jsonData;

    const productsPerColumn = 5;
    const numColumns = Math.floor(json.length / 7) + 1

    const ColumnsData = () => {
 
        let columns = [];
        let numProduct = 0;

        for (let column = 0; column < numColumns; column++) {

            let productsColumn = [];
            
            for (let i = 0; i < productsPerColumn; i++) {

                if (numProduct == json.length) {break}

                productsColumn.push(json[numProduct]);
                numProduct++;
            }

            if (numProduct == json.length + 1) {break}

            columns.push(productsColumn);
        }

        return columns;
    }

    return (
        <FlatList
        // horizontal
        data={ColumnsData()}
        renderItem={(productGroup) => {
            return <ProductColumn productGroup={productGroup.item}/>
            }
        }
        keyExtractor={(item, index) => index.toString()}
        />
    );
}

const ProductColumn = (props) => {

    return (
        <View style={{gap: 4, alignItems: 'center'}}>
            {props.productGroup.map(data => {
                return <Product data={data}/>;
            })}
        </View>
    );
}

const Product = (props) => {

    const data = props.data;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={(data) => {navigation.navigate("LogDetail", data.id)}}>
            <View style={[styles.container, {width: ((widthScreen/100) * 80), height: 65
        }]}>
                <View style={styles.icon}>
                    <Icon name="checkbox-multiple-outline" color="#19BD00" size={30} />
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'space-between', justifyContent: 'space-between' }}>
                    <View style={styles.productInfo}>
                        <Text style={{color: '#122736', fontSize: 18, fontWeight: 600}}>{data.productName}</Text>
                        <Text style={{color: '#7E7E7E', fontSize: 12}}>{data.serviceCategory}</Text>
                    </View>
                    <View style={styles.dateInfo}>
                        <Text style={{color: '#122736', fontSize: 18, fontWeight: 600}}>Data</Text>
                        <Text style={{color: '#7E7E7E', fontSize: 12}}>{data.deliveryDate}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// const LogListing = (props) => {}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    icon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        color: '#3976D1',
        backgroundColor: '#B6F3BB',
    },
    productInfo: {
        // flex: '0.5',
    },
    productName: {},
    productCategory: {},
    dateInfo: {
        // flex: '0.3',
    },
});

export default LogList;