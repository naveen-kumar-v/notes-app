import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostItImage from "../assets/images/post-it.png";
import { useAuth } from "../contexts/authContext";

const HomeScreen = () => {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/notes");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.ceteredContainer}>
        <ActivityIndicator size={"large"} color={"#f4511e"} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome To Notes App</Text>
      <Text style={styles.caption}>
        Capture your thoughts anytime, anywhere!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/notes`)}
        // activeOpacity={0.5}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  caption: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#f4511e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ceteredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
