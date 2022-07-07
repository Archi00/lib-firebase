import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { logout } from "./firebase";
import { auth, db } from "./App";
import { getDocs, query, collection, where, doc } from "@firebase/firestore";
import DisplayCategories from "./DisplayCategories";
import AddCategory from "./AddCategory";

function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [catFilters, setCatFilters] = useState([]);
  const [bFilters, setBFilters] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false)
  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = await querySnapshot.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return null;
    if (!user) return history.replace("/");
    fetchUserName();
    props.handleLogin(user);
    if (bFilters.length < 1) history.replace("/dashboard");
  }, [user, loading, bFilters]);
  //  if (filters) {
  //    filters[0].childNodes.forEach((n) => {
  //      if (n.nodeName === "INPUT" && n.innerText === "" && !n.activeElement) {
  //        replaceTags(n);
  //      }
  //    });
  //  }

  const cleanFilters = () => {
    setBFilters([]);
    setCatFilters([]);
  };

  const replaceTags = (originalTag, count = 0) => {
    cleanFilters();

    originalTag.parentNode.childNodes.forEach((t) => {
      t.nodeName === "INPUT" ? count++ : null;
    });

    if (count < 1) {
      const replacement = document.createElement("input");
      for (let i = 0, l = originalTag.attributes.length; i < l; ++i) {
        let nodeName = originalTag.attributes.item(i).nodeName;
        let nodeValue = originalTag.attributes.item(i).nodeValue;
        replacement.setAttribute(nodeName, nodeValue);
      }
      if (replacement.nodeName === "INPUT") {
        replacement.setAttribute("placeholder", originalTag.innerText);
        replacement.setAttribute("autoFocus", true);
        replacement.onchange = (e) => {
          filterCategories(e);
        };
      }
      originalTag.parentNode.replaceChild(replacement, originalTag);
      replacement.focus();
    } else {
      const replacement = document.createElement("button");

      originalTag.parentNode.childNodes.forEach((t) => {
        if (t !== originalTag && t.nodeName === "INPUT") {
          for (let i = 0, l = t.attributes.length; i < l; ++i) {
            if (
              t.attributes.item(i).nodeName !== "placeholder" &&
              t.attributes.item(i).nodeName !== "autoFocus"
            ) {
              let nodeName = t.attributes.item(i).nodeName;
              let nodeValue = t.attributes.item(i).nodeValue;
              replacement.setAttribute(nodeName, nodeValue);
            }
            if (t.attributes.item(i).nodeName === "placeholder") {
              replacement.innerText = t.attributes.item(i).nodeValue;
            }
            replacement.onclick = (e) => replaceTags(e.target);
          }
          t.parentNode.replaceChild(replacement, t);
        }
      });
      replaceTags(originalTag);
    }
  };

  const getData = async (filter, value) => {
    let temp = [];
    if (filter === "category") {
      for (let i = 0, l = props.info.length; i < l; i++) {
        if (
          props.info[i].data.name.toUpperCase().includes(value.toUpperCase())
        ) {
          temp.push(props.info[i].data.name);
        }
      }
      return temp;
    } else {
      for (let i = 0, l = props.info.length; i < l; i++) {
        if (props.info[i].data.books) {
          props.info[i].data.books.map((e) => {
            if (props.info[i].data.books)
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
      history.replace(`/dashboard/search-by-${filter}`);
      return temp;
    }
  };

  const filterCategories = (e) => {
    if (!e.target.value) {
      cleanFilters();
      history.replace("/dashboard");
    }
    const name = e.target.name.split("-").pop();
    e.target.parentNode.childNodes.forEach((a) => {
      if (a.nodeName === "INPUT" && name === "category") {
        if (!a.value) {
          cleanFilters();
          history.replace("/dashboard");
        }
        getData(a.name.split("-").pop(), a.value).then((res, err) => {
          if (a.value) setCatFilters(res);
        });
      } else if (a.nodeName === "INPUT" && name !== "category") {
        if (!a.value) {
          cleanFilters();
          history.replace("/dashboard");
        }
        getData(a.name.split("-").pop(), a.value).then((res, err) => {
          if (a.value) setBFilters(res);
        });
      }
    });
  };

  try {
    return (
      <>
        <header className="fixed top-0 w-screen p-0 bg-gray-700 z-1 block">
          <div className="p-8 pt-6 h-24 rounded-lg shadow-xl delay-75 text-center flex flex-row w-screen">
            <div className="mt-4 header-logo-container">
              <button
                type="submit"
                className="p-0 return-btn"
                onClick={(e) => {
                  e.preventDefault();
                  cleanFilters();
                  history.replace("/dashboard");
                  props.handleDisplay("");
                }}
              >
                Logo
              </button>
              <p className="my-auto">|</p>
              <p className="my-auto">{user.email}</p>
            </div>
            <div className="self-center my-auto btn-display">
              <AddCategory
                handleChange={props.handleChange}
                user={user}
                history={history}
                handleDisplay={props.handleDisplay}
                addCat={props.addCat}
                setAddCat={setAddingCategory}
                addingCat={addingCategory}
              />
              <div className="inline-block">
                <Router>
                  <Link
                    type="button"
                    className="hover:bg-sky-400 btn toggle-btn addbook-btn"
                    onClick={props.addBooks}
                    to="/dashboard/adding-books"
                  >
                    Add Book
                  </Link>
                </Router>
              </div>
            </div>
            <button className="hover:bg-red-500 dashboard__btn" onClick={logout}>
              Logout
            </button>
          </div>
        </header>
        <div className="flex flex-row justify-start mt-28 gap-96 ml-24 ">
          <button
            className=""
            name="search-by-category"
            type="text"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Category
          </button>
          <button
            className=""
            name="search-by-title"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Title
          </button>
          <button
            className=""
            name="search-by-authors"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Author
          </button>
          <button
            className=""
            name="search-by-industryIdentifiers"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search ISBN
          </button>
          <button
            className=""
            name="search-by-publisher"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Publisher
          </button>
        </div>
        {!addingCategory ?
          <DisplayCategories
            handleBooSubmit={props.handleBooSubmit}
            handleBooChange={props.handleBooChange}
            bookInfoList={props.bookInfoList}
            catList={props.catList}
            handleCatSubmit={props.handleCatSubmit}
            handleDisplay={props.handleDisplay}
            handleChange={props.handleChange}
            displayCategory={props.displayCategory}
            multiCat={props.multiCat}
            uniqueCat={props.uniqueCat}
            user={user}
            handleLogin={props.handleLogin}
            history={history}
            addCat={props.addCat}
            clearSearch={props.clearSearch}
            showCat={props.showCat}
            handleShowCat={props.handleShowCat}
            handleShowCatTrue={props.handleShowCatTrue}
            catFilters={catFilters}
            bFilters={bFilters}
            cleanFilters={cleanFilters}
          />
      : null}
      </>
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}
export default Dashboard;
