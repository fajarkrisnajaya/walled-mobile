import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  // Fetch User Profile Data
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "http://192.168.30.58:8080/profile",
            {
              headers: { Authorization: `Bearer ${value}` },
            }
          );
          setUser(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  // Fetch Transactions Data
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "http://192.168.30.58:8080/transactions",
            {
              headers: { Authorization: `Bearer ${value}` },
            }
          );
          setTransactions(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTransactions();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image
            source={
              user.avatar_url
                ? { uri: user.avatar_url }
                : require('../../assets/avatar.png')
            }
            style={styles.profileAvatar}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.fullname}</Text>
            <Text style={{ fontSize: 18 }}>{user.typeofaccount}</Text>
          </View>
        </View>
        <Image source={require('../../assets/suntoggle.png')} />
      </View>

      <View style={{ backgroundColor: '#FAFBFD', paddingHorizontal: 20, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 25, justifyContent: 'space-between' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
              Good Morning, {user.fullname ? user.fullname.split(' ')[0] : 'Guest'}
            </Text>
            <Text style={{ fontSize: 18 }}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={require('../../assets/sun.png')} style={{ width: 81, height: 77 }} />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{user.accountnumber}</Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ fontSize: 20 }}>Balance</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Rp {user.balance}</Text>
          </View>
        </View>

        <View style={[styles.transactionsContainer, { marginTop: 20 }]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Transactions</Text>
          <View style={styles.transactionCard}>
            {transactions.map(transaction => {
              console.log(user); // Log the avatar URL here
              return (
                <View key={transaction.id} style={styles.transactionItem}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image
                      source={
                        user.avatar_url
                          ? { uri: user.avatar_url }
                          : require('../../assets/avatar.png')
                      }
                      style={styles.transactionAvatar}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.transactionName}>{transaction.fromto}</Text>
                      <Text style={styles.transactionDescription}>{transaction.description}</Text>
                    </View>
                    <Text
                      style={[
                        styles.transactionAmount,
                        { color: transaction.type === 'Topup' ? '#19918F' : '#D9534F' },
                      ]}
                    >
                      {transaction.type === 'Topup' ? `+ ${transaction.amount}` : `- ${transaction.amount}`}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10,
  },
  balancebox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionsContainer: {
    marginTop: 20,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionItem: {
    marginBottom: 10,
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});