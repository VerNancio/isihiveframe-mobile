import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';
import Toast from "react-native-toast-message";

import InputField from "../../components/InputField";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import showToast from "../../assets/toast";

import ProfilePic from "../../components/ProfilePic";

import LoadingLogo from "../../components/Loading";

import { UserRequest } from "../../requests/user";
import { HoursRequest } from "../../requests/hours";
import StatementField from "../../components/StatementField";

//


const UserReq = new UserRequest();
const HoursReq = new HoursRequest();

const AccountView = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //


    const [isLoading, setIsLoading] = useState(true);


    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userNIF, setuserNIF] = useState(null);
    
    const [hoursPersonPosted, setHoursPersonPosted] = useState(null);
    const [hoursMachPosted, setHoursMachPosted] = useState(null);



    // Ao renderizar...
    useEffect(() => {

        const fetchData = async () => {

            try {

                // Pegando o token jwt
                const token = await UserReq.getUserData(false, 'authToken');

                const [name, email] = await Promise.all([
                    UserReq.getUserData(setUserName, 'userName'),
                    UserReq.getUserData(setUserEmail, 'userEmail'),
                ]);

                //

                

                const nif = await UserReq.getUserData(setuserNIF, 'userNIF');


                //
                
                const resWorkedHours = await HoursReq.getTecTotalHours(
                    {setTotalHoursPerson: setHoursPersonPosted, setTotalHoursMach: setHoursMachPosted}, 
                        nif, token);

                setHoursPersonPosted(resWorkedHours.tec);
                setHoursMachPosted(resWorkedHours.mach);

            }
            catch (err) {
                
                Toast.show({
                    type: 'error',
                    props: { 
                        title: 'Erro ao puxar dados do técnico',
                        style: { marginTop: 300 },
                        darkTheme: theme !== 'light'
                    }
                });
            }
            finally {

                setIsLoading(false);
            }
            
        }

        fetchData();
    }, []);



    //


    return (
        <ScrollView style={{ flex: 1, backgroundColor: themeColor("secondaryBg") }}>
            <View style={styles().container}>
                {

                    isLoading

                    ?

                    <View style={{ flex: 1, justifyContent: 'center', height: 350 }}>
                        <LoadingLogo width={80} height={80} isLoading={true} blockView={false} style={{ position: 'relative' }}/>
                    </View>

                    :

                    <>
                        <ProfilePic style={styles().userProfilePhoto} />
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 24, color: themeColor("primaryHigh"), fontWeight: '800'}}>
                                    {userName.split(' ')[0] + ' ' + userName.split(' ')[1][0] + '.'}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, color: themeColor("grayText")}}>Técnico</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                            {/* <View style={styles().contactInfo}>
                                <TouchableOpacity>
                                    <Icon color={themeColor("primaryHigh")} name="email-outline" size={30} />
                                </TouchableOpacity>
                                <Text style={{ color: themeColor("grayText") }}>{userEmail}</Text>
                            </View>
                            <View style={styles().contactInfo}>
                                <TouchableOpacity>
                                    <Icon color={themeColor("primaryHigh")} name="card-account-details-outline" size={30} />
                                </TouchableOpacity>
                                <Text style={{ color: themeColor("grayText") }}>{userNIF}</Text>
                            </View> */}
                        </View>
                        <View style={[styles().userInfoContainer, {backgroundColor: themeColor("primaryBg")}]}>
                            <StatementField styleProp={stylesField()} statement={userName} 
                                        placeholderTextColor={themeColor("grayText")} statementTitle="Nome" placeholder="..." />
                            <StatementField static={true} styleProp={stylesField()} statement={userNIF} 
                                        placeholderTextColor={themeColor("grayText")} statementTitle="NIF" placeholder="..." />
                            <StatementField styleProp={stylesField()} statement={userEmail} 
                                        placeholderTextColor={themeColor("grayText")} statementTitle="Email" placeholder="..." />
                            <StatementField styleProp={stylesField()} statement={hoursPersonPosted} 
                                        placeholderTextColor={themeColor("grayText")} statementTitle="Horas totais - Pessoa" placeholder="..." />
                            <StatementField styleProp={stylesField()} statement={hoursMachPosted}
                                        placeholderTextColor={themeColor("grayText")} statementTitle="Horas totais - Máquina" placeholder="..." />
                            
                            
                            {/* <InputField styleProp={stylesField()} objState={setPhone} initValue={currentPhone} 
                                        placeholderTextColor={themeColor("grayText")} maxLength={20} fieldName="Telefone" placeholder="Insira seu telefone" /> */}

                            {/* <TouchableOpacity disabled={isBttnDisabled} onPress={trySave} 
                            style={[styles().bttnSubmit, {backgroundColor: isBttnDisabled ? themeColor("primaryDisabled") : themeColor("primary")}]}>
                                <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>Salvar</Text>
                            </TouchableOpacity> */}
                        </View>
                    </>
                }
            </View>
        </ScrollView>
    );
}

const styles = () => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //
    
    return StyleSheet.create ({
        container: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: '4%',
            paddingHorizontal: '6%',
            gap: 14
        },
        userProfilePhoto: {
            height: 150,
            width: 150,
            borderRadius: 100,
            resizeMode: 'contain',
        },
        contactInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            // width: '50%',
            gap: 6
        },
        userInfoContainer: {
            height: '62%',
            width: '100%',
            paddingVertical: '10%',
            paddingHorizontal: '8%',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#F1F5F9', // themeColor("secondaryBg")
        },
        bttnSubmit: {
            height: 45,
            width: '47%',
            marginTop: 18,
            borderRadius: 8,
            backgroundColor: '#3976D1',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
}

const stylesField = () =>  {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

    //
    
    return StyleSheet.create({
        field: {
            width: 280,
            // height: 60, 
            gap: 6,
            marginVertical: 6,
        },
        fieldName: {
            fontSize: 16,
            fontWeight: '700',
            alignSelf: 'flex-start',
            color: themeColor("primaryText"),
        },
        input: {
            width: '100%',
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            fontSize: 16,
            color: themeColor("primaryText"),
            backgroundColor: themeColor("secondaryBg"),
        },
    });
}


export default AccountView;