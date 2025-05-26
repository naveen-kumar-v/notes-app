import { database } from "./appwrite";

const databaseService = {
  //List docs
  async listDocuments(dbId, colId, queries = []) {
    try {
      const response = await database.listDocuments(dbId, colId, queries);
      return response.documents || [];
    } catch (err) {
      console.error("Error fetching documents: ", err.message);
      return { error: err.message };
    }
  },

  async creatDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error) {
      console.error("Error creating document: ", error.message);
      return {
        error: error.message,
      };
    }
  },

  async updateDocument(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
      console.error("Error updating document: ", error.message);
      return {
        error: error.message,
      };
    }
  },

  async deleteDocument(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
    } catch (error) {
      console.error("Error deleting document: ", error.message);
      return {
        error: error.message,
      };
    }
  },
};

export default databaseService;
