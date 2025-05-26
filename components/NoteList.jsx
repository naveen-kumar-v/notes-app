import { FlatList } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onUpdate }) => {
  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <NoteItem item={item} onDelete={onDelete} onUpdate={onUpdate} />
      )}
    />
  );
};

export default NoteList;
