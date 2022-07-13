import { useEffect, useState } from "react"
import getUserData from "./getUserData"
import { filterCategories } from "./utils"
import SideBar from "./SideBar"

const UserPage = ({user}) => {
  const [userData, setUserData] = useState([])
  const [allBooks, setAllBooks] = useState(true)

  useEffect(async () => {
    const data = await getUserData(user)
    setUserData(data)
  }, [])

  const handleSelected = (bool) => {
    setAllBooks(bool)
  } 

  const handleHomeBtn = () => {
   console.log("back button") 
  }

  const handleBackBtn = () => {
    console.log("clear filters")
  }


  return (
    <div className="flex flex-row content-start ">
      <div className="flex flex-1 max-w-[15vw] min-w-[15vw]">
        <SideBar filterCategories={filterCategories} handleHomeBtn={handleHomeBtn} handleBackBtn={handleBackBtn} handleSelected={handleSelected} />
      </div>
      <div className="flex flex-9 mt-[8vh] mx-auto">
      </div>
    </div>
  )
}

export default UserPage