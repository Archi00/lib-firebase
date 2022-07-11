import React from "react";
import { capitalize } from "./utils";
import postCategory from "./postCategory";
import { Successful } from "./notifications";

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
      <div className="popup opacity-90">
        <form onSubmit={this.handleSubmit} ref={this.wrapperRef} className="my-[40vh] block m-auto w-[50%]">   
            <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Add Category</label>
            <div className="relative">
              <input onChange={(this.props.handleChange, this.handleChange)} name="title" autoFocus type="search" id="search" className="block p-4 pl-10 w-full text-2xl text-gray-900 bg-gray-50 rounded border-2 border-gray-300 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white min-h-[5vh]" placeholder="Add Category" required=""></input>
              <button type="submit" className="text-white absolute right-0 bottom-0 w-[10%] h-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-2xl px-4 py-2 shadow-xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer focus:cursor-pointer">Add</button>
            </div>
            {this.state.catAdded ? (
              <div className="mt-8 ml-[30%]">
                <Successful message="Category Added" />
              </div>
            ) : null}
        </form>
      </div>
    );
  }
}
