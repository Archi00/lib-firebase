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

  const getData = async (filter, value, list) => {
    let temp = [];
    for (let i = 0, l = list.length; i < l; i++) {
      list[i].data?.books?.map((e) => {
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
    return temp;
    
  };

  const filterCategories = async (e, list, setFilters) => {
    if (e.target.value === "" || !e.target.value) {
      return setFilters([])
    }
    const name = e.target.name.split("-").pop();
    e.target.parentNode.childNodes.forEach(async (a) => {
      if (a.nodeName === "INPUT" ) {
        if (!a.value.toUpperCase()) {
          return setFilters([])
        }
        getData(a.name.split("-").pop(), a.value.toUpperCase(), list).then((res, err) => {
          if (a.value.toUpperCase()) setFilters(res);
        });
      }
    });
  };

export { capitalize, FetchUserName, classNames, debounce, filterCategories, getData };
