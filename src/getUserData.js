import { query, getDocs, collection, doc } from "@firebase/firestore";
import { db, auth } from "./UserApp";

const getUserData = async (user) => {
  let list = [];
  const q = query(collection(db, user.uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, data: doc.data() });
  });
  return list;
}

export default getUserData