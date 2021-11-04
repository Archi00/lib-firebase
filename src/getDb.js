import { useAuthState } from "react-firebase-hooks/auth";
import { query, getDocs, collection } from "@firebase/firestore";
import { db, auth } from "./App";

async function getDbData() {
  let list = [];
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    list.push({ id: doc.id, data: doc.data() });
  });
  return list;
}

export default getDbData;
