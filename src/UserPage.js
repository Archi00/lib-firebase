import { useEffect, useState } from "react"
import getUserData from "./getUserData"
import DisplayBook from "./NoUserBooksDisplay"

const UserPage = ({user}) => {
  const [userData, setUserData] = useState([])
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

  useEffect(async () => {
    const data = await getUserData(user)
    data.map(cat => {
      setCategories(categories => [...categories, cat ])
      // console.log("cateogory: ", cat.data.books)
      if (cat.data?.books?.length > 0) setBooks([...books, ...cat.data?.books])
    })
  }, [])

  return (
    <>
    {books ? 
      books.map((book, index) => <DisplayBook key={index} each={book} />)
    :null}
    </>
  )
}

export default UserPage