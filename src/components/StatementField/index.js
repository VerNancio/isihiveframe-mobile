import { View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native";

const StatementField = (props) => {

    const styles = props.styleProp;

    // WIDTH POR PORCENTAGEM
    const widthField = (props.widthByPerc == undefined ? '100%' : props.widthByPerc)

    return (
        <View style={[styles.field, {width: widthField}]}>
            <Text style={styles.fieldName}>{props.statementTitle}</Text>
            <ScrollView>
                <TextInput multiline={true} editable={false} style={styles.input}
                           placeholder={props.placeholder} placeholderTextColor={props.placeholderTextColor} >
                    {props.statement}
                </TextInput>
            </ScrollView>
        </View>
    );
}

export default StatementField;