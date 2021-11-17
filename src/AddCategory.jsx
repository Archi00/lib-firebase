import React from "react";
import CategoryPopup from "./CategoryPopup";

export default class AddCategory extends React.Component {
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
          Add Category
        </button>
        {this.state.showPopup ? (
          <CategoryPopup
            text="Close Me"
            closePopup={this.togglePopup}
            handleSubmit={this.props.handleSubmit}
            handleChange={this.props.handleChange}
            user={this.props.user}
            history={this.props.history}
            handleDisplay={this.props.handleDisplay}
          />
        ) : null}
      </div>
    );
  }
}
