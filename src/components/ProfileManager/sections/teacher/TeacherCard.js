import { useState, useEffect } from 'react';
import { Button, TextField } from "@material-ui/core";
import { toast } from 'react-toastify';

import { useAuth } from '../../../../hooks/useAuth';
import api from '../../../../services/api';
import groupFlag from '../../../../img/groupFlag.svg';

import { Autocomplete } from '@material-ui/lab';
import ReactInputMask from 'react-input-mask';
import { isMobile } from 'react-device-detect';



export default function TeacherCard() {
    const { userId, teacher } = useAuth();
    const [subject, setSubject] = useState('');
    const [price, setPrice] = useState(0);
    const [cardId, setCardId] = useState(undefined);
    const [subjectId, setSubjectId] = useState();
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState([]);
   
    var auxOptions = [];


    useEffect(() => {
          api.get(`card/teacher/${teacher[0].id}`).then((res) => {
              if(res.data[0]){
                  setSubject(res?.data[0].subject_name);
                  setPrice(res?.data[0].price);
                  setDescription(res?.data[0].about);
                  setCardId(res?.data[0].id);
                  api.get(`subjectByName/${res?.data[0].subject_name}`).then((res) => {
                    setSubjectId(res.data.id);
                  });
              }
          });

          api.get(`subjects/all`).then((res)=> {
            res.data.map((subject) => {
              auxOptions.push(subject.name);
            });
          });
          setOptions(auxOptions); 	
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            about: description,
            price,
            modality: "EAD",
            subject_id: subjectId
        }

        if(payload.about && payload.price && payload.subject_id){
            api.put(`card/${cardId}`, payload)
                .then(res => {
                    toast.success('Card modificado com sucesso');
                }).catch(error => {
                    switch (error.response.status) {
                        case 400:
                          toast.error('Erro ao encontrar o Card');
                            break;
                        default:
                          toast.error('Erro ao alterar o card, tente novamente mais tarde.');
                          break;
                      }
                });
        }else{
            toast.warn("Favor preencher todos os campos");
        }
    }

    return(
        <>
            <h2>Editar Card</h2>
            <div className="card" id="edit-profile">
                <form className="d-flex justify-content-center w-100 flex-wrap pb-4" onSubmit={handleSubmit}>
                    <div className={isMobile ? "align-items-center justify-content-between w-100 d-flex flex-wrap p-4" : "align-items-center justify-content-between w-100 d-flex flex-wrap p-5" }>
                        <div className={isMobile ? "editable-content-left w-100" : "editable-content-left w-50"}>
                            <h5>Matéria:</h5>
                            <Autocomplete
                                noOptionsText={
                                    <>
                                      Ops... Não encontrou sua matéria ? 😬<br /><br />
                                      Envie-nos um e-mail: study.ensiname@gmail.com 
                                    </>
                                  }
                                value={subject}
                                onChange={(event, newSubject) => {
                                    
                                    setSubject(newSubject);
                                    api.get(`subjectByName/${newSubject}`).
                                    then((res) => {
                                        setSubjectId(res.data.id);
                                    });
                                }}
                                fullWidth
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                            <h5 className="mt-5">Preço por hora:</h5>
                            <ReactInputMask
                                mask="999"
                                disabled={false}
                                maskChar=""
                                value={price}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                }}
                            >
                                {() => (
                                    <TextField
                                    className="text-center"
                                    placeholder="Preço"
                                    name="price"
                                    type="text"
                                    />
                                )}
                            </ReactInputMask>

                            <h5 className="mt-5">Descrição:</h5>
                            <TextField
                                className="w-100"
                                placeholder="Escreva um pequeno texto da forma que achar melhor (150 caracteres max)"
                                name="description"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                multiline
                            />
                        </div>
                        <div id="tips_teacherCard" className="editable-content-right d-flex justify-content-center align-items-center" >
                            <div className="d-block w-100">
                                <img src={groupFlag} alt="Logo da comunidade" />  
                                <p className="text-center"><b>Caso precise de ajuda:</b></p>  
                                <ul>
                                    <li>Descreva de forma objetiva a aula e o que pode ensinar ao aluno.</li>
                                    <li className="mt-2">Analise o card de concorrentes e veja o que podes fazer tornar-se único!</li>
                                </ul>
                            </div>   
                        </div>
                    </div>
                    <Button
                        className="btn-register-secondary mt-2"
                        variant="contained"
                        type="submit"
                    >
                        Alterar Card
                    </Button>
                </form>
            </div>
        </>
    )
}