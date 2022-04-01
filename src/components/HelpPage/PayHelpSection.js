import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useHelpManager } from "../../hooks/useHelpManager";

export default function PayHelpSection() {
    const { helpSetter } = useHelpManager(); 
    const [ faq, setFaq ] = useState(0);

    return(
        <div className="box-selection-container">
            <div className="problem_hover_port position-absolute mt-3" onClick={() => helpSetter(0)}>
                <FaArrowLeft /> Voltar
            </div>
            <div className="problem_selection">
                <h4 className="my-5 text-center"><b>Dúvidas frequentes 💸</b></h4>
                <div className="faq_container">
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 1 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 1 ? setFaq(0) : setFaq(1))}>
                                <h6 className="mb-0">O Ensina-me se responsabiliza por alguma atividade financeira entre aluno e professor?</h6>
                                {faq === 1 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 1 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Não.<br/><br/>
                                    Por isso que é importante que após a confirmação da aula, o professor informe um meio de contato.<br/>
                                    Nós do ensina.me estamos apenas universalizando seu anúncio, que antes, provavelmente era feito por redes sociais ou indicações.<br/><br />
                                    Mas sim, iremos implantar um meio de pagamento via plataforma no futuro, siga nosso instagram para ficar atenado nas mudanças que estão por vir: <a href="https://www.instagram.com/ensina.me.br/" target="_blank">@ensina.me.br</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 2 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 2 ? setFaq(0) : setFaq(2))}>
                                <h6 className="mb-0">Quais cuidados devo tomar ao negociar com um usuário da plataforma?</h6>
                                {faq === 2 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 2 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Os mesmos cuidados que se toma ao negociar algo no dia a dia.<br/>
                                    Recomendamos seguir da mesma forma que seguia em suas aulas particulares, seja você aluno ou professor, e em caso de fraude, denuncie!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 3 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 3 ? setFaq(0) : setFaq(3))}>
                                <h6 className="mb-0">O Ensina-me pretende participar das negociações entre aluno e professor afim de garantir maior segurança?</h6>
                                {faq === 3 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 3 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Sim!<br/><br />
                                    Afim de dar mais segurança a plataforma, é de nossos planos inserir meios de pagamentos e contas na própria plataforma.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}