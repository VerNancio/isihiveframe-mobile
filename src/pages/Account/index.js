import { View, Text, StyleSheet } from "react-native";
import ProductsList from '../../components/ProductsList';

const Products = () => {

    return (
        <View style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '12%',
        paddingBottom: '8%',
        paddingHorizontal: '6%',
    },
    productsContainer: {
        height: '80%',
        width: '100%',
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
    }
    

});

export default Products;