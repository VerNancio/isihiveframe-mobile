import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../context/Theme'; 
import themeColors from '../../assets/styles/color/colors.json';
import Toast from 'react-native-toast-message';

import JwtSvg from '../../assets/image/jwt_icon.svg';

import { UserRequest } from '../../requests/user';
import { LoginRequest } from '../../requests/login';



const UserReq = new UserRequest();
const LoginReq = new LoginRequest();


const JwtComponent = () => {

  const { theme, toggleTheme } = useTheme(); 

  const [light, dark] = [themeColors.light, themeColors.dark];
  const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


  //

  const timestampToDatetime = (timestamp) => {


    try {

      if (timestamp * 1000 < new Date().getTime()) {

          return "EXPIRADO";
      }

      const datetime = new Date(timestamp * 1000);


      // Obtém o dia e o mês como números
      const day = datetime.getDate();
      const month = datetime.getMonth() + 1; // Os meses são indexados de 0 a 11, então adicionamos 1
      const year = datetime.getFullYear();

      // Formata o dia e o mês para terem dois dígitos
      const dayFormated = day < 10 ? `0${day}` : day;
      const monthFormated = month < 10 ? `0${month}` : month;
      const yearFormated = year.toString().slice(2);

      // Cria a string no formato 'dd-mm'
      const datetimeFormated = `${dayFormated}/${monthFormated}/${yearFormated}`;

      return datetimeFormated;
    }
    catch (err) {

      return('...');
    }

  }

  const [userToken, setUserToken] = useState(null);
  const [tokenExp, setTokenExp] = useState('...');

  useEffect(() => {

    const fetchData = async () => {

      try {

          // Pegando o token jwt
          const token = await UserReq.getUserData(false, 'authToken');

          setUserToken(token);


          // Tempo para expiração do token jwt
          const res = await LoginReq.getWhenTokenExp(token);

          if(res === false) {

            setTokenExp('...');

            return
          }

          const expDatetime = timestampToDatetime(res.tokenExpTimestamp);

          setTokenExp(expDatetime);
      } 
      catch (err) {

        console.log('ERRO: ', err)

          Toast.show({
              type: 'error',
              props: { 
                  title: 'Erro ao puxar expiração do token.',
                  style: { marginTop: 300 },
                  darkTheme: theme !== 'light'
              }
          });

          setTokenExp('...');
      } 
      
    }

    fetchData();
  }, [])



  const setWhenTokenExpires = async () => {
  
    try {

        // Tempo para expiração do token jwt
        const res = await LoginReq.getWhenTokenExp(userToken);

        const expDatetime = timestampToDatetime(res.tokenExpTimestamp);

        setTokenExp(expDatetime);
    } 
    catch (err) {

      console.log('ERRO: ', err)

        Toast.show({
            type: 'error',
            props: { 
                title: 'Erro ao puxar expiração do token.',
                style: { marginTop: 300 },
                darkTheme: theme !== 'light'
            }
        });

    } 
  }

  return (

    <TouchableOpacity onPress={() => {setWhenTokenExpires()}} style={{ 
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingVertical: '4%', paddingHorizontal: '10%'
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <JwtSvg width={60} height={60} />
            <Text style={{ color: themeColor("secondaryText"), fontSize: 24, fontWeight: 600 }}>JWT:</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: 600, 
                        color: tokenExp !== 'EXPIRADO' ? themeColor("secondaryText") : themeColor('errorColor')
            }}>
                {tokenExp}
            </Text>
        </View>
    </TouchableOpacity>
  );
};

export default JwtComponent;
