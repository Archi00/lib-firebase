import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, query, collection, where } from "@firebase/firestore";
import { useState } from "react";
import { db, auth } from "./UserApp";

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

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

function debounce(func, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), ms);
  };
}

  const getData = async (filter, value) => {
    let temp = [];
    if (filter === "category") {
      for (let i = 0, l = props.info.length; i < l; i++) {
        if (props.info[i].data.name.toUpperCase().includes(value.toUpperCase())) {
          temp.push(props.info[i]);
        }
      }
      return temp;
    } 
    for (let i = 0, l = props.info.length; i < l; i++) {
      if (props.info[i].data.books) {
        props.info[i].data.books.map((e) => {
            if (typeof e[filter] === "string") {
              if (e[filter].toUpperCase().includes(value.toUpperCase())) {
                temp.push(e);
              }
            } else if (typeof e[filter] === "object") {
              Object.values(e[filter]).forEach((y) => {
                if (!y.identifier) {
                  if (
                    e[filter][0].toUpperCase().includes(value.toUpperCase())
                  ) {
                    temp.push(e);
                  }
                } else {
                  if (y.identifier.includes(value)) {
                    temp.push(e);
                  }
                }
              });
            }
        });
      }
    }
    return temp;
    
  };

  const filterCategories = (e) => {
    let temp = []
    if (e.target.value === "" || !e.target.value) {
      cleanFilters();
      return
    }
    const name = e.target.name.split("-").pop();
    e.target.parentNode.childNodes.forEach((a) => {
      if (a.nodeName === "INPUT" && name === "category") {
        if (!a.value) {
          cleanFilters();
          return
        }
        getData(a.name.split("-").pop(), a.value.toUpperCase()).then((res, err) => {
          res.map(r => temp.push([...catFilters, r.data?.name]))
        });
      } else if (a.nodeName === "INPUT" ) {
        if (!a.value.toUpperCase()) {
          cleanFilters();
          return
        }
        getData(a.name.split("-").pop(), a.value.toUpperCase()).then((res, err) => {
          if (a.value.toUpperCase) return res;
        });
      }
    });
    return temp
  };

export { capitalize, FetchUserName, classNames, debounce, filterCategories, getData };
