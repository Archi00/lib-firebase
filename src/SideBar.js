import { classNames, debounce } from "./utils"
import { useState } from "react"
import CategoryDropdown from "./CategoryDropdown"

const SideBar = ({filterCategories, handleHomeBtn, handleBackBtn, handleSelected, categories}) => {
  const [bookSelected, setBookSelected] = useState(true)

  const constantStyle = "flex flex-col items-center p-2 text-xl font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
  const constantInput = "block p-4 w-full text-2xl rounded border border-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 placeholder:uppercase placeholder:text-center placeholder:text-xl dark:placeholder-gSearch By ray-400"
  
  const handleChange = debounce((e) => {
    filterCategories(e)
  })

  return(
    <aside className="w-full h-[100vh]" aria-label="Sidebar">
      <div className="h-[100vh] fixed z-30 overflow-y-auto pt-28 px-8 mx-auto bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-8">
          <li>
            <div className="flex flex-row p-2 text-2xl font-normal  text-gray-900 rounded-lg dark:text-white hover:cursor-pointer">
              <div onClick={() => window.location.pathname === "/dashboard/adding-books" ? handleHomeBtn(window.location.pathname) : handleHomeBtn()}className="flex flex-1 flex-start px-4 py-4 text-center dark:hover:bg-gray-900">
                <h2>Home</h2>
              </div>
              <div onClick={() => handleBackBtn()} className="flex flex-1 flex-end px-6 py-4 dark:hover:bg-gray-900 max-w-[30%]">
                <h3>Clear</h3>
              </div>

            </div>
          </li>
          {/* <li>
              <form onSubmit={(e) => e.preventDefault()} className={constantStyle}>
                <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Category</label>
                <input id="filter" onChange={(e) => handleChange(e)} name="search-by-category" type="search" className={constantInput} placeholder="Search By Category" required=""></input>
              </form>
          </li> */}
          <li>
              <form onSubmit={(e) => e.preventDefault()} className={constantStyle}>
                <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Title</label>
                <input id="filter" onChange={(e) => handleChange(e)} name="search-by-title" type="search" className={constantInput} placeholder="Search By Title" required=""></input>
              </form>
          </li>
          <li>
              <form onSubmit={(e) => e.preventDefault()} className={constantStyle}>
                <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Author</label>
                <input id="filter" onChange={(e) => handleChange(e)} name="search-by-authors" type="search" className={constantInput} placeholder="Search By Author" required=""></input>
              </form>
          </li>
          <li>
              <form onSubmit={(e) => e.preventDefault()} className={constantStyle}>
                <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">ISBN</label>
                <input id="filter" onChange={(e) => handleChange(e)} name="search-by-industryIdentifiers" type="search" className={constantInput} placeholder="Search By ISBN" required=""></input>
              </form>
          </li>
          <li>
              <form onSubmit={(e) => e.preventDefault()} className={constantStyle}>
                <label className="flex-1 whitespace-nowrap text-xl text-gray-200 mb-3">Publisher</label>
                <input id="filter" onChange={(e) => handleChange(e)} name="search-by-publisher" type="search" className={constantInput} placeholder="Search By Publisher" required=""></input>
              </form>
          </li>
        </ul>
      </div>
      <div className="fixed bottom-0 flex flex-row text-2xl font-normal rounded hover:cursor-pointer z-50 min-w-[27.27rem] max-w-[27.27rem]">
        <div onClick={() => (handleSelected(true), setBookSelected(true))} className={classNames("flex flex-start rounded flex-1 shadow-xl justify-center px-8  py-4", bookSelected ? "text-gray-300 bg-gray-800 " : "bg-gray-900 hover:bg-gray-800 hover:text-gray-400")} >
          <button>Books</button>
        </div>
        <div onClick={() => (handleSelected(false), setBookSelected(false))} className={classNames("flex flex-start flex-1 shadow-xl rounded justify-center px-8 py-4", !bookSelected ? "text-gray-300 g-gray-800 " : "bg-gray-900 hover:bg-gray-800 hover:text-gray-400")}>
          <button>Categories</button>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
