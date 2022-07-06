import React from "react";
import AddCategory from "./AddCategory";

export default class DisplayCategories extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <div className="btn-display">
          {!this.props.displayCategory ? (
            <AddCategory
              handleChange={this.props.handleChange}
              user={this.props.user}
              history={this.props.history}
              handleDisplay={this.props.handleDisplay}
              addCat={this.props.addCat}
            />
          ) : null}
        </div>
        <div className="category-list">
          {this.props.catList.length > 0 ? (
            !this.props.displayCategory ? (
              <div className="display-categories">
                {this.props.catList.map((title) => this.props.multiCat(title))}
              </div>
            ) : (
              <div className="display-unique">
                {this.props.catList.map((title) => this.props.uniqueCat(title))}
              </div>
            )
          ) : null}
        </div>
      </div>
    );
  }
}
