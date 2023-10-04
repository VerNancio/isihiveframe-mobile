import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = (props) => {

    const styles = props.styleProp;

    return (
        <View style={styles.field}>
            <Text style={styles.fieldName}>{props.fieldName}</Text>
            <TextInput style={styles.input} onChangeText={(text) => props.objState(text)} maxLength={props.maxLength} placeholder={props.placeholder}></TextInput>
        </View>
    );
}


export default InputField;