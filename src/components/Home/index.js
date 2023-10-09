import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabNavigator from "../../routes/TabNavigator";


const Produtos = () => {

    const [tabScreen, setTabScreen] = useState('');
    const [infoScreen, setInfoScreen] = useState({tittle: "Produtos", info: "Visualize informações de perfil e projetos ao qual faz parte"});

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
            
            <TabNavigator state={setTabScreen}/>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    header: {
        padding: 20
    },
    topPart: {
        height: 300,
        // flex: 0.3,
        backgroundColor: 'yellow',
    },
    bottomPart : {
        height: 300,
        flex: 0.7,
    },

});

export default Produtos;