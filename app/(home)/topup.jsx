import { View, Text, StyleSheet,SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker';

import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import { useState } from "react";


export default function Topup(){
    const [amount, setAmount] = useState(0);

    const handleTopUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/topup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Top up successful');
            } else {
                Alert.alert('Error', 'Top up failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred');
        }
    };
    
    return(
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    picker: {
        width: '100%',
        marginBottom: 22,
    }
});