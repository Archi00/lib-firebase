import React from "react";
import "./displayBook.css";
import updateBook from "./updateBook";
import "./index.css"

export default class BookPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      inEdit: false,
      book: {}
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = null;
    this.displayCat = [];
  }

  componentDidMount() {
    this.handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.closePopup();
      }
    };
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setState({ book: this.props.book });
  }

  updateInfo(e) {
    const infoTop =
      e.parentNode.nextElementSibling.children[0].children[1].children;
    let description = "";
    if (e.parentNode.nextElementSibling.children[1]) {
      description = e.parentNode.nextElementSibling.children[1].children;
    }
    if (this.state.inEdit) {
      Object.values(description).forEach((x) => {
        x.setAttribute("contenteditable", true);
        x.setAttribute("style", "background-color:#fff");
      });
      Object.values(infoTop).forEach((x) => {
        x.setAttribute("contenteditable", true);
        x.setAttribute("style", "background-color:#fff");
      });
    } else {
      Object.values(infoTop).forEach((x) => {
        x.setAttribute("contenteditable", false);
        x.removeAttribute("style");
      });
      Object.values(description).forEach((x) => {
        x.setAttribute("contenteditable", false);
        x.removeAttribute("style");
      });
    }
  }

  async cancelUpdate() {
    await this.setState({ inEdit: false });
    const editBtn = document.getElementsByClassName("displayBook-edit-btn");
    this.updateInfo(editBtn[0]);
    if (editBtn[0].parentNode.nextElementSibling.children[1]) {
      let description =
        editBtn[0].parentNode.nextElementSibling.children[1].children;
      description[0].innerHTML = this.props.book.description;
    }
    let infoTop =
      editBtn[0].parentNode.nextElementSibling.children[0].children[1].children;
    Object.values(infoTop).forEach((x) => {
      x.innerHTML = x.getAttribute("value");
    });
  }

  saveUpdate(ISBN) {
    const editBtn = document.getElementsByClassName("displayBook-edit-btn");
    let temp = { books: {}, name: this.props.category };
    this.updateInfo(editBtn[0]);
    updateBook(ISBN, temp, this.props.user.uid);
    if (editBtn[0].parentNode.nextElementSibling.children[1]) {
      let description =
        editBtn[0].parentNode.nextElementSibling.children[1].children;
      temp.books[description[0].getAttribute("objKey")] =
        description[0].innerText;
      Object.values(description).forEach((x) => {
        x.setAttribute("contenteditable", false);
        x.removeAttribute("style");
      });
    }
    let infoTop =
      editBtn[0].parentNode.nextElementSibling.children[0].children[1].children;
    Object.values(infoTop).forEach((x) => {
      //console.log(x.getAttribute("objKey") + ": ", x.innerHTML);
      temp.books[x.getAttribute("objKey")] = x.innerText;
    });
    Object.values(infoTop).forEach((x) => {
      x.setAttribute("contenteditable", false);
      x.removeAttribute("style");
    });
    this.setState({ inEdit: false });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div className="popup-display bg-black opacity-80">
        <div className="display-book">
          <div className="book-items bg-gray-600 opacity-100" ref={this.wrapperRef}>
            <div className="displayBook-header">
              <button
                className="displayBook-edit-btn"
                onClick={async (e) => {
                  if (!this.state.inEdit) {
                    e.preventDefault();
                    await this.setState({ inEdit: true });
                    this.updateInfo(e.target);
                  }
                }}
              >
                Edit
              </button>
              <h4 className="cat-title displayBook-title">
                {this.props.book.title ? this.props.book.title : ""}
              </h4>
              <button
                className="displayBook-close-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.closePopup();
                }}
              >
                X
              </button>
            </div>
            <ul className="bookdisplay-info">
              <div className="bookdisplay-info-top">
                <div className="img-container">
                  <li>
                    {this.props.book.imageLinks ? (
                      <a
                        href={this.props.book.canonicalVolumeLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          load="lazyload"
                          className="display-cover-book"
                          alt="cover"
                          src={this.props.book.imageLinks.thumbnail}
                        />
                      </a>
                    ) : null}
                  </li>
                </div>
                <div className="displayBook-info-container">
                  {this.props.book.authors ? (
                    this.props.book.authors.length > 1 &&
                    typeof this.props.book.authors === "array" ? (
                      this.props.book.authors.map((each) => {
                        return (
                          <li
                            className="displayBook-author"
                            value={each}
                            objKey="authors"
                          >
                            {each}
                          </li>
                        );
                      })
                    ) : null
                  ) : (
                    <li
                      className="displayBook-author"
                      value={
                        this.props.book.authors ? this.props.book.authors : ""
                      }
                      objKey="authors"
                    >
                      {this.props.book.authors ? this.props.book.authors : ""}
                    </li>
                  )}
                  <li
                    className="displayBook-count"
                    value={
                      this.props.book.pageCount ? this.props.book.pageCount : ""
                    }
                    objKey="pageCount"
                  >
                    {this.props.book.pageCount ? this.props.book.pageCount : ""}
                  </li>
                  <li
                    className="displayBook-date"
                    value={
                      this.props.book.publishedDate
                        ? this.props.book.publishedDate
                        : ""
                    }
                    objKey="publishedDate"
                  >
                    {this.props.book.publishedDate
                      ? this.props.book.publishedDate
                      : ""}
                  </li>
                  <li
                    className="displayBook-editor"
                    value={
                      this.props.book.publisher ? this.props.book.publisher : ""
                    }
                    objKey="publisher"
                  >
                    {this.props.book.publisher ? this.props.book.publisher : ""}
                  </li>
                </div>
              </div>
              {this.props.book.description ? (
                <div className="displayBook-extra-info">
                  <li className="displayBook-description" objKey="description">
                    {this.props.book.description}
                  </li>
                </div>
              ) : null}
            </ul>
            <div className="ISBN-info">
              <ul>
                <li className="ISBN">{`${
                  this.props.book.industryIdentifiers
                    ? this.props.book.industryIdentifiers[0].type
                    : ""
                }: ${
                  this.props.book.industryIdentifiers
                    ? this.props.book.industryIdentifiers[0].identifier
                    : ""
                }`}</li>
                <li className="ISBN">{`${
                  this.props.book.industryIdentifiers[1]
                    ? this.props.book.industryIdentifiers[1].type
                    : ""
                }: ${
                  this.props.book.industryIdentifiers[1]
                    ? this.props.book.industryIdentifiers[1].identifier
                    : ""
                }`}</li>
                {this.state.inEdit ? (
                  <div>
                    <button
                      className="displayBook-cancel-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        this.cancelUpdate();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="displayBook-save-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        await this.saveUpdate(
                          this.props.book.industryIdentifiers[0].identifier
                        );
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
