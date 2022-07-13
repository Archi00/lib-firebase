import { useEffect, useState } from "react"
import getUserData from "./getUserData"

const UserPage = ({user}) => {
  const [userData, setUserData] = useState([])

  useEffect(async () => {
    const data = await getUserData(user)
    setUserData(data)
  }, [])

  return (
    <div className="flex flex-row content-start ">
      <div className="flex flex-9 mt-[8vh] mx-auto">
      </div>
    </div>
  )
}

export default UserPage