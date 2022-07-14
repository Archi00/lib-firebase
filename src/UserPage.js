import { BrowserRouter as Router, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import getUserData from "./getUserData"
import DisplayBook from "./NoUserBooksDisplay"

const UserPage = ({user, allBooks, setUser, setList, list, filters}) => {
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [displayBooksInsideCategory,setDisplayBooksInsideCategory] = useState("")
  const [displayCat, setDisplayCat] = useState([])

  useEffect(async () => {
    const data = await getUserData(user)
    data.map(cat => {
      setCategories(categories => [...categories, cat ])
      setList(list => [...list, cat])
      if (cat.data?.books?.length > 0) setBooks(books => [...books, ...cat.data?.books])
    })
    setUser(user)
  }, [])

  useEffect(() => {
    categories.map(cat => {
      if (cat.id === displayBooksInsideCategory && window.location.pathname === `${"/display/" + user.name + "-" + user.uid.slice(-5) + "/" + cat.data?.name.split(" ").join("%20")}`) {
        setDisplayCat(cat.data.books)
      }
    })
    if (window.location.pathname === "/display/" + user.name + "-" + user.uid.slice(-5)) setDisplayBooksInsideCategory("")
  }, [displayBooksInsideCategory, window.location.pathname])

  return (
    <>
      {books && allBooks && !filters?.length > 0? 
        books.map((book, index) => <DisplayBook key={index} each={book} />)
      : categories && !displayBooksInsideCategory && !filters?.length > 0? 
          categories.map((cat, index) => (
            <Router key={index}>
                <Link to={window.location.pathname + "/" + cat.data.name}
                className="block bg-gray-800 text-center rounded border border-gray-600 text-2xl text-gray-300 group hover:shadow-xl hover:bg-gray-600"
                onClick={() => setDisplayBooksInsideCategory(cat.id)}
                >
                  <div className="flex align-center py-6">
                    <div className="w-[25vw] overflow-hidden whitespace-nowrap py-4 uppercase text-bold text-white text-2xl">
                      <h3 className="text-center">{cat.data.name}</h3>
                    </div>
                  </div>
                </Link>
              </Router>
          ))
        : null
        }
      {displayBooksInsideCategory && !filters?.length > 0? 
        displayCat.map((book, index) => <DisplayBook key={index} each={book} />)
      : null}
      {filters.map((book, index) => <DisplayBook key={index} each={book} />)}
    </>
  )
}

export default UserPage