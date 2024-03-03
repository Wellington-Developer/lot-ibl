import './styles.css';
import { UserContext } from '../../UserContext';
import { useContext, useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { Post } from '../RowPosts/Post';

export const FilterPage = () => {
  const { posts, filteredPosts, filterPosts } = useContext(UserContext);
  const [tipos, setTipos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [tipo, setTipo] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [apenasComercio, setApenasComercio] = useState(false);
  const [precoMin, setPrecoMin] = useState(0);
  const [precoMax, setPrecoMax] = useState(500000);
  const [banheirosMin, setBanheirosMin] = useState(0);
  const [banheirosMax, setBanheirosMax] = useState(10);
  const [quartosMin, setQuartosMin] = useState(0);
  const [quartosMax, setQuartosMax] = useState(10);

  const fetchData = async () => {
    try {
      const response = await fetch('https://huergo.com.br/lot-api/json/api/photo');

      if (response.ok) {
        const json = await response.json();
        setData(json);
      } else {
        console.error('Erro ao carregar os dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  };

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

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterData();
  }, [posts]);

  useEffect(() => {
    filterPosts(tipo, cidade, bairro, tipoNegocio, apenasComercio, precoMin, precoMax, banheirosMin, banheirosMax, quartosMin, quartosMax);
  }, [tipo, cidade, bairro, tipoNegocio, apenasComercio, precoMin, precoMax, banheirosMin, banheirosMax, quartosMin, quartosMax]);

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className="filter-page__container">
      <div className="filter-page__content">
        <div className="left-side">
          <div className="info-filter">
            <h1>Filtrar imóveis</h1>
            <p>Selecione as propriedades dos imóveis</p>
          </div>

          <div className="check-filter">
            <input
              type="checkbox"
              id="comercio"
              name="comercio"
              checked={apenasComercio}
              onChange={(e) => setApenasComercio(e.target.checked)}
            />
            <label htmlFor="comercio">Apenas comércio</label>
          </div>

          <div className="price-filter">
            <h1>Preço</h1>
            <Slider
              aria-label="Temperature"
              value={[precoMin, precoMax]}
              onChange={(event, newValue) => {
                setPrecoMin(newValue[0]);
                setPrecoMax(newValue[1]);
              }}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={5000}
              marks
              min={0}
              max={500000}
            />
            <div className='price-controller'>
              <p>De R${precoMin.toLocaleString('pt-br', {
                type: 'currency',
                currency: 'BRL'
              })}</p>
              <p>Até R$ {precoMax.toLocaleString('pt-br', {
                type: 'currency',
                currency: 'BRL'
              })}</p>
            </div>
          </div>

          <div className="bathrooms-slider">
            <h1>Banheiros</h1>
            <Slider
              value={[banheirosMin, banheirosMax]}
              onChange={(event, newValue) => {
                setBanheirosMin(newValue[0]);
                setBanheirosMax(newValue[1]);
              }}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
            <div className='slider-controller'>
              <p>Mín: {banheirosMin}</p>
              <p>Máx: {banheirosMax}</p>
            </div>
          </div>

          <div className="rooms-slider">
            <h1>Quartos</h1>
            <Slider
              value={[quartosMin, quartosMax]}
              onChange={(event, newValue) => {
                setQuartosMin(newValue[0]);
                setQuartosMax(newValue[1]);
              }}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
            <div className='slider-controller'>
              <p>Mín: {quartosMin}</p>
              <p>Máx: {quartosMax}</p>
            </div>
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
          </form>
        </div>

          {filteredPosts ? (
            <div className="right-side__post">
              <h1 id="type">Resultados</h1>
              <div className="right-side">
                {filteredPosts.map((post, index) => (
                  <Post
                    title={post.title}
                    price={post.preco}
                    locale={post.localidade}
                    qt_bath={post.qtd_banheiros}
                    qt_room={post.qtd_quartos}
                    size={post.metros_totais}
                    img={post.imagens_relacionadas[0]}
                    id={post.id}
                    key={index}
                    status={post.status}
                  />
                ))}
              </div>
            </div>
          ) :
          (
            <h1>Busque por algo</h1>
          )}
        </div>
      </div>
  );
};
