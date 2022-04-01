import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Typewriter from "typewriter-effect/dist/core";

import { FaSearch } from "react-icons/fa";
import { Button } from "@material-ui/core";
import Carousel from "react-elastic-carousel";
import { BsClock, BsCalendar, BsQuestion } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";

import api from "../../services/api";
import Card from "../../components/Card";

import "./style.css";
import { Skeleton } from "@material-ui/lab";
import LoadingCard from "../../components/LoadingCard";

export default function Index() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchedSubject, setSearchedSubject] = useState();
  const history = useHistory();

  useEffect(() => {
    api.get("/card/fullCards?limit=5").then((response) => {
      setTeachers(response.data);
    });
    api.get("/subjects/all").then((response) => {
      setSubjects(response.data);
    });
  }, []);
  const subjects_breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 1800, itemsToShow: 2 },
    { width: 2000, itemsToShow: 2 },
    { width: 2500, itemsToShow: 3 },
  ];
  const teachers_breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 1000, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 },
    { width: 2600, itemsToShow: 5 },
  ];

  function handleInputChange(event) {
    setSearchedSubject(event.target.value);
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push(
        searchedSubject ? `/explorar?subject=${searchedSubject}` : `/explorar`
      );
    }
  };
  var changeText = document.getElementById("changeTextIndex");

  var typewriter = new Typewriter(changeText, {
    loop: true,
    delay: 75,
  });

  typewriter
    .typeString("<strong>Universalizada</strong>")
    .pauseFor(2000)
    .deleteAll()
    .pauseFor(300)
    .typeString("<strong>Acessível</strong>")
    .pauseFor(2000)
    .deleteAll()
    .pauseFor(300)
    .typeString("<strong>Flexível</strong>")
    .pauseFor(2000)
    .deleteAll()
    .pauseFor(300)
    .typeString("<strong>Modernizada</strong>")
    .pauseFor(2000)
    .start();

  return (
    <>
      <div id="index">
        <section className="body-principal d-flex flex-wrap align-items-center">
          <div
            className="banner d-flex align-items-center"
            alt="Photo by Vanessa Garcia from Pexels | Find More on https://www.pexels.com/pt-br/@vanessa-garcia"
          >
            <div className="content banner_desc">
              <div className="text">
                <h2 className="font-weight-bold">
                  Aprenda com diversos professores On-line!
                </h2>
                <h4 className="my-4">
                  A educação liberta, e com o Ensina.me, a educação no Brasil será <span id="changeTextIndex">universalizada</span>
                </h4>
                <h6 className="mb-3">
                  Conhecimento e aprendizado de forma universalizada
                </h6>
                <div className="inputSearch d-flex position-relative">
                  <input
                    type="text"
                    className="indexInput"
                    placeholder="O que você quer aprender hoje?"
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <div id="searchBtn">
                    <Link
                      className="searchBtn d-flex align-items-center justify-content-center"
                      to={
                        searchedSubject
                          ? `/explorar?subject=${searchedSubject}`
                          : `/explorar`
                      }
                    >
                      <button
                        id="searchBtn"
                        className="searchBtn d-flex align-items-center justify-content-center"
                      >
                        <FaSearch className="search-icon" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="popular-subjects align-items-center justify-content-center ">
            <h3 className="text-center font-weight-bold my-3">
              Confira nossos cursos mais acessados
            </h3>
            {subjects.length ? (
              <Carousel
                breakPoints={subjects_breakPoints}
                pagination={false}
                className="my-5 subjects-carousel"
              >
                {subjects.map((item) => {
                  return (
                    <div
                      className="slider m-5 pt-4 px-4 pb-3 materias"
                      key={item.id}
                    >
                      <div className="subjects-content ">
                        <div className="d-flex justify-content-between mobileWrap">
                          <div className="left-content d-flex">
                            <div className="content-image d-flex justify-content-start">
                              <div
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              />
                            </div>
                            <div className="category">
                              <div className="tag">
                                <span>{item.category.description}</span>
                              </div>
                            </div>
                          </div>
                          <div className="right-content">
                            <div className="price-adjustment">
                              <b>
                                Média de Preço{" "}
                                <span>
                                  {
                                    item.cards.length
                                    ?
                                    <>
                                        R${" "}
                                      {item.cards.map((item) =>
                                        Math.round(item.avg_price)
                                      )}
                                      /hr
                                    </>
                                    :
                                    <>
                                      Novo!
                                    </>
                                  }
                                </span>{" "}
                              </b>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap">
                          <div className="slide-body">
                            <h3>{item.name}</h3>
                            <p className="mt-3">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="link-header"
                        to={`/explorar?subject=${item.name}`}
                      >
                        <Button
                          className="btn-materia py-2 mt-4 mb-2"
                          variant="contained"
                        >
                          Buscar professores
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </Carousel>
            ) : (
              <Carousel
                breakPoints={subjects_breakPoints}
                pagination={false}
                className="my-2 subjects-carousel"
              >
                <div className="slider m-5 pt-4 px-4 pb-3 materias">
                  <div className="subjects-carousel">
                    <div>
                      <div className="subjects-content ">
                        <div className="d-flex justify-content-between mobileWrap">
                          <div className="left-content d-flex">
                            <div className="content-image d-flex justify-content-start">
                              <Skeleton
                                animation="wave"
                                variant="circle"
                                width={100}
                                height={100}
                                className="mr-4 mb-4"
                              />
                            </div>
                            <div className="category">
                              <div>
                                <span>
                                  <Skeleton
                                    animation="wave"
                                    variant="rect"
                                    width={120}
                                    height={20}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="right-content">
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={200}
                              height={20}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-wrap">
                          <div className="slide-body">
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={100}
                              height={20}
                              className="mb-4"
                            />
                            <Skeleton
                              animation="wave"
                              variant="rect"
                              width={2000}
                              height={150}
                            />
                          </div>
                        </div>
                      </div>
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        width={250}
                        height={40}
                        className="mt-5 text-center move_skeleton_center"
                      />
                    </div>
                  </div>
                </div>
              </Carousel>
            )}
          </div>
          <div className="popular-teachers align-items-center justify-content-center">
            <h3 className="text-center font-weight-bold">
              Aprenda agora mesmo!
            </h3>
            <Carousel
              breakPoints={teachers_breakPoints}
              pagination={false}
              className="mb-5"
            >
              {teachers.length
                ?
                  teachers.map((teacher) => {
                    return (
                      <div className="card-teacher-unique" key={teacher.id}>
                        <Card key={teacher.id} teacher={teacher} />
                      </div>
                    );
                  })
                :
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
                  </>
              }
            </Carousel>
          </div>
        </section>

        <section className="content">
          <h2 className="font-weight-bold my-3 text-center">
            Aprender nunca foi tão fácil e barato
          </h2>
          <div className="why-us align-items-center justify-content-center my-5">
            <ul className="benefits d-flex justify-content-between pb-5">
              <li>
                <div className="icone">
                  <BsClock />
                </div>
                <h3>Faça seu horário</h3>
                <p>Escolha o professor que melhor se encaixa em sua rotina</p>
              </li>
              <li>
                <div className="icone">
                  <GiTakeMyMoney />
                </div>
                <h3>Acessível de verdade</h3>
                <p>
                  Todo nosso aplicativo é completamente grátis!
                  <br /> Vá atrás do professor que melhor se encaixa em seu
                  orçamento
                </p>
              </li>
              <li>
                <div className="icone">
                  <BsCalendar />
                </div>
                <h3>Organize-se conosco</h3>
                <p>
                  Todo controle a você com nossa aba Cronograma!
                  <br />
                  Organize suas aulas a partir dela
                </p>
              </li>
              <li>
                <div className="icone">
                  <BsQuestion />
                </div>
                <h3>Tire suas dúvidas</h3>
                <p>
                  Acesse nossa aba ajuda e acabe com qualquer dúvida em torno de
                  nossa plataforma!
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
