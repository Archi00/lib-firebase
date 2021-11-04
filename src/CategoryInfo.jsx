import React from "react";
import getDbData from "./getDb";
import QRCode from "qrcode.react";

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
      if (each.data.books.category === this.props.titleName) {
        this.setState({
          bookInfo: this.state.bookInfo.concat(each.data.books.data)
        });
      }
    });
  }

  render() {
    return (
      <div className="category-list-container">
        {this.state.bookInfo.map((each) => (
          <div className="list-item">
            <ul className="display-info">
              <li>
                {each.info.imageLinks ? (
                  <img
                    load="lazyload"
                    className="display-cover"
                    alt="cover"
                    src={each.info.imageLinks.thumbnail}
                  />
                ) : null}
              </li>
              <li>
                <a href={each.info.canonicalVolumeLink}>{each.info.title}</a>
              </li>
              <li>{each.info.authors}</li>
              <li>{each.info.pageCount}</li>
              <li>{each.info.publishedDate}</li>
            </ul>
          </div>
        ))}
        {window.location.pathname.includes(this.props.titleName) ? (
          <QRCode value={window.location.href} />
        ) : null}
      </div>
    );
  }
}
