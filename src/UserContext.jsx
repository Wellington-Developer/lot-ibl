import { createContext, useState, useEffect } from 'react';
import { PHOTO_GET, TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [typeFilter, setTypeFilter] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(null); // Novo estado para os posts filtrados
  const navigate = useNavigate();

  const validateUser = async () => {
    const token = window.localStorage.getItem('token');

    if (token) {
      try {
        setError('null');
        setLoading(true);
        const { url, options } = TOKEN_VALIDATE_POST(token);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Token inválido');
        await getUser(token);
      } catch (err) {
        logoutUser();
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const logoutUser = () => {
    setData(null);
    setLogin(null);
    setLoading(false);
    setError(null);
    setFilteredPosts(null); // Limpa os posts filtrados ao fazer logout
    window.localStorage.removeItem('token');
  };

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Erro: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/accountuser');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const getAllPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = PHOTO_GET();
      const response = await fetch(url, options);
      const json = await response.json();
      setPosts(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = (tipo, cidade, bairro, tipoNegocio, apenasComercio, precoMin, precoMax, banheirosMin, banheirosMax, quartosMin, quartosMax) => {
    if (posts) {
      try {
        setError(null);
        setLoading(true);
  
        // Faz a filtragem dos posts
        let filteredPosts = posts.filter(
          (post) =>
          (cidade === '' || post.cidade.toLowerCase() === cidade.toLowerCase()) &&
          (bairro === '' || post.bairro.toLowerCase() === bairro.toLowerCase()) &&
          (tipoNegocio === '' || post.locacao_ou_venda.toLowerCase() === tipoNegocio.toLowerCase()) &&
          (tipo === '' || post.tipo.toLowerCase() === tipo.toLowerCase()) &&
          (isNaN(banheirosMin) || (post.qtd_banheiros >= banheirosMin && post.qtd_banheiros <= banheirosMax)) &&
          (isNaN(quartosMin) || (post.qtd_quartos >= quartosMin && post.qtd_quartos <= quartosMax))
        );
  
        // Aplica filtro para posts comerciais, se necessário
        if (apenasComercio) {
          filteredPosts = filteredPosts.filter((post) => post.tipo == "Comercial");
        }
  
        // Aplica filtro para preço, se necessário
        if (!isNaN(precoMin) && !isNaN(precoMax)) {
          filteredPosts = filteredPosts.filter((post) => precoMin <= post.preco && post.preco <= precoMax);
        }
        setFilteredPosts(filteredPosts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };
  

  useEffect(() => {
    validateUser();
    getAllPosts();

  }, []);

  return (
    <UserContext.Provider value={{ userLogin, data, login, logoutUser, error, loading, filterPosts, posts, filteredPosts, typeFilter, setTypeFilter, setFilteredPosts }}>
      {children}
    </UserContext.Provider>
  );
};