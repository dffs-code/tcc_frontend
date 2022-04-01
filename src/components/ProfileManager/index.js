import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import BasicInfos from './sections/BasicInfos';
import PasswordInfo from "./sections/PasswordInfo";
import TeacherCard from "./sections/teacher/TeacherCard";


import "./style.css";

export default function ProfileManager({ isTeacher }) {
    const [session, setSession] = useState(0);

    function buildPage(sessionChoosed){
        switch (sessionChoosed) {
            case 0:
              return <BasicInfos />;
            case 1:
              return <PasswordInfo />
            case 2:
              return <TeacherCard />
            default:
        }
    }

    useEffect(() => {
        buildPage(session);
    }, [session]);

  return (
    <div
      className={ isMobile ? "content body-principal w-100 d-flex align-content-center justify-content-around flex-wrap" : "content body-principal w-100 d-flex align-content-center justify-content-around"}
      id="profile-manager"
    >
      <div className={ isMobile ? "col-12" : "mt-5 mr-3 col-2 position-relative"}>
        <ul className="drawer-menu">
            <li onClick={() => setSession(0)} className={session === 0 ? 'active' : ''}>Informações Básicas</li>
            {
                isTeacher 
                ?
                    <li onClick={() => setSession(2)} className={session === 2 ? 'active' : ''}>Editar seu Card</li>
                :
                    ''
            }
            <li onClick={() => setSession(1)} className={session === 1 ? 'active' : ''}>Trocar Senha</li>

            <li><Link to="/ajuda">Precisa de ajuda?</Link></li>
        </ul>
      </div>
      <div className={ isMobile ? "col-12" : "main-page right-content col-9"}>
        {buildPage(session)}
      </div>
    </div>
  );

  // Menu lateral que controla a página a ser lançada
}
