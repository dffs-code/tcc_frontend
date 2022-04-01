import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useHelpManager } from "../../hooks/useHelpManager";

export default function SolicitationHelpSection() {
    const { helpSetter } = useHelpManager(); 
    const [ faq, setFaq ] = useState(0);

    return(
        <div className="box-selection-container">
            <div className="problem_hover_port position-absolute mt-3" onClick={() => helpSetter(0)}>
                <FaArrowLeft /> Voltar
            </div>
            <div className="problem_selection">
                <h4 className="my-5 text-center"><b>Dúvidas frequentes 🤝</b></h4>
                <div className="faq_container">
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 1 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 1 ? setFaq(0) : setFaq(1))}>
                                <h6 className="mb-0">Tenho limites de solicitações?</h6>
                                {faq === 1 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 1 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Claro que não!<br/><br/>
                                    Que tipo de plataforma universalizadora seriamos se limitassemos sua possibilidade de aprender?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 2 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 2 ? setFaq(0) : setFaq(2))}>
                                <h6 className="mb-0">O professor pode ser penalizado por não responder?</h6>
                                {faq === 2 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 2 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Não!<br /><br/>
                                    Na versão beta os cards não podem ser desativados, então não podemos julgar caso o professor decida tirar umas boas e merecidas férias 🏖️
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 3 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 3 ? setFaq(0) : setFaq(3))}>
                                <h6 className="mb-0">Serei notificado caso o professor responda?</h6>
                                {faq === 3 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 3 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Na versão beta ainda não temos suporte a notificação por e-mail, então entre na aba "Solicitações" no menu diariamente para verificar novas mudanças!<br/><br/>
                                    Este suporte será implantado o mais breve possível, daremos ☕ extra para nossos desenvolvedores!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 4 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 4 ? setFaq(0) : setFaq(4))}>
                                <h6 className="mb-0">Não entendi a mensagem na solicitação, o que fazer?</h6>
                                {faq === 4 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 4 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    <b>Professor</b><br/>
                                    Aconselhamos a recusar a solicitação com uma mensagem explicando o motivo, peça para o aluno abrir outra.<br/>
                                    Talvez seja adequado passar algum meio de comunicação para o aluno, para que depois de definido, ele abra uma solicitação correta.
                                    <br/><br />
                                    <b>Aluno</b><br/>
                                    Se o professor aceitou, mas não passou nenhum meio de contato, abra outra solicitação para ele, como estamos na versão beta, ainda não há meios de contato via plataforma
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}