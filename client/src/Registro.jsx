import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Imagem from "./img/register.png";

// import { Container } from './styles';

function registro() {
    let url = "http://localhost:3001";

    function registrar(){
      let name = document.querySelector('#name').value;
      let email = document.querySelector('#email').value;
      let password = document.querySelector('#password').value;
      let confirmpassword = document.querySelector('#confirmpassword').value;
  
      axios.post(`${url}/register`, {
        name: name , 
        email: email , 
        password: password , 
        confirmpassword: confirmpassword 
      })
      .then(function (response) {
        alert("Usuário cadastrado com sucesso!")
      })
      .catch(function (error) {
        alert(error.response.data.msg);
      });
    }

  return (
    <>
      <div className="container">
          <div className="row mb-2 todos">
            <div className="col lado1">
              <h4>Regristrar-se</h4>
              <form>
                <input type={'text'} placeholder={'Seu Nome'} id={'name'} />

                <input type={'email'} placeholder={'Seu Email'} id={'email'} />

                <input type={'password'} placeholder={'Sua Senha'} id={'password'} />

                <input type={'password'} placeholder={'Confirmar Senha'} id={'confirmpassword'}/>

                <input type={'button'} value={'Cadastrar'} id={'button'} onClick={registrar}/>
              </form>
              <p>Já possui conta? <Link to={"/"}>Entrar agora!</Link></p>
            </div>
            <div className="col lado2" id="lado_img">
              <img src={Imagem} />
            </div>
          </div>
      </div>
    </>
  );
}

export default registro;