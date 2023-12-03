import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';

// import { useTheme } from '../../context/Theme';
import themeColors from '../styles/color/colors.json';


//

const [light, dark] = [themeColors.light, themeColors.dark];
// const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


const toastConfig = {
 
  success: ({ props }) => (
    <BaseToast
      {...props}
      text1={props.title}
      text2={props.text}
      style={{ borderColor: '#03A64A', borderLeftWidth: 8 }}
      contentContainerStyle={
        [
            props.darkTheme ? {backgroundColor: dark.primaryBg} : {backgroundColor: light.primaryBg}, 
            { paddingHorizontal: 15 }
        ]}
      text1Style={
        [   
            props.darkTheme ? {color: dark.primaryText} : '',
            {
                fontSize: 15,
                fontWeight: '400',
            }
        ]}
    />
  ),

  warning: ({ props }) => (
    <BaseToast
      {...props}
      text1={props.title}
      text2={props.text}
      style={{ borderColor: '#ED8B16', borderLeftWidth: 8 }}
      contentContainerStyle={
        [
            props.darkTheme ? {backgroundColor: dark.primaryBg} : {backgroundColor: light.primaryBg}, 
            { paddingHorizontal: 15 }
        ]}
      text1Style={
        [   
            props.darkTheme ? {color: dark.primaryText} : '',
            {
                fontSize: 15,
                fontWeight: '400',
            }
        ]}
    />
  ),

  error: ({ props }) => (
    <BaseToast
      {...props}
      text1={props.title}
      text2={props.text}
      style={{ borderColor: '#FF4858', borderLeftWidth: 8 }}
      contentContainerStyle={
        [
            props.darkTheme ? {backgroundColor: dark.primaryBg} : {backgroundColor: light.primaryBg}, 
            { paddingHorizontal: 15 }
        ]}
      text1Style={
        [   
            props.darkTheme ? {color: dark.primaryText} : '',
            {
                fontSize: 15,
                fontWeight: '400',
            }
        ]}
    />
  ),
 
};

export default toastConfig;