import { useEffect, useState } from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import DropdownRender from "./NoUserDropdown"
import getUsers from "./getUsers"

const DisplayLibraries = () => {
  const [users, setUsers] = useState([])
  
  useEffect(async () => {
    const userList = await getUsers()
    setUsers(userList)
  }, [])

  return (
    <>
      <header className="fixed top-0 w-screen p-0 bg-gray-800 block z-50">
        <div className="p-8 pt-6 h-24 rounded-lg shadow-xl delay-75 text-center flex flex-row w-screen">
          <div className="header-logo-container"></div>
          <div className="max-w-[15vw] min-w-[15vw] flex flex-row absolute left-0 ml-[1.5vw] whitespace-nowrap"></div>
          <DropdownRender />
        </div>
      </header>
      {users ?
      <div className="flex flex-row content-start">
        <div className="flex flex-9 mt-[8vh] mx-auto">
          {users.map((user, index) => (
          <div key={index} className="App">
            <div className="category-list">
              <div className="category-list-container">
                <Router>
                    <Link to={`/display/${user.name  + "-" + user.uid.slice(-5)}`}
                    className="block bg-gray-800 text-center rounded border border-gray-600 text-2xl text-gray-300 group hover:shadow-xl hover:bg-gray-600"
                    >
                      <div className="flex align-center py-6">
                        <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-2xl">
                          <h3 className="text-center">{user.name}</h3>
                        </div>
                      </div>
                    </Link>
                  </Router>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div> 
      :null}
    </>
  )
}

export default DisplayLibraries