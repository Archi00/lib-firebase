export default function AddingBooksTracker({booksList}) {
  return (
    <div className="flex justify-content flex-col ">
      <div className="flex content-align text-center m-auto text-gray-50 bg-gray-800 w-[100%] rounded-t-xl">ADDING QUEUE</div>
      <ul className="bg-gray-800 rounded-xl border-4 border-gray-700 w-96 text-white">
        {Object.entries(booksList).map((book, index) => (
          <li key={index} id={book[0]} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{book[1].title}</li>
        ))}
      </ul>
    </div>
  )
}