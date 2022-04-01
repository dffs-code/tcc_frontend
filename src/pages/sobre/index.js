import React from 'react';
import logo  from '../../img/logo.svg';
import proposito  from '../../img/teacher_proposito.png';
import groupFlag  from '../../img/groupFlag.svg';

import './style.css';
import {  RiGithubFill, RiGlobalFill, RiInstagramFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { isMobile } from 'react-device-detect';
export default function Sobre() {
    return (
        <div className="body-principal" id="about_us">
            <section className="banner-about d-flex align-items-center ">
                <div className="w-100 d-flex justify-content-center flex-wrap">
                    <img src={logo} alt="Logo ensina-me" /><br/>
                    <h3 className="text-center w-100 mt-5 primary-color"><b>Nascemos com a missão de universalizar o ensino de forma acessível.</b></h3>
                </div>
            </section>
            <section className="proposito content">
                <h2 className="text-center mb-5"><b>Nosso propósito</b></h2>
                <div className={isMobile ? "d-block" : "d-flex justify-content-center "}>
                    <div className="mr-3">
                        <img src={proposito} alt="Universalização do ensino" className="icon-teacher" />
                    </div>
                    <div>
                        <p>Nosso propósito é universalizar o ensino de forma acessível para todos.<br/> Não queremos que apenas os professores já consolidados possam vir dar aula, queremos todos em nossa plataforma.</p><br/>
                        <h5><b >Pilares fundamentais:</b></h5>
                        <p>
                            1°: Ajudar o professor a trabalhar para si mesmo, fazendo o que ama e recebendo para isso ao invés de pagar preços abusivos.<br/>
                            2°: Disponibilizar ao aluno diversos anúncios de aula de forma simples e efetiva. Basta de buscar anúncios em redes sociais!
                        </p><br/>
                        <p className={isMobile ? "text-center mt-1" : "text-center mt-5"}>
                            <b>
                                100% Nacional, 100% gratuito, aqui o foco é você e seu desenvolvimento!
                            </b>
                        </p>
                    </div>
                </div>
            </section>
            <section className="quemsomos ">
                <div className="content">
                    <h2 className="text-center mb-5"><b>Sobre</b></h2>
                    <div className={isMobile ? "d-block" : "d-flex justify-content-center "}>
                        <div className="mr-5">
                            <img src={groupFlag} alt="Universalização do ensino" className="icon-teacher" />
                        </div>
                        <div>
                            <p>O Ensina.me nasceu em uma reunião on-line.<br /><br />
                                Três amigos pensavam o que fazer para o Trabalho de Conclusão de Curso no curso de Análise e Desenvolvimento de Sistemas pelo Instituto Federal de São Paulo, quando no meio de ideias, os três compartilhavam de histórias semelhantes.<br/><br />
                                Todos já haviam passado por experiências ruins com plataformas de aulas online, tanto como alunos quanto como professores, surgiram todos os tipos de reclamações: Preços abusivos, muito foco na plataforma e pouco nos usuários, a falta de mercado nacional, dentre outras<br/><br />
                                Então... Por quê não fazer algo que entenda o brasileiro, que entenda o momento do país e a necessidade, não só de fornecer um meio de encontrar o ensino, como também, gerar renda para milhares de professores que se encontram desempregados, ou pior, que ainda sequer tiveram a primeira chance?
                            </p>
                        </div>
                    </div>
                </div>
            </section>            
            <section className="fundadores">
                <div className="content">
                    <h2 className="text-center"><b>Os fundadores</b></h2>
                    <div className="d-flex justify-content-around align-items-center flex-wrap w-100 cards_fundadores">
                        <div class="card card0 daniel mt-5">
                            <div class="border p-3 ">
                                <h5><b>Daniel Formigoni</b></h5>
                                <p className="mt-5"><b>Desenvolvedor Back-end, especialista em integrações de back com front end.</b></p>
                                <div class="icons">
                                    <a href="https://dffs-code.github.io/myPage" target="_blank" rel="noreferrer">
                                        <RiGlobalFill className="mr-1 mb-1"/> <b>Portfólio</b>
                                    </a>
                                    <a href="https://www.linkedin.com/in/daniel-formigoni" target="_blank" rel="noreferrer">
                                        <RiLinkedinBoxFill className="mr-1 mb-1"/> <b>LinkedIn</b>
                                    </a>
                                    <a href="https://github.com/dffs-code" target="_blank" rel="noreferrer">
                                        <RiGithubFill className="mr-1 mb-1"/> <b>GitHub</b>
                                    </a>
                                    <a href="https://www.instagram.com/formigoni.ds" target="_blank" rel="noreferrer">
                                        <RiInstagramFill className="mr-1 mb-1"/> <b>Instagram</b>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card lucas card0 mt-5">
                            <div class="border p-3">
                                <h5><b>Lucas Annunziato</b></h5>
                                <p className="mt-5"><b>Desenvolvedor FullStack, com foco em criação de designs amigáveis e dinâmicos.</b></p>
                                <div class="icons">
                                    <a href="https://annunziato.dev" target="_blank" rel="noreferrer">
                                        <RiGlobalFill className="mr-1 mb-1"/> <b>Portfólio</b>
                                    </a>
                                    <a href="https://www.linkedin.com/in/lucasannunziato/" target="_blank" rel="noreferrer">
                                        <RiLinkedinBoxFill className="mr-1 mb-1"/> <b>LinkedIn</b>
                                    </a>
                                    <a href="https://github.com/Luc2000" target="_blank" rel="noreferrer">
                                        <RiGithubFill className="mr-1 mb-1"/> <b>GitHub</b>
                                    </a>
                                    <a href="https://www.instagram.com/l_annunziato/" target="_blank" rel="noreferrer">
                                        <RiInstagramFill className="mr-1 mb-1"/> <b>Instagram</b>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card card0 rafael mt-5">
                            <div class="border p-3">
                                <h5><b>Rafael Simões</b></h5>
                                <p className="mt-5"><b>Desenvolvedor Back-end, especialista em programação baseada em javascript.</b></p>
                                <div class="icons">
                                    <a href="https://annunziato.dev" target="_blank" rel="noreferrer">
                                        <RiGlobalFill className="mr-1 mb-1"/> <b>Portfólio</b>
                                    </a>
                                    <a href="https://www.linkedin.com/in/rafaelscouto/" target="_blank" rel="noreferrer">
                                        <RiLinkedinBoxFill className="mr-1 mb-1"/> <b>LinkedIn</b>
                                    </a>
                                    <a href="https://github.com/rafaelcouto-coder" target="_blank" rel="noreferrer">
                                        <RiGithubFill className="mr-1 mb-1"/> <b>GitHub</b>
                                    </a>
                                    <a href="https://www.instagram.com/rafael.sxx/" target="_blank" rel="noreferrer">
                                        <RiInstagramFill className="mr-1 mb-1"/> <b>Instagram</b>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>            
        </div>
    )
}
