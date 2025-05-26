import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import noteService from "../../services/noteService";

const NoteScreen = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const resp = await noteService.getNotes();

    if (resp.error) {
      setError(resp.error);
      Alert.alert("Error", resp.error);
    } else {
      setNotes(resp.data);
      setError(null);
    }
    setLoading(false);
  };

  const deleteNote = async (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delet this note", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const resp = await noteService.deleteNote(id);

          if (resp.error) {
            setError(resp.error);
            Alert.alert("Error", resp.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
  };

  const handleUpdateNote = (id, updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.$id === id ? updatedNote.data : n))
    );
  };

  const [addModalVisible, setAddModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#f4511e"} />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList
            notes={notes}
            onDelete={deleteNote}
            onUpdate={handleUpdateNote}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={addModalVisible}
        setModalVisible={setAddModalVisible}
        setNotes={setNotes}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#f4511e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});

export default NoteScreen;
