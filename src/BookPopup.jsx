import React from "react";
import postCategory from "./addCategory";

export default class BookPopup extends React.Component {
  constructor() {
    super();

    this.wrapperRef = React.createRef();
    this.handleClickOutside = null;
  }

  componentDidMount() {
    this.handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.closePopup();
      }
    };
    this.props.clearSearch();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    this.props.clearSearch();
  }

  render() {
    return (
      <div className="popup">
        <div ref={this.wrapperRef}>
          <form id="searchBook" onSubmit={this.props.handleSubmit}>
            <input
              className="book-input"
              onChange={this.props.handleChange}
              name="title"
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
          {this.props.bookList.length > 0 ? (
            <div className="display-books">
              <div className="boxed-results">
                {this.props.bookList.map((book) => (
                  <div className="search-results">
                    <h4 className="cat-title">{book.volumeInfo.categories}</h4>
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
                      <li>
                        <a href={book.volumeInfo.canonicalVolumeLink}>
                          {book.volumeInfo.title}
                        </a>
                      </li>
                      <li>{book.volumeInfo.title}</li>
                      <li>{book.volumeInfo.authors}</li>
                      <li>{book.volumeInfo.pageCount}</li>
                      <li>{book.volumeInfo.publishedDate}</li>
                      <li>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            postCategory(
                              {
                                name: this.props.displayCategory,
                                books: [book.volumeInfo]
                              },
                              this.props.user.uid
                            );
                            this.props.closeSubmit(book.volumeInfo);
                            this.props.closePopup();
                          }}
                        >
                          +
                        </button>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          ;
        </div>
      </div>
    );
  }
}
