import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from "../../context/Theme";

import TabNavigator from "../../routes/TabNavigator";


const HomeTemplate = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    const [tabScreen, setTabScreen] = useState('');
    const [infoScreen, setInfoScreen] = useState({title: "Produtos", info: "Visualize informações dos produtos encarregados a você"});

    useEffect(() => {
        if (tabScreen == "hourslog") { 
            setInfoScreen({
                title: "Horas lançadas", 
                info: "Visualize o histórico dos últimos cem lançamentos de horas"
            });
        }
        else if (tabScreen == "products") { 
            setInfoScreen({
                title: "Produtos", 
                info: "Visualize informações dos produtos encarregados a você"
            });
        }
        console.log(infoScreen)
    }, [tabScreen]);

    return (
        <View style={styles.container}>
            <View style={[styles.header, {backgroundColor: themeColor("primaryBg")}]}>
                <Text style={{fontSize: 24, fontWeight: 700, color: themeColor("title")}}>{infoScreen.title}</Text>
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