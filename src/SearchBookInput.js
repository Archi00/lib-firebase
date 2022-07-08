import CategoryDropdown from "./CategoryDropdown"
function SearchBookInput(props) {
    return (
    <form onSubmit={props.handleSubmit} className="block border-1 border-gray-300 m-auto w-[50%] mb-6">   
        <label htmlFor="search" className="mb-2 text-lg font-medium text-gray-900 sr-only dark:text-gray-300">Search Book</label>
        <div className="relative">
            <div className="flex absolute left-1 min-w-[18rem] h-[100%] items-center">
                <CategoryDropdown categories={props.catList} setCategory={props.setCategory}/>
            </div>
            <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          <input onChange={props.handleChange} name="title" autoFocus type="search" id="search" className="block p-4 pl-80 w-full text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  min-h-[5vh]" placeholder="Search Book" required=""></input>
          <button type="submit" className="text-white absolute right-0 m-0 bottom-0 w-[15%] h-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-4 py-2 shadow-xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer focus:cursor-pointer">Search</button>
        </div>
    </form>
    )
}

export default SearchBookInput