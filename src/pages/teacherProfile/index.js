import React, { useState } from 'react';
import Chat from '../../components/Chat';
import Request from '../../components/Request';
import SubjectRating from '../../components/SubjectRating';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { BsCheckSquareFill, BsClock, BsChevronDown, BsChevronUp } from  "react-icons/bs";
import { Modal } from 'react-bootstrap';
import { GrMultiple } from  "react-icons/gr";
import Tooltip from '@material-ui/core/Tooltip';
import {Select, MenuItem, FormControl} from '@material-ui/core';

import teacherArr from './teacher.json';
import './style.css';
import { useRequest } from '../../hooks/useRequest';

export default function TeacherProfile() {
     const { subjectSetter } = useRequest();

    const [request, setRequest] = useState(false);
    const [more, setMore] = useState(false);
    const [materia_id, setMateria_id] = useState(1);
    // const [agendamento, setAgendamento] = useState('');

    const requestClose = () => setRequest(false);          
    const requestShow = () => setRequest(true);

    function handleRequest() {
        requestShow();
        subjectSetter(1);   //Precisa passar o id quando for puxar do banco
    }

    //Isso vem do banco.
    const teacherAbout = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id nunc sit amet arcu rhoncus efficitur. Donec dignissim augue eget aliquam vehicula. Integer porttitor porta risus vitae volutpat. Donec ex justo, lacinia sit amet massa et, aliquet condimentum felis. Sed interdum metus quis lacus fermentum volutpat. Vestibulum hendrerit neque ac urna vulputate, vel rhoncus quam fringilla. Pellentesque lobortis nisi et velit scelerisque molestie. Aliquam erat volutpat. Donec efficitur, lacus et commodo posuere, est mauris posuere augue, eu vulputate augue justo id lacus. Integer at magna id enim viverra mollis id non justo. Duis est risus, volutpat ac dui eu, sagittis rutrum lacus. Ut facilisis, est quis eleifend tristique, sem orci suscipit ex, id ullamcorper leo purus quis eros. Quisque varius dolor ut blandit vehicula. Aliquam lacinia non sem ut aliquam. Pellentesque nec blandit mi, lobortis ornare sapien. Phasellus maximus lacinia quam, eu fringilla justo. Integer ultricies aliquam enim sit amet molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque id velit id arcu porta lobortis.';
    const teacherLength = teacherAbout.length;
    const aboutPrev = teacherAbout.slice(0,350);
    const aboutMore = teacherAbout.slice(350,teacherLength);

    const materiaChange = (event) => {
        setMateria_id(event.target.value);
    }

    var fullName = teacherArr[0].nome.split(' '),
        firstName = fullName[0];

    return(
        <>
            <Modal show={request} onHide={requestClose} id="modal_form">
                <Request/>
            </Modal>

            <div id="teacher-profile" className="row content body-principal">
                <aside className="col-lg-2 fixed-content">
                    <div className="content-image d-flex justify-content-start">
                        <div style={{backgroundImage: `url(${teacherArr[0].foto})`}}></div>
                    </div>
                    <div className="rating-tag mt-2 d-flex">
                        <Box component="fieldset" mb={3} borderColor="transparent" >
                            <div className="d-flex align-items-center flex-wrap">
                                <div className="mr-2">
                                    <Rating name="rating" value={teacherArr[0].star} readOnly />
                                </div>
                                <span className="total">{teacherArr[0].totalAvaliacoes} Avaliações</span>
                            </div>
                        </Box>
                    </div>
                    <b>{teacherArr[0].estado} - {teacherArr[0].cidade}</b>
                    <ul className="about my-4">
                        {/* CRIAR SISTEMA DE SELO */}

                        {/* <b>Selos do professor</b>
                        <div className="selos-section d-flex justify-content-between mb-3">
                            <Tooltip title="É um dos 100 primeiros professores da plataforma!" placement="bottom-start"><li className="d-flex align-items-center d-flex mt-1"><BsFillStarFill className="mr-1 golden-star" /></li></Tooltip>
                            <Tooltip title="É um dos 100 primeiros professores da plataforma!" placement="bottom-start"><li className="d-flex align-items-center d-flex mt-1"><BsFillStarFill className="mr-1 golden-star" /></li></Tooltip>
                        </div> */}
                        <b>Estatísticas do professor</b>
                        <li className="d-flex align-items-center d-flex  mt-3"><BsCheckSquareFill className="mr-1 iconlist" /> Matéria melhor avaliada: {teacherArr[0].melhorMateria}</li>
                        <li className="d-flex align-items-center mt-3 d-flex"><BsClock className="mr-1 iconlist" /> Tempo médio de resposta: {teacherArr[0].tempoMedio} horas</li>
                        <li className="d-flex align-items-center mt-3 d-flex"><GrMultiple className="mr-1 iconlist" /> Cards de aula disponíveis: {teacherArr[0].materia_tot}</li>
                    </ul>
                    <div className="d-flex justify-content-between materias flex-wrap">
                        <b>Gostou de {firstName}? Veja seus cards disponíveis:</b>
                        {teacherArr[0].materias.map((materia) => {
                            return (
                                <div className="materia-tag mt-3" key={materia}><Tooltip title="Visualizar card e solicitar aula" placement="top-start"><p onClick={handleRequest}>{materia}</p></Tooltip></div>
                            )
                        })}
                    </div>
                </aside>
                <div className="main-content">
                    <div className="col-lg-12">
                        <h3><b>{teacherArr[0].nome}</b></h3>
                        <div className="about-teacher mt-4">
                            <h6>Conheça seu professor:</h6>
                            <div className="pl-4">
                                <p>{aboutPrev}
                                     {more ? aboutMore : '...'}
                                </p>
                                <p onClick={() => {setMore(!more)}} className="more text-center">{more ? 'Ler Menos' : 'Leia mais'} {more ? <BsChevronUp/> : <BsChevronDown/>}</p>
                            </div>
                        </div>
                        <div className="subjects">
                            <h6>Matérias</h6>
                            <span className="about-disable">É professor a 5 anos na plataforma</span>
                            
                            <div className="materia-container my-4 mx-2">
                                {/* 
                                    Matéria id e materia nome
                                    Após selecionar, ele impacta direto no lado direito, que traz um avg de rating e um count de rating NAQUELA MATÉRIA
                                */}
                                <div className="form-materia">
                                    <FormControl className="w-100">  
                                        <Select
                                            id="materia_selector"
                                            value={materia_id}
                                            label="Matéria"
                                            onChange={materiaChange}
                                        >
                                            <MenuItem value={1}>Redação</MenuItem>
                                            <MenuItem value={2}>Gramática</MenuItem>
                                            <MenuItem value={3}>React</MenuItem>
                                            <MenuItem value={4}>Português Enem</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="rating-subject pl-4 align-items-center">
                                    <SubjectRating materia_id={materia_id} />   
                                </div>
                            </div>

                        </div>
                        <div className="calendar mt-3">
                            <h6>Agenda Semanal de {materia_id} id da materia</h6>
                            {/* <Calendar setAgendamento={setAgendamento} materia_id={materia_id} teacher_id={1} /> */}
                        </div>
                    </div>
                </div>
                <div className="fixed-content chat">
                    <Chat />
                </div>
            </div>
        </>
    );
}


