import React, { useState, useLayoutEffect  } from 'react';

import Radio from '@material-ui/core/Radio';
import { Link } from 'react-router-dom';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { FaTimes, FaCheck, FaClock, FaStar } from 'react-icons/fa';
import groupFlag from '../../img/groupFlag.svg';
import { isMobile } from 'react-device-detect';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import './style.css';

import api from '../../services/api'
import RatingComponent from '../../components/RatingComponent';
import { Rating, Skeleton } from '@material-ui/lab';

export default function StudentRequests() {
  const { student } = useAuth();
  const [requests, setRequests] = useState(); 
  const [status, setStatus] = useState("todos");
  const dataOpt = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  const [thereIsRequests, setThereIsRequests] = useState(undefined);
  const [ratingModal, setRatingModal] = useState(false);
  const [requestChoosed, setRequestChoosed] = useState(undefined);

  const ratingClose = () => setRatingModal(false);          
  const ratingShow = () => setRatingModal(true);

  const statusChange = (event) => {
      setStatus(event.target.value);

      if(event.target.value !== "todos"){
        api.get(`/requests/student/${student[0].id}/all?status=${event.target.value}`).then((response) => {
          setRequests(response.data);
        })
      }else{
        api.get(`/requests/student/${student[0].id}/all`).then((response) => {
          setRequests(response.data);
        })
    }
  };

  useLayoutEffect (() => {
    if(student.length){
      api.get(`/requests/student/${student[0].id}/all`).then((response) => {
        setRequests(response.data);
        if(response.data.length){
          setThereIsRequests(true);
        }else{
          setThereIsRequests(false);
        }
      })
    }
  }, [student])

    return(
      <>
        <Modal show={ratingModal} onHide={ratingClose} id="modal_form">
            <RatingComponent autoClose={ratingClose} request={requestChoosed} statusChange={statusChange} />  
        </Modal>

        <section id="students_requests" className="row content body-principal">
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
                          {requests.length ?
                            requests.map((item) => {
                            const endTime = new Date(item.endDateTime);
                            const startTime = new Date(item.startDateTime);
                            const createdAt = new Date(item.createdAt);

                            return (
                              <div className='d-flex flex-wrap align-items-center w-100 position-relative my-5' key={item.id} id="card_requested" data-layout={item.status}>
                                {item.status === 3 
                                    ?
                                      (item.ratings.length !== 0
                                      ? 
                                          <div id="rate_card" className="position-absolute">
                                            <div className="d-flex justify-content-right flex-wrap">
                                              <Rating name="rating_setted" className="rating-values w-100" value={item.ratings[0].stars} disabled />
                                            </div>
                                          </div>
                                      :
                                          <div id="rate_card" className="position-absolute" 
                                              onClick={() => {
                                                setRequestChoosed(item);
                                                ratingShow();
                                              }}>
                                              <div className="d-flex justify-content-center flex-wrap">
                                                <FaStar className="w-100 mb-1 star-svg"/>
                                                {isMobile ? 'Avalie' : 'Clique para avaliar'}
                                              </div>
                                            </div>
                                      )
                                    :
                                      <div id="reject_card" className="position-absolute">
                                        <div className="reject">
                                          <FaTimes />
                                        </div>
                                      </div>
                                }
                                <div id="pending_card" className="position-absolute">
                                  <div className="pending">
                                    <FaClock />
                                  </div>
                                </div>

                                <div className="header-request d-flex align-items-center w-100">
                                  { item.card.teacher.user.avatar
                                      ?   
                                          <div className="content-image d-flex justify-content-start"> 
                                              <div style={{backgroundImage: `url(${item.card.teacher.user.avatar})`}} />
                                          </div>
                                      : 
                                          <div className="d-flex justify-content-start align-items-center" id="google_alike">
                                              <div className="d-flex justify-content-center align-items-center">{(item.card.teacher.user.name.charAt(0)).toUpperCase()}</div>
                                          </div>
                                  }
                                  <div className="student_info d-block ml-3">
                                    <p><b>{item.card.teacher.user.name}</b></p>
                                    <p>{new Intl.DateTimeFormat('pt-BR', dataOpt).format(createdAt)}</p>
                                  </div>
                                </div>
                                <div className="w-100 body_solicitation">
                                  <h5 className="text-left mt-3 mb-4"><b>Sua solicitação:</b></h5>
                                  <div className="body-request">
                                    <div className="request-data">
                                      <p><b>Data solicitada</b><br />{new Intl.DateTimeFormat('pt-BR', dataOpt).format(startTime)} até {new Intl.DateTimeFormat('pt-BR', dataOpt).format(endTime)}</p>
                                      <p><b>Matéria solicitada</b><br />{item.card.subject.name}</p>
                                      <p><b>Mensagem</b><br />{item.message}</p>
                                    </div>
                                    {item.reply ? <p><b>Resposta do professor</b><br />{item.reply}</p> : ''}
                                  </div>
                                </div>

                                <div id="accept_card" className="position-absolute" >
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
                <h3 className="mt-2 mb-5 text-center w-100"><b>Suas solicitações</b></h3> 
                <div className="d-flex justify-content-center align-items-center flex-wrap w-100" id="motivational">
                  <img src={groupFlag} alt="Carinha triste"/>  
                  <div className="text-content w-100">
                    <h5 className="text-center mt-3 mx-3"><b>Nenhuma solicitação encontrada por aqui 🏜️<br/> Mude isso agora mesmo, existem diversos professores esperando por você, busque o aprendizado e será recompensado!</b></h5>
                    <div className=" animate__animated animate__fadeInDown animate__delay-1s">
                      <Link to="/explorar">
                        <button className="button-tips student-button animate__animated animate__tada animate__delay-3s">Aprender agora mesmo 🚀</button>
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
                        <div className="pending">
                          <FaClock />
                        </div>
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
                    <div className='d-flex flex-wrap align-items-center w-100 position-relative my-5' id="card_requested" data-layout="0">
                      <div id="pending_card" className="position-absolute">
                        <div className="pending">
                          <FaClock />
                        </div>
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
                    <div className='d-flex flex-wrap align-items-center w-100 position-relative my-5' id="card_requested" data-layout="0">
                      <div id="pending_card" className="position-absolute">
                        <div className="pending">
                          <FaClock />
                        </div>
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