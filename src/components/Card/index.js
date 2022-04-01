import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {Button} from "@material-ui/core";
import { Modal } from 'react-bootstrap';
import Request from '../../components/Request';
import { useRequest } from '../../hooks/useRequest';
import './style.css';

export default function Card(props) {
    let {
        id,
        teacher_avatar,
        teacher_name,
        avg_stars,
        about,
        price,
        subject_name
    } = props.teacher;
    let isExibition = props.exibition;

    const { cardSetter, teacherSetter } = useRequest();
    const [request, setRequest] = useState(false);

    const requestClose = () => setRequest(false);          
    const requestShow = () => setRequest(true);

    function handleRequest() {
        cardSetter(id);
        teacherSetter(teacher_name);

        requestShow();
    }

    return(
        <>
            <Modal show={request} onHide={requestClose} id="modal_form">
                <Request autoClose={requestClose}/>
            </Modal>
            <div id="card_teacher" className="card-teacher p-3" data-id={id}>
                <div className="header-card d-flex justify-content-between align-items-center">
                    <div className="card_price justify-content-left w-25">
                        <div className="text-left">
                            <div className="price_content">
                                R$ {price}
                            </div>
                        </div>
                    </div>
                    <div className="subject_title">
                        <h4 className="text-center"><b>{subject_name}</b></h4>
                    </div>
                    <div className="card_rating justify-content-right w-25">
                        <div className="text-right">
                            {
                                avg_stars
                                ?
                                    <div className={`d-flex align-items-center justify-content-end text-left ${avg_stars === '5.0000' ? "golden" : ""}`}>
                                        <AiFillStar className="mr-1"/> <b>{avg_stars.slice(0,3)}</b>
                                    </div>
                                :
                                    <b>Novo!</b>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="body-card mt-2 d-flex justify-content-center flex-wrap">
                    { teacher_avatar 
                        ?   
                            <div className="content-image d-flex justify-content-center w-100"> 
                                <div style={{backgroundImage: `url(${teacher_avatar})`}} />
                            </div>
                        : 
                            <div className="d-flex justify-content-center align-items-center w-100" id="google_alike">
                                <div className="d-flex justify-content-center align-items-center">{ teacher_name ? (teacher_name.charAt(0)).toUpperCase() : ''}</div>
                            </div>
                    }
                    <h4 className="mt-3 w-100 text-center">{teacher_name}</h4>
                    <p className="mt-2">{about}</p>
                    { !isExibition ? 
                        <Button
                            className="btn-professor py-2"
                            variant="contained"
                            onClick={handleRequest}
                        >
                            Solicitar Aula
                        </Button>
                    :
                        <Button
                                className="btn-professor py-2"
                                variant="contained"
                                disabled={true}
                            >
                                Solicitar Aula
                        </Button>
                    }
                </div>
            </div>
        </>
    )
    
}

