import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
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
      showCat: false
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
          if (!this.state.catList.includes(cat.data.name) && cat.data.name)
            this.setState({
              catList: this.state.catList.concat(cat.data.name)
            });
          if (
            window.location.pathname.includes(cat.data.name) &&
            !this.state.displayCategory
          ) {
            this.setState({ displayCategory: cat.data.name });
          }
        });
      } else {
        return null;
      }
    });
    //setTimeout(() => console.clear(), 1000);
  }

  async handleBooSubmit(e) {
    e.preventDefault();
    const listInfo = await getBookInfo(this.state.bookTitle);
    this.setState({ bookInfoList: listInfo });
    return clearTimeout(this.timer);
  }

  addCat(cat) {
    this.setState({ catList: this.state.catList.concat(cat) });
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

  uniqueCat(title) {
    if (title === this.state.displayCategory) {
      return (
        <Router>
          <CategoryInfo
            titleName={title}
            handleSubmit={this.handleBooSubmit}
            handleChange={this.handleBooChange}
            handleDisplay={this.handleDisplay}
            user={this.state.user}
            checkCurrentBook={this.checkCurrentBook}
            category={this.state.displayCategory}
          />
        </Router>
      );
    }
  }

  multiCat(title) {
    const count = this.showNumOfBooks(title);
    this.flag = false;
    return (
      <div className="group cat-btn">
        <Router>
          <Link
            key={title}
            className="cat-btn-info"
            to={`/dashboard/${title}`}
            onClick={(e) => {
              this.handleDisplay(title);
            }}
          >
            <h3>{title}</h3>
            <p>{count}</p>
          </Link>
        </Router>
        <button
          className="remove-category hidden group-hover:inline"
          onClick={(e) => {
            this.deleteCategory(title);
          }}
        >
          x
        </button>
      </div>
    );
  }

  render() {
    try {
      return (
        <main>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
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
                />
              </Route>
            </Switch>
          </Router>
        </main>
      );
    } catch (err) {
      console.error(err);
      return <Login />;
    }
  }
}
