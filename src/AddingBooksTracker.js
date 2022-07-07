export default function AddingBooksTracker({booksList}) {
  return (
    <div className="flex justify-content">
      <ul className="bg-gray-800 rounded-lg border border-gray-200 w-96 text-white">
        {Object.entries(booksList).map((book, index) => (
          <li key={index} id={book[0]} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">{book[1].title}</li>
        ))}
      </ul>
    </div>
  )
}