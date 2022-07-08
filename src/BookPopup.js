import React from "react";
import AddingBooksTracker from "./AddingBooksTracker";
import SearchBookInput from "./SearchBookInput";
import CardFooter from "./CardFooter"
import { classNames } from "./utils";
import postCategory from "./addCategory";

export default class BookPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      booksBeingAdded: {},
      forceUpdate: 0,
      fIter: 0,
      lIter: 10,
      currentPage: 1,
    };
    this.numOfBooks = 9
    this.constantStyle = "search-results text-white text-xl hover:bg-gray-600 min-h-[7vh] border-sm border-gray-400"
    this.inactive = "bg-gray-700 hover:bg-gray-600"
    this.active = "bg-gray-400 hover:bg-gray-700"

  }
  
  handlePagination(page) {
    this.setState({currentPage: page, fIter: (page * this.numOfBooks) - 9, lIter: (page * this.numOfBooks)})
  }

  postBook() {
    const category = document.getElementById("choosenCategory").children[0].textContent
    const books = Object.entries(this.state.booksBeingAdded)

    if (category === "Choose Category") alert("No category choosen")
    for (let i = 0, l = books.length; i < l; i++) {
      postCategory(
        {
          name: category,
          books: [{id: books[i][0], ...books[i][1]}]
        },
        this.props.user.uid
      );
    }
  }

  handleAddBook(book, index) {
    const el = document.getElementById(index)
    const li = document.getElementById(book.id)
    if (!this.state.booksBeingAdded.hasOwnProperty(book.id)) {
      this.setState({booksBeingAdded: {...this.state.booksBeingAdded, [book.id]: book.volumeInfo}})
    } else {
      delete this.state.booksBeingAdded[book.id]
      this.setState({forceUpdate: 0})
    }
  }

  render() {
    return (
      <>
      <div className="categories-container">
        <div className="my-4" >

          <SearchBookInput 
              catList={this.props.catList} 
              handleSubmit={this.props.handleSubmit} 
              handleChange={this.props.handleChange}
            />
            <div className="bg-gray-800 border-white border-2 border-gray-700 rounded m-auto text-center max-h-[69vh] max-w-[65vw] mt-2.5 min-h-[80vh]">
              <div className="bg-gray-800">
                    <ul className="grid grid-cols-7 gap-4 min-h-[5.5vh]">
                      <li className="my-auto">Cover</li>
                      <li className="my-auto">Title</li>
                      <li className="my-auto">Categories</li>
                      <li className="my-auto">Authors</li>
                      <li className="my-auto">Pages</li>
                      <li className="my-auto">Publish Date</li>
                      <li className="my-auto">Publisher</li>
                    </ul>
                {this.props.bookList.slice(this.state.fIter, this.state.lIter).map((book, index) => (
                  <div
                    id={index}
                    key={index}
                    className={classNames(this.constantStyle, this.state.booksBeingAdded.hasOwnProperty(book.id) ? this.active : this.inactive)}
                    onClick={(e) => {
                      this.handleAddBook(book, index);
                    }}
                  >
                    <ul className="grid grid-cols-7 gap-4">
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
                      <li className="my-auto">{book.volumeInfo.title}</li>
                      <li className="my-auto">{book.volumeInfo.categories}</li>
                      <li className="my-auto">{book.volumeInfo.authors}</li>
                      <li className="my-auto">{book.volumeInfo.pageCount}</li>
                      <li className="my-auto">{book.volumeInfo.publishedDate}</li>
                      <li className="my-auto">{book.volumeInfo.publisher}</li>
                    </ul>
                  </div>
                ))}
              </div>
                {this.props.bookList.length > 0 ?
                  <CardFooter bookList={this.props.bookList} that={this} />
                : null }
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
      <div className={classNames("absolute right-0 bottom-0 mx-12 my-14", Object.entries(this.state.booksBeingAdded).length > 0 ? "min-h-[20vh]" : null)}>
        <AddingBooksTracker that={this} /> 
      </div>
      </>
    );
  }
}
