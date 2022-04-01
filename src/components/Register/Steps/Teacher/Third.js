import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import InputMask from "react-input-mask";
import { toast } from 'react-toastify';

import api from "../../../../services/api";
import { useRegister } from "../../../../hooks/useRegister";
import { useAuth } from "../../../../hooks/useAuth";
import Card from "../../../Card";

export default function TeacherThird() {
  const { userType } = useRegister();
  const { userId } = useAuth();

  const [name, setName] = useState("Seu nome");
  const fullName = name.split(' '),
  firstName = fullName[0];
  const [city, setCity] = useState("Cidade");
  const [avg, setAvg] = useState(0);
  const [avatar, setAvatar] = useState('');
  const [teacherId, setTeacherId] = React.useState(0);
  const [subjectId, setSubjectId] = React.useState(0);
  const [subject, setSubject] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [options, setOptions] = React.useState([]);

  var auxOptions = [];
	
  useEffect(() => {
		api.get(`users/${userId}/profile`).then((res) => {
      setTeacherId(res.data.teacher[0].id);
			setName(res.data.name);
			setCity(res.data.city);
			setAvg(res.data.avg);
			setAvatar(res.data.avatar);
    });

    api.get(`subjects/all`).then((res)=> {
      res.data.map((subject) => {
        auxOptions.push(subject.name);
      });
    });
    setOptions(auxOptions);
  }, []);

  useEffect(() => {
   api.get(`subjectByName/${subject}`).
    then((res) => {
      setSubjectId(res.data.id);
    });
  }, [subject])

	
  function submitCard(ev) {
		ev.preventDefault();
    
    if( subject && price && description){
      if(description.length >= 150){
        toast.error("A descrição deve conter menos de 150 caracteres");
        return;
      }

      const payload = {
        teacher_id: teacherId,
        subject_id: subjectId,
        about: description,
        price: price,
        modality: 'EAD',
        status: true
      }

      api.post('card', payload)
        .then(res => {
          toast.success(`Card cadastrado com sucesso, boa sorte ${firstName}`);
          setTimeout(() => {
            window.location.assign('/requests');
          }, 1000);
        }).catch((error) =>{
          toast.error("Erro ao cadastrar o card, tente novamente mais tarde");
        });
    }else{
      toast.warn("Preencha todos os dados antes de concluir");
    }
  }

	const newTeacher = {
		id: userId,
    teacher_avatar:avatar,
		teacher_city: city,
		teacher_name: name,
		avg_stars: avg,
		about: description,
		price: price,
		subject_name: subject
	}

  return (
    <>
      <div id="new_card">
        <div className="d-flex justify-content-around mobileWrap">
          <div className="card-teacher">
            <h2 className="text-center">Crie seu card</h2>
            <form className="main-form px-3" onSubmit={submitCard}>
              <div>
                <Autocomplete
                  noOptionsText={
                    <>
                      Ops... Não encontrou sua matéria ? 😬<br /><br />
                      Envie-nos um e-mail: study.ensiname@gmail.com 
                    </>
                  }
                  value={subject}
                  onChange={(event, newSubject) => {
                    if(newSubject){
                      setSubject(newSubject);
                    }
                  }}
                  fullWidth
                  options={options}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Escolha a matéria" />
                  )}
                />
              </div>

              <div
                className="my-3 d-flex justify-content-between align-items-center"
                id="price_hour"
              >
                <p>R$</p>
                <InputMask
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
                      className="px-3"
                      placeholder="Preço por hora"
                      name="price"
                      type="text"
                    />
                  )}
                </InputMask>
                <p>/h</p>
              </div>
              <div className="mb-3">
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
              <Button
                className={ userType ? "btn-register" : "btn-register-secondary"}
                variant="contained"
                fullWidth
                type="submit"
              >
                Criar meu primeiro card!
              </Button>
            </form>
          </div>
          <div className="card-preview">
            <h2 className="text-center mb-3">Como será exibido:</h2>
            <Card key={newTeacher.id} teacher={newTeacher} exibition={true} />
          </div>
        </div>
      </div>
    </>
  );
}
