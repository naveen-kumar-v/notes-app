import { ID } from "react-native-appwrite";
import databaseService from "./databaseService";

// Appwrite database and collection ID
const dbID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  //GET Notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbID, colId);

    if (response.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  // Add a note
  async addNote(title, content) {
    if (!title || !content) {
      return { error: "Note title or content cannot be empty!" };
    }

    const data = {
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
    };

    const response = await databaseService.creatDocument(
      dbID,
      colId,
      data,
      ID.unique()
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  // Update a note
  async updateNote(id, title, content) {
    console.log("update note triggered!");
    if (!title || !content) {
      return { error: "Note title or content cannot be empty!" };
    }

    const data = {
      title: title,
      content: content,
    };

    const response = await databaseService.updateDocument(
      dbID,
      colId,
      id,
      data
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  // Delete a note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbID, colId, id);

    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default noteService;
