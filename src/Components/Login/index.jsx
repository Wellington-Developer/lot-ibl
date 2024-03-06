import { Input } from "../Forms/Input"
import { useForm } from "../../Hooks/useForm"
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import './styles.css'

export const Login = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error } = useContext(UserContext)
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }
  
  return (
    <div>
      <div className="login-container container">
        <div className="left-side__login">
          <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1296&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="imagem banner login"/>
        </div>
        <div className="right-side__login animeLeft">
          <h1>Bem vindo de volta</h1>
          <p className="info-login">Preencha com seus dados para logar</p>

          <form action="" onSubmit={ handleSubmit }>
            <Input label="Usuário" type="text" id="username" name="username" {...username}/>
            <Input label="Senha" type="password" id="password" name="password" {...password}/>

            <div className="send-info">
            {
                <button>Entrar</button>
              }

              
              <Link to="create"></Link>
            </div>
              {
                error && <p id='error'>{error}</p>
              }
          </form>

        </div>
      </div>
    </div>
  )
}