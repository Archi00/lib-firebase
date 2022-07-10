import React from "react";
import AddingBooksTracker from "./AddingBooksTracker";
import SearchBookInput from "./SearchBookInput";
import CardFooter from "./CardFooter"
import { classNames } from "./utils";
import postCategory from "./postCategory";

export default class BookPopup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      booksBeingAdded: {},
      forceUpdate: 0,
      fIter: 0,
      lIter: 10,
      currentPage: 1,
    };
    this.numOfBooks = 10
    this.constantStyle = "search-results text-white text-xl hover:bg-gray-600 min-h-[7vh] border-sm border-gray-400"
    this.inactive = "bg-gray-700 hover:bg-gray-600"
    this.active = "bg-gray-400 hover:bg-gray-700"
    this.inDb
    props.totalBookList.map(book => this.inDb = {...this.inDb, [book.id]: book.id})
  }

  handlePagination(page) {
    this.setState({currentPage: page, fIter: (page * this.numOfBooks) - 10, lIter: (page * this.numOfBooks)})
  }

  postBook() {
    const category = document.getElementById("choosenCategory").children[0].textContent
    const books = Object.entries(this.state.booksBeingAdded)

    if (category === "Category") alert("No category choosen")
    for (let i = 0, l = books.length; i < l; i++) {
      postCategory(
        {
          name: category,
          books: [{id: books[i][0], ...books[i][1]}]
        },
        this.props.user.uid
      );
    }
    this.setState({booksBeingAdded: {}})

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
      <div className="categories-container min-h-[80vh] min-w-[65vw]">
        <div className="my-4" >

          <SearchBookInput 
              catList={this.props.catList} 
              handleSubmit={this.props.handleSubmit} 
              handleChange={this.props.handleChange}
            />
            <div className="bg-gray-800 border-gray-400 border-2 border-gray-700 rounded m-auto text-center max-h-[69vh] max-w-[65vw] mt-2.5 min-h-[80vh]">
              <div className="bg-gray-800">
                    <ul className="grid grid-cols-7 gap-4 min-h-[5.5vh] text-2xl text-bold text-gray-200">
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
                    className={classNames(this.constantStyle, this.state.booksBeingAdded.hasOwnProperty(book.id) || this.inDb.hasOwnProperty(book.id) ? this.active : this.inactive, this.inDb.hasOwnProperty(book.id) ? "pointer-events-none" : null)}
                    onClick={(e) => {
                      this.handleAddBook(book, index);
                    }}
                  >
                    <ul className="grid grid-cols-7 gap-4">
                      <li className="text-xl">
                        {book.volumeInfo.imageLinks ? (
                          <img
                            load="lazyload"
                            className="search-display-cover"
                            alt="cover"
                            src={book.volumeInfo.imageLinks.thumbnail}
                          />
                        ) : null}
                      </li>
                      <li className="my-auto text-2xl">{book.volumeInfo.title}</li>
                      <li className="my-auto text-2xl">{book.volumeInfo.categories}</li>
                      <li className="my-auto text-2xl">{book.volumeInfo.authors}</li>
                      <li className="my-auto text-2xl">{book.volumeInfo.pageCount}</li>
                      <li className="my-auto text-2xl">{book.volumeInfo.publishedDate}</li>
                      <li className="my-auto text-2xl">{book.volumeInfo.publisher}</li>
                    </ul>
                  </div>
                ))}
              </div>
                {this.props.bookList.length > 0 ?
                  <CardFooter bookList={this.props.bookList} that={this} />
                : null }
            </div>
          </div>
        </div>
        <div id="alertParent"></div>
        <div className={classNames("fixed left-0 bottom-0 min-w-[27.27rem] max-w-[27.27rem] z-50", Object.entries(this.state.booksBeingAdded).length > 0 ? "min-h-[20vh]" : null)}>
          <AddingBooksTracker that={this} /> 
        </div>
      </>
    );
  }
}
