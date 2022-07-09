import { classNames } from "./utils"
import { useEffect, useState } from "react"

export default function AddingBooksTracker({that}) {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 text-2xl text-bold text-gray-300 bg-gray-900 w-[100%] rounded-t">"ADDING QUEUE"</div>
      <ul className={classNames("bg-gray-700 text-white overflow-auto", Object.entries(that.state.booksBeingAdded).length > 0 ? "h-[20vh]" : null)}>
        {Object.entries(that.state.booksBeingAdded).map((book, index) => (
          <li onClick={() => (delete that.state.booksBeingAdded[book[0]], that.setState({forceState: 0}))} key={index} id={book[0]} className="px-6 py-2 border-b border-gray-200 border-sm w-full hover:bg-gray-200 hover:text-gray-800 hover:cursor-pointer">{book[1].title}</li>
        ))}
      </ul>
      {Object.entries(that.state.booksBeingAdded).length > 0 ?
      <div className="flex space-x p-4 text-2xl text-bold text-gray-300 bg-gray-900 border-gray-700 border-t-2 w-[100%] min-h-[4vh]">
        <div className="flex flex-1 justify-start">
          <button onClick={() => that.postBook()} className="border-none text-gray-300 bg-blue-600 text-white shadow-xl text-bold hover:bg-blue-800 py-2 px-5 rounded ">Add</button>
        </div>
        <div className="flex justify-center m-auto mr-8">
          <h4>{Object.entries(that.state.booksBeingAdded).length}</h4>
        </div>
        <div className="flex flex-1 justify-end">
          <button onClick={() => that.setState({booksBeingAdded: {}})} className="border-none text-gray-800 bg-red-600 text-black shadow-xl text-bold hover:bg-red-800 py-2 px-5 rounded ">Cancel</button>
        </div>
      </div>
      : null}
    </div>
  )
}