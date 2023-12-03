import axios from 'axios';
import Routes from '../context/Routes';

import Toast from 'react-native-toast-message';


export class HoursRequest {

    constructor () {
        this.baseURL = Routes.baseURL;
        this.path = Routes.paths.hours.path;
    }

    async getHoursRequest (setHoursLog, nif, token) {


        const endpoint = Routes.paths.hours.endpoints.getHours;
        const URL = this.baseURL + this.path + endpoint + `?nif=${nif}&token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        try {
            
            const res = await axios.get(URL, {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res);

                if (res.data.status == 'error' && res.data.mensagem == 'Token de autorização expirado') {

                    Toast.show({
                        type: 'error',
                        props: { 
                            title: `${res.data.mensagem}.`,
                            style: { marginTop: 300 }
                        }
                    });

                    return false;
                }

                if (res.data.hoursLog) {
                    setHoursLog(res.data.hoursLog);

                    return;
                }

                setHoursLog([]);

            } 
            else {

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
            throw err;
        } 

        return

    }


    async getWorkedHoursDayRequest ({setHoursDayPerson, setHoursDayMach}, nif, productId, token) {
        

        const endpoint = Routes.paths.hours.endpoints.getWorkedHoursDay;
        const URL = this.baseURL + this.path + endpoint + `?nif=${nif}&token=${token}&productId=${productId}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        try {
            
            const res = await axios.get(URL, {
                timeout: 8000,
            });

            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornadaaab: ", res.data);

                if (res.data.status == 'error' && res.data.mensagem == 'Token de autorização expirado') {

                    Toast.show({
                        type: 'error',
                        props: { 
                            title: `${res.data.mensagem}.`,
                            style: { marginTop: 300 }
                        }
                    });

                    return false;
                }
                
                // SetState de horas do técnico no dia
                res.data.hoursDayPerson != null ? setHoursDayPerson(res.data.hoursDayPerson) : setHoursDayPerson(0);

                // SetState de horas do produto na máquina no dia
                res.data.hoursDayMach != null ? setHoursDayMach(res.data.hoursDayMach) : setHoursDayMach(0);

                return [res.data.hoursDayPerson, res.data.hoursDayMach];
                
            } 
            else {

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
            throw err;
        } 

        return

    }


    async getTecTotalHours (nif, token) {
        

        const endpoint = Routes.paths.hours.endpoints.getTecTotalHours;
        const URL = this.baseURL + this.path + endpoint + `?nif=${nif}&token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        try {

            const res = await axios.get(URL, {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res.data.tecHours);

                if (res.data.status == 'error' && res.data.mensagem == 'Token de autorização expirado') {

                    Toast.show({
                        type: 'error',
                        props: { 
                            title: `${res.data.mensagem}.`,
                            style: { marginTop: 300 }
                        }
                    });

                    return false;
                }

                const tecHours = res.data.tecHours;

                if (tecHours) {
                    
                    return {tec: tecHours.HorasPessoa, mach: tecHours.HorasMaquina};
                }

                return
                
            } 
            else {

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
            throw err;
        } 

        return

    }

    async getHourLog (setDetails, hourLogId, token) {


        const endpoint = Routes.paths.hours.endpoints.getHourLog;
        const URL = this.baseURL + this.path + endpoint + `?hourLogId=${hourLogId}&token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;
        
        try {
            const res = await axios.get(URL, {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res.data.hoursLog);

                if (res.data.status == 'error' && res.data.mensagem == 'Token de autorização expirado') {

                    Toast.show({
                        type: 'error',
                        props: { 
                            title: `${res.data.mensagem}.`,
                            style: { marginTop: 300 }
                        }
                    });

                    return false;
                }

                if (res.data.hoursLog) {
                    setDetails(res.data.hoursLog);

                    return
                }

                setDetails([]);
                
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
            throw err;
        } 

    }


    async postHoursRequest (hoursPerson, hoursMach, productId, nif, token) {

        
        const endpoint = Routes.paths.hours.endpoints.postWorkedHours;
        const URL = this.baseURL + this.path + endpoint;


        // Se o token não for enviado, retorna falso
        if (!token) return false;
        
        try {
            const res = await axios.post(URL, {
                hoursPerson: hoursPerson,
                hoursMach: hoursMach,
                productId: productId,
                NIF: nif,
                token: token
            }, 
            {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res.data);

                if (res.data.status == 'error' && res.data.mensagem == 'Token de autorização expirado') {

                    Toast.show({
                        type: 'error',
                        props: { 
                            title: `${res.data.mensagem}.`,
                            style: { marginTop: 300 }
                        }
                    });

                    return false;
                }

                // if (res.data) {
                //     console.log(res.data);

                //     return res;
                // }

                // console.log('Sem dados de resposta');

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
        } catch (error) {
            // alert('erro na requi')
        console.error("Erro na requisição:", error);
        throw error;
        } 


    }

}
