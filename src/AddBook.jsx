import React from "react";
import BookPopup from "./BookPopup";

export default class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className="add-btn-container">
        <button
          type="button"
          className="btn toggle-btn"
          onClick={this.togglePopup}
        >
          Add Book
        </button>
        {this.state.showPopup ? (
          <BookPopup
            text="Close Me"
            closePopup={this.togglePopup}
            handleSubmit={this.props.handleSubmit}
            handleChange={this.props.handleChange}
            bookList={this.props.bookList}
            catList={this.props.catList}
            user={this.props.user}
            displayCategory={this.props.displayCategory}
          />
        ) : null}
      </div>
    );
  }
}
