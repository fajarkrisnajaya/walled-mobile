import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Tnc from '../components/TnC';


export default function Register() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />        
      <TextInput 
          style={styles.input} 
          placeholder="Fullname" 
          placeholderTextColor="#aaa" 
          keyboardType='ascii-capable'
          />
        <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#aaa" 
            keyboardType='email-address'
            />
        <TextInput 
            style={styles.input} 
            placeholder="Phone Number" 
            placeholderTextColor="#aaa" 
            keyboardType='phone-pad'
            />
        <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#aaa" 
            keyboardType='password'
            />
    
            <Button text="Register" marginTop={48} marginBottom={16} />
           
            <Text>I have read and agree to the<Link href="/" style={{color: '#19918F'}}> Terms and Conditions *</Link> </Text>
            <Text>Have an account? <Link href="/" style={{color: '#19918F'}}>Login here</Link> </Text>
            
            <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
    resizeMode: 'stretch',
    marginBottom: 75
  }
});
