import React from "react";
import { AddBook } from "./AddBook";
import { AddCategory } from "./AddCategory";

export default class CategoryDisplay extends React.Component {
  render() {
    return (
      <div>
        <div>
          <AddBook
            handleSubmit={this.props.handleBooSubmit}
            handleChange={this.props.handleBooChange}
            bookList={this.props.bookInfoList}
            catList={this.props.catList}
          />
          <AddCategory
            handleSubmit={this.props.handleCatSubmit}
            handleChange={this.props.handleChange}
          />
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
      </div>
    );
  }
}
