import React from "react";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import CategoryInfo from "./CategoryInfo";
import getBookInfo from "./bookData";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./firebase";
import { getFirestore, doc, deleteDoc } from "@firebase/firestore";
import getDbData from "./getDb";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Reset from "./Reset";
import "./App.css";
import { classNames } from "./utils";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      catList: [],
      bookInfoList: [],
      name: "",
      bookTitle: "",
      displayCategory: "",
      user: {},
      currentBook: [],
      bookCount: 0,
      isAdding: false,
      showCat: false,
      totalBookList: [],
      isEdit: false,
      deleteTracker: {},
      forceUpdate: 0,
      categories: [],
      delCatTracker: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBooChange = this.handleBooChange.bind(this);
    this.handleBooSubmit = this.handleBooSubmit.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.multiCat = this.multiCat.bind(this);
    this.uniqueCat = this.uniqueCat.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.addCat = this.addCat.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.checkCurrentBook = this.checkCurrentBook.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.addBooks = this.addBooks.bind(this);
    this.handleShowCat = this.handleShowCat.bind(this);
    this.handleShowCatTrue = this.handleShowCatTrue.bind(this);
    this.updateDb = this.updateDb.bind(this)
    this.handleIsEdit = this.handleIsEdit.bind(this)
    this.handleDeleteTracker = this.handleDeleteTracker.bind(this)
    this.handleForceUpdate = this.handleForceUpdate.bind(this)
    this.forceUpdate = this.forceUpdate.bind(this)
    this.setState = this.setState.bind(this)
    this.categories = null;
    this.currentBook = false;
    this.book = {};
    this.flag = false;
  }

  async componentDidMount() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.categories = await getDbData();
        this.categories.map((cat) => {
          if (!this.state.catList.includes(cat.data?.name) && cat.data?.name)
            this.setState({
              catList: this.state.catList.concat(cat)
            });
            if (
              window.location.pathname.includes(cat.data?.name) &&
              !this.state.displayCategory
              ) {
                this.setState({ displayCategory: cat.data?.name });
              }
          if (cat.data?.books?.length > 0) this.setState({totalBookList: [...this.state.totalBookList, ...cat.data?.books]})
        });
      } else {
        return null;
      }
    });
  }

  async handleBooSubmit(e) {
    e.preventDefault();
    const category = document.getElementById("choosenCategory").children[0].textContent
    const listInfo = await getBookInfo(this.state.bookTitle);
    this.setState({ bookInfoList: listInfo });
    return clearTimeout(this.timer);
  }

  async updateDb() {
    this.categories = await getDbData()
    this.setState({categories: this.categories})
    console.log(this.categories)
  }

  addCat(cat) {
    this.setState({ catList: this.state.catList.concat(cat) });
  }

  handleDeleteTracker(book, add=true) {
    if (!add) this.setState({deleteTracker: {}, forceUpdate: this.state.forceUpdate + 1})
    if (!this.state.deleteTracker.hasOwnProperty(book.id) && book !== null) {
      this.setState({deleteTracker: {...this.state.deleteTracker, [book.id]: book}})
    } else {
      delete this.state.deleteTracker[book.id]
      this.setState({forceUpdate: this.state.forceUpdate + 1})
    }
  }

  handleForceUpdate() {
    this.setState({forceUpdate: this.state.forceUpdate + 1})
  }

  handleIsEdit(bool) {
    this.setState({isEdit: bool})
  }

  handleLogin(user) {
    this.setState({ user: user });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleBooChange(e) {
    this.setState({ bookTitle: e.target.value });

    this.setState({ showCat: true });
  }

  handleShowCat() {
    this.setState({ showCat: false });
  }

  handleShowCatTrue() {
    this.setState({ showCat: true });
  }

  checkCurrentBook(e) {
    return [this.currentBook, this.book];
  }

  clearSearch() {
    this.setState({ bookInfoList: [] });
  }

  handleAddBook(e) {
    this.currentBook = true;
    setTimeout(() => {
      this.currentBook = false;
    }, 50);
    return (this.book = e);
  }

  handleDisplay(e) {
    this.setState({ displayCategory: e });
  }

  showNumOfBooks(title) {
    let count = 0;
    if (!this.flag) {
      this.categories.map((e) => {
        if (
          e.data.name === title &&
          e.data.books &&
          e.data.books.length > count
        ) {
          count = e.data.books.length;
        }
      });
      this.flag = true;
    }
    return count;
  }

  addBooks() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  deleteCategory(title) {
    this.categories.map(async (y) => {
      try {
        if (y.data.name === title) {
          const rt = doc(db, this.state.user.uid, y.id);
          await deleteDoc(rt);
          console.log("Category deleted: ", y.data.name);
        }
      } catch (e) {
        console.error("Error deleting category: ", e);
      }
    });
  }

  uniqueCat(title, index) {
    if (title === this.state.displayCategory) {
      return (
        <Router key={index}>
          <CategoryInfo
            key={index}
            titleName={title}
            handleSubmit={this.handleBooSubmit}
            handleChange={this.handleBooChange}
            handleDisplay={this.handleDisplay}
            user={this.state.user}
            checkCurrentBook={this.checkCurrentBook}
            category={this.state.displayCategory}
            isEdit={this.state.isEdit}
            handleDeleteTracker={this.handleDeleteTracker}
            deleteTracker={this.state.deleteTracker}
            handleForceUpdate={this.handleForceUpdate}
          />
        </Router>
      );
    }
  }

  multiCat(cat, index) {
    const count = this.showNumOfBooks(cat.data?.name);
    this.flag = false;
    const active = "bg-gray-600 border-red-600 hover:bg-gray-700"
    const inactive = "bg-gray-800 border-gray-600 hover:bg-gray-600"
    console.log(cat)
    return (
      <Router key={index}>
        <Link key={index} id="category" to={`${!this.state.isEdit ? "/dashboard/" + cat.data?.name : "/dashboard"}`} onClick={(e) => {
          if (!this.state.isEdit) this.handleDisplay(cat.data?.name)
          if (this.state.isEdit) {
            if (this.state.delCatTracker.hasOwnProperty(cat.id)){
              delete this.state.delCatTracker[cat.id]
              this.setState({delCatTracker: {}})
            } else {
              this.setState({delCatTracker: {[cat.id]: cat}})
            }
          }
        }}
        className={classNames("block bg-gray-800 text-center rounded border text-2xl text-gray-300 group hover:shadow-xl hover:bg-gray-600", this.state.delCatTracker.hasOwnProperty(cat.id) && this.state.isEdit ? active : inactive)}
        >
          <div className="list-item">
            <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-2xl">
              <h3 className="text-center">{cat.data?.name}</h3>
            </div>
            <div className="mt-4"><h4>{count}</h4></div>
          </div>
        </Link>
      </Router>
    );
  }

  render() {
    try {
      return (
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/reset" component={Reset} />
              <Route path="/dashboard">
                <Dashboard
                  info={this.categories}
                  handleBooSubmit={this.handleBooSubmit}
                  handleBooChange={this.handleBooChange}
                  bookInfoList={this.state.bookInfoList}
                  catList={this.state.catList}
                  handleCatSubmit={this.handleCatSubmit}
                  handleChange={this.handleChange}
                  displayCategory={this.state.displayCategory}
                  multiCat={this.multiCat}
                  uniqueCat={this.uniqueCat}
                  handleLogin={this.handleLogin}
                  handleDisplay={this.handleDisplay}
                  addCat={this.addCat}
                  clearSearch={this.clearSearch}
                  handleAddBook={this.handleAddBook}
                  addBooks={this.addBooks}
                  isAddingBook={this.state.isAdding}
                  showCat={this.state.showCat}
                  handleShowCat={this.handleShowCat}
                  handleShowCatTrue={this.handleShowCatTrue}
                  totalBookList={this.state.totalBookList}
                  updateDb={this.updateDb}
                  handleIsEdit={this.handleIsEdit}
                  isEdit={this.state.isEdit}
                  handleDeleteTracker={this.handleDeleteTracker}
                  deleteTracker={this.state.deleteTracker}
                  handleForceUpdate={this.handleForceUpdate}
                  delCatTracker={this.state.delCatTracker}
                />
              </Route>
            </Switch>
          </Router>
      );
    } catch (err) {
      console.error(err);
      return <Login />;
    }
  }
}
