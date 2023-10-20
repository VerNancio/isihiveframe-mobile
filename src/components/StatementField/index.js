import { View, Text, TextInput } from "react-native";

const StatementField = (props) => {

    const styles = props.styleProp;

    // WIDTH POR PORCENTAGEM
    const widthField = (props.widthByPerc == undefined ? '100%' : props.widthByPerc)

    return (
        <View style={[styles.field, {width: widthField}]}>
            <Text style={styles.fieldName}>{props.statementTitle}</Text>
            <TextInput editable={false} style={styles.input}>{props.statement}</TextInput>
        </View>
    );
}

export default StatementField;