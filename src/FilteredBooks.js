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
      </div>

        {displayBooks.map((each) =>
          each ? (
            <div className="each-flex-container overflow-hidden rounded bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-600 min-h-[20vh] max-h-[20vh] min-w-[25vw] max-w-[25vw]">
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
              <div className="w-[25vw] overflow-hidden py-4 pb-8 uppercase text-bold text-white text-xl">
                <h3>{each.title}</h3>
              </div>
                <div className="flex flex-row flex-1 min-w-[20vw] max-w-[20vw] overflow-hidden text-left">
                <div className="flex justify-end flex-1">
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
                          className="rounded object-contain h-48 w-48 text-left m-auto"
                          alt="cover"
                          src={each.imageLinks.thumbnail}
                        />
                      ) : null}
                    </Link>
                  </Router>

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
            </div>
          ) : null
        )}
      </div>
  );
}

export default FilteredBooks;
