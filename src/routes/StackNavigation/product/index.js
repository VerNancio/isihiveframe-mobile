import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Products from '../../../pages/Products';
import ProductDetail from '../../../pages/ProductDetail';

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