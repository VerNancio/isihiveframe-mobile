import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const data = [
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

  const styles = props.styleProp;

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
          <Icon color='#3976D1' name="check" color="#3976D1" size={20} />
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
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={ hoursWorked }
        // value={item.value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DropdownComponent;
