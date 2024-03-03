import './style.css';

export const Simulacao = () => {
  const simulacaoData = [
    {
      nome: 'Caixa Economica Federal',
      descricao: 'Consulte o simulador Habitacional da caixa',
      link: 'https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso',
      image: 'https://huergo.com.br/lot/wp-content/uploads/2023/08/caixa-1.jpg',
    },
    {
      nome: 'Banco do Brasil',
      descricao: 'Confira as facilidades do Banco.',
      link: 'https://www.bb.com.br/site/#/',
      image: 'https://huergo.com.br/lot/wp-content/uploads/2023/08/bancodobrasil.jpg',
    },
    {
      nome: 'Bradesco',
      descricao: 'Sua casa do jeito que você sempre sonhou.',
      link: 'https://banco.bradesco/html/classic/resultado-busca/index.shtm?q=simuladores-imoveis.shtm#box1-comprar&s=Classic',
      image: 'https://huergo.com.br/lot/wp-content/uploads/2023/08/bradesco.jpg',
    },
    {
      nome: 'Santander',
      descricao: 'Simule seu Crédito Imobiliário.',
      link: 'https://www.santander.com.br/portal/wps/script/templates/GCMRequest.do?page=5516',
      image: 'https://huergo.com.br/lot/wp-content/uploads/2023/08/santander.jpg',
    },
    {
      nome: 'Itaú',
      descricao: 'Receba uma proposta de financiamento.',
      link: 'https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario/simulador/',
      image: 'https://huergo.com.br/lot/wp-content/uploads/2023/08/itau.jpg',
    },
    {
      nome: 'HSBC',
      descricao: 'Condições para financiar seu imóvel.',
      link: 'https://www.business.hsbc.com.br/',
      image: 'https://huergo.com.br/lot/wp-content/uploads/2023/08/hsbc.jpg',
    },
  ]
  
  return (
    <div className="simulacao container">
      <h1>Faça uma simulação de financiamento no banco de sua preferência</h1>
      
      <div className="container-simulacao ">
        {
          simulacaoData.map((item) => {
            return <div className="box-simulacao">
              <img src={item.image} />
              <h1>{item.nome}</h1>
              <p>{item.descricao}</p>
              <a href={item.link} target="_blank">Simule</a>
            </div>
          })
        }
      </div>
    </div>
  )
}