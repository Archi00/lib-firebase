import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, query, collection, where } from "@firebase/firestore";
import { useState } from "react";
import { db, auth } from "./App";

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

async function FetchUserName() {
  const [name, setName] = useState("");
  const [user] = useAuthState(auth);
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const data = await querySnapshot.docs[0].data();
    setName(data.name);
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
}

export { capitalize, FetchUserName };
