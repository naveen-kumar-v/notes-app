import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import noteService from "../services/noteService";

const AddNoteModal = ({ modalVisible, setModalVisible, setNotes }) => {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  const addNote = async () => {
    if (newNote.title.trim() === "" || newNote.content.trim() === "") return;

    const response = await noteService.addNote(newNote.title, newNote.content);

    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prev) => [response.data, ...prev]);
    }

    setNewNote({ title: "", content: "" });
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title..."
            placeholderTextColor="#aaa"
            onChangeText={(text) =>
              setNewNote((prev) => ({ ...prev, title: text }))
            }
            value={newNote.title}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Note..."
            placeholderTextColor="#aaa"
            multiline
            onChangeText={(text) =>
              setNewNote((prev) => ({ ...prev, content: text }))
            }
            value={newNote.content}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={addNote}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelBtnText: {
    fontSize: 16,
    color: "#333",
  },
  saveBtn: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveBtnText: {
    fontSize: 16,
    color: "#fff",
  },
});
export default AddNoteModal;
