import { useContext } from 'react'
import logoPng from '../../assets/logos/logo.png'
import { UserContext } from '../../UserContext'
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import './style.css'

export const Footer = () => {
  const { posts } = useContext(UserContext);
  
  return (
    <footer>
      <div className="top-side__footer container">
        <div className="left-side__footer">
          <img src="https://huergo.com.br/lot/wp-content/uploads/2017/07/LOGO-BRANCA.png" />
          <p>Uma empresa séria que se dedica a fazer bons negócios para a realização do sonho da casa própria!</p>
          <p className="loc-footer">
            <FaMapMarkerAlt />
            AV SÃO JOSÉ, 1084 CRISTO REI - CURITIBA/PR
          </p>
        </div>
        <div className="mid-side__footer">
          <h1>Imóveis recentes</h1>
          {
            posts &&
            <ul>
              <Link to={`/imovel/${posts[0].id}`}>
                {
                  <li>{posts[0].title}</li>
                }
              </Link>

              <Link to={`/imovel/${posts[1].id}`}>
                {
                  <li>{posts[1].title}</li>
                }
              </Link>

              <Link to={`/imovel/${posts[2].id}`}>
                {
                  <li>{posts[2].title}</li>
                }
              </Link>
            </ul>
          }
        </div>
        <div className="right-side__footer">
          <h1>Contato</h1>
          <ul>
            <li><FaMessage  />(41) 99514-3839</li>
            <li><MdEmail />contato@imobiliaria.com.br</li>
            <li><FaPhone />(41) 3206-9139</li>
          </ul>

          <div className="box-social">
            <div className="facebook">
              <FaFacebook />
            </div>
            <div className="instagram">
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-side__footer">
        <img src="https://huergo.com.br/lot/wp-content/uploads/2016/12/huergo.png"/>
        <p>@23 anos | "Superando expectativas e conquistando resultados</p>
      </div>
    </footer>
  )
}