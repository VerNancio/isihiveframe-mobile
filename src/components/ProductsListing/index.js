import { View, Text, TextInput, StyleSheet } from "react-native";

const productList = (props) => {

    return (
        <View style={styles.container}>
            <Text></Text>
            <View>
                <Product />
            </View>
        </View>
    );
}

const Product = () => {
    return (
        <View style={stylesProduct.container}>
            <View style={stylesProduct.icon}></View>
            <View style={stylesProduct.productInfo}>
                <Text>Nome</Text>
                <Text>Categoria</Text>
            </View>
            <View style={stylesProduct.dateInfo}>
                <Text>Data</Text>
                <Text>04/10/23</Text>
            </View>
        </View>
    );
};

// const productListing = (props) => {}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        backgroundColor: '#fff',
    },
});

const stylesProduct = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        backgroundColor: 'blue',
    },
    icon: {
        height: '40',
        width: '40',
        backgroundColor: '#B0C8ED',
    },
    productInfo: {
        flex: '0.5',
    },
    productName: {},
    productCategory: {},
    dateInfo: {
        flex: '0.3',
    },
});

export default productList;