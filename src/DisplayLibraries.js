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
    console.log("clear filters")
  }

  return (
    <>
      <header className="fixed top-0 w-screen p-0 bg-gray-800 block z-50">
        <div className=" pt-6 h-24 rounded-lg shadow-xl delay-75 text-center flex flex-row w-screen">
          <div className="header-logo-container text-bold text-gray-600 text-3xl">
            <Router>
              <Link to={"/"} onClick={() => setDisplayUser(false)} className="border border-gray-600 bg-gray-800 hover:border-gray-600 hover:text-gray-300 hover:bg-gray-700 mb-4 pt-2 pb-4 px-6 text-center">
                Users
              </Link>
            </Router>
          </div>
          <div className="max-w-[15vw] min-w-[15vw] flex flex-row absolute left-0 ml-[1.5vw] whitespace-nowrap"></div>
          <DropdownRender />
        </div>
      </header>
      {displayUser ? 
      <div className="max-w-[15vw] min-w-[15vw] fixed min-h-[100vh]">
        <SideBar filterCategories={filterCategories} handleHomeBtn={handleHomeBtn} handleBackBtn={handleBackBtn} handleSelected={handleSelected} />
      </div>
      : null}
      {users?
      <div className="flex flex-row justify-center mx-auto">
        <div className={classNames("flex flex-9 mt-[8vh]", displayUser ? " ml-[18vw] mr-[3vw] " : null)}> 
          {users.map((user, index) => (
              <div className="category-list-container" key={index} onClick={() => setDisplayUser(true)}>
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
                      <UserPage user={user} allBooks={allBooks} setUser={setUser} />
                    </Route>
                  </Router>
                    }
                    
              </div>
          ))}
        </div>
      </div> 
      :null}
    </>
  )
}

export default DisplayLibraries