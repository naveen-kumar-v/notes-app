import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/authContext";

const AuthScreen = () => {
  const router = useRouter();
  const { login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required.");
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    let response;

    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response.error) {
      Alert.alert("Authentication Error", response.error);
      return;
    }

    router.replace("/notes");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? "Signup" : "Login"}</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#aaa"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#aaa"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={"#aaa"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {isRegistering ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsRegistering(!isRegistering);
        }}
      >
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    // height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "#f4511e",
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    color: "#f4511e",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
});

export default AuthScreen;
