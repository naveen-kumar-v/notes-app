import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import noteService from "../services/noteService";

const UpdateNoteModal = ({ modalVisible, setModalVisible, note, onUpdate }) => {
  const [updatedNote, setUpdatedNote] = useState({
    title: note?.title,
    content: note?.content,
  });

  useEffect(() => {
    if (modalVisible) {
      setUpdatedNote({ title: note?.title, content: note?.content });
    }
  }, [modalVisible]);

  const updateNote = async () => {
    if (updatedNote.title.trim() === "" || updatedNote.content.trim() === "") {
      Alert.alert("Error", "Title and content cannot be empty.");
      return;
    }

    const response = await noteService.updateNote(
      note.$id,
      updatedNote.title,
      updatedNote.content
    );

    if (response.error) {
      Alert.alert("Error", response.error);
      return;
    }

    onUpdate(note.$id, response);

    setUpdatedNote({ title: "", content: "" });
    setModalVisible(false);

    Keyboard.dismiss();
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
          <Text style={styles.modalTitle}>Update Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title..."
            placeholderTextColor="#aaa"
            onChangeText={(text) =>
              setUpdatedNote((prev) => ({ ...prev, title: text }))
            }
            value={updatedNote.title}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Note..."
            placeholderTextColor="#aaa"
            multiline
            onChangeText={(text) =>
              setUpdatedNote((prev) => ({ ...prev, content: text }))
            }
            value={updatedNote.content}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={updateNote}>
              <Text style={styles.saveBtnText}>Update</Text>
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
export default UpdateNoteModal;
