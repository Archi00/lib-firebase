import React from "react";
import getDbData from "./getDb";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { deleteBook } from "./deleteBook";
import BookDisplay from "./BookDisplay";
import { classNames } from "./utils";
import DeleteBooksTracker from "./DeleteBooksTracker";

export default class CategoryInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      bookInfo: [],
      showPopup: false,
      book: {},
      update: false,
      showEdit: false,
      sorted: false,
      outerWidth: 0
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.hover = false;
    this.constantBtnStyle = "z-50 cursor-pointer inline-block text-2xl text-gray-300 fixed bottom-0 left-0 min-w-[27.3rem] max-w-[27.3rem] px-4 py-4 ease-in-out duration-300 bg-gray-900 hover:bg-gray-700"
    this.active = "bg-gray-600 border-red-600 hover:bg-gray-700"
    this.inactive = "bg-gray-800 border-gray-600 hover:bg-gray-600"
  }


  async checkBooks(list) {
    const data = await getDbData();
    if (this.state.bookInfo.length <= 0) {
      data.forEach((each) => {
        if (each.data.name === this.props.titleName) {
          this.setState({
            bookInfo: this.state.bookInfo.concat(each.data.books)
          });
        }
      });
    } else {
      if (list) {
        this.state.bookInfo.map((book) => {
          if (list.industryIdentifiers === book.industryIdentifiers) {
            this.setState({
              bookInfo: this.state.bookInfo.filter((item) => item !== book)
            });
          }
        });
      }
      if (this.deleteTimer) {
        clearTimeout(this.deleteTimer);
        console.log("timer deleted");
      }
    }
    return;
  }
  edit() {
    this.setState({ showEdit: !this.state.showEdit });
  }

  sortBooks() {
    this.setState({
      bookInfo: this.state.bookInfo.sort((a, b) => a.localeCompare(b))
    });
  }

  componentDidUpdate() {
    const bookChecker = this.props.checkCurrentBook();
    if (bookChecker[0]) {
      this.timer = setTimeout(() => {
        this.setState({ bookInfo: this.state.bookInfo.concat(bookChecker[1]) });
      }, 400);
    }
  }

  async componentDidMount() {
    this.checkBooks();
    this.setState({ outerWidth: window.outerWidth });
  }

  togglePopup(book) {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.setState({ book });
  }

  render() {
    return (
      <div>
        <div className="category-list-container">
          {this.state.bookInfo.map((each, index) =>
            each ? (
              <div key={index} onClick={() => {
                if (this.props.isEdit) this.props.handleDeleteTracker(each)
              }} className={classNames("each-flex-container overflow-hidden rounded text-gray-300 border min-h-[20vh] max-h-[20vh] min-w-[25vw] hover:cursor-pointer max-w-[25vw]", this.props.deleteTracker.hasOwnProperty(each.id) ? this.active : this.inactive)}>
                <div
                  onClick={(e) => {
                    if (!this.props.isEdit) this.togglePopup(each)
                  }}
                  className="list-item"
                >
                <div className="w-[25vw] overflow-hidden py-4 pb-8 uppercase text-bold text-white text-xl">
                  <h3>{each.title}</h3>
                </div>
                  <div className="flex flex-row flex-1 min-w-[20vw] max-w-[20vw] mx-auto overflow-hidden text-left">
                    <div className="flex justify-end flex-1">
                    <Router>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
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
                    </div>
                    {this.state.outerWidth >= 800 ? (
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
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null
          )}
          {this.props.isEdit ? 
            <div className={classNames("z-60 fixed left-0 bottom-0 min-w-[27.27rem] max-w-[27.27rem] z-50", Object.entries(this.props.deleteTracker).length > 0 ? "min-h-[20vh]" : null)}>
              <DeleteBooksTracker handleDeleteTracker={this.props.handleDeleteTracker} deleteTracker={this.props.deleteTracker} handleForceUpdate={this.props.handleForceUpdate} user={this.props.user} />
            </div>
          :null }
        </div>
        {window.location.pathname.includes(this.props.titleName) && !this.props.isEdit? (
          <QRCode className="z-50 fixed left-0 bottom-0 mb-72 mx-[4vw] min-w-[5vw] min-h-[5vw]" value={`${window.location.origin + "/display/" + user.name + "-" + user.uid.slice(-5) + this.props.titleName}`} />
          ) : null}
      </div>
    );
  }
}
