import React from "react";
import { createPopper } from "@popperjs/core";
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/solid'
import { BrowserRouter as Router, Link } from "react-router-dom";
import Login from "./Login";

const Dropdown = ({ color, updateDb, handleIsEdit, isEdit }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-indigo-800")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap z-50 min-h-[10vh] max-h-[10vh]">
        <div className="w-full xl:w-6/12 md:w-4/12 px-4">
          <div className="relative flex flex-row align-middle w-full">
            <button
              className={
                "flex flex-row text-gray-300 font-bold uppercase text-xl px-8 py-3 rounded shadow-xl hover:shadow-xl hover:bg-gray-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                "bg-gray-900"
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              Login 
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "indigo" ? "bg-white " : "bg-gray-800" + " ") +
                "dropdown text-base py-2 list-none text-left rounded shadow-lg mt-1 bg-gray-800"
              }
              style={{ minWidth: "14rem" }}
            >
              <Router>
                <Link
                  to="/login"
                  component={Login}
                  className={
                    "text-xl py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-blue-600 hover:text-white " +
                    (color === "indigo" ? " text-slate-700" : "text-white")
                  }
                >
                  Log in
                </Link>
              </Router>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender({updateDb, handleIsEdit, isEdit}) {
  return (
    <>
      <Dropdown color="white" updateDb={updateDb} handleIsEdit={handleIsEdit} isEdit={isEdit} />
    </>
  );
}