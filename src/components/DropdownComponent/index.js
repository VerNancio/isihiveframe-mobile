import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { useTheme } from "../../context/Theme";
import themeColors from '../../assets/styles/color/colors.json';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const dropdownLength = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
];

const DropdownComponent = (props) => {

  const [value, setValue] = useState(0)

  const styles = styleDropdown();

  const { setState } = props;

  // WIDTH POR PORCENTAGEM
  const widthField = (props.widthByPerc == undefined ? '100%' : props.widthByPerc)

  //
  // //
  //


  // HORAS TRABALHADAS, SEJA POR PESSOA SEJA NA MAQUINA
  const hoursWorked = 0;

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <Icon color='#3976D1' name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.field, {width: widthField}]}>
      <Text style={styles.fieldName}>{props.statementTitle}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={dropdownLength}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={ hoursWorked }
        value={ hoursWorked }
        onChange={item => {
          setState(item.value);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

const styleDropdown = () => {

  const { theme } = useTheme(); 

  const [light, dark] = [themeColors.light, themeColors.dark];
  const themeColor = (style) => theme === 'light' ? light[style] : dark[style];

  //
  
  
  return StyleSheet.create({
      field: {
          gap: 6,
          marginTop: 14,
      },
      fieldName: {
          fontSize: 16,
          fontWeight: '700',
          color: themeColor("primaryText"),
      },
      dropdown: {
          paddingVertical: 11,
          paddingHorizontal: '5%',
          backgroundColor: themeColor("inputBg"),
          borderRadius: 8,
      },
      item: {
          padding: 17,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: themeColor('inputBg'),
          // borderRadius: 8,
      },
      textItem: {
          flex: 1,
          fontSize: 20,
          color: themeColor("primaryText"),
      },
      placeholderStyle: {
          backgroundColor: themeColor("inputBg"),
          borderRadius: 8,
          fontSize: 20,
          color: themeColor("primaryText"),
      },
      selectedTextStyle: {
          backgroundColor: themeColor("inputBg"),
          borderRadius: 8,
          fontSize: 20,
          color: themeColor("primaryText"),
      },
  });
}

export default DropdownComponent;
