import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { auth } from "./UserApp";

function FilteredBooks(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [book, setBook] = useState("");
  const [displayBooks, setDisplayBooks] = useState(props.bFilters);
  const [showEdit, setShowEdit] = useState(false);
  const history = useHistory();
  const [user, loading] = useAuthState(auth);


  const constantBtnStyle = "z-50 cursor-pointer inline-block text-2xl text-gray-300 fixed bottom-0 left-0 min-w-[27.3rem] max-w-[27.3rem] px-4 py-2 ease-in-out duration-300 bg-gray-900 hover:bg-gray-700"

  useEffect(() => {
    if (loading) return null;
    if (!user) return history.replace("/");
    if (props.bFilters.length < 1) history.replace("/dashboard");
    console.log(props.bFilters)
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
      <div className="category-list-container">
        {displayBooks.map((each, index) =>
          each ? (
            <div key={index} className="each-flex-container overflow-hidden rounded bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-600 min-h-[20vh] max-h-[20vh] min-w-[25vw] max-w-[25vw]">
              <div
                className="list-item"
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
                      to=""
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
            </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default FilteredBooks;
