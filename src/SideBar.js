const SideBar = () => {
  const constantStyle = "flex flex-col items-center p-2 text-xl font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
  return(
    <aside className="w-full h-[100vh] top-o" aria-label="Sidebar">
      <div className="h-[100vh] overflow-y-auto pt-28 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul className="space-y-24">
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 ml-3 whitespace-nowrap">Inbox</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className="block p-4 pl-80 w-full text-2xl text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white min-h-[4vh]" placeholder="Search Book" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 ml-3 whitespace-nowrap">Users</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className="block p-4 pl-80 w-full text-2xl text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white min-h-[4vh]" placeholder="Search Book" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 ml-3 whitespace-nowrap">Products</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className="block p-4 pl-80 w-full text-2xl text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white min-h-[4vh]" placeholder="Search Book" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 ml-3 whitespace-nowrap">Sign In</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className="block p-4 pl-80 w-full text-2xl text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white min-h-[4vh]" placeholder="Search Book" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 ml-3 whitespace-nowrap">Sign Up</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className="block p-4 pl-80 w-full text-2xl text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white min-h-[4vh]" placeholder="Search Book" required=""></input>
                </form>
            </li>
          </ul>
      </div>
    </aside>
  )
}

export default SideBar

/*
        <div className="flex flex-row justify-start mt-28 gap-96 ml-24 ">
          <button
            className=""
            name="search-by-category"
            type="text"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Category
          </button>
          <button
            className=""
            name="search-by-title"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Title
          </button>
          <button
            className=""
            name="search-by-authors"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Author
          </button>
          <button
            className=""
            name="search-by-industryIdentifiers"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search ISBN
          </button>
          <button
            className=""
            name="search-by-publisher"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Publisher
          </button>
        </div>
*/ 