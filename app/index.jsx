import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";
import { z } from "zod";
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});
  
  handleInputChange = (key, value) => {
    setErrors({ ...errorMsg, [key]: ""})
    setForm({ ...form, [key]: value });
  };

  handleSubmit = () => {
    try {
      LoginSchema.parse(form);
    } catch (err) {
      const validation = err.errors;
      const errors = {};
      validation.map((item) => {
        const key = item.path[0];
        errors[key] = item.message;
      });
      setErrors(errors);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg.password}</Text>}
      <Link href="/(home)" style={styles.linkText}>
        Masuk
      </Link>
      <Button handlePress={handleSubmit} text="Login" />
      <Text style={styles.link}>
        Dont't have an account?{" "}
        <Link href="/register" style={styles.linkText}>
          Register here
        </Link>
      </Text>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4DB6AC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    textAlign: "left",
    width: "100%",
  },
  linkText: {
    color: "#19918F",
  },
  errorMsg: {
    color: "red",
    width: "100%",
  },
});