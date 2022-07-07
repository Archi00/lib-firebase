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
    this.props.setAddCat(!this.props.addingCat)
  }

  render() {
    return (
      <div className="add-btn-container">
        <button
          type="button"
          className="border-none text-xl text-gray-300 bg-blue-700 text-white shadow-xl text-bold hover:bg-blue-800 btn toggle-btn"
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
            addCat={this.props.addCat}
          />
        ) : null}
      </div>
    );
  }
}
