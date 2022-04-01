import { useAuth } from '../../hooks/useAuth';
import { useHelpManager } from '../../hooks/useHelpManager';

import help_solicitacao  from '../../img/help_solicitacao.png';
import help_avaliacao  from '../../img/help_avaliacao.png';
import help_pagamentos from '../../img/help_pagamentos.png';
import help_tips from '../../img/help_tips.png';
import help_report from '../../img/help_report.png';

export default function MainHelpSection(){
    const { helpSetter } = useHelpManager();
    const { userAvatar, userName } = useAuth();
    
    return(
        <div className="problem_selection">
            <h4 className="my-5 text-center"><b>Selecione a seção do problema</b></h4>
            <div className="box-selection-container">
                <ul className="d-flex justify-content-between flex-wrap">
                    <li onClick={() => helpSetter(1)}>
                        <div className="p-3 d-block">
                            <div className="section-pic position-relative mb-3">
                                { userAvatar 
                                    ?   
                                        <div className="content-image d-flex justify-content-center"> 
                                                <div style={{backgroundImage: `url(${userAvatar})`}} />
                                        </div>
                                    : 
                                        <div className="d-flex justify-content-center align-items-center" id="google_alike">
                                            <div className="d-flex justify-content-center align-items-center">{ userName ? (userName.charAt(0)).toUpperCase() : 'E'}</div>
                                        </div>
                                } 
                            </div>
                            <p>Minha Conta</p>
                        </div>
                    </li>
                    <li onClick={() => helpSetter(2)}>
                        <div className="p-3 d-block">
                            <div className="section-pic position-relative mb-3">
                                <div className="content-image d-flex justify-content-center"> 
                                    <img src={help_solicitacao} alt="Designed by rawpixel.com" />
                                </div>
                            </div>
                            <p>Solicitações de Aula</p>
                        </div>
                    </li>
                    <li onClick={() => helpSetter(3)}>
                        <div className="p-3 d-block">
                            <div className="section-pic position-relative mb-3">
                                <div className="content-image d-flex justify-content-center"> 
                                    <img src={help_avaliacao} alt="Designed by rawpixel.com" />
                                </div>
                            </div>
                            <p>Avaliações</p>
                        </div>
                    </li>
                    <li onClick={() => helpSetter(4)}>
                        <div className="p-3 d-block">
                            <div className="section-pic position-relative mb-3">
                                <div className="content-image d-flex justify-content-center"> 
                                    <img src={help_pagamentos} alt="Designed by rawpixel.com" />
                                </div>
                            </div>
                            <p>Pagamentos</p>
                        </div>
                    </li>
                    <li onClick={() => helpSetter(5)}>
                        <div className="p-3 d-block">
                            <div className="section-pic position-relative mb-3">
                                <div className="content-image d-flex justify-content-center"> 
                                    <img src={help_tips} alt="Designed by rawpixel.com" />
                                </div>
                            </div>
                            <p>Dicas</p>
                        </div>
                    </li>
                    <li onClick={() => helpSetter(6)}>
                        <div className="p-3 d-block">
                            <div className="section-pic position-relative mb-3">
                                <div className="content-image d-flex justify-content-center"> 
                                    <img src={help_report} alt="Designed by rawpixel.com" />
                                </div>
                            </div>
                            <p>Reportar / Denunciar</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}