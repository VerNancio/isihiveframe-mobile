// import { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import TabNavigator from "../../routes/TabNavigator";


// const Home = () => {

//     const [tabScreen, setTabScreen] = useState('');
//     const [infoScreen, setInfoScreen] = useState({title: "Produtos", info: "Visualize informações de perfil e projetos ao qual faz parte"});

//     useEffect(() => {
//         if (tabScreen == "hourslog") { 
//             setInfoScreen({
//                 title: "Horas lançadas", 
//                 info: "Visualize o hisórico de horas lançadas"
//             });
//         }
//         else if (tabScreen == "products") { 
//             setInfoScreen({
//                 title: "Produtos", 
//                 info: "Visualize informações dos produtos ao qual faz parte"
//             });
//         }
//         console.log(infoScreen)
//     }, [tabScreen]);

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={{fontSize: 24, fontWeight: 700}}>{infoScreen.title}</Text>
//                 { infoScreen.info != '' ? <Text style={{fontSize: 12}}>{infoScreen.info}</Text> : <></> }
//             </View>
//             <TabNavigator state={setTabScreen}/>
//         </View>
//     );
// }

// const styles = StyleSheet.create ({
//     container: {
//         flex: 1,
//         backgroundColor: '#F1F5F9',
//     },
//     header: {
//         paddingTop: 10,
//         // paddingBottom: 2,
//         paddingHorizontal: '5%',
//     },
// });

// export default Home;