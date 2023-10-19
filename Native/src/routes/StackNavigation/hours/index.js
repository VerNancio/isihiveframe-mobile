import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HoursLog from '../../../pages/HoursLog';
import LogDetail from '../../../pages/LogDetail';

const Stack = createNativeStackNavigator();

const HoursLogStackNavigation = () => {

    return (
        <Stack.Navigator initialRouteName={"HoursLogs"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HoursLogs" component={HoursLog} />
            <Stack.Screen name="LogDetail" component={LogDetail} />
        </Stack.Navigator>
    );
};

export default HoursLogStackNavigation;