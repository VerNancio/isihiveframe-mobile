
import { View, Text, StyleSheet } from "react-native";
import ProductsList from '../../components/ProductsListing';

const Home = () => {

    return (
        <View style={styles.container}>
            <View>
                <Text>aaaa</Text>
            </View>
            <View>
                <ProductsList />
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    topPart: {
        height: 300,
        // flex: 0.3,
        backgroundColor: 'yellow',
    },
    bottomPart : {
        height: 300,
        flex: 0.7,
    },

});

export default Home;