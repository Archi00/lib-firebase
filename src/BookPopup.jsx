import React from "react";
import postCategory from "./addCategory";

export default class BookPopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <form id="searchBook" onSubmit={this.props.handleSubmit}>
          <button onClick={this.props.closePopup}>close me</button>
          <input
            className="book-input"
            onChange={this.props.handleChange}
            name="title"
          />
          <button type="submit">Submit</button>
        </form>
        {this.props.bookList.length > 0 ? (
          <div className="display-books">
            <div className="boxed-results">
              {this.props.bookList.map((book) => (
                <div className="list-item">
                  <h4 className="cat-title">{book.volumeInfo.categories}</h4>
                  <ul className="display-info">
                    <li>
                      {book.volumeInfo.imageLinks ? (
                        <img
                          load="lazyload"
                          className="display-cover"
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
                              category: {
                                name: this.props.displayCategory,
                                books: [book.volumeInfo]
                              }
                            },
                            this.props.user.uid
                          );
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
    );
  }
}
