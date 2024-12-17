import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Topup() {
    const [amount, setAmount] = useState(0);
    const [notes, setNotes] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('default');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'BYOND Pay', value: 'option1' },
        { label: 'OVO', value: 'option2' },
        { label: 'Gopay', value: 'option3' }
    ]);

    const handleTopUp = async () => {
        console.log("handleTopUp called");
        console.log("Amount:", amount);
        try {
            const token = await AsyncStorage.getItem("token");
            console.log("Token:", token);
            if (token !== null) {
                const response = await axios.post(
                    "http://192.168.30.58:8080/topup",
                    { amount },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("Top-up successful:", response.data);
            } else {
                console.log("Token is null");
            }
        } catch (e) {
            console.log("Top-up failed:", e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Amount onChangeText={setAmount} />
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={selectedPaymentMethod}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedPaymentMethod}
                    setItems={setItems}
                    style={styles.dropdown}
                />
            </View>
            <Input text={"Notes"} onChangeText={setNotes} />
            <Button text={"Top Up"} marginTop={150} handlePress={handleTopUp} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        marginBottom: 24,
    },
    dropdown: {
        height: 50,
        width: '100%',
    },
});