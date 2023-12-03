import { View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { useTheme } from '../../context/Theme';
import themeColors from '../../assets/styles/color/colors.json';

import LogoSvg from "../../assets/image/logo.svg";


//


const [ view_HEIGHT, view_WIDTH] = [ Dimensions.get('screen').height, Dimensions.get('screen').width];


const LoadingLogo = (props) => {

    const { theme } = useTheme(); 

    const [light, dark] = [themeColors.light, themeColors.dark];
    const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


    //


    return (
        <View style={
            [ props.blockView ? 
                { 
                    height: view_HEIGHT, width: view_WIDTH, justifyContent: 'center',
                    backgroundColor: `${themeColor('primaryBg')}90`, 
                    position: 'absolute', zIndex: 1, 
                } 
                : ''
            ,
            props.isLoading ? 
                { display: 'flex' } : { display: 'none' }
            ]
            }>
            <Animatable.View style={{ justifyContent: 'center', alignSelf: 'center'}} animation="rotate" duration={1400} iterationCount="infinite" direction='normal' useNativeDriver>
                <LogoSvg width={props.width} height={props.height} />
            </Animatable.View>
        </View>
    )
}

export default LoadingLogo;