import React from "react";
import AddCategory from "./AddCategory";

export default class DisplayCategories extends React.Component {
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
            />
          ) : null}
        </div>
        {this.props.catList.length > 0
          ? this.props.catList.map((title) => {
              if (!this.props.displayCategory) {
                return this.props.multiCat(title);
              } else {
                return this.props.uniqueCat(title);
              }
            })
          : null}
      </div>
    );
  }
}
