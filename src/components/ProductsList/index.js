import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons";

const productList = (props) => {

    return (
        <View>
            <Product />
        </View>
    );
}

const Product = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.icon}>A</Text>
            </View>
            <View style={styles.productInfo}>
                <Text>Nome</Text>
                <Text>Categoria</Text>
            </View>
            <View style={styles.dateInfo}>
                <Text>Data</Text>
                <Text>04/10/23</Text>
            </View>
        </View>
    );
};

// const productListing = (props) => {}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    icon: {
        height: '500',
        width: '40',
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

export default productList;