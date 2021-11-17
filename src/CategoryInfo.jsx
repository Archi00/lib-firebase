import React from "react";
import getDbData from "./getDb";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Link } from "react-router-dom";
export default class CategoryInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      bookInfo: []
    };
  }

  async componentDidMount() {
    const data = await getDbData();
    data.forEach((each) => {
      if (each.data.category.name === this.props.titleName) {
        this.setState({
          bookInfo: this.state.bookInfo.concat(each.data.category.books)
        });
      }
    });
  }

  render() {
    return (
      <div className="category-list-container">
        {this.state.bookInfo.map((each) =>
          each.title ? (
            <div className="list-item">
              <Router>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(each);
                  }}
                  //render={(props) => <BookDisplay book={each} />}
                >
                  <ul className="display-info">
                    <li>
                      {each.imageLinks ? (
                        <img
                          load="lazyload"
                          className="display-cover"
                          alt="cover"
                          src={each.imageLinks.thumbnail}
                        />
                      ) : null}
                    </li>
                    <li>
                      <a href={each.canonicalVolumeLink}>{each.title}</a>
                    </li>
                    <li>{each.authors}</li>
                    <li>{each.pageCount}</li>
                    <li>{each.publishedDate}</li>
                  </ul>
                </Link>
              </Router>
            </div>
          ) : null
        )}
        {window.location.pathname.includes(this.props.titleName) ? (
          <QRCode value={window.location.href} />
        ) : null}
      </div>
    );
  }
}
