import React from "react";
import postCategory from "./addCategory";
import AddingBooksTracker from "./AddingBooksTracker";
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
      showCloseBtn: false,
      booksBeingAdded: {},
      forceUpdate: 0
    };

    
    this.displayBook = [];
    this.bookIds = [];
    this.newObj = {};
    this.setCategory = this.setCategory.bind(this)
  }

  setCategory(e) {
    this.setState({ category: e });
  }

  handleAddBook(book, index) {
    const el = document.getElementById(index)
    const li = document.getElementById(book.id)
    if (!this.state.booksBeingAdded.hasOwnProperty(book.id)) {
      el.style.backgroundColor = "rgb(156 163 175)";
      this.setState({booksBeingAdded: {...this.state.booksBeingAdded, [book.id]: book.volumeInfo}})
    } else {
      el.style.backgroundColor = "rgb(55 65 81)"
      delete this.state.booksBeingAdded[book.id]
      this.setState({forceUpdate: 0})
      //li.parentElement.removeChild(li)
    }
    console.log(Object.entries(this.state.booksBeingAdded))
    Object.entries(this.state.booksBeingAdded).map(book => console.log(book[1].title))
  }

  render() {
    return (
      <>
      <div className="categories-container ">
        <div className="book-search-info-container mt-24" >

          <SearchBookInput 
              catList={this.props.catList} 
              setCategory={this.setCategory} 
              handleSubmit={this.props.handleSubmit} 
              handleChange={this.props.handleChange}
            />
            <div className="display-books mt-2.5">
              <div className="boxed-results">
                {this.props.bookList.map((book, index) => (
                  <div
                    id={index}
                    key={index}
                    style={
                      this.bookIds.includes(book.id)
                        ? { border: ".3em solid #7FFFD4" }
                        : null
                    }
                    className="search-results bg-gray-700 text-white text-xl hover:bg-gray-600 min-h-[10vh] m-1 border-sm border-gray-400"
                    onClick={(e) => {
                      this.handleAddBook(book, index);
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
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/*}
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
              */}
      </div>
      <AddingBooksTracker booksList={this.state.booksBeingAdded} />
      </>
    );
  }
}
