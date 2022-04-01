import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useHelpManager } from "../../hooks/useHelpManager";

export default function ReportHelpSection() {
    const { helpSetter } = useHelpManager(); 
    const [ faq, setFaq ] = useState(0);

    return(
        <div className="box-selection-container">
            <div className="problem_hover_port position-absolute mt-3" onClick={() => helpSetter(0)}>
                <FaArrowLeft /> Voltar
            </div>
            <div className="problem_selection">
                <h4 className="my-5 text-center"><b>Dúvidas frequentes 🕵️</b></h4>
                <div className="faq_container">
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 1 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 1 ? setFaq(0) : setFaq(1))}>
                                <h6 className="mb-0">Um usuário da plataforma me ofendeu, como agir?</h6>
                                {faq === 1 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 1 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Para denunciar um usuário, envie-nos um e-mail contendo:<br/><br/>
                                    <b>1. </b>Nome completo do aluno ou professor <br/>
                                    <b>2. </b>Card de aula que foi solicitado<br/>
                                    <b>3. </b>Resumo do que aconteceu<br/>
                                    <b>4. </b>Screenshot das ofensas
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 2 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 2 ? setFaq(0) : setFaq(2))}>
                                <h6 className="mb-0">Acessaram minha conta e estão se passando por mim, o que fazer?</h6>
                                {faq === 2 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 2 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Nos envie um e-mail (utilizando o e-mail que inseriu quando criou a conta) explicando o que aconteceu e cancelaremos ou recuperaremos sua conta!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 3 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 3 ? setFaq(0) : setFaq(3))}>
                                <h6 className="mb-0">Houve uma fraude na aula, como prosseguir?</h6>
                                {faq === 3 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 3 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Para denunciar uma fraude, envie-nos um e-mail contendo:<br/><br/>
                                    <b>1. </b>Nome completo do aluno ou professor <br/>
                                    <b>2. </b>Card de aula que foi solicitado<br/>
                                    <b>3. </b>Resumo do que aconteceu<br/>
                                    <b>4. </b>Screenshot das ofensas<br/><br />
                                    Em casos de fraudes econômicas, infelizmente não podemos agir, mas baniremos o usuário infrator.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 4 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 4 ? setFaq(0) : setFaq(4))}>
                                <h6 className="mb-0">Encontrei um erro na plataforma, como prosseguir?</h6>
                                {faq === 4 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 4 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Para reportar um bug na plataforma, envie-nos um e-mail contendo:<br/><br/>
                                    <b>1. </b>Local do bug / ação onde acontece<br/>
                                    <b>2. </b>Resumo do que aconteceu<br/>
                                    <b>3. </b>Screenshot do erro
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}