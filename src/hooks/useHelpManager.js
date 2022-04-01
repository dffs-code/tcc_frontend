import { createContext, useState, useContext } from 'react';

const HelpContext = createContext();

export function HelpProvider({children}) {
    const [ help, setHelp ] = useState(0);

    function helpSetter(id){
        setHelp(id);
    }
   
    return(
        <HelpContext.Provider value={{helpSetter, help}} >
            {children}
        </HelpContext.Provider>
    )
}

export function useHelpManager() {
    const context = useContext(HelpContext);

    return context;
}