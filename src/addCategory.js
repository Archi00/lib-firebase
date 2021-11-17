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
    if (info.length > 0) {
      for (let i = 0; i < info.length; i++) {
        if (info[i].data.category.name === obj.category.name) {
          if (obj.category.books.length > 0) {
            const rt = doc(db, uid, info[i].id);
            await updateDoc(rt, {
              category: {
                name: info[i].data.category.name,
                books: arrayUnion(obj.category.books[0])
              }
            });
            break;
          } else {
            await setDoc(doc(collection(db, uid)), obj);
            break;
          }
        }
      }
    } else {
      await setDoc(doc(collection(db, uid)), obj);
    }
    window.location.reload();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default postCategory;
