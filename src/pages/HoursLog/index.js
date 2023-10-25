import { View, Text, FlatList, StyleSheet } from "react-native";

import { useTheme } from "../../context";
import themeColors from '../../assets/styles/color/colors.json';

import ProductsList from '../../components/ProductsList';

const HoursLogView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //

    return (
        <View style={[styles.container, {backgroundColor: themeColor("secondaryBg")}]}>
            <View>
                <Text style={{fontSize: 24, fontWeight: '600', color: themeColor("title")}}>PRODUTOS</Text>
            </View>
            <View style={[styles.productsContainer, {backgroundColor: themeColor("primaryBg")}]}>
                <ProductsList />
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
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

export default HoursLogView;