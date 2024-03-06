import React, { useEffect, useState, useContext } from "react";
import './styles.css';
import { MdSearch } from 'react-icons/md';
import { UserContext } from '../../UserContext';

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
    'https://plus.unsplash.com/premium_photo-1675324517011-24d2c741c22f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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

  const handleScrollDown = () => {
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
  }, [tipo, cidade, bairro, tipoNegocio, posts]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container">
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
