import { db } from "./UserApp";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "@firebase/firestore";
import getDbData from "./getDb";

const updateBook = async (ISBN, obj, uid) => {
  try {
    const info = await getDbData();
    if (obj.books) {
      for (let i = 0; i < info.length; i++) {
        const rt = doc(db, uid, info[i].id);
        const query = await getDoc(rt);
        if (info[i].data.name === obj.name) {
          query.data().books.forEach(async (x) => {
            const p = x;
            if (x.industryIdentifiers[0].identifier === ISBN) {
              await updateDoc(rt, { books: arrayRemove(x) });
              for (let y = 0; y < query.data().books.length; y++) {
                Object.keys(query.data().books[y]).reduce((a, b) => {
                  if (b && Object.keys(obj.books).includes(b)) {
                    if (b !== "authors") {
                      p[b] = obj.books[b];
                    } else {
                      p[b] = [obj.books[b]];
                    }
                  }
                  Object.keys(obj.books).reduce((a, b) =>
                    !Object.keys(p).includes(b) ? (p[b] = obj.books[b]) : null
                  );
                });
              }
              try {
                await updateDoc(rt, { books: arrayUnion(p) });
                console.log(x);
              } catch (e) {
                console.error("Error deleting document: ", e);
              }
            }
          });
        }
      }
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export default updateBook;
