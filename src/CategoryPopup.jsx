import React from "react";

export default class CategoryPopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <form onSubmit={this.props.handleSubmit}>
          <button onClick={this.props.closePopup}>close me</button>
          <input
            className="book-input"
            name="title"
            onChange={this.props.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
