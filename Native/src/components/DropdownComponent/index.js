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
  const widthField = props.widthByPerc || '100%';

  // HORAS TRABALHADAS, SEJA POR PESSOA SEJA NA MÁQUINA
  const { get, set } = props.state;


  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === get && (
          <Icon color='#3976D1' name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.field, { width: widthField }]}>
      <Text style={styles.fieldName}>{props.statementTitle}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={get}
        value={get}
        onChange={item => {
          set(item.value);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DropdownComponent;
