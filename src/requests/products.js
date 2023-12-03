import axios from 'axios';
import Routes from '../context/Routes';

import Toast from 'react-native-toast-message';


export class ProductRequest {

    constructor () {
        this.baseURL = Routes.baseURL;
        this.path = Routes.paths.products.path;
    }
    

    async getProductsRequest (setDetails, nif, token) {


        const endpoint = Routes.paths.products.endpoints.getProducts;
        const URL = this.baseURL + this.path + endpoint + `?nif=${nif}&token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;
        
        try {
            const res = await axios.get(URL, {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log('res:', res.data)

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
                

                if (res.data.products) {
                    setDetails(res.data.products);

                    return;
                }

                setDetails([]);
                
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
        } catch (error) {
            // alert('erro na requi')
            console.error("Erro na requisição:", error);
            throw error;
        } 

    }

    
    async getReminderProductsRequest (setDetails, nif, token) {


        const endpoint = Routes.paths.products.endpoints.getReminderProducts;
        const URL = this.baseURL + this.path + endpoint + `?nif=${nif}&token=${token}`;

        
        // Se o token não for enviado, retorna falso
        if (!token) return false;
        try {
            const res = await axios.get(URL, {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log("RESPOSTAAA: ", res.data);

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

                if (res.data.products) {
                    setDetails(res.data.products);

                    return;
                }

                setDetails([]);
                
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
        } catch (error) {
            // alert('erro na requi')
            console.error("Erro na requisição:", error);
            throw error;
        } 

    }


    async getProductDetailRequest (setDetails, productId, token) {


        const endpoint = Routes.paths.products.endpoints.getProductDetails;
        const URL = this.baseURL + this.path + endpoint + `?productId=${productId}&token=${token}`;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        try {
            const res = await axios.get(URL, {
                timeout: 8000,
            });
    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res.data.productDetails);

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

                if (res.data.productDetails) {
                    setDetails({...res.data.productDetails, ...res.data.workedHours});

                    return;
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
            // alert('erro na requi')
            console.error("Erro na requisição:", err);
            throw err;
        } 
    }


    async concludeProductRequest (productId, token) {


        const endpoint = Routes.paths.products.endpoints.concludeProduct;
        const URL = this.baseURL + this.path + endpoint;


        // Se o token não for enviado, retorna falso
        if (!token) return false;

        try {
            const res = await axios.put(URL, {
                productId: productId,
                token: token
            },
            {
                timeout: 8000,
            }
            );
    
            if (res.status >= 200 && res.status < 300) {

                console.log("Resposta retornada: ", res.data);

                if (res.data.status === 'error') {

                    console.log(res.data.mensagem)

                    if (res.data.mensagem == 'Token de autorização expirado') {

                        Toast.show({
                            type: 'error',
                            props: { 
                                text: res.data.mensagem,
                                style: { marginTop: 300 }
                            }
                        });

                        return false
                    }

                    return res.data;

                }

                return res.data;
                
            } else {

                console.error("Erro na requisição:", res.data);

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

            // alert('erro na requi')
            console.error("Erro na requisição:", err);
            throw err;
        } 
    }
    
    
}

