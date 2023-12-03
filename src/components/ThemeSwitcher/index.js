import React from 'react';
import { View, Text, Switch } from 'react-native';

import { useTheme } from '../../context/Theme'; 
import themeColors from '../../assets/styles/color/colors.json';


const ThemeSwitcher = () => {

  const { theme, toggleTheme } = useTheme(); 

  const [light, dark] = [themeColors.light, themeColors.dark];
  const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


  //

  return (
    <View style={{ 
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingVertical: '5%', paddingHorizontal: '10%'

    }}>
      <Text style={{ color: themeColor("primaryText"), fontSize: 24, fontWeight: 600 }}>Dark mode:</Text>
      <Switch
      trackColor={{ false: themeColor('grayText'), true: themeColor('primary') }}
      thumbColor={"#f4f3f4"}
      onValueChange={toggleTheme}
      value={theme === 'dark'}
      style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      />
    </View>
  );
};

export default ThemeSwitcher;
