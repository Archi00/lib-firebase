import { db } from "./App";
import { addDoc, collection } from "@firebase/firestore";
import getDbData from "./getDb";

const postCategory = async (cat) => {
  try {
    const dbData = await getDbData();
    const docRef = await addDoc(collection(db, "users"), cat);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default postCategory;
