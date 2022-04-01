import React, { useState, useLayoutEffect  } from 'react';

import Radio from '@material-ui/core/Radio';
import {Button} from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api'
import './style.css';
import { toast } from 'react-toastify';
import SadFace from '../../img/sad_face.png';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Skeleton } from '@material-ui/lab';

export default function Requests(props) {
  const { isTeacher, teacher } = useAuth();
  const [requests, setRequests] = useState(0); 
  const [request, setRequest] = useState([]); 
  const [thereIsRequests, setThereIsRequests] = useState(undefined); 
  const [status, setStatus] = useState("todos");
  const [teacherMessage, setTeacherMessage] = useState('');
  const [answer, setAnswer] = useState(0);
  const dataOpt = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  const [showModal, setShowModal] = useState(false);

  const answerClose = () => setShowModal(false);          
  const answerShow = () => setShowModal(true);

  const statusChange = (event) => {
      setStatus(event.target.value);
      if(event.target.value !== "todos"){

        api.get(`/requests/teacher/${teacher[0].id}/all?status=${event.target.value}`).then((response) => {
          setRequests(response.data);
        })
      }else{
        api.get(`/requests/teacher/${teacher[0].id}/all`).then((response) => {
          setRequests(response.data);
        })
      }
  };
  
  function answerRequest(){
    const payload = {
      startDateTime: request.startDateTime,
      endDateTime:request.endDateTime,
      message:request.message,

      reply:teacherMessage,
      status:answer
    }

    if(!payload.reply){
      toast.warn('Forneça uma resposta para seu aluno.');
      return;
    }

    api.put(`/requests/${request.id}`, payload)
      .then(res => {
        if(payload.status === 1){
          toast.success('Solicitação aceita com sucesso!');
        }else if(payload.status === 2){
          toast.success('Solicitação recusada com sucesso.');
        }
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
        
      }).catch(error => {
        toast.error('Erro interno, por favor atualize a página');
      });
  }

  function handleRequest(action, request){
    setAnswer(action);
    setRequest(request);

    answerShow();
  }

  useLayoutEffect (() => {
    if(teacher[0]?.id){
      if(isTeacher){
        api.get(`/requests/teacher/${teacher[0].id}/all`).then((response) => {
          setRequests(response.data);
          if(response.data.length){
            setThereIsRequests(true);
          }else{
            setThereIsRequests(false);
          }
        })
      }
    }
  }, [teacher])
    return(
      <>
        <Modal show={showModal} onHide={answerClose} id="modal_form">
          <div className="content">
            {(answer===1) 
              ?
                <>
                  <h5 className="primary-color text-center mt-2 mb-4"><b>A solicitação de aula será <u>ACEITA</u></b></h5>
                  <p>Deixe uma mensagem para seu aluno informando mais detalhes de como será feita a aula!</p>
                  <p className="notification"><span>*Uma boa dica é falar como será feito o pagamento e por onde terão a aula.</span></p>
                  <textarea
                      id="reply"
                      name="reply"
                      rows="5"
                      cols="100"
                      placeholder="Olá, contate-me por whatsapp para..."
                      className="p-2 w-100"
                      value={teacherMessage}
                      onChange={(event) => {
                          setTeacherMessage(event.target.value);
                      }}
                  />
                  <div className="d-flex justify-content-center">
                    <Button
                      className={isMobile ? 'py-2 accepted mt-4 w-100' : 'py-2 accepted mt-4 w-50'}
                      variant="contained"
                      onClick={answerRequest}
                    >
                      Aceitar solicitação <FaCheck className="ml-3" />
                    </Button>
                  </div>
                </>
              :
              <>
                <h5 className="secondary-color text-center mt-2 mb-4"><b>A solicitação de aula será <u>RECUSADA</u></b></h5>
                <p>Deixe uma mensagem para seu aluno informando o motivo da recusa</p>
                <p className="notification"><span className="rejeitar">*Caso seja por conta da data pedida, tente buscar uma solução e peça a seu aluno para reabir a solicitação.</span></p>
                <textarea
                    id="reply"
                    name="reply"
                    rows="5"
                    cols="100"
                    placeholder="Olá, infelizmente nesta data não posso..."
                    className="p-2 w-100"
                    value={teacherMessage}
                    onChange={(event) => {
                        setTeacherMessage(event.target.value);
                    }}
                />
                <div className="d-flex justify-content-center">
                  <Button
                    className={isMobile ? 'py-2 rejected mt-4 w-100' : 'py-2 rejected mt-4 w-50'}
                    variant="contained"
                    onClick={answerRequest}
                  >
                    Recusar solicitação <FaTimes className="ml-3" />
                  </Button>
                </div>
              </>
            }
          </div>
        </Modal>

        <section id="teachers_requests" className="row content body-principal">
          {thereIsRequests !== undefined
            ?
              thereIsRequests 
              ?
                <>
                  <aside className={isMobile ? 'col-12 text-center' : 'col-lg-2 fixed-content'}>
                    <div className="filters">
                      <h3>Filtre por</h3>
                      <div className={isMobile ? 'd-flex justify-content-center ' : 'd-block order'}>
                          <FormControl component="fieldset" className="pl-2">
                              <RadioGroup aria-label="status" name="status" value={status} onChange={statusChange} row className="d-block text-left">
                                  <FormControlLabel value="todos" control={<Radio />} label="Todos" labelPlacement={isMobile ? 'bottom' : 'end'} className={!isMobile ? 'w-100' : ''}/>
                                  <FormControlLabel value="0" control={<Radio />} label="Pendentes" labelPlacement={isMobile ? 'bottom' : 'end'} className={!isMobile ? 'w-100' : ''} />
                                  <FormControlLabel value="1" control={<Radio />} label="Aceitas" labelPlacement={isMobile ? 'bottom' : 'end'} className={!isMobile ? 'w-100' : ''}/>
                                  <FormControlLabel value="2" control={<Radio />} label="Rejeitadas" labelPlacement={isMobile ? 'bottom' : 'end'} className={!isMobile ? 'w-100' : ''}/>
                              </RadioGroup>
                          </FormControl>
                      </div>
                    </div>
                  </aside>
                  <div className={isMobile ? 'content mt-5' : 'main-content'}>
                    <div className="col-lg-12">
                      <h3 className={isMobile ? 'text-center' : ''}><b>Solicitações recebidas</b></h3>
                        {requests.length ?
                          requests.map((item) => {
                            const endTime = new Date(item.endDateTime);
                            const startTime = new Date(item.startDateTime);
                            const createdAt = new Date(item.createdAt);
                            return (
                              <div className='d-flex flex-wrap align-items-center w-100 position-relative my-5' key={item.id} id="card_requested" data-layout={item.status}>
                                <div id="reject_card" className="position-absolute" onClick={() => (!item.status ? handleRequest(2, item) : '')}>
                                  <div className="reject">
                                    <FaTimes />
                                  </div>
                                </div>

                                <div className="header-request d-flex align-items-center w-100">
                                  { item.student.user.avatar
                                      ?   
                                          <div className="content-image d-flex justify-content-start"> 
                                              <div style={{backgroundImage: `url(${item.student.user.avatar})`}} />
                                          </div>
                                      : 
                                          <div className="d-flex justify-content-start align-items-center" id="google_alike">
                                              <div className="d-flex justify-content-center align-items-center">{(item.student.user.name.charAt(0)).toUpperCase()}</div>
                                          </div>
                                  }
                                  <div className="student_info d-block ml-3">
                                    <p><b>{item.student.user.name}</b></p>
                                    <p>{new Intl.DateTimeFormat('pt-BR', dataOpt).format(createdAt)}</p>
                                  </div>
                                </div>
                                <div className="w-100">
                                  <h5 className="text-left mt-3 mb-4"><b>Solitação do aluno:</b></h5>
                                  <div className="body-request">
                                    <p><b>Data solicitada</b><br />{new Intl.DateTimeFormat('pt-BR', dataOpt).format(startTime)} até {new Intl.DateTimeFormat('pt-BR', dataOpt).format(endTime)}</p>
                                    <p><b>Matéria solicitada</b><br />{item.card.subject.name}</p>
                                    <p><b>Mensagem</b><br />{item.message}</p>
                                  </div>
                                </div>

                                <div id="accept_card" className="position-absolute" onClick={() => (!item.status ? handleRequest(1, item) : '')}>
                                  <div className="accept">
                                    <FaCheck />
                                  </div>                        
                                </div>                        
                              </div>
                            )
                          })
                          :
                          <>                        
                            <h3 className="mt-5">Nenhuma solicitação encontrada utilizando este filtro</h3>
                          </>
                        }

                    </div>
                  </div>
                </>
              : 
                <>
                  
                    <h3 className="mt-2 mb-5 text-center w-100"><b>Solicitações recebidas</b></h3> 
                    <div className="d-flex justify-content-center align-items-center flex-wrap w-100" id="motivational">
                      <img src={SadFace} alt="Carinha triste, não desanime!!"/>        
                      <div className="text-content w-100">
                        <h5 className="text-center mt-3"><b>Poxa, não encontramos nenhuma solicitação, mas não desanime!<br /> Veja dicas na nossa seção ajuda, estude seus concorrentes, o esforço será recompensado!!!</b></h5>
                        <div className=" animate__animated animate__fadeInDown animate__delay-1s">
                          <Link to="/ajuda">
                            <button className="button-tips animate__animated animate__tada animate__delay-3s">Ver dicas 🚀</button>
                          </Link>
                        </div>
                      </div>                 
                    </div>
                </>
            :
              <>
                <aside className={isMobile ? 'col-12 text-center' : 'col-lg-2 fixed-content'}>
                  <div className="filters">
                    <h3>Filtre por</h3>
                    <div className={isMobile ? 'd-flex justify-content-center ' : 'd-block order'}>
                        <FormControl component="fieldset" className="pl-2">
                            <RadioGroup aria-label="status" name="status" value={status} onChange={statusChange} row className="d-block text-left">
                                <FormControlLabel className="w-100" value="todos" control={<Radio />} label="Todos" labelPlacement={isMobile ? 'bottom' : 'end'} />
                                <FormControlLabel className="w-100" value="0" control={<Radio />} label="Pendentes" labelPlacement={isMobile ? 'bottom' : 'end'} />
                                <FormControlLabel className="w-100" value="1" control={<Radio />} label="Aceitas" labelPlacement={isMobile ? 'bottom' : 'end'}/>
                                <FormControlLabel className="w-100" value="2" control={<Radio />} label="Rejeitadas" labelPlacement={isMobile ? 'bottom' : 'end'}/>
                                <FormControlLabel className="w-100" value="3" control={<Radio />} label="Finalizadas" labelPlacement={isMobile ? 'bottom' : 'end'}/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                  </div>
                </aside>
                <div className={isMobile ? 'content mt-5' : 'main-content'}>
                  <div className="col-lg-12">
                    <h3 className={isMobile ? 'text-center' : ''}><b>Suas solicitações</b></h3>
                    <div className='d-flex flex-wrap align-items-center w-100 position-relative my-5' id="card_requested" data-layout="0">
                      <div id="pending_card" className="position-absolute">
                        
                      </div>

                      <div className="header-request d-flex align-items-center w-100">
                        <div className="content-image d-flex justify-content-start"> 
                          <Skeleton
                            animation="wave"
                            variant="circle"
                            width={90}
                            height={90}
                            className="mt-4 mb-3 "
                          />
                        </div>
                            
                        <div className="student_info d-block ml-3">
                          <Skeleton
                            animation="wave"
                            variant="rect"
                            width={110}
                            height={15}
                            className="mb-4 "
                          />
                          <Skeleton
                            animation="wave"
                            variant="rect"
                            width={120}
                            height={10}
                            className="mb-3 "
                          />
                        </div>
                      </div>
                      <div className="w-100 body_solicitation">
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          width={90}
                          height={20}
                          className="text-left mb-4"
                        />
                        <div className="body-request">
                          <div className="request-data">
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={100}
                              height={10}
                              className="text-left mb-2"
                            />
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={170}
                              height={10}
                              className="text-left mb-4"
                            />
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={160}
                              height={10}
                              className="text-left mb-2"
                            />
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={800}
                              height={70}
                              className="text-left mb-2"
                            />
                          </div>
                        </div>
                      </div>                 
                    </div>
                  </div>
                </div>
              </>
          }
        </section>
      </>
    )

  
}