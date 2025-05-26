import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../contexts/authContext";

const HeaderLogout = () => {
  const { user, logout } = useAuth();

  return (
    user && (
      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    )
  );
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          headerRight: () => <HeaderLogout />,
          contentStyle: {
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        <Stack.Screen name="auth" options={{ headerTitle: "Login" }} />
      </Stack>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  logout: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    marginRight: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
export default RootLayout;
