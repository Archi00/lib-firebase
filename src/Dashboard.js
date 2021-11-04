import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { logout } from "./firebase";
import { auth, db } from "./App";
import { getDocs, query, collection, where } from "@firebase/firestore";
import DisplayCategories from "./DisplayCategories";

function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = await querySnapshot.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return null;
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading]);

  try {
    return (
      <div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
        <DisplayCategories
          handleBooSubmit={props.handleBooSubmit}
          handleBooChange={props.handleBooChange}
          bookInfoList={props.bookInfoList}
          catList={props.catList}
          handleCatSubmit={props.handleCatSubmit}
          handleChange={props.handleChange}
          displayCategory={props.displayCategory}
          multiCat={props.multiCat}
          uniqueCat={props.uniqueCat}
          user={user}
        />
      </div>
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}
export default Dashboard;
