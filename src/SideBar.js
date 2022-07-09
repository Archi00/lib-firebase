const SideBar = () => {
  const constantStyle = "flex flex-col items-center p-2 text-xl font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
  const constantInput = "block p-4 w-full text-2xl rounded border border-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 placeholder:uppercase placeholder:text-center placeholder:text-xl dark:placeholder-gSearch By ray-400"
  return(
    <aside className="w-full h-[100vh]" aria-label="Sidebar">
      <div className="h-[100vh] overflow-y-auto pt-28 px-8 mx-auto bg-gray-50 rounded dark:bg-gray-800">
          <ul className="space-y-8">
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Category</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className={constantInput} placeholder="Search By Category" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Title</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className={constantInput} placeholder="Search By Title" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Author</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className={constantInput} placeholder="Search By Author" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">ISBN</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className={constantInput} placeholder="Search By ISBN" required=""></input>
                </form>
            </li>
            <li>
                <form className={constantStyle}>
                  <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Publisher</label>
                  <div className="flex absolute inset-y-0 left-72 items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" className={constantInput} placeholder="Search By Publisher" required=""></input>
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
            className={constantInput}
            name="search-by-category"
            type="text"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Category
          </button>
          <button
            className={constantInput}
            name="search-by-title"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Title
          </button>
          <button
            className={constantInput}
            name="search-by-authors"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Author
          </button>
          <button
            className={constantInput}
            name="search-by-industryIdentifiers"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search ISBN
          </button>
          <button
            className={constantInput}
            name="search-by-publisher"
            onClick={(e) => {
              replaceTags(e.target);
            }}
          >
            Search Publisher
          </button>
        </div>
*/ 