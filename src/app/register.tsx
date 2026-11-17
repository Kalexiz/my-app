import { View, StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPressLearnMore = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || username === "" || password === "" || confirmPassword === "") {
      alert("Los campos no pueden estar vacíos");
    } else if (!regexEmail.test(email)) {
      alert("El correo electrónico no es válido");
    } else if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      alert("La contraseña debe tener mayúsculas y minúsculas");
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      alert("La contraseña debe tener al menos un carácter especial");
    } else if (password !== confirmPassword) {
      alert("Las contraseñas deben coincidir");
    } else {
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Atrás" onPress={() => router.back()} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
      <Button title="Registrarse" onPress={onPressLearnMore} />
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
