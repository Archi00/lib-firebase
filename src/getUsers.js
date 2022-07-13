import { query, getDocs, collection, doc } from "@firebase/firestore";
import { db } from "./UserApp";

const getUsers = async () => {
  let users = []
  const usersQuery = query(collection(db, "users"));
  const usersSnapshot = await getDocs(usersQuery);
  usersSnapshot.forEach(async user => {
    users.push(user.data())
  })
  return users
}

export default getUsers;