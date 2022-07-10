import { classNames } from "./utils"
const DeleteBooksTracker = ({handleDeleteTracker, deleteTracker, handleForceUpdate}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 text-2xl text-bold text-gray-300 bg-gray-900 w-[100%] rounded-t">DELETE QUEUE</div>
      <ul className={classNames("bg-gray-700 text-white overflow-auto", Object.entries(deleteTracker).length > 0 ? "h-[20vh]" : null)}>
        {Object.entries(deleteTracker).map((book, index) => (
          <li onClick={() => (delete that.state.deleteTracker[book[0]], handleForceUpdate())} key={index} id={book[0]} className="px-6 py-2 border-b border-gray-200 border-sm w-full hover:bg-gray-200 hover:text-gray-800 hover:cursor-pointer">{book[1].title}</li>
        ))}
      </ul>
      {Object.entries(deleteTracker).length > 0 ?
      <div className="flex space-x p-4 text-2xl text-bold text-gray-300 bg-gray-900 border-gray-700 border-t-2 w-[100%] min-h-[4vh]">
        <div className="flex flex-1 justify-start">
          <button onClick={() => "TODO: DELETE BOOK"} className="border-none text-gray-300 bg-blue-600 text-white shadow-xl text-bold hover:bg-blue-800 py-2 px-5 rounded ">Delete</button>
        </div>
        <div className="flex justify-center m-auto mr-2">
          <h4>{Object.entries(deleteTracker).length}</h4>
        </div>
        <div className="flex flex-1 justify-end">
          <button onClick={() => handleDeleteTracker(book, false)} className="border-none text-gray-800 bg-red-600 text-black shadow-xl text-bold hover:bg-red-800 py-2 px-5 rounded ">Cancel</button>
        </div>
      </div>
      : null}
    </div>
  )
}

export default DeleteBooksTracker