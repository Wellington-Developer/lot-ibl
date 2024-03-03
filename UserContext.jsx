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
      navigate('/account');
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

  const filterPosts = (tipo, cidade, bairro, tipoNegocio) => {
    if (posts) {
      try {
        setError(null);
        setLoading(true);

        // Faz a filtragem dos posts
        let filteredPosts = posts.filter(
          (post) =>
            (cidade === '' || post.cidade === cidade) &&
            (bairro === '' || post.bairro === bairro) &&
            (tipoNegocio === '' || post.locacao_ou_venda === tipoNegocio) &&
            (tipo === '' || post.tipo === tipo)
        );

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
    <UserContext.Provider value={{ userLogin, data, login, logoutUser, error, loading, filterPosts, posts, filteredPosts, typeFilter, setTypeFilter }}>
      {children}
    </UserContext.Provider>
  );
};