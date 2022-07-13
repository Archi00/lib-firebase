import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { logout } from "./firebase";
import { auth, db } from "./UserApp";
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

  }, [user, loading, props.catList]);

  const cleanFilters = () => {
    setBFilters([]);
    setCatFilters([]);
  };
  
  const handleHomeBtn = () => {
    cleanFilters();
    history.replace("/dashboard")
    props.handleDisplay("");
  }
  
  const handleBackBtn = () => {
    const filters = [...document.querySelectorAll("#filter")]
    filters.forEach(f => f.value = "")
    cleanFilters()
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
          res.map(r => setCatFilters([...catFilters, r.data?.name]))
        });
      } else if (a.nodeName === "INPUT" ) {
        if (!a.value.toUpperCase()) {
          cleanFilters();
          return
        }
        getData(a.name.split("-").pop(), a.value.toUpperCase()).then((res, err) => {
          if (a.value.toUpperCase) setBFilters(res);
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
                  handleAddedCategory={props.handleAddedCategory}
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
            {props.displayCategory && window.location.pathname !== "/dashboard" && bFilters.length < 1 && catFilters.length < 1 ? <h1 className="m-auto text-bold text-gray-500 text-4xl uppercase absolute top-0 right-0 left-0 mt-6">{props.displayCategory}</h1> : null}
            <DropdownRender updateDb={props.updateDb} handleIsEdit={props.handleIsEdit} isEdit={props.isEdit} />
          </div>
        </header>
        {!addingCategory ?
        <div className="flex flex-row content-start ">
          <div className="flex flex-1 max-w-[15vw] min-w-[15vw]">
            <SideBar categories={props.catList} filterCategories={filterCategories} handleHomeBtn={handleHomeBtn} handleBackBtn={handleBackBtn} handleSelected={handleSelected} />
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
              totalBookList={props.totalBookList}
              catFilters={catFilters}
              bFilters={bFilters}
              cleanFilters={cleanFilters}
              allBooks={allBooks}
              isEdit={props.isEdit}
              handleDeleteTracker={props.handleDeleteTracker}
              deleteTracker={props.deleteTracker}
              handleForceUpdate={props.handleForceUpdate}
              delCatTracker={props.delCatTracker}
              handleAddedBooks={props.handleAddedBooks}
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
