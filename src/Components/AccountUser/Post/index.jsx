import { Input } from '../../Forms/Input'
import { useForm } from '../../../Hooks/useForm'
import { useFetch } from '../../../Hooks/useFetch'
import { PHOTO_POST } from '../../../api'
import { useContext, useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../UserContext'

export const Post = () => {
  const numeroImovel = useForm();
  const status_do_imovel = useForm();
  const preco = useForm();
  const titulo = useForm();
  const localidade = useForm();
  const breve_descricao = useForm();
  const cidade = useForm();
  const bairro = useForm();
  const descricao_completa = useForm();
  const qtd_salas = useForm();
  const qtd_banheiros = useForm();
  const qtd_quartos = useForm();
  const qtd_vagas = useForm();
  const metros_privativos = useForm();
  const metros_totais = useForm();
  const informacao_adicional_titulo = useForm();
  const informacao_adicional_paragrafo = useForm();
  const [imgs, setImgs] = useState([]);
  const [features, setFeatures] = useState([]);
  const [textoAdicional, SetTextoAdicional] = useState([]);
  const { data, error, loading, request } = useFetch()
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('');
  const [locacaoOuVenda, setLocacaoOuVenda] = useState('');
  const [ cep, setCep ] = useState('')
  const tipos = ['Apartamento', 'Casa', 'Sobrado', 'Kitnet', 'Chalé', 'Loft', 'Duplex', 'Triplex', 'Flat', 'Cobertura', 'Terreno', 'Comercial'];
  const locacaOuVenda = ['Locacao', 'Venda'];
  const statusOptions = ["", "Locado", "Vendido", "Reservado", "Disponivel"];
  const { filterPosts } = useContext(UserContext)

  useEffect(() => {
    if(data) navigate('/accountuser');
  }, [data, navigate])

  const handleCepChange = (e) => {
    const newCep = e.target.value;
    setCep(newCep);
  
    if (newCep.length === 8) {
      const apiUrl = `https://viacep.com.br/ws/${newCep}/json/`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          bairro.setValue(data.bairro);
          cidade.setValue(data.localidade);
          localidade.setValue(`${data.logradouro}, ${numeroImovel.value}, ${data.bairro} - ${data.localidade}`);
        })
        .catch(error => console.error('Erro ao buscar dados do CEP:', error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cidade', cidade.value);
    formData.append('bairro', bairro.value);
    formData.append('tipo', tipo);
    formData.append('status_do_imovel', status_do_imovel.value);
    formData.append('locacao_ou_venda', locacaoOuVenda);
    formData.append('preco', preco.value);
    formData.append('titulo', titulo.value);
    formData.append('localidade', localidade.value);
    formData.append('breve_descricao', breve_descricao.value);
    formData.append('descricao_completa', descricao_completa.value);
    formData.append('qtd_salas', qtd_salas.value);
    formData.append('qtd_banheiros', qtd_banheiros.value);
    formData.append('qtd_quartos', qtd_quartos.value);
    formData.append('qtd_vagas', qtd_vagas.value);
    formData.append('metros_privativos', metros_privativos.value);
    formData.append('metros_totais', metros_totais.value);
    formData.append('informacao_adicional_titulo', informacao_adicional_titulo.value);
    formData.append('informacao_adicional_paragrafo', informacao_adicional_paragrafo.value);
    formData.append('numero_imovel', numeroImovel.value);
  
    // Enviar features como um array
    formData.append('features', features.join(','));
    formData.append('texto_adicional', textoAdicional);
  
    imgs.forEach((img, index) => {
      formData.append(`img${index + 1}`, img);
    });
  
    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options)
    .then(() => {
      filterPosts(tipo, cidade.value, bairro.value);
    })
  };
  
  const handleImgChange = (e) => {
    const selectedImgs = Array.from(e.target.files);
    setImgs(selectedImgs);
  };
  console.log(numeroImovel)

  return (
    <div className="animeLeft container-form__post">
      <form onSubmit={handleSubmit}>
        <Input label="Número do endereço do Imóvel" name="numero_imovel" type="text" {...numeroImovel} />
        <Input label="CEP" name="cep" type="text" value={cep} onChange={handleCepChange} />
        <Input label="Localidade" name="localidade" type="text" {...localidade}/>
        <Input label="Cidade" name="cidade" type="text" {...cidade}/>
        <Input label="Bairro" name="bairro" type="text" {...bairro}/>
        <Input label="Titulo" name="titulo" type="text" {...titulo}/>
        <select
            id="status_do_imovel"
            value={status_do_imovel.value}
            onChange={status_do_imovel.onChange}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "" ? "Selecione o status" : option}
              </option>
            ))}
        </select>
        <Input label="Preço" name="preco" type="number" {...preco}/>
        <Input label="Breve descricão" name="breve_descricao" type="text" {...breve_descricao}/>
        <Input
          label="Coloque as caracteristicas da casa separadas por virgula"
          name="features"
          type="text"
          value={features.join(',')} // Mostrar as features separadas por vírgula
          onChange={(e) => setFeatures(e.target.value.split(','))}
        />
        <Input
          label="Texto adicional em baixo de valor."
          name="texto_adicional"
          type="text"
          value={textoAdicional} // Mostrar as features separadas por vírgula
          onChange={(e) => SetTextoAdicional(e.target.value)}
        />
        <Input label="Descrição completa" name="descricao_completa" type="textarea" {...descricao_completa}/>
        <Input label="Quantidade de salas" name="qtd_salas" type="number" {...qtd_salas}/>
        <Input label="Quantidade de banheiros" name="qtd_banheiros" type="number" {...qtd_banheiros}/>
        <Input label="Quantidade de quartos" name="qtd_quartos" type="number" {...qtd_quartos}/>
        <Input label="Quantidade de vagas na garagem" name="qtd_vagas" type="number" {...qtd_vagas}/>
        <Input label="Metros privativos totais" name="metros_privativos" type="text" {...metros_privativos}/>
        <Input label="Metros totais" name="metros_totais" type="text" {...metros_totais}/>
        <Input label="Titulo informações adicionais" name="informacao_adicional_titulo" type="text" {...informacao_adicional_titulo}/>
        <Input label="Texto informações adicionais" name="informacao_adicional_paragrafo" type="text" {...informacao_adicional_paragrafo}/>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione o tipo</option>
          {tipos.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={locacaoOuVenda} onChange={(e) => setLocacaoOuVenda(e.target.value)}>
          <option value="">Locação ou Venda?</option>
          {locacaOuVenda.map((locv) => (
            <option key={locv} value={locv}>
              {locv}
            </option>
          ))}
        </select>
        <div id="arquivos">
          <label for="arquivo">Enviar arquivos</label>
          <input type="file" multiple onChange={handleImgChange} name="arquivo" id="arquivo"/>
        </div>
        {
          <p id="error">{error}</p>
        }
        <button>Enviar</button>
      </form>
    </div>
  )
}