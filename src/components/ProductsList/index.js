import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import jsonData from '../../data/product.json';

const ProductList = (props) => {

    const json = jsonData;

    return (
        <View style={{gap: 4}}>
            {json.map(data => {
                return (<Product data={data}/>);
            })}
        </View>
    );

    // const json = jsonData;
    // const productsPerView = 7; // Quantidade de produtos por View
    // const [views, setViews] = useState([[]]); // Inicializa com uma View vazia

    // // Função para criar uma nova View quando necessário
    // const createNewView = () => {
    //     const newView = [];
    //     setViews([...views, newView]);
    // };

    // // Preenche as Views com os produtos
    // json.forEach((product, index) => {
    //     const viewIndex = Math.floor(index / productsPerView);
    //     if (!views[viewIndex]) createNewView(); // Cria uma nova View
    //     views[viewIndex].push(product);
    // });

    // return (
    //     <FlatList horizontal style={{ gap: 4 }}>
    //         {views.map((viewProducts, viewIndex) => (
    //             <View key={viewIndex} style={styles.viewContainer}>
    //                 {viewProducts.map((product, productIndex) => (
    //                     <Product key={productIndex} data={product} />
    //                 ))}
    //             </View>
    //         ))}
    //     </FlatList>
    // );
}

// const ProductRow

const Product = (props) => {

    const data = props.data;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={(data) => {navigation.navigate("ProductDetail", data.id)}}>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon name="checkbox-multiple-outline" color="#3976D1" size={30} />
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

// const productListing = (props) => {}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
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
        color: '#3976D1',
        backgroundColor: '#B0C8ED',
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

export default ProductList;