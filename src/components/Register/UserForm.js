import Stepper from "react-stepper-horizontal";
import React  from "react";
import { useRegister } from "../../hooks/useRegister";

import First from "./Steps/Student/First";

import "./style.css";
import TeacherSecond from "./Steps/Teacher/Second";
import TeacherThird from "./Steps/Teacher/Third";

export default function UserForm() {
  const { userType, activeStep } = useRegister();
  /*
    userType = 1 = Aluno
    userType = 0 = Professor
  */

  function getStepContent(step, userType) {
    if(step === 0){
      return <First />;
    }else{
      if(userType === 0){
        switch (step) {
          case 1:
            return <TeacherSecond />;
          case 2:
            return <TeacherThird />;
          default:
            return "Erro, favor recarregar a página.";
        }
      }
    }
  }

  return (
    <>
      <div className="w-100" id="register-forms">
        {!userType ? (
          <div id="stepper-content">
            <Stepper
              className="stepper"
              steps={[
                { 
                  title: "Increva-se"
                },
                { 
                  title: "Informação adicional (opcional)"
                },
                { 
                  title: "Criar primeiro card" 
                },
              ]}
              activeStep={activeStep}
              activeColor={"#FF6584"}
              completeColor={"#fa92a7"}
              titleFontSize={20}
              circleFontSize={20}
              size={38}
            />
          </div>
        ) : ''}
        <div id="forms-internos">
          {getStepContent(activeStep, userType)}
        </div>
      </div>
    </>
  );
}
