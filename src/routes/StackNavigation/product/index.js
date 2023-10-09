import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProductStackNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Products} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ProductStackNavigation;