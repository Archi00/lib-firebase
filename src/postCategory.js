import { db } from "./App";
import {
  setDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion
} from "@firebase/firestore";
import getDbData from "./getDb";

const postCategory = async (obj, uid) => {
  try {
    const info = await getDbData();
    if (obj.books) {
      for (let i = 0; i < info.length; i++) {
        if (info[i].data.name === obj.name) {
          if (obj.books.length > 0) {
            const rt = doc(db, uid, info[i].id);
            await updateDoc(rt, {
              books: arrayUnion(obj.books[0])
            });
            console.log("Book Added")
            break;
          }
        }
      }
    } else {
      await setDoc(doc(collection(db, uid)), obj);
      console.log("category added");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default postCategory;
