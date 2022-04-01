import React from 'react';
import { FaSearch } from 'react-icons/fa';

import './style.css';

import dados from './teachers.json'

export default function Chat() {

    return(
      <div className="chat">
        <div className="search">
          <FaSearch className="search-icon ml-3"/>
            Buscar professores
          </div>
        {dados.map((item) => {
          return (
            <div className="teacher d-flex flex-wrap">
              <img src={item.foto} alt="img_teacher" className="image"/>
              <div className="d-flex flex-column">
                <div className=" header-teacher d-flex flex-wrap justify-content-between">
                  <span className="name">{item.nome}</span>
                  <p className="data">{item.dataUltimaMensagem}</p>
                </div>
                <p className="msg">{item.ultimaMensagem}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
}