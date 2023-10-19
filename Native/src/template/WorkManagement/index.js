import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import HoursLogStackNavigation from "../../routes/StackNavigation/hours";


const WorkManagement = () => {

    const [tabScreen, setTabScreen] = useState('');
    const [infoScreen, setInfoScreen] = useState({tittle: "Banco de Horas", info: "Veja informações e o histórico das horas lançadas"});

    useEffect(() => {
        if (tabScreen == "products") { 
            setInfoScreen({
                tittle: "Meu perfil", 
                info: "Visualize informações de perfil e projetos ao qual faz parte"
            });
        }
        else if (tabScreen == "account") { 
            setInfoScreen({
                tittle: "Produtos", 
                info: "Visualize informações de perfil e projetos ao qual faz parte"
            });
        }
    }, tabScreen);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize: 24, fontWeight: 700}}>{infoScreen.tittle}</Text>
                { infoScreen.info != '' ? <Text style={{fontSize: 12}}>{infoScreen.info}</Text> : <></> }
            </View>
            <HoursLogStackNavigation />
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

export default WorkManagement;