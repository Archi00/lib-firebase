import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { auth } from "./App";
import deleteBook from "./deleteBook";
import BookDisplay from "./BookDisplay";

function FilteredBooks(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [book, setBook] = useState("");
  const [displayBooks, setDisplayBooks] = useState(props.bFilters);
  const [showEdit, setShowEdit] = useState(false);
  const history = useHistory();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return null;
    if (!user) return history.replace("/");
    if (props.bFilters.length < 1) history.replace("/dashboard");
  }, [loading, user]);

  const togglePopup = (book) => {
    setShowPopup(!showPopup);
    setBook(book);
  };

  const edit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div>
      {showPopup ? (
        <BookDisplay
          book={book}
          category={props.category}
          closePopup={togglePopup}
          user={props.user}
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
            edit();
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

        {displayBooks.map((each) =>
          each ? (
            <div className="each-flex-container">
              <div
                onClick={(e) => togglePopup(each)}
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
                <div className="bookinfo-display-container">
                  <Router>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        togglePopup(each);
                      }}
                    >
                      {each.imageLinks ? (
                        <img
                          load="lazyload"
                          className="display-cover"
                          alt="cover"
                          src={each.imageLinks.thumbnail}
                        />
                      ) : null}
                    </Link>
                  </Router>
                  <ul className="display-info">
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
                    <li>{each.pageCount}</li>
                    <li>{each.publishedDate}</li>
                    <li>{each.publisher}</li>
                  </ul>
                </div>
              </div>
              {showEdit ? (
                <button
                  className="delete-book-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    let temp = [];
                    deleteBook(each, user.uid);
                    displayBooks.forEach((y) => {
                      if (y !== each) temp.push(each);
                    });
                    setDisplayBooks(temp);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default FilteredBooks;
