import { BrowserRouter as Router, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import getUserData from "./getUserData"
import DisplayBook from "./NoUserBooksDisplay"

const UserPage = ({user, allBooks}) => {
  const [userData, setUserData] = useState([])
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

  useEffect(async () => {
    const data = await getUserData(user)
    data.map(cat => {
      setCategories(categories => [...categories, cat ])
      if (cat.data?.books?.length > 0) setBooks([...books, ...cat.data?.books])
    })
  }, [])

  return (
    <>
      {books && allBooks ? 
        books.map((book, index) => <DisplayBook key={index} each={book} />)
      : categories ? 
          categories.map((cat, index) => (
            <div className="category-list-container" key={index}>
              <Router>
                  <Link to={window.location.pathname}
                  className="block bg-gray-800 text-center rounded border border-gray-600 text-2xl text-gray-300 group hover:shadow-xl hover:bg-gray-600"
                  >
                    <div className="flex align-center py-6">
                      <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-2xl">
                        <h3 className="text-center">{cat.data.name}</h3>
                      </div>
                    </div>
                  </Link>
                </Router>
            </div>
          ))
        : null
        }
    </>
  )
}

export default UserPage