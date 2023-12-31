import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SettingsView from "../../pages/Settings";
// import TabNavigator from "../../routes/TabNavigator";


const Config = () => {

    const [tabScreen, setTabScreen] = useState('');
    const [infoScreen, setInfoScreen] = useState({title: "Configurações", info: "Estabeleça alguma configurações no seu app"});

    useEffect(() => {
        if (tabScreen == "products") { 
            setInfoScreen({
                title: "Meu perfil", 
                info: "Visualize informações de perfil e projetos ao qual faz parte"
            });
        }
        else if (tabScreen == "account") { 
            setInfoScreen({
                title: "Produtos", 
                info: "Visualize informações de perfil e projetos ao qual faz parte"
            });
        }
    }, tabScreen);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize: 24, fontWeight: 700}}>{infoScreen.title}</Text>
                { infoScreen.info != '' ? <Text style={{fontSize: 12}}>{infoScreen.info}</Text> : <></> }
            </View>
            <SettingsView />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    header: {
        paddingTop: 10,
        paddingBottom: '5%',
        paddingHorizontal: '5%',
    },
});

export default Config;