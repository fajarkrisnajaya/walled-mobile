import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";


export default function Topup(){
    return(
        <View style={styles.container}>
            <Amount marginBottom={24} />
            <Picker
                selectedValue={"default"}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => console.log(itemValue)} >
                <Picker.Item label="BYOND Pay" value="option1" />
                <Picker.Item label="OVO" value="option2" />
                <Picker.Item label="Gopay" value="option3" />
            </Picker>
            <Input text={"Notes"} />
            
            <Button text={"Top Up"} marginTop={150}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    picker: {
        width: '100%',
        marginBottom: 24
    }
});