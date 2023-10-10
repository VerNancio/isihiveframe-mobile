import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetail from '../../../pages/ProductDetail';
import Products from '../../../pages/Products';

const Stack = createNativeStackNavigator();

const ProductStackNavigation = () => {

    return (
        <Stack.Navigator initialRouteName={Products} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    );
};

export default ProductStackNavigation;