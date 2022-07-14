import { useEffect, useState } from "react"
import { BrowserRouter as Router, Link, Route, history, useHistory } from "react-router-dom"
import { classNames, filterCategories } from "./utils"
import DropdownRender from "./NoUserDropdown"
import getUsers from "./getUsers"
import UserPage from "./UserPage"
import SideBar from "./SideBar"

const DisplayLibraries = () => {
  const [users, setUsers] = useState([])
  const [displayUser, setDisplayUser] = useState(false)
  const [allBooks, setAllBooks] = useState(true)
  const [user, setUser] = useState()
  const [list, setList] = useState([])
  const [filters, setFilters] = useState([])
  const history = useHistory()
  
  useEffect(async () => {
    const userList = await getUsers()
    setUsers(userList)
  }, [])
  
  useEffect(() => {
    if (window.location.pathname === "/") setDisplayUser(false)
    if (window.location.pathname !== "/") setDisplayUser(true)
  }, [window.location])

  const handleSelected = (bool) => {
    setAllBooks(bool)
  } 

  const handleHomeBtn = () => {
    history.replace("/display/" + user.name + "-" + user.uid.slice(-5)) 
  }

  const handleBackBtn = () => {
    const filters = [...document.querySelectorAll("#filter")]
    filters.forEach(f => f.value = "")
    setFilters([])
  }

  const handleFilters = async (e) => {
    const filteredBooks = await filterCategories(e, list, setFilters)
  }

  return (
    <div className="min-h-[100vh] flex justify-center flex-wrap">
      <header className="fixed top-0 w-screen p-0 bg-gray-800 block z-50">
        <div className=" pt-6 h-24 rounded-lg shadow-xl delay-75 text-center flex flex-row w-screen">
          <div className="header-logo-container text-bold text-gray-600 text-3xl">
          {displayUser ?
            <Router>
              <Link to={"/"} onClick={() => setDisplayUser(false)} className="flex flex-row text-gray-300 font-bold uppercase text-xl px-8 pt-3 mb-4 rounded shadow-xl hover:shadow-xl hover:bg-gray-800 outline-none focus:outline-none  ease-linear transition-all duration-150 bg-gray-900">
                Users
              </Link>
            </Router>
          : null}
          </div>
          <div className="max-w-[15vw] min-w-[15vw] flex flex-row absolute left-0 ml-[1.5vw] whitespace-nowrap"></div>
          <DropdownRender />
        </div>
      </header>
      {displayUser && list.length > 0 ? 
      <div className="max-w-[15vw] min-w-[15vw] fixed left-0 min-h-[100vh]">
        <SideBar handleFilters={handleFilters} handleHomeBtn={handleHomeBtn} handleBackBtn={handleBackBtn} handleSelected={handleSelected} list={list} />
      </div>
      : null}
      {users?
        <div className={classNames("flex flex-row flex-wrap mt-[8vh] max-h-[10vh] min-h-[10vh] gap-12 justify-center", displayUser ? " ml-[18vw] mr-[1vw]" : null)}> 
          {users.map((user, index) => (
              <div className="mt-8 flex justify-center flex-row flex-wrap gap-12" key={index} onClick={() => setDisplayUser(true)}>
                  {!displayUser ?
                <Router>
                    <Link to={`/display/${user.name  + "-" + user.uid.slice(-5)}`}
                    className="block bg-gray-800 text-center rounded border border-gray-600 text-2xl text-gray-300 group hover:shadow-xl hover:bg-gray-600"
                    onClick={() => setDisplayUser(true)}
                    >
                      <div className="flex align-center py-6">
                        <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-2xl">
                          <h3 className="text-center">{user.name}</h3>
                        </div>
                      </div>
                    </Link>
                    </Router>
                    : 
                    <Router>
                    <Route path="/display">
                      <UserPage user={user} allBooks={allBooks} setUser={setUser} setList={setList} list={list} filters={filters} />
                    </Route>
                  </Router>
                    }
                    
              </div>
          ))}
        </div>
      :null}

    </div>
  )
}

export default DisplayLibraries