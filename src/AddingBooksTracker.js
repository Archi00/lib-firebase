export default function AddingBooksTracker({booksList}) {
  return (
    <div className="flex justify-content flex-col border-4 border-gray-700 rounded">
      <div className="p-4 text-2xl text-bold text-gray-300 bg-gray-900 border-gray-700 border-b-2 w-[100%] rounded-t">ADDING QUEUE</div>
      <ul className="bg-gray-800 rounded-xl border-gray-700 w-96 text-white h-[20vh]">
        {Object.entries(booksList).map((book, index) => (
          <li key={index} id={book[0]} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{book[1].title}</li>
        ))}
      </ul>
      {Object.entries(booksList).length > 0 ?
      <div className="flex space-x p-4 text-2xl text-bold text-gray-300 bg-gray-900 border-gray-700 border-t-2 w-[100%] min-h-[4vh]">
        <div className="flex flex-1 justify-start">
          <button className="border-none text-gray-300 bg-blue-600 text-white shadow-xl text-bold hover:bg-blue-800 py-2 px-5 rounded ">Add</button>
        </div>
        <div className="flex flex-1 justify-end">
          <button className="border-none text-gray-800 bg-red-600 text-black shadow-xl text-bold hover:bg-red-800 py-2 px-5 rounded ">Cancel</button>
        </div>
      </div>
      : null}
    </div>
  )
}