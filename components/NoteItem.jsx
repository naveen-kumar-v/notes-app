import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UpdateNoteModal from "./UpdateNoteModal";

const NoteItem = ({ item, onDelete, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.noteItem}>
      <View style={styles.firstLine}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.delete}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.$id)}>
            <Text style={styles.delete}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.noteContent}>{item.content}</Text>

      <UpdateNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        note={item}
        onUpdate={onUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  firstLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  delete: {
    fontSize: 14,
  },
});

export default NoteItem;
