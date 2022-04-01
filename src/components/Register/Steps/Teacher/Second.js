import React from "react";
import { useRegister } from "../../../../hooks/useRegister";
import { Button, TextField } from "@material-ui/core";
import groupFlag from '../../../../img/groupFlag.svg';
import api from "../../../../services/api";
import { useAuth } from "../../../../hooks/useAuth";
import { toast } from "react-toastify";


export default function TeacherSecond() {
    const { userType, stepSetter } = useRegister();  
    const [about, setAbout] = React.useState("");
    const { userId } = useAuth();


    function submitStep(ev) {
        ev.preventDefault();

        const payload = {
            user_id: userId,
            about: about
        }

        api.post(`/teacher`, payload)
            .then(res => {
                stepSetter(2);
            }).catch(error =>{
                toast.error('Erro interno, pedimos desculpas pelo inconveniente.');
            });
        
    }
    
    return (
        <>
            <div id="more_about">
                <div className="d-flex justify-content-around mobileWrap">
                    <div id="teacher_tips" className="d-block position-absolute">
                        <img src={groupFlag} alt="Logo da comunidade" />  
                        <p className="text-center"><b>Caso precise de ajuda:</b></p>  
                        <ul>
                            <li>Aconselhamos colocar pontos fortes sobre você e sua personalidade.</li>
                            <li>Foque na mensagem que deseja passar sobre quem você é! Esta é uma área para falar sobre VOCÊ, seu anúncio de aula será feito a seguir.</li>
                            <li>Não exponha seus dados, fale sobre sua metodologia ou itens relacionados.</li>
                        </ul>
                    </div>   
                    <div className="card-teacher">
                        <h2 className="text-center">Queremos saber mais sobre você</h2>
                        <form className="main-form px-3" onSubmit={submitStep}>
                            <TextField
                                className="w-100 my-5"
                                placeholder="Fale sobre você da forma que achar melhor"
                                name="about"
                                value={about}
                                onChange={(event) => {
                                    setAbout(event.target.value);
                                }}
                                multiline
                                rows={10}

                            />

                            <Button
                                className={ userType ? "btn-register" : "btn-register-secondary"}
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                Próxima Etapa
                            </Button>
                        </form>
                    </div> 
                </div>
            </div>
        </>
    ); 
}