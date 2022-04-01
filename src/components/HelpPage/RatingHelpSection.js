import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useHelpManager } from "../../hooks/useHelpManager";

export default function RatingHelpSection() {
    const { helpSetter } = useHelpManager(); 
    const [ faq, setFaq ] = useState(0);

    return(
        <div className="box-selection-container">
            <div className="problem_hover_port position-absolute mt-3" onClick={() => helpSetter(0)}>
                <FaArrowLeft /> Voltar
            </div>
            <div className="problem_selection">
                <h4 className="my-5 text-center"><b>Dúvidas frequentes 🌟</b></h4>
                <div className="faq_container">
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 1 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 1 ? setFaq(0) : setFaq(1))}>
                                <h6 className="mb-0">Como avaliar um professor?</h6>
                                {faq === 1 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 1 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Acesse, no menu, a aba "Suas Solicitações", uma vez lá dentro, acesse as solicitações "finalizadas", caso você não as tenha avaliado ainda, poderá fazê-lo
                                    <br/><br/>
                                    Mas atenção, pode levar até 1 dia para as avaliações ficarem disponíveis
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 2 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 2 ? setFaq(0) : setFaq(2))}>
                                <h6 className="mb-0">Tive a aula mas aparece a opção de avaliar, e agora?</h6>
                                {faq === 2 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 2 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Avaliações ficam disponíveis em até 1 dia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 3 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 3 ? setFaq(0) : setFaq(3))}>
                                <h6 className="mb-0">Fui avaliado injustamente, como recorrer?</h6>
                                {faq === 3 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 3 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    O suporte para recorrer a avaliações infelizmente não está disponível na Beta.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}