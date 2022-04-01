import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaArrowLeft } from "react-icons/fa";
import { useHelpManager } from "../../hooks/useHelpManager";

export default function AccountHelpSection() {
    const { helpSetter } = useHelpManager(); 
    const [ faq, setFaq ] = useState(0);

    return(
        <div className="box-selection-container">
            <div className="problem_hover_port position-absolute mt-3" onClick={() => helpSetter(0)}>
                <FaArrowLeft /> Voltar
            </div>
            <div className="problem_selection">
                <h4 className="my-5 text-center"><b>Dúvidas frequentes</b></h4>
                <div className="faq_container">
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 1 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 1 ? setFaq(0) : setFaq(1))}>
                                <h6 className="mb-0">Como atualizar meu perfil?</h6>
                                {faq === 1 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 1 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    <b>No computador</b><br/>
                                    Para atualizar sua conta, passe o mouse em cima da sua foto de perfil, na direita superior, depois disso clique em "Editar informações".<br/><br/>
                                    <b>No celular</b><br/>
                                    Para atualizar sua conta, clique no menu localizado na direita superior, lá aparecerá a seção "Editar informações", clique nela.
                                    <br/><br/>
                                    Tudo pode ser editado por ali, lembre-se que seu e-mail é seu login!<br/>
                                    Cuidado ao trocar de nome, muitas mudanças poderão ser consideradas comportamento suspeito e penalizáveis pela plataforma.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 2 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 2 ? setFaq(0) : setFaq(2))}>
                                <h6 className="mb-0">Como deletar minha conta?</h6>
                                {faq === 2 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 2 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Por estarmos em beta fechada, ainda não temos a opção de excluir a conta, mas é claro que você tem total liberdade de fazê-lo caso queira.<br/><br/>
                                    Caso queira realmente excluir sua conta 😢 nos envie um e-mail (<b>usando seu e-mail de cadastro na plataforma</b>) pedindo a exclusão.<br/>
                                    Se puder explique os motivos de sua saída para melhorarmos!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 3 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 3 ? setFaq(0) : setFaq(3))}>
                                <h6 className="mb-0">Como meus dados são usados?</h6>
                                {faq === 3 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 3 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Não usamos seus dados de forma alguma!<br/>
                                    Informações mais pessoais como sua idade e seu endereço são armazenadas para, respectivamente, Análise do nosso público e para a implantação de aulas presenciais.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq_box">
                        <div className="problem-item">
                            <div className={faq === 4 ? "header-problem w-100 d-flex justify-content-between primary-color" : "header-problem w-100 d-flex justify-content-between"} onClick={() => (faq === 4 ? setFaq(0) : setFaq(4))}>
                                <h6 className="mb-0">Posso ser professor e aluno ao mesmo tempo?</h6>
                                {faq === 4 ? <FaAngleUp /> : <FaAngleDown />}
                            </div>

                            <div className={faq === 4 ? 'collapse show' : 'collapse'} >
                                <div className="problem-item-body">
                                    Não.<br/><br/>
                                    Atualmente para pedir aulas você deve obrigatoriamente estar numa conta aluno.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}