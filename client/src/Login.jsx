import React from "react";
import Imagem from "./img/login.png";
import axios from 'axios';
import { Link } from 'react-router-dom';


function App() {
  let url = "http://localhost:3001";
    function logar(){
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        
          axios.post(`${url}`, {
            email: email , 
            password: password
          })
          .then(function () {
            alert("Logado!");
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
            <h4>Welcome!</h4>
            <form>
              <input type={"email"} placeholder={"Email"} id={"email"} />

              <input
                type={"password"}
                placeholder={"Password"}
                id={"password"}
              />

              <input
                type={"button"}
                value={"Entrar"}
                id={"button"}
                onClick={logar}
              />
            </form>
            <p>
              Não possui conta?{" "}
              <Link to={"/register"}>
                Registrar agora!
              </Link>
            </p>
          </div>
          <div className="col lado2" id="lado_img">
            <img src={Imagem} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
