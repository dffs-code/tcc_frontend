import React, { useState, useEffect, forwardRef  } from 'react';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';

import DatePicker, { registerLocale } from  "react-datepicker";
import { addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { useRequest } from '../../hooks/useRequest';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

import './style.css';
import "react-datepicker/dist/react-datepicker.css";

export function Request (props) {
  const { teacher, cardId } = useRequest();
  const { userId, isTeacher } = useAuth();
  
  const [ studentId, setStudentId ] = useState(0);
  const [about, setAbout] = React.useState("");

  registerLocale('pt', pt);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <button className="btn-register w-50" onClick={onClick} ref={ref} type="button" >
      {
        value
          ? value
          : 'Escolha uma data'
      }
    </button>
  ));

    useEffect(() => {
        api.get(`/users/${userId}/profile`)
            .then(res => {
                setStudentId(res.data?.student[0]?.id);
            }).catch(error => {
                console.log('Erro fatal: '+error);
            });
    }, [userId]);

    // console.log('isTeacher: '+isTeacher);
    // console.log('Card id: '+cardId);
    // console.log('Student id: '+studentId);
    // console.log('About: '+about);
    // console.log('Date: '+new Date());

    const formSubmit = (event) => {
        event.preventDefault();
        if(isTeacher){
            toast.error('Professores não podem solicitar por aula, favor criar conta aluno');
            return;
        }

        if(!startDate){
          toast.warn('Selecione uma data para prosseguir');
          return;
        }

        if((new Date(startDate) - new Date()) < 0 ){
          toast('⌛ Solicitação de voltar no tempo recusada');
          return;
        }

        const payload = {
            student_id: studentId,
            card_id: cardId,
            startDateTime: startDate,
            endDateTime: endDate,
            message: about,
            reply: "",
            status: 0
        }
        
       api.post('/requests', payload)
        .then(res => {
            toast.success('Solicitação enviada com sucesso!');
            props.autoClose();
        }).catch(error => {
            toast.error('Erro ao enviar o card, tente novamente mais tarde');
        })
    }

    return (
      <div
        className="schedule-container d-flex flex-column mx-5"
        id="send_request"
      >
        <h2 className="text-center mt-4">
          <b>Agende uma aula com {teacher}!</b>
        </h2>
        <div id="send_request">
          <form onSubmit={formSubmit} className="w-100 mt-4">
            <p>
              <b>
                Diga para {teacher.split(" ")[0]} qual a melhor forma de te ajudar!
              </b>
            </p>
            <textarea
                id="about"
                name="about"
                rows="5"
                cols="100"
                placeholder="Oi, tudo bem? Tenho dificuldades em..."
                className="p-2 w-100"
                value={about}
                onChange={(event) => {
                    setAbout(event.target.value);
                }}
            />

            <p className="mt-3">Sugira uma data de aula para {teacher.split(" ")[0]}</p>
            <div className="d-block">
              <DatePicker 
                className="position-fixed"
                selected={startDate} 
                onChange={(date) => (
                    setStartDate(date),
                    setEndDate(addHours(date, 1))
                  )
                }
                locale="pt"
                showTimeSelect
                customInput={<ButtonInput />}
                timeFormat="p"
                timeIntervals={60}
                dateFormat="dd/MM/y h:mm aa"
              />
              <p className="notification"><span>*Isso não significa que a já aula esteja marcada para esta data, o professor lhe retornará com a resposta.</span></p>
            </div>
            

            <Button className="submit-request py-1 px-5 mt-5" type="submit">
              Enviar solicitação
            </Button>
          </form>
        </div>
      </div>
    );
    
}

export default Request;

