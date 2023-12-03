const Routes = {
    // baseURL: 'http://localhost/' + 'teste-ip/' + 'backend/php-api/', 
    // baseURL: 'http://192.168.43.232:80/' + 'teste-ip/' + 'backend/php-api/',
    // baseURL: 'http://172.16.3.126:80/' + 'teste-ip/' + 'backend/php-api/',
    // baseURL: 'http://172.16.2.214:80/' + 'aaa/' + 'backend/php-api/',
    baseURL: 'http://192.168.1.5:80/' + 'aaa/' + 'backend/php-api/',

    // baseURL: 'https://api-mobile.icyflower-ac75c6b1.eastus.azurecontainerapps.io/' + 'teste-ip/' + 'backend/php-api/',

    
    

    paths: {
        login: {
            path: 'login/', 
            endpoints: 
            {
                login: 'login.php',
                getWhenTokenExp: 'getWhenTokenExp.php'
            }
        },
        hours: {
            path: 'hours/', 
            endpoints: 
            {
                getHours: 'getHours.php',
                getWorkedHoursDay: 'getWorkedHoursDay.php',
                getTecTotalHours: 'getTecTotalHours.php',
                getHourLog: 'getHourLog.php',
                postWorkedHours: 'postWorkedHours.php',
            }
        },
        products: {
            path: 'products/', 
            endpoints: 
            {
                getProducts: 'getProducts.php',
                getProductDetails: 'getProductDetails.php',
                getReminderProducts: 'getReminderProducts.php',
                postWorkedHours: 'postWorkedHours.php',
                concludeProduct: 'concludeProduct.php',
            }
        },
        user: {
            path: 'user/', 
            endpoints: 
            {
                getProfilePic: 'getProfilePic.php',

            }
        },
    }
}

export default Routes;