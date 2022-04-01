import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import Card from '../../components/Card'
import api from '../../services/api'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button, TextField} from "@material-ui/core";
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import SadFace from '../../img/sad_face.png';


import './style.css';
import { Autocomplete } from '@material-ui/lab';
import LoadingCard from '../../components/LoadingCard';
function ValueLabelComponent(props) {
    const { children, open, value } = props;
    
    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}
ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Explorar() {
    const [filter, setFilter] = useState("price");
    const [price, setPrice] = useState(130);
    const [filteredSubject, setFilteredSubject] = useState("");
    const [options, setOptions] = React.useState([]);

    const [cards, setCards] = useState(undefined);
    const [subjectId, setSubjectId] = useState();
    const [subjects, setSubjects] = useState([]);
    
    const search = useLocation().search;
    const categoryId = new URLSearchParams(search).get('categoryId');
    const subject = new URLSearchParams(search).get('subject');
    var auxOptions = [];

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const priceChange = (event, newValue) => {
        setPrice(newValue);
    };
    
    const handleSubmit = (event) => {
        var url = `card/all/filter?${price?"price="+price:''}${subjectId?"&subject="+subjectId:''}${filter?"&orderBy="+filter:''}`

        api.get(url).then((response) => { 
            setCards(response.data);
        })
    }

    useEffect(() => {
        async function getData(){
            if (categoryId) {
                await api.get(`/card/category/${categoryId}`).then((response) => {
                    setCards(response.data);
                })
                await api.get(`/subjectsByCategory/${categoryId}`).then((response) => {
                    setSubjects(response.data);
                })
            } else {
                if (subject) {
                    await api.get(`/card/subject/${subject}`).then((response) => {
                        setCards(response.data);
                    })
                    await api.get(`/subjectsByCategory/${categoryId}`).then((response) => {
                        setSubjects(response.data);
                    })
                } else{

                    await api.get('/card/fullCards').then((response) => {
                        setCards(response.data);
                    })
                    await api.get('/subjects/all').then((response) => {
                        setSubjects(response.data);
                        response.data.map((subject) => {
                            auxOptions.push(subject.name);
                        });
                    });
                    setOptions(auxOptions);
                }
            }
        }
        getData();
    }, [categoryId]);

    
    return (
      <>
        <section
          className="body-principal d-flex flex-wrap justify-content-between row content"
          id="search_cards"
        >
          <div className="col-lg-2 filtros_geral ">
            <div className="d-flex justify-content-center text-center">
              <h2>Encontre o professor perfeito para você</h2>
            </div>
            <div className="cards-filters position-relative my-4">
              <div className="d-block order mt-4">
                <p className="mobile-none">
                  <b>O que você quer aprender?</b>
                </p>
                <h2 className="text-center desktop-none">
                  <b>Encontre o professor ideal para você</b>
                </h2>
                <FormControl className="materia-select w-100">
                  <Autocomplete
                    noOptionsText={
                      "Poxa 😢 não encontramos nada, convide professores de outras plataformas para virem para cá lecionar esta matéria!"
                    }
                    value={filteredSubject}
                    onChange={(event, newSubject) => {
                      if (newSubject) {
                        setFilteredSubject(newSubject);
                        api.get(`subjectByName/${newSubject.trim()}`).then((res) => {
                          setSubjectId(res.data.id);
                        });
                      }
                    }}
                    fullWidth
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Escolha a matéria" />
                    )}
                  />
                </FormControl>
              </div>
              <div className="d-block order mt-4">
                <p className="text-center">
                  <b>Ordenar por</b>
                </p>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="order_by"
                    name="order_by"
                    value={filter}
                    onChange={handleChange}
                    row
                    className="d-flex flex-nowrap text-center"
                  >
                    <FormControlLabel
                      value="price"
                      control={<Radio />}
                      label="Menor Preço"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="avg_stars"
                      control={<Radio />}
                      label="Melhor Avaliação"
                      labelPlacement="bottom"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {/* <div className="d-block mt-4">
                        <p className="text-center"><b>Disponibilidade</b></p>
                            <div className="d-flex justify-content-between flex-wrap">
                                <TextField
                                    id="initial_hour"
                                    className="filtro_hora"
                                    label="Inicial"
                                    type="time"
                                    defaultValue="20:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                                <TextField
                                    id="final_hour"
                                    label="Final"
                                    type="time"
                                    className="filtro_hora"
                                    defaultValue="21:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </div>
                    </div> */}
              <div className="d-block  mt-4">
                <p className="text-center">
                  <b>Preço máximo</b>
                </p>
                <Slider
                  id="max_price"
                  ValueLabelComponent={ValueLabelComponent}
                  aria-label="max-price"
                  defaultValue={130}
                  max={200}
                  onChange={priceChange}
                />

                <span className="tip">
                  {price ? `Menos de R$ ` + price + `/h` : ``}
                </span>
              </div>
              <Button
                onClick={handleSubmit}
                className="btn-register btn-filter py-2 w-100 mt-3 mb-5"
              >
                Filtrar
              </Button>
            </div>
          </div>

          <div id="cards" className="col-lg-10 ">
            <div className="container-cards d-flex flex-wrap">
              {cards !== undefined ? (
                cards.length 
                  ? 
                    cards.map((teacher) => {
                      return (
                        <div className="card-teacher-unique" key={teacher.id}>
                          <Card key={teacher.id} teacher={teacher} />
                        </div>
                      );
                    })
                  :
                    <div className="animate__animated animate__fadeInDown animate__delay-1s">
                      <h3 className="mt-2 mb-5 text-center w-100">
                        <b>Nada encontrado</b>
                      </h3>
                      <div
                        className="d-flex justify-content-center align-items-center flex-wrap w-100"
                        id="motivational"
                      >
                        <img src={SadFace} alt="Carinha triste, troque de filtro!" />
                        <div className="text-content w-100">
                          <h5 className="text-center mt-3">
                            <b>
                              Poxa... com essas especificações que pediu, não podemos te ajudar...<br />
                              <br /> 
                              Chame professores para nossa plataforma, ajude a universalização do conhecimento de forma gratuita!
                              <br /> 
                              Vamos juntos fazer esses filtros funcionarem 🚀
                            </b>
                          </h5>
                        </div>
                      </div>
                    </div>
              ) : (
                <>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                  <div className="card-teacher-unique">
                    <LoadingCard />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </>
    );
}