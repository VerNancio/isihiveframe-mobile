import axios from 'axios';
import Routes from '../context/Routes';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Toast from 'react-native-toast-message';


export class LoginRequest {

    constructor () {
        this.baseURL = Routes.baseURL;
        this.path = Routes.paths.login.path;
    }


    async tryLogin (email, password) {

        const endpoint = Routes.paths.login.endpoints.login;
        const URL = this.baseURL + this.path + endpoint;

        
        //

        const data = {
            email: email,
            password: password
        }

        try {

            
            const res = await axios.post(URL, JSON.stringify(data), {
                timeout: 8000,
            })
            .then(response => {

                if (response.status >= 200 && response.status < 300) {

                    console.log(response.data)
                    return response.data;
                } 

                return false;
            })
            .catch(err => {
                console.error("Erro na requisição:", err);
                throw err;
            })

            if (res.status == 'success') {

                return res;

            } else {

                // Toast.show({
                //     type: 'error',
                //     props: { 
                //         title: "Erro na requisição",
                //         style: { marginTop: 300 }
                //     }
                // });

                return res;
            }

        } catch (err) {

            console.log("Erro na requisição de login")

            Toast.show({
                type: 'error',
                props: { 
                    title: "Houve algum erro na requisição",
                    style: { marginTop: 300 }
                }
            });

            return err;
        }
    }
    

    async storeUserSession(loginResponse) {

        try {

            console.log(loginResponse)

            await Promise.all([
                AsyncStorage.setItem('authToken', loginResponse.token),
                AsyncStorage.setItem('userName', loginResponse.nome),
                AsyncStorage.setItem('userEmail', loginResponse.email),
                AsyncStorage.setItem('userNIF', loginResponse.nif),
                AsyncStorage.setItem('userPosition', loginResponse.cargo)
            ])

        }
        catch (err) {

            console.log(err)

            Toast.show({
                type: 'error',
                props: { 
                    title: "Falha ao guardar credenciais de usúario",
                    style: { marginTop: 300 }
                }
            });

            return false;
        }
    }


    async getWhenTokenExp (token) {


        const endpoint = Routes.paths.login.endpoints.getWhenTokenExp;
        const URL = this.baseURL + this.path + endpoint + `?token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        // alert(URL)

        
        try {

            console.log(URL)
            const res = await axios.get(URL, {
                timeout: 8000,
            });

    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res.data);

                return res.data;
                
            } else {

                console.error("Erro na requisição:", res);

                Toast.show({
                    type: 'error',
                    props: { 
                        text: "Erro na requisição",
                        style: { marginTop: 300 }
                    }
                });

                return false;
            }
        } catch (err) {

            console.error("Erro na requisição:", err);

            Toast.show({
                type: 'error',
                props: { 
                    title: "Houve algum erro na requisição",
                    style: { marginTop: 300 }
                }
            });

            return false;
        } 

    }

}
