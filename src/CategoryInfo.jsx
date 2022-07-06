import React from "react";
import getDbData from "./getDb";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import deleteBook from "./deleteBook";
import BookDisplay from "./BookDisplay";

export default class CategoryInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      bookInfo: [],
      showPopup: false,
      book: {},
      update: false,
      showEdit: false,
      sorted: false
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.hover = false;
  }

  async checkBooks(list) {
    const data = await getDbData();
    if (this.state.bookInfo.length <= 0) {
      data.forEach((each) => {
        if (each.data.name === this.props.titleName) {
          this.setState({
            bookInfo: this.state.bookInfo.concat(each.data.books)
          });
        }
      });
    } else {
      if (list) {
        this.state.bookInfo.map((book) => {
          if (list.industryIdentifiers === book.industryIdentifiers) {
            this.setState({
              bookInfo: this.state.bookInfo.filter((item) => item !== book)
            });
          }
        });
      }
      if (this.deleteTimer) {
        clearTimeout(this.deleteTimer);
        console.log("timer deleted");
      }
    }
    return;
  }
  edit() {
    this.setState({ showEdit: !this.state.showEdit });
  }

  sortBooks() {
    this.setState({
      bookInfo: this.state.bookInfo.sort((a, b) => a.localeCompare(b))
    });
  }

  async update() {
    const data = await getDbData();
    this.setState({ bookInfo: [] });
    if (!this.state.sorted) {
      data.forEach((each) => {
        if (each.data.name === this.props.titleName) {
          this.setState({
            bookInfo: this.state.bookInfo.concat(each.data.books)
          });
        }
      });
      console.log(this.state.bookInfo);
    } else {
      let temp = [];
      data.forEach((each) => {
        if (each.data.name === this.props.titleName) {
          each.data.books.map((item) => temp.push(item));
        }
      });
      temp.sort((a, b) => a.title.localeCompare(b.title));
      this.setState({ bookInfo: temp });
    }
  }

  componentDidUpdate() {
    const bookChecker = this.props.checkCurrentBook();
    if (bookChecker[0]) {
      this.timer = setTimeout(() => {
        this.setState({ bookInfo: this.state.bookInfo.concat(bookChecker[1]) });
      }, 400);
    }
  }

  async componentDidMount() {
    this.checkBooks();
  }

  togglePopup(book) {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.setState({ book });
  }

  render() {
    return (
      <div>
        {this.state.showPopup ? (
          <BookDisplay
            book={this.state.book}
            category={this.props.category}
            closePopup={this.togglePopup}
            user={this.props.user}
          />
        ) : null}
        <div className="category-list-container">
          <button
            className="update-button"
            onClick={(e) => {
              e.preventDefault();
              this.update();
            }}
          >
            Update
          </button>
          <button
            className="edit-button"
            onClick={(e) => {
              e.preventDefault();
              this.edit();
            }}
          >
            Edit
          </button>
          <button
            className="sort-button"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ sorted: !this.state.sorted });
              this.update();
            }}
          >
            Sort
          </button>

          {this.state.bookInfo.map((each) =>
            each ? (
              <div className="each-flex-container">
                <div
                  className="list-item"
                  onMouseOver={(e) => {
                    if (e.target.innerHTML === "Multiple Authors") {
                      e.target.parentElement.parentElement.parentElement.parentElement.style.marginTop =
                        "-2.5rem";
                      this.timer = setTimeout(() => {
                        this.authors = e.target;
                        this.authors.innerHTML = each.authors
                          .map((author) => `${author}<br>`)
                          .join(" ");
                      }, 50);
                    } else {
                      return;
                    }
                  }}
                  onMouseLeave={(e) => {
                    clearTimeout(this.timer);
                    if (
                      this.authors &&
                      this.authors.parentElement &&
                      this.authors.parentElement.parentElement
                    ) {
                      this.authors.parentElement.parentElement.parentElement.parentElement.style.marginTop =
                        "";

                      this.authors.innerHTML = "Multiple Authors";
                    }
                  }}
                >
                  <ul className="display-info">
                    <Router>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          this.togglePopup(each);
                        }}
                      >
                        <li>
                          {each.imageLinks ? (
                            <img
                              load="lazyload"
                              className="display-cover"
                              alt="cover"
                              src={each.imageLinks.thumbnail}
                            />
                          ) : null}
                        </li>
                      </Link>
                    </Router>
                    <li>{each.title}</li>
                    {each.authors ? (
                      each.authors.length > 1 ? (
                        <li className="multiple-authors">
                          <span>Multiple Authors</span>
                        </li>
                      ) : (
                        <li>{each.authors}</li>
                      )
                    ) : null}
                  </ul>
                </div>
                {this.state.showEdit ? (
                  <button
                    className="delete-book-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteBook(each, this.props.user.uid);
                      this.deleteTimer = setTimeout(() => {
                        this.checkBooks(each);
                      }, 200);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            ) : null
          )}
        </div>
        {window.location.pathname.includes(this.props.titleName) ? (
          <QRCode className="QRCode" value={window.location.href} />
        ) : null}
      </div>
    );
  }
}
