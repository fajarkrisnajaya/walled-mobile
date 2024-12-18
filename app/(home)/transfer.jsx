import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from "react-native";
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Transfer() {
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState("");
    const navigation = useNavigation();

    const handleTransfer = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                // Fetch user profile to get the fromId and fullname
                const profileResponse = await axios.get(
                    "http://192.168.30.58:8080/profile",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("Profile Response:", profileResponse.data);

                const { id: fromId, fullname } = profileResponse.data.data;
                console.log("From ID:", fromId);
                console.log("Fullname:", fullname);

                // Perform the transfer
                const transferResponse = await axios.post(
                    "http://192.168.30.58:8080/transfer",
                    {
                        fromId: fromId,
                        toId: accountNumber,
                        amount: parseFloat(amount),
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("Transfer successful:", transferResponse.data);
                Alert.alert("Success", `Transfer successful from ${fullname} to Account Number :${accountNumber}`);
                navigation.navigate("(home)/index");
            } else {
                console.log("Token is null");
                Alert.alert("Error", "Token is null");
            }
        } catch (e) {
            console.log("Transfer failed:", e.response ? e.response.data : e.message);
            Alert.alert("Error", "Transfer failed");
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ddd' }}>
            <View style={{backgroundColor: '#19918F', paddingHorizontal: 20, paddingVertical: 8, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>To:</Text>
                <TextInput
                    style={{ fontSize: 18 }}
                    keyboardType="number-pad"
                    placeholder="insert account number"
                    placeholderTextColor={'#fff'}
                    color={'#fff'}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                />
            </View>
            <View style={styles.container}>
                <View>
                    <Amount
                        showBalance={true}
                        marginBottom={24}
                        balance={"10.000.000"}
                        amount={amount}
                        onChangeText={setAmount}
                    />
                    <Input text={"Notes"} value={notes} onChangeText={setNotes} />
                </View>
                <Button marginTop={240} marginBottom={20} text="Transfer" handlePress={handleTransfer} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'space-between',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    }
});