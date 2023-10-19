import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import ProductsList from '../../components/ProductsList';
const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;


const Products = () => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={{fontSize: 24, fontWeight: '600', color: '#1E293B'}}>PRODUTOS</Text>
            </View>
            <View style={[styles.productsContainer, {height: ((heightScreen / 100) * 60)}]}>
                <ProductsList />
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '10%',
        paddingBottom: '8%',
        paddingHorizontal: '6%',
    },
    productsContainer: {
        height: '92%',
        width: '100%',
        marginTop: 6,
        paddingVertical: '8%',
        paddingHorizontal: '4%',
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
    }
});

export default Products;