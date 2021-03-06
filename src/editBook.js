import getDbData from "./getDb";
import { arrayRemove, doc, updateDoc } from "@firebase/firestore";
import { db } from "./App";

const deleteBook = async (obj, uid) => {
  try {
    const info = await getDbData();
    for (let i = 0; i < info.length; i++) {
      for (let x = 0; x < info[i].data.books.length; x++) {
        if (
          obj.industryIdentifiers[0].identifier ===
          info[i].data.books[x].industryIdentifiers[0].identifier
        ) {
          const rt = doc(db, uid, info[i].id);
          await updateDoc(rt, {
            books: arrayRemove(info[i].data.books[x])
          });
          console.log("book deleted");
        }
      }
    }
    window.location.reload();
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export default deleteBook;
