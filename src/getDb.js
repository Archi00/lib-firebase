import { query, getDocs, collection, doc } from "@firebase/firestore";
import { db, auth } from "./UserApp";

async function getUserData() {
  const user = await auth.currentUser;
  let list = [];
  const q = query(collection(db, user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, data: doc.data() });
  });
  return list;
}

export default getUserData;
