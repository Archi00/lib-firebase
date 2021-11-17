import React from "react";
import { capitalize } from "./utils";
import postCategory from "./addCategory";

export default class CategoryPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name !== "") {
      postCategory(
        {
          category: {
            name: capitalize(this.state.name),
            books: []
          }
        },
        this.props.user.uid
      );
    }
  }

  render() {
    return (
      <div className="popup">
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.props.closePopup}>close me</button>
          <input
            className="book-input"
            name="title"
            onChange={(this.props.handleChange, this.handleChange)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
