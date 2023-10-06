import { useState } from "react";
import { View, Text, Drawer, Section, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// export const DrawerHeader = () => {

//     const navigation = useNavigation();

//     return (
//         <View style={styles.headerContainer}>
//             <Text style={styles.headerText}>Meu Drawer Personalizado</Text>
//             <TouchableOpacity onPress={() => navigation.closeDrawer()}>
//             <Text style={styles.closeButton}>Fechar</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

export const DrawerDisplay = () => {

    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <View>
                <View>
                    {/* Image */}
                </View>
            </View>
            <DrawerContentScrollView>
            <DrawerItem
                    icon={({color = 'black', size = 40}) => (
                        <Icon 
                        name="account-circle-outline"
                        color={color}
                        size={size}
                        />
                    )} 
                    label={"Perfil"}
                    onPress={() => {}}
                />
                <DrawerItem
                icon={({color, size}) => (
                    <Icon 
                    name="clock-outline"
                    color={color}
                    size={size}
                    />
                )} 
                label={"Banco de horas"}
                onPress={() => {}}
            />
            </DrawerContentScrollView>
            <View style={{}}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )} 
                    label={"Sign out"}
                    onPress={() => {navigation.replace('Login')}}
                />

            </View>
        </View>
    );
};

const stylesHeader = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 100,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    closeButton: {
      fontSize: 16,
      color: 'blue',
    },
});
