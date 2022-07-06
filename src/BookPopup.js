import React from "react";
import postCategory from "./addCategory";
import getDbData from "./getDb";

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

    this.wrapperRef = React.createRef();
    this.wrapperRefCat = React.createRef();
    this.displayBook = [];
    this.bookIds = [];
    this.newObj = {};
  }

  handleClickOutside = (event) => {
    if (
      !this.state.showCat &&
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.props.handleShowCat();
    }
  };

  handleClickInside = (event) => {
    if (
      !this.state.showCat &&
      this.wrapperRef &&
      this.wrapperRef.current.contains(event.target) &&
      this.props.bookList.length > 0
    ) {
      this.props.handleShowCatTrue();
    }
  };

  handleClickOutsideCat = (event) => {
    if (
      this.state.showCat &&
      this.wrapperRefCat &&
      !this.wrapperRefCat.current.contains(event.target)
    ) {
      console.log(event.target);
      this.setState({ showCat: false });
    }
  };

  handleShowCat = () => {
    this.setState({ showCat: !this.state.showCat });
  };

  async componentDidMount() {
    this.data = await getDbData();
    let temp = [];
    this.data.map((e) => temp.push(e.data.name));
    temp.sort((a, b) => a.localeCompare(b));

    this.setState({ categoryList: temp });

    this.props.clearSearch();
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsideCat);
    document.addEventListener("mousedown", this.handleClickInside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("mousedown", this.handleClickOutsideCat);
    document.removeEventListener("mousedown", this.handleClickInside);
    this.props.clearSearch();
  }

  setCategory(e) {
    this.setState({ category: e });
    this.handleShowCat();
  }

  checkInput(e) {
    const input = document.getElementsByClassName("book-input");
    input.title.value
      ? this.setState({ showCloseBtn: true })
      : this.setState({ showCloseBtn: false });
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
      <div className="categories-container" ref={this.wrapperRefCat}>
        {this.state.categoryList.length > 0 ? (
          this.state.showCat ? (
            this.state.categoryList.map((e) => (
              <div className="display-categories-display">
                <div className="display-category-list">
                  <h4
                    className="cat-title-categories"
                    onClick={() => this.setCategory(e)}
                  >
                    {e}
                  </h4>
                </div>
              </div>
            ))
          ) : (
            <div
              className="display-categories-display"
              onClick={this.handleShowCat}
            >
              <div className="display-category-list">
                {!this.state.category ? (
                  <h4 className="cat-title-categories">Choose Category</h4>
                ) : (
                  <h4 className="cat-title-categories">
                    {this.state.category}
                  </h4>
                )}
              </div>
            </div>
          )
        ) : null}
        {!this.state.showCat ? (
          <div className="book-search-info-container" ref={this.wrapperRef}>
            <form id="searchBook" onSubmit={this.props.handleSubmit}>
              <input
                className="book-input"
                onChange={this.props.handleChange}
                name="title"
                autoFocus
                onFocus={() => this.checkInput()}
              />
              {this.state.showCloseBtn ? (
                <p
                  className="remove-title"
                  onClick={(e) => {
                    e.preventDefault();
                    const input = document.getElementsByClassName("book-input");
                    input.title.value = "";
                    input.title.focus();
                    this.checkInput();
                  }}
                >
                  x
                </p>
              ) : null}
            </form>
            {this.props.showCat ? (
              this.props.bookList.length > 0 ? (
                <div className="display-books">
                  <div className="boxed-results">
                    {this.props.bookList.map((book) => (
                      <div
                        style={
                          this.bookIds.includes(book.id)
                            ? { border: ".3em solid #7FFFD4" }
                            : null
                        }
                        className="search-results"
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
              ) : null
            ) : null}
          </div>
        ) : null}
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
