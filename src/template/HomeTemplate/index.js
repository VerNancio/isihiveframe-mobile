import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from "../../context";

import TabNavigator from "../../routes/TabNavigator";


const HomeTemplate = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    const [tabScreen, setTabScreen] = useState('');
    const [infoScreen, setInfoScreen] = useState({tittle: "Produtos", info: "Visualize informações de projetos e produtos ao qual faz parte"});

    useEffect(() => {
        if (tabScreen == "hourslog") { 
            setInfoScreen({
                tittle: "Horas lançadas", 
                info: "Visualize o hisórico de horas lançadas"
            });
        }
        else if (tabScreen == "products") { 
            setInfoScreen({
                tittle: "Produtos", 
                info: "Visualize informações dos produtos e projetos ao qual faz parte"
            });
        }
        console.log(infoScreen)
    }, [tabScreen]);

    return (
        <View style={styles.container}>
            <View style={[styles.header, {backgroundColor: themeColor("primaryBg")}]}>
                <Text style={{fontSize: 24, fontWeight: 700, color: themeColor("title")}}>{infoScreen.tittle}</Text>
                { infoScreen.info != '' ? <Text style={{fontSize: 12, color: themeColor("subTitle")}}>{infoScreen.info}</Text> : <></> }
            </View>
            <TabNavigator state={setTabScreen}/>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 10,
        // paddingBottom: 2,
        paddingHorizontal: '5%',
    },
});

export default HomeTemplate;