import CategoryDropdown from "./CategoryDropdown"
function SearchBookInput(props) {
    return (
    <form onSubmit={props.handleSubmit} className="block border-gray-600 m-auto w-[50%] mb-6">   
        <label htmlFor="search" className="mb-2 text-lg font-medium text-gray-900 sr-only text-gray-300">Search Book</label>
        <div className="relative">
            <div className="flex absolute min-w-[18rem] h-[100%] items-center">
                <CategoryDropdown setCat={props.setState} categories={props.catList} add={true}/>
            </div>
            <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          <input onChange={props.handleChange} name="title" autoFocus type="search" id="search" className="block p-4 pl-80 w-full text-2xl bg-gray-700 rounded border bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-300 min-h-[4vh]" placeholder="Search Book" required=""></input>
          <button id="btnSearch" type="submit" className="text-white absolute right-0 bottom-0 w-[15%] h-[99.8%] bg-blue-800 hover:bg-blue-900 focus:outline-none font-medium rounded text-2xl px-4 py-0 shadow-xl bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:cursor-pointer">Search</button>
        </div>
    </form>
    )
}

export default SearchBookInput