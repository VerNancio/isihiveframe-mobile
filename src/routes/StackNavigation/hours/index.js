import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HoursLogView from '../../../pages/HoursLog';
import HourLogDetailView from '../../../pages/HourLogDetail';

const Stack = createNativeStackNavigator();

const HoursStackNavigation = () => {

    return (
        <Stack.Navigator initialRouteName={"Hours"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Hours" component={HoursLogView} />
            <Stack.Screen name="HourDetail" component={HourLogDetailView} />
        </Stack.Navigator>
    );
};

export default HoursStackNavigation;