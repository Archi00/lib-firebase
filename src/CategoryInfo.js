import React from "react";
import getDbData from "./getDb";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import deleteBook from "./deleteBook";
import BookDisplay from "./BookDisplay";
import { classNames } from "./utils";

export default class CategoryInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      bookInfo: [],
      showPopup: false,
      book: {},
      update: false,
      showEdit: false,
      sorted: false,
      outerWidth: 0
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.hover = false;
    this.constantBtnStyle = "cursor-pointer inline-block text-2xl text-gray-300 absolute bottom-0 left-0 min-w-[15vw] px-4 py-2 ease-in-out duration-300 bg-gray-900 hover:bg-gray-700"
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
    window.element
    this.setState({ outerWidth: window.outerWidth });
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
        <div className="category-list-container mx-12">
          <button
            className={classNames(this.constantBtnStyle, "mb-14")}
            onClick={(e) => {
              e.preventDefault();
              this.update();
            }}
          >
            Update
          </button>
          <button
            className={classNames(this.constantBtnStyle)}
            onClick={(e) => {
              e.preventDefault();
              this.edit();
            }}
          >
            Edit
          </button>
          <button
            className={classNames(this.constantBtnStyle, "mb-28")}
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
              <div className="each-flex-container overflow-hidden rounded bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-600 min-h-[20vh] max-h-[20vh] min-w-[25vw] max-w-[25vw]">
                <div
                  onClick={(e) => this.togglePopup(each)}
                  className="list-item"
                  onMouseOver={(e) => {
                    if (e.target.innerHTML === "Multiple Authors") {
                      this.authors = e.target;
                      this.authors.innerHTML = each.authors
                        .map((author) => `${author}<br>`)
                        .join(" ");
                    } else {
                      return;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (
                      this.authors &&
                      this.authors.parentElement &&
                      this.authors.parentElement.parentElement
                    ) {
                      this.authors.innerHTML = "Multiple Authors";
                    }
                  }}
                >
                <div className="w-[25vw] overflow-hidden py-4 pb-8 uppercase text-bold text-white text-xl">
                  <h3>{each.title}</h3>
                </div>
                  <div className="flex flex-row flex-1 min-w-[20vw] max-w-[20vw] overflow-hidden text-left">
                    <div className="flex justify-end flex-1">
                    <Router>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          this.togglePopup(each);
                        }}
                      >
                        {each.imageLinks ? (
                          <img
                            load="lazyload"
                            className="rounded object-contain h-48 w-48 text-left m-auto"
                            alt="cover"
                            src={each.imageLinks.thumbnail}
                          />
                        ) : null}
                      </Link>
                    </Router>
                    </div>
                    {this.state.outerWidth >= 800 ? (
                      <div className="flex justify-start flex-1">
                      <ul className="display-info ml-[4vw] hover:cursor-pointer">
                        {each.authors ? (
                          each.authors.length > 1 ? (
                            <li className="multiple-authors">
                              <span>Multiple Authors</span>
                            </li>
                          ) : (
                            <li className="text-xl">{each.authors}</li>
                          )
                        ) : null}
                        <li className="text-xl">{each.pageCount}</li>
                        <li className="text-xl">{each.publishedDate}</li>
                        <li className="text-xl">{each.publisher}</li>
                      </ul>
                      </div>
                    ) : null}
                  </div>
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
          <QRCode className="absolute left-0 bottom-0 mb-72 mx-[4vw] min-w-[5vw] min-h-[5vw]" value={window.location.href} />
          ) : null}
      </div>
    );
  }
}
