import React from "react";
import postCategory from "./addCategory";
import getDbData from "./getDb";
import SearchBookDropdown from "./SearchBookDropdown";
import SearchBookInput from "./SearchBookInput";

export default class BookPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
      showCat: false,
      category: "",
      showBook: [],
      showCloseBtn: false
    };

    this.displayBook = [];
    this.bookIds = [];
    this.newObj = {};
    this.setCategory = this.setCategory.bind(this)
  }

  setCategory(e) {
    this.setState({ category: e });
  }

  async handleAddBook(e, book) {
    if (e.target.parentElement.className === "search-results") {
      e = e.target.parentElement;
    } else if (
      e.target.parentElement.parentElement.className === "search-results"
    ) {
      e = e.target.parentElement.parentElement;
    } else if (e.target.className === "search-results") {
      e = e.target;
    }

    if (!this.bookIds.includes(book.id)) {
      this.setState({ showBook: this.displayBook });
      e.style.border = ".3em solid #7FFFD4";
      e.style.paddingTop = ".5em";
      this.displayBook.push(book);
      this.bookIds.push(book.id);
      e.children[1].children[6].innerText = "0";
    } else {
      e.style.border = "";
      e.style.paddingTop = "";
      e.children[1].children[6].innerText = "+";
      for (let i = 0; i < this.bookIds.length; i++) {
        if (this.bookIds[i] === book.id) {
          this.displayBook.splice(i, 1);
          this.bookIds.splice(i, 1);
        }
      }
      this.setState({ showBook: this.displayBook });
    }
  }

  render() {
    return (
      <div className="categories-container">
        <div className="book-search-info-container" >
          <SearchBookInput 
              catList={this.props.catList} 
              setCategory={this.setCategory} 
              handleSubmit={this.props.handleSubmit} 
              handleChange={this.props.handleChange}
            />
            <div className="display-books mt-2.5">
              <div className="boxed-results">
                {this.props.bookList.map((book) => (
                  <div
                    style={
                      this.bookIds.includes(book.id)
                        ? { border: ".3em solid #7FFFD4" }
                        : null
                    }
                    className="search-results bg-gray-700 text-white text-xl hover:bg-gray-600 min-h-[10vh] m-1 border-sm border-gray-400"
                    onClick={(e) => {
                      this.handleAddBook(e, book);
                    }}
                  >
                    <h4 className="cat-title">
                      {book.volumeInfo.categories}
                    </h4>
                    <ul className="search-info">
                      <li>
                        {book.volumeInfo.imageLinks ? (
                          <img
                            load="lazyload"
                            className="search-display-cover"
                            alt="cover"
                            src={book.volumeInfo.imageLinks.thumbnail}
                          />
                        ) : null}
                      </li>
                      <li>{book.volumeInfo.title}</li>
                      <li>{book.volumeInfo.authors}</li>
                      <li>{book.volumeInfo.pageCount}</li>
                      <li>{book.volumeInfo.publishedDate}</li>
                      <li>{book.volumeInfo.publisher}</li>
                      <li
                        onClick={(e) => {
                          e.preventDefault();
                          if (this.state.category) {
                            postCategory(
                              {
                                name: this.state.category,
                                books: [book.volumeInfo]
                              },
                              this.props.user.uid
                            );
                          } else {
                            alert("Category Not Selected");
                          }
                        }}
                      >
                        {this.bookIds.includes(book.id) ? "0" : "+"}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        <div>
          <div className="adding-books">
            {this.state.showBook.length > 0
              ? this.state.showBook.map((e) => (
                  <ul className="list-adding-books">
                    <li>
                      {e.volumeInfo.imageLinks ? (
                        <img
                          load="lazyload"
                          className="search-display-cover"
                          alt="cover"
                          src={e.volumeInfo.imageLinks.thumbnail}
                        />
                      ) : null}
                    </li>
                    <li>{e.volumeInfo.title}</li>
                    <li>{e.volumeInfo.authors}</li>
                    <li>{e.volumeInfo.pageCount}</li>
                    <li>{e.volumeInfo.publishedDate}</li>
                    <li
                      className="remove-book-list"
                      onClick={() => {
                        for (let i = 0; i < this.bookIds.length; i++) {
                          if (this.bookIds[i] === e.id) {
                            this.displayBook.splice(i, 1);
                            this.bookIds.splice(i, 1);
                          }
                        }
                        this.setState({ showBook: this.displayBook });
                      }}
                    >
                      x
                    </li>
                  </ul>
                ))
              : null}
          </div>
          {this.state.showBook.length > 0 ? (
            <div className="action-btns-adding">
              <button
                className="cancel-add-book"
                onClick={() => {
                  this.setState({ showBook: [] });
                  this.displayBook = [];
                  this.bookIds = [];
                }}
              >
                Cancel
              </button>
              <button
                className="save-add-book"
                onClick={() => {
                  if (!this.state.category) {
                    console.log(this.state.category);
                    alert("No category Selected");
                    return;
                  }

                  if (this.state.showBook.length < 2) {
                    postCategory(
                      {
                        name: this.state.category,
                        books: [this.state.showBook[0].volumeInfo]
                      },
                      this.props.user.uid
                    );
                  } else {
                    for (let i = 0; i < this.state.showBook.length; i++) {
                      postCategory(
                        {
                          name: this.state.category,
                          books: [this.state.showBook[i].volumeInfo]
                        },
                        this.props.user.uid
                      );
                    }
                    this.setState({ showBook: [] });
                    this.displayBook = [];
                    this.bookIds = [];
                  }
                  setTimeout(() => window.location.pathname = "/dashboard", 1000)
                }}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
