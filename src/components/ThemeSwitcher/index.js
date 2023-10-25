import React from 'react';
import { View, Text, Switch } from 'react-native';

import { useTheme } from '../../context'; 
import themeColors from '../../assets/styles/color/colors.json';


const ThemeSwitcher = () => {

  const { theme, toggleTheme } = useTheme(); 

  const [light, dark] = [themeColors.light, themeColors.dark];
  const themeColor = (style) => theme === 'light' ? light[style] : dark[style];


  //

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={{color: themeColor("primaryText")}}>Dark mode:</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={"#f4f3f4"}
        onValueChange={toggleTheme}
        value={theme === 'dark'}
        />
    </View>
  );
};

export default ThemeSwitcher;
