import React from "react";
import { Link } from 'react-router-dom';

// import { Container } from './styles';

function home() {
  return (
    <>
      <div className="container">
        <div className="barra-nav">
            <h5>{'< Gyo Lima />'}</h5>
            <Link to={"/"} id="link">
                Sair
              </Link>
        </div>
        <div className="grupo">
          <div id="bolha">
            <h3>BEM VINDO!</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default home;
