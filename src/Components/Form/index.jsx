import React, { useEffect, useState, useContext } from "react";
import './styles.css';
import { MdSearch } from 'react-icons/md';
import { UserContext } from '../../UserContext';
import Img1 from '../../../public/assets/1.jpg'
import Img2 from '../../../public/assets/2.jpg'
import Img3 from '../../../public/assets/3.jpg'

export const Form = () => {
  const { posts, filterPosts } = useContext(UserContext);
  const [tipos, setTipos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [tipo, setTipo] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    Img1,
    Img2,
    Img3
  ];

  const filterData = () => {
    if (posts) {
      const tiposSet = new Set();
      const cidadesSet = new Set();
      const bairrosSet = new Set();

      posts.forEach((post) => {
        tiposSet.add(post.tipo);
        cidadesSet.add(post.cidade);
        bairrosSet.add(post.bairro);
      });

      const tiposArray = Array.from(tiposSet);
      const cidadesArray = Array.from(cidadesSet);
      const bairrosArray = Array.from(bairrosSet);

      tiposArray.unshift('');
      cidadesArray.unshift('');
      bairrosArray.unshift('');

      setTipos(tiposArray);
      setCidades(cidadesArray);
      setBairros(bairrosArray);
    }
  };

  const handleScrollDown = (e) => {
    e.preventDefault()
    window.scrollBy(0, 500);
  };

  const handleTipoNegocioClick = (value) => {
    setTipoNegocio(value);
    filterPosts(tipo, cidade, bairro, value);
  };

  useEffect(() => {
    filterData();
  }, [posts]);
  
  useEffect(() => {
    if (posts) {
      filterPosts(tipo, cidade, bairro, tipoNegocio);
    }
  }, [tipo, cidade, bairro, tipoNegocio]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container container">
      <div className="background" style={{ backgroundImage: `url(${images[imageIndex]})` }}>

      </div>
      <div className="form-container__home">
        <div className="form-content__home">
          <div className="buttons-form">
            <button onClick={() => handleTipoNegocioClick('Locacao')}>Locação</button>
            <button onClick={() => handleTipoNegocioClick('Venda')}>Venda</button>
          </div>
          <form action="">
            <select onChange={(e) => setTipo(e.target.value)} value={tipo}>
              <option value="">Tipo</option>
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <select onChange={(e) => setCidade(e.target.value)} value={cidade}>
              <option value="">Cidade</option>
              {cidades.map((cidade, index) => (
                <option key={index} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>

            <select onChange={(e) => setBairro(e.target.value)} value={bairro}>
              <option value="">Bairro</option>
              {bairros.map((bairro, index) => (
                <option key={index} value={bairro}>
                  {bairro}
                </option>
              ))}
            </select>
            <button onClick={handleScrollDown}><MdSearch /></button>
          </form>
        </div>
      </div>
    </div>
  );
};
