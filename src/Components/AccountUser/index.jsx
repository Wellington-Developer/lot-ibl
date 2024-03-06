import { useContext } from "react"
import { UserContext } from "../../UserContext"
import { Link, Route, Routes } from "react-router-dom";
import { Post } from "./Post";
import { EditPost } from "./EditPost";
import './styles.css';

export const AccountUser = () => {
  const { logoutUser } = useContext(UserContext);
  return (
    <div className="accountuser_info container">
      <h1>Logado como admin</h1>
      <Routes>
        <Route path="send-post" element={ <Post /> } />
        <Route path="edit-post/:id" element={ <EditPost /> } />
      </Routes>

      <Link to="/" onClick={logoutUser}>Sair</Link>
    </div>
  )
}