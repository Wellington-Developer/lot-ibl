import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import { Post } from "./Post";
import './styles.css';
import { Link } from "react-router-dom";

export const RowPosts = () => {
  const [data, setData] = useState([]);
  const [dataLocacao, setDataLocacao] = useState([]);
  const [dataVenda, setDataVenda] = useState([]);
  const { filteredPosts } = useContext(UserContext);
  const refference = useRef()

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

  const filterSections = () => {
    if (data) {
      const disponivelPosts = data.filter(imovel => imovel.status === "Disponivel");
      
      const locacaoPosts = disponivelPosts.filter(imovel => imovel.locacao_ou_venda === "Locacao");
      const vendaPosts = disponivelPosts.filter(imovel => imovel.locacao_ou_venda === "Venda");
  
      setDataLocacao(locacaoPosts.slice(0, 3));
      setDataVenda(vendaPosts.slice(0, 3));
    }
  };

  const handleScrollLeft = () => {
    if (refference.current) {
      refference.current.scrollLeft -= 200; // Ajuste o valor conforme necessário
    }
  };

  const handleScrollRight = () => {
    if (refference.current) {
      refference.current.scrollLeft += 200; // Ajuste o valor conforme necessário
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterSections();
  }, [data, dataLocacao, dataVenda]);

  return (
    <div className="container">
      {filteredPosts && filteredPosts.length > 0 && (
          <>
          <div className="controller-post">
            <div className="info-post__c">
              <h1 id="type">Post filtrado</h1>
              <Link to="/filtered" id="link">
                Ver todos
              </Link>
            </div>
            <div className="buttons">
            <button className="scroll-button" onClick={handleScrollLeft}>
              &lt;
            </button>
            <button className="scroll-button" onClick={handleScrollRight}>
              &gt;
            </button>
            </div>
          </div>
        <div className="posts-container__home" ref={refference}>
          <div className="posts-content__home">
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
                status={post.status}
              />
            ))}
          </div>
        </div>
        </>
      )}

      {dataLocacao && (
        <>
        <div className="posts-container__home">
          <div className="info-post__c">
            <h1 id="type">Locação</h1>
            <Link to="/filtered" id="link">
              Ver todos
            </Link>
          </div>
          <div className="posts-content__home">
            {dataLocacao.map((post, index) => (
              <Post
                title={post.title}
                price={post.preco}
                locale={post.localidade}
                qt_bath={post.qtd_banheiros}
                qt_room={post.qtd_quartos}
                size={post.metros_totais}
                img={post.imagens_relacionadas[0]}
                id={post.id}
                status={post.status}
              />
            ))}
          </div>
        </div>
        </>
      )}

      {dataVenda && (
        <div className="posts-container__home">
          <div className="info-post__c">
            <h1 id="type">Venda</h1>
            <Link to="/filtered" id="link">
              Ver todos
            </Link>
          </div>
          <div className="posts-content__home">
            {dataVenda.map((post, index) => (
              <Post
                title={post.title}
                price={post.preco}
                locale={post.localidade}
                qt_bath={post.qtd_banheiros}
                qt_room={post.qtd_quartos}
                size={post.metros_totais}
                img={post.imagens_relacionadas[0]}
                id={post.id}
                status={post.status}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
