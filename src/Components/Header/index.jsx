import logo from '../../../public/assets/logo.png';
import './styles.css'
import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare  } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RiCloseFill, RiMenu3Fill } from 'react-icons/ri'
import { UserContext } from '../../UserContext';

export const Header = () => {
  const [ widthMobile, setWidthMobile ] = useState()
  const [ activeMenu, setActiveMenu ] = useState()
  const { data } = useContext(UserContext)
  
  useEffect(() => {
    const updateWidthMobile = () => {
      if (window.innerWidth < 600) {
        setWidthMobile(true);
      } else {
        setWidthMobile(false);
        setActiveMenu(false)
      }
    };

    updateWidthMobile();

    window.addEventListener('resize', updateWidthMobile);

    return () => {
      window.removeEventListener('resize', updateWidthMobile);
    };
  }, []); 

  return (
      <header>
        <div className="social-header">
          <div className="social-content__header">
            <ul>
              <li><a href="https://www.facebook.com/lotimobiliaria?mibextid=ZbWKwL"></a><FaFacebookSquare />
  </li>
              <li><a href=""></a><FaInstagramSquare /></li>
              <li><a href="https://wa.me/5541995143839"></a><FaWhatsappSquare /></li>
              {
                data && data.username == "admin" ?
                (<li>{data.username}</li>) :
                (<Link to="/login">
                  <li>Logar</li>
                </Link>)
              }
              
            </ul>
          </div>
        </div>
        <div className="container">
          <div className="menu-content__header">
              <div className="left-side__header">
                <Link to="/">
                  <img src={logo} />
                </Link>
              </div>
              <div className={`right-side__header ${activeMenu ? 'ativo' : ''}`}>
                {
                  widthMobile && (activeMenu ? 
                  <RiCloseFill onClick={ () => setActiveMenu(false) }/>
                  : 
                  <RiMenu3Fill onClick={ () => setActiveMenu(true) }/>)
                }
                <ul onClick={ () => setActiveMenu(false) }>
                  <Link to="/about">
                    <li><a href="">Sobre nós</a></li>
                  </Link>
                  <Link to="/simulation">
                    <li><a href="">Serviços</a></li>
                  </Link>
                  <Link to="/doc">
                    <li><a href="">Documentação</a></li>
                  </Link>
                  <Link to="/contact">
                    <li><a href="">Contato</a></li>
                  </Link>
                  {
                    data && data.username == "admin" && (
                      <Link to="/accountuser/send-post">
                      <li><a href="">Postar imóvel</a></li>
                    </Link>
                    )
                  }
                </ul>
              </div>
            </div>
        </div>
      </header>
  )
}