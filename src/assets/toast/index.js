import Toast from 'react-native-toast-message';

const showToast = (params) => {
    Toast.show({
        type: params.type,
        text1: params.text1,
        // text2: params.text2
    });
}

export default showToast;