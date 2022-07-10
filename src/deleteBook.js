import getDbData from "./getDb";
import { arrayRemove, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "./App";
import DeleteBooksTracker from "./DeleteBooksTracker";

const deleteBook = async (obj, uid) => {
  try {
    const info = await getDbData();
    for (let i = 0; i < info.length; i++) {
      if (info[i].data.books) {
        for (let x = 0; x < info[i].data.books.length; x++) {
          if (
            obj.industryIdentifiers &&
            info[i].data.books[x].industryIdentifiers
          ) {
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
          } else {
            if (obj.title === info[i].data.books[x].title) {
              const rt = doc(db, uid, info[i].id);
              await updateDoc(rt, {
                books: arrayRemove(info[i].data.books[x])
              });
              console.log("book deleted");
            }
          }
        }
      }
    }
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

const deleteBooks = async (info, deleteTracker, uid) => {
  try {
    info.map((cat, index) => {
      const filteredBooks = cat.data.books.filter(book => deleteTracker.hasOwnProperty(book.id))
      if (filteredBooks.length > 0) {
        const rt = doc(db, uid, cat.id)
        filteredBooks.map(async (ash) => await updateDoc(rt, {books: arrayRemove(ash)}))
        console.log("Books deleted")
      }
    })
    return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}

const deleteCategory = async (deleteTracker, uid) => {
  const catId = Object.entries(deleteTracker)[0][0]
  try {
    const rt = doc(db, uid, catId)
    console.log(rt)
    await deleteDoc(rt, "books")
    console.log("Category Deleted")
    return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}
export {deleteBook, deleteBooks, deleteCategory};
