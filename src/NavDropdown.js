import React from "react";
import { createPopper } from "@popperjs/core";
import { ChevronDownIcon } from '@heroicons/react/solid'

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
      <div className="flex flex-wrap">
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
              Options 
              <ChevronDownIcon className="-mr-2 ml-3 h-8 w-5" aria-hidden="true" />
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "indigo" ? "bg-white " : "bg-gray-800" + " ") +
                "dropdown text-base py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "14rem" }}
            >
              <a
                href="#"
                className={
                  "text-xl py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-700 " +
                  (color === "indigo" ? " text-slate-700 " : "text-white ") +
                  (isEdit === true ? "bg-gray-700 hover:bg-gray-800 " : null)
                }
                onClick={() => handleIsEdit(!isEdit)}
              >
                Edit
              </a>
              <a
                href="#"
                className={
                  "text-xl py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-700 " +
                  (color === "indigo" ? " text-slate-700 " : "text-white ")
                  
                }
                onClick={() => updateDb()}
              >
                Update
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />
              <a
                href="#"
                className={
                  "text-xl py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-red-600 hover:text-black " +
                  (color === "indigo" ? " text-slate-700" : "text-white")
                }
                onClick={e => e.preventDefault()}
              >
                Logout
              </a>
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
