import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Components/Home'
import { Header } from './Components/Header'
import { UserStorage } from './UserContext.jsx';
import { PostPage } from './Components/PagePost';
import { About } from './Components/About'
import { Simulacao } from './Components/Simulacao'
import { Documentation } from './Components/Documentation'
import { Login } from './Components/Login'
import GoToTop from './Components/GoToTop/index.jsx'
import { AccountUser } from './Components/AccountUser';
import { FilterPage } from './Components/FilterPage/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/post/:id" element={<PostPage />}/>
            <Route path="/about" element={<About />} />
            <Route path="/doc" element={<Documentation />} />
            <Route path="/simulation" element={<Simulacao />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accountuser/*" element={<AccountUser />} />
            <Route path="/filtered" element={<FilterPage />} />
          </Routes>
        </div>
        <GoToTop />
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
