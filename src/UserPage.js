import { useEffect, useState } from "react"
import getUserData from "./getUserData"

const UserPage = ({user}) => {
  const [userData, setUserData] = useState([])

  useEffect(async () => {
    const data = await getUserData(user)
    setUserData(data)
    console.log(data)
  }, []) 

  return (
    <h1>Hello World!</h1>
  )
}

export default UserPage