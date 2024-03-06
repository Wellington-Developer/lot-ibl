import { useEffect, useContext } from "react";
import { Form } from "../Form"
import { RowPosts } from "../RowPosts"
import { useLocation } from "react-router-dom"
import { UserContext } from "../../UserContext";

export const Home = () => {
  let location = useLocation();
  const { setFilteredPosts } = useContext(UserContext)

  const handleChangedPosts = () => {
    if(location.pathname == "/") {
      setFilteredPosts(null)
    }
  }
  
  useEffect(() => {
    handleChangedPosts()
  }, [])

  return (
    <>
      <Form />
      <RowPosts />
    </>
  )
}