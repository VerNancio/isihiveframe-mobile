import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import themeColors from "../../assets/styles/color/colors.json";
import { useTheme } from "../../context/Theme";

import SettingsView from "../../pages/Settings";



//


const ConfigTemplate = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


    const [tabScreen, setTabScreen] = useState('');
    const [infoScreen, setInfoScreen] = useState({title: "Configurações", info: "Estabeleça alguma configurações no seu app"});

    // useEffect(() => {
    //     if (tabScreen == "products") { 
    //         setInfoScreen({
    //             title: "Meu perfil", 
    //             info: "Visualize informações de perfil e projetos ao qual faz parte"
    //         });
    //     }
    //     else if (tabScreen == "account") { 
    //         setInfoScreen({
    //             title: "Produtos", 
    //             info: "Visualize informações de perfil e projetos ao qual faz parte"
    //         });
    //     }
    // }, tabScreen);

    return (
        <View style={styles.container}>
            <View style={[styles.header, {backgroundColor: themeColor("primaryBg")}]}>
                <Text style={{fontSize: 24, fontWeight: 700, color: themeColor("title")}}>{infoScreen.title}</Text>
                { infoScreen.info != '' ? <Text style={{fontSize: 12, color: themeColor("subTitle")}}>{infoScreen.info}</Text> : <></> }
            </View>
            <SettingsView />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 10,
        paddingBottom: '5%',
        paddingHorizontal: '5%',
    },
});

export default ConfigTemplate;