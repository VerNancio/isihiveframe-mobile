import { View, Text, TextInput } from "react-native";

const StatementField = (props) => {

    const styles = props.styleProp;

    return (
        <View style={styles.field}>
            <Text style={styles.fieldName}>{props.statementTitle}</Text>
            <TextInput style={styles.input}>{props.statement}</TextInput>
        </View>
    );
}

export default StatementField;