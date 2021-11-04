import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import CategoryInfo from "./CategoryInfo";
import getBookInfo from "./bookData";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./firebase";
import { getFirestore } from "@firebase/firestore";
import getDbData from "./getDb";
import { getAuth } from "@firebase/auth";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Reset from "./Reset";

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
      uid: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBooChange = this.handleBooChange.bind(this);
    this.handleBooSubmit = this.handleBooSubmit.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.multiCat = this.multiCat.bind(this);
    this.uniqueCat = this.uniqueCat.bind(this);
  }

  async componentDidMount() {
    const categories = await getDbData();

    if (auth.currentUser) {
      categories.map((cat) => {
        if (
          !this.state.catList.includes(cat.data.books.category) &&
          cat.data.books.category &&
          cat.data.uid === auth.currentUser.uid
        )
          this.setState({
            catList: this.state.catList.concat(cat.data.books.category)
          });
        if (
          window.location.pathname.includes(cat.data.books.category) &&
          !this.state.displayCategory
        ) {
          this.setState({ displayCategory: cat.data.books.category });
        }
      });
    }
    //setTimeout(() => console.clear(), 1000);
  }

  async handleBooSubmit(e) {
    e.preventDefault();
    const listInfo = await getBookInfo(this.state.bookTitle);
    this.setState({ bookInfoList: listInfo });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleBooChange(e) {
    this.setState({ bookTitle: e.target.value });
  }

  handleAddBook(e) {
    e.preventDefault();
  }

  handleDisplay(e) {
    this.setState({ displayCategory: e });
  }

  uniqueCat(title) {
    if (title === this.state.displayCategory) {
      return (
        <Router>
          <Link
            to={"/dashboard/" + title}
            onClick={(e) => {
              this.handleDisplay(title);
            }}
          >
            <h3>{title}</h3>
          </Link>
          <CategoryInfo
            key={title}
            titleName={title}
            handleSubmit={this.handleBooSubmit}
            handleChange={this.handleBooChange}
            handleDisplay={this.handleDisplay}
          />
        </Router>
      );
    }
  }

  multiCat(title) {
    return (
      <Router>
        <Link
          to={"/dashboard/" + title}
          onClick={(e) => {
            this.handleDisplay(title);
          }}
        >
          <h3>{title}</h3>
        </Link>
        <CategoryInfo
          key={title}
          titleName={title}
          handleSubmit={this.handleBooSubmit}
          handleChange={this.handleBooChange}
          handleDisplay={this.handleDisplay}
        />
      </Router>
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
              <Route exact path="/dashboard">
                <Dashboard
                  handleBooSubmit={this.handleBooSubmit}
                  handleBooChange={this.handleBooChange}
                  bookInfoList={this.state.bookInfoList}
                  catList={this.state.catList}
                  handleCatSubmit={this.handleCatSubmit}
                  handleChange={this.handleChange}
                  displayCategory={this.state.displayCategory}
                  multiCat={this.multiCat}
                  uniqueCat={this.uniqueCat}
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
