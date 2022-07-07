import React from "react";
import { capitalize } from "./utils";
import postCategory from "./addCategory";

export default class CategoryPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      catAdded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = null;
  }

  componentDidMount() {
    this.handleClickOutside = (event) => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.closePopup();
      }
    };
    document.addEventListener("mousedown", this.handleClickOutside);
    console.log(this.props.categories)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    clearTimeout(this.timer);
  }
  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name !== "") {
      postCategory(
        {
          name: capitalize(this.state.name)
        },
        this.props.user.uid
      );
    }
    this.props.addCat(capitalize(this.state.name));
    this.setState({ catAdded: true });
    this.timer = setTimeout(() => {
      this.setState({ catAdded: false });
    }, 2000);
    e.target.children[0].value = "";
  }

  render() {
    return (
      <div className="popup">
        <form onSubmit={this.handleSubmit} ref={this.wrapperRef} className="my-[40vh] block m-auto w-[50%]">   
            <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Add Category</label>
            <div className="relative">
              <input onChange={(this.props.handleChange, this.handleChange)} name="title" autoFocus type="search" id="search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Category" required=""></input>
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
            </div>
        </form>
        {this.state.catAdded ? (
          <div className="feedback-cat">
            <p>Category added</p>
          </div>
        ) : null}
      </div>
    );
  }
}
