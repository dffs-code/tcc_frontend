import React from 'react';

import Chat from '../../components/Chat';
import Request from '../../components/Request';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import banner from '../../img/bannerRequest.svg';

import './style.css';

import data from './requests.json'

export default function SendRequest() {
  return (
    <>

      <section className="row content body-principal" id="send_request">

        <div className="fixed-content">
          <div className="teacher-container">
            <div className="teacher-container-2 row d-flex justify-content-center">
              <div className="image-content d-flex flex-column align-items-center">
                <img src={data.imageTeacher} alt="Imagem do professor" />
                <div className="price-tag">
                  <span > {data.price}</span>
                </div>
              </div>

              <div className="info-container">
                <div className="name-content d-flex flex-column text-left">
                  <span className="subjectName">{data.nameSubject}</span>
                  <span className="nameTeacher">{data.nameTeacher}</span>
                </div>

                <div className="rating-tag assessments-content">
                  <Box className="stars-content" component="fieldset" mb={3} borderColor="transparent" >
                    <Rating name="rating" value={data.stars} readOnly />
                    <span>{data.assessments}</span>
                  </Box>
                </div>
              </div>
            </div>

          </div>
          <div className="tip-container ">
            <div className="tip-content d-flex flex-column align-items-center">
              <img src={banner}></img>
              <h5>Dicas para um envio claro:</h5>
              <ul>
                <li>Envie a Greta um texto curto e explicando suas dificuldades</li>
                <li>Agende a melhor data utilizando nossa aba agenda!</li>
                <li>Após o professor aceitar ele automaticamente aparecerá em seu chat!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main-content w-100" >
          <Request />
        </div>

        <div className="fixed-content chat">
          <Chat />
        </div>

      </section>
    </>
  )
}