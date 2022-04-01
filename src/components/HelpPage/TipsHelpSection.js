import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useHelpManager } from "../../hooks/useHelpManager";

export default function TipsHelpSection() {
    const { helpSetter } = useHelpManager(); 
    const [ faq, setFaq ] = useState(0);

    return(
        <div className="box-selection-container">
            <div className="problem_hover_port position-absolute mt-3" onClick={() => helpSetter(0)}>
                <FaArrowLeft /> Voltar
            </div>
            <div className="problem_selection">
                <h4 className="my-5 text-center"><b>Quer dicas? Confere ai as melhores 💡</b></h4>
                <div className="faq_container">
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 1 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 1 ? setFaq(0) : setFaq(1))}>
                                <h6 className="mb-0">Como criar um card bom?</h6>
                                {faq === 1 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 1 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Seja objetivo, fale da matéria que escolheu no card, mostre a seu aluno, de forma sucinta, o que pode ajudá-lo e quais benefícios ele terá de ter uma aula com você.<br/><br/>
                                    Não é hora de falar de você, fale da aula, existem dois caminhos válidos para o sucesso:<br/>
                                    1. Falar tecnicamente do que será ensinado<br/>
                                    2. Falar dos objetivos que o aluno poderá alcançar caso faça a aula.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 2 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 2 ? setFaq(0) : setFaq(2))}>
                                <h6 className="mb-0">Como falar sobre mim de uma forma convincente?</h6>
                                {faq === 2 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 2 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Quem nunca passou pela situação de estar frente a frente com um campo de texto "Fale sobre você" e ficar na dúvida?<br/>
                                    Isso é perfeitamente normal, mas qual norte tomar?<br/>
                                    Nós do ensina.me recomendamos colocar diplomas e experiências nessa parte, mas sem esquecer do toque pessoal!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 3 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 3 ? setFaq(0) : setFaq(3))}>
                                <h6 className="mb-0">Como passar uma boa imagem e fidelizar meu aluno?</h6>
                                {faq === 3 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 3 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Escolha uma imagem que represente o card que está dando!<br/>
                                    Se é professor de Photoshop, por que não se colocar lutando contra o Darth Vader ⚔️?<br/><br/>
                                    O que recomendamos é uma imagem que passe seu estilo e o que ensina!<br/>
                                    Fidelizar seu aluno não é somente ter uma didática boa (claro que é importante), mas sim passar confiança e deixá-lo confortável!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 4 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 4 ? setFaq(0) : setFaq(4))}>
                                <h6 className="mb-0">Quero mais dicas, com conteúdo validado por mestres!!!</h6>
                                {faq === 4 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 4 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Fique atento as novidades, o blog do ensina.me está quase ai!!!<br/>
                                    <a href="https://www.instagram.com/ensina.me.br/" target="_blank">@ensina.me.br</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}