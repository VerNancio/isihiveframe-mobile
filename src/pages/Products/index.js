import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import ProductsList from '../../components/ProductsList';
import { useEffect, useState } from "react";

const ProductsView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    const [load, setLoad] = useState(false);

    const refreshList = () => {

        setLoad(true);

        setInterval(() => {

            setLoad(false);
        }, 200);
    }


    return (
        <View style={[styles.container, {backgroundColor: themeColor("secondaryBg")}]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{fontSize: 24, fontWeight: '600', color: themeColor("title")}}>PRODUTOS</Text>
                </View>
                <TouchableOpacity onPress={() => refreshList()}style={[styles.icon, { backgroundColor: themeColor("primary") }]}>
                    <Icon name="refresh" color={'white'} size={32} />
                </TouchableOpacity>
            </View>
            <View style={[styles.productsContainer, {backgroundColor: themeColor("primaryBg")}]}>
                {

                    load 

                    ?

                    ''

                    :

                    <ProductsList />

                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: '8%',
        paddingBottom: '8%',
        paddingHorizontal: '6%',
    },
    productsContainer: {
        height: '92%',
        width: '100%',
        marginTop: 6,
        paddingVertical: '8%',
        // paddingHorizontal: '4%',
        borderRadius: 10,
    },
    icon: {
        height: 36,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: '2%'
    },
});

export default ProductsView;