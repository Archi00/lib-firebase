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
        <form onSubmit={this.handleSubmit} ref={this.wrapperRef}>
          <input
            className="book-input"
            name="title"
            onChange={(this.props.handleChange, this.handleChange)}
            autoFocus
          />
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
