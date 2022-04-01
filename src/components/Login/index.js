import React from 'react';
import groupFlag from '../../img/groupFlag.svg';
import { Form, Modal } from 'react-bootstrap';
import './style.css';

import api from '../../services/api'
import '../../global.css';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import jwt from 'jwt-decode';


export default function Login({loginClose}) {
  const { tokenSetter } = useAuth();
  const [values, setValues] = React.useState({email: '', password: ''});

  function handleSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    api.post('/authenticate', {
      email: values.email,
      password: values.password
    }).then((response) => {
      var decodedToken = jwt(response.data.token);
      var date = new Date();

      date.setTime(date.getTime()+decodedToken.exp);
      document.cookie = 'token ='+response.data.token+';expires='+date.toGMTString()+'; SameSite=Strict; Secure; ';
      
      toast.success('Login realizado com sucesso!');
      tokenSetter(response.data.token);
      loginClose(true); 
    }).catch((error) => {
      tokenSetter(false);
      toast.error('Credenciais incorretas');
    });
  }

  function onChange(e){
    const {value, name } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });
  }
    return(
      <>
        <Modal.Header closeButton></Modal.Header>
        <div className="login-header">
          <img src={groupFlag} alt="graduationCap" />
          <Modal.Title className="title py-3">Entrar no Ensina.me</Modal.Title>
        </div>
        <div className="form" id="login">
          <Form onSubmit={handleSubmit} action="post" >
              <Form.Group controlId="formBasicEmail">
                  <Form.Control required type="email" placeholder="Digite seu email" name="email" onChange={onChange}/>
              </Form.Group>
              <Form.Group controlId="password">
                  <Form.Control type="password" placeholder="Digite sua senha" name="password" onChange={onChange}/>
              </Form.Group>
              <Form.Group controlId="submitBtn " >
                  <div className="submit text-center">
                  <button type="submit" className="form-btn form-login mt-3">Entrar</button>
                  </div>
              </Form.Group>
          </Form>
        </div>
      </>
    )
  }