import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { logout } from "./firebase";
import { auth, db } from "./App";
import { getDocs, query, collection, where, doc } from "@firebase/firestore";
import DisplayCategories from "./DisplayCategories";
import AddCategory from "./AddCategory";
import DropdownRender from "./NavDropdown";
import SideBar from "./SideBar";

function Dashboard(props) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [catFilters, setCatFilters] = useState([]);
  const [bFilters, setBFilters] = useState([]);
  const [addingCategory, setAddingCategory] = useState(false)
  const [allBooks, setAllBooks] = useState(true)
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

  const handleHomeBtn = () => {
    cleanFilters();
    history.replace("/dashboard");
    props.handleDisplay("");
  }

  const handleBackBtn = () => window.location.reload()

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
    cleanFilters()
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

  const handleSelected = (bool) => {
    setAllBooks(bool)
  }

  try {
    return (
      <>
        <header className="fixed top-0 w-screen p-0 bg-gray-800 block z-50">
          <div className="p-8 pt-6 h-24 rounded-lg shadow-xl delay-75 text-center flex flex-row w-screen">
            <div className="header-logo-container"></div>
            <div className="max-w-[15vw] min-w-[15vw] flex flex-row absolute left-0 ml-[1.5vw] whitespace-nowrap">
              <div className="flex flex-start flex-1 hover:cursor-pointer w-full h-full">
                <AddCategory
                  handleChange={props.handleChange}
                  user={user}
                  history={history}
                  handleDisplay={props.handleDisplay}
                  addCat={props.addCat}
                  setAddCat={setAddingCategory} 
                  addingCat={addingCategory}
                />
              </div>
              <div className="flex flex-end flex-1 hover:cursor-pointer w-full h-full">
                <Router>
                  <Link
                    type="button"
                    className="bg-blue-700 shadow-xl rounded text-white text-bold hover:bg-blue-800 text-gray-300 border-none text-xl btn toggle-btn addbook-btn"
                    onClick={props.addBooks}
                    to="/dashboard/adding-books"
                  >
                    Add Book
                  </Link>
                </Router>
              </div>
            </div>
            {props.displayCategory && window.location.pathname !== "/dashboard" ? <h1 className="m-auto text-bold text-gray-500 text-4xl uppercase absolute top-0 right-0 left-0 mt-6">{props.displayCategory}</h1> : null}
            <DropdownRender />
          </div>
        </header>
        {!addingCategory ?
        <div className="flex flex-row content-start ">
          <div className="flex flex-1 max-w-[15vw] min-w-[15vw]">
            <SideBar filterCategories={filterCategories} handleHomeBtn={handleHomeBtn} handleBackBtn={handleBackBtn} handleSelected={handleSelected} />
          </div>
          <div className="flex flex-9 mt-[8vh] mx-auto">
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
              bookList={props.info}
              catFilters={catFilters}
              bFilters={bFilters}
              cleanFilters={cleanFilters}
              allBooks={allBooks}
            />
          </div>
        </div>
        : null}
      </>
    );
  } catch (err) {
    console.error(err);
    return null;
  }
}
export default Dashboard;
