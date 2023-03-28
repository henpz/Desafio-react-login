import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [email, setEmail] = useState ('');  //set dois estados sendo o estado inicial uma string vazia
  const [password, setPassword] = useState (''); //set dois estados sendo o estado inicial uma string vazia
  const [error, setError] = useState(null) //setamos dois estados sendo o inicial null
  const [requisicao, setRequisicao] = useState(false) 

  const recoverEmail = (event) =>{
    const value = event.target.value  //recupera oq escrevermos 

    setEmail(value)  //renderiza o componente com o novo valor
  }

  const recoverPassword = (event) =>{
    const value = event.target.value  //recupera oq escrevermos 

    setPassword(value)  //renderiza o componente com o novo valor
  }


  const handleSubmit = () =>{  
    let values = {email: email, password: password} //faz a verificação dos objetos

    setError(null) //isso serve para que toda vez que o usuario dispara o botao login o valor de error sera nulo, logo a mensagem de erro deixará de aparecer na tela
    setRequisicao(true) //muda o valor de requisicao para true, para podermos desabilitar o botao durante a verificacao de login
    login(values)
    .then(() =>{
      alert ('login efetuado')
    })
    .catch((error) =>{
      setError(error)
    })
    .finally(()=>{  //o finally é uma funcao que sempre ira ser executada no final do then e catch, neste caso mudamos o setRequisicao para false, para o botao voltar a ficar ativo apos a verificacao
      setRequisicao(false)
    })
  }



  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
       {error && <div className='errorMessage'>{error.message}</div>} {/* fiz uma renderização condicional em nossa DIV*/}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>

          <input id={'email'} type={'email'} autoComplete='off' value={email} onChange={recoverEmail}/>   
        </div> 

        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} value={password} onChange={recoverPassword} />
        </div>

        <div className='button'>
          <button onClick={handleSubmit}  disabled={email === '' || password.length <6 || requisicao } >Login</button>
        </div>
      </div>
    </div>
  );
}
