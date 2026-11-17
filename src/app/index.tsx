import { View, StyleSheet, Button, TextInput, Image } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLearnMore = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
      alert("Los campos no pueden estar vacíos");

    } else if (!regexEmail.test(email)) {
      alert("El correo electrónico no es válido");

    } else if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");

    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      alert("La contraseña debe tener mayúsculas y minúsculas");

    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      alert("La contraseña debe tener al menos un carácter especial");

    } else {
      setEmail("");
      setPassword("");
      alert("Login válido");
      router.push("/home");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/my-icon.png")}
        style={{ width: 350, height: 150 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Iniciar sesión" onPress={onPressLearnMore} />
      <Button title="Registrarse" onPress={() => router.push("/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
