import { View, Text, TextInput } from "react-native";

const StatementField = (props) => {

    const styles = props.styleProp;

    // WIDTH POR PORCENTAGEM
    props.styleProp.field.width = (props.widthByPerc == undefined ? '100%' : props.widthByPerc);
    console.log((props.widthByPerc == undefined ? '100%' : props.widthByPerc))

    // console.log(props.styleProp.field.width)

    return (
        <View style={styles.field}>
            <Text style={styles.fieldName}>{props.statementTitle}</Text>
            <TextInput editable={false} style={styles.input}>{props.statement}</TextInput>
        </View>
    );
}

export default StatementField;