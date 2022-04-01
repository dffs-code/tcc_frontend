import React from 'react'
import './style.css';
import img_404 from '../../img/404.png';
import { Link } from 'react-router-dom';


export default function NotFound() {
    return (
        <div className="help-background content" id="not_found">
            <div class="container">
                <div class="row">
                <div class="col-md-6 align-self-center">
                    <img src={img_404} alt="Perdido ?" />;
                </div>
                <div class="col-md-6 align-self-center">
                    <h1>404</h1>
                    <h2>Ops... Acho que você está perdido</h2>
                    <p>Seu pedido soou em grego para nós... <br />
                    Que tal repetir o pedido para algum professor?<br />
                    Clique no botão para ir buscar o seu professor ideal:
                    </p>
                    <Link to="/explorar"><button class="btn green">Buscar</button></Link>
                </div>
                </div>
            </div>
        </div>
    )
}
