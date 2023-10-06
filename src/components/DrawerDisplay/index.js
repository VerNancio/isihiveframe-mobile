import { useState } from "react";
import { View, Text, Drawer, Section } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerDisplay = () => {

    return (
        <View style={{flex: 1}}>
            <View>
                <View>
                    {/* Image */}
                </View>
            </View>
            <DrawerContentScrollView>
            <DrawerItem
                    icon={({color, size}) => (
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
                    onPress={() => {}}
                />

            </View>
        </View>
    );
};

export default DrawerDisplay;