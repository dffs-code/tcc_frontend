import { createContext, useState, useContext } from 'react';

const RegisterContext = createContext();

export function RegisterProvider({children}) {
    const [userType, setUserType] = useState(1);
    const [ activeStep, setActiveStep ] = useState(0);

    function userSetter(user_type){
        setUserType(user_type);
    }
    function stepSetter(active_step){
        setActiveStep(active_step);
    }
    
    return(
        <RegisterContext.Provider value={{userType, userSetter, activeStep, stepSetter}} >
            {children}
        </RegisterContext.Provider>
    )
}

export function useRegister() {
    const context = useContext(RegisterContext);

    return context;
}