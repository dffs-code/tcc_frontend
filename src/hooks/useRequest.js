import { createContext, useState, useContext } from 'react';

const ModalidadeContext = createContext();

export function RequestProvider({children}) {
    const [ cardId, setCardId ] = useState(0);
    const [ teacher, setTeacher ] = useState(0);

    function cardSetter(id){
        setCardId(id);
    }
    function teacherSetter(name){
        setTeacher(name);
    }
   
    return(
        <ModalidadeContext.Provider value={{cardSetter, cardId, teacherSetter, teacher}} >
            {children}
        </ModalidadeContext.Provider>
    )
}

export function useRequest() {
    const context = useContext(ModalidadeContext);

    return context;
}