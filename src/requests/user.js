import axios from 'axios';
import Routes from '../context/Routes';

import AsyncStorage from '@react-native-async-storage/async-storage';


export class UserRequest {

    constructor () {
        this.baseURL = Routes.baseURL;
        this.path = Routes.paths.login.path;
    }

    async getProfilePicRequest (setState, nif, token) {
        

        const endpoint = Routes.paths.user.endpoints.getProfilePic;
        const URL = this.baseURL + this.path + endpoint + `nif=${nif}&token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        try {
            const res = await fetch(URL, {
                responseType: 'arraybuffer', // Use responseType 'arraybuffer' for binary data
                // responseType: 'blob', 
            })  

            if (res.status >= 200 && res.status < 300) {

          
                  

                console.log("Resposta retornada: ", res.data.hoursLog);

                if (res.data.hoursLog) {

                    // const blob = res.data;

                    const blob = new Blob([response.data], { type: 'image/jpeg' });
                //   setImageBlob(blob);

                    setState(blob);

                    return;
                }

                return false;

            } 
            else {

                console.error("Erro na requisição da imagem:", res);
            }

        } 
        catch (err) {

            console.error("Erro na requisição da imagem:", err);
            throw err;
        } 
    }

    
    async getUserData (setState, key) {

        try {

            const res = await AsyncStorage.getItem(key);

            if (setState != false) {
                setState(res);

                return
            }

            return res
        }
        catch (err) {
            
            console.log('erro: ', err);
        }

    }

}
