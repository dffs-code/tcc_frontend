import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import api from '../services/api';
import { toast } from 'react-toastify';
import jwt from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const cookies = new Cookies();
    const areToken = cookies.get('token');

    const [token, setToken] = useState(areToken);
    const [userId, setUserId] = useState(false);
    const [isTeacher, setIsTeacher] = useState(undefined);
    const [userAvatar, setUserAvatar] = useState();
    const [userName, setUserName] = useState();
    const [teacher, setTeacher] = useState([]);
    const [student, setStudent] = useState([]);

    useEffect(() => {
        if(token){
            const decodedToken = jwt(token);

            api.get(`/users/${decodedToken.id}/profile`)
            .then((response) => {
                setUserId(response.data.id);
                setUserAvatar(response.data.avatar)
                setUserName(response.data.name)
                if (response.data.teacher[0]) {
                    setTeacher(response.data.teacher);
                    setIsTeacher(true);
                }else if (response.data.student[0]){
                    setStudent(response.data.student);
                    setIsTeacher(false);
                }    
            }).catch((error) => {//Nunca deve acontecer
                setToken(false);
                toast.warn('Usuário deslogado, favor entrar novamente');    
            });
        }
    }, [token])        
    
    function tokenSetter(status){
        setToken(status); 
    }

    return(
        <AuthContext.Provider value={{token, tokenSetter, userId, userAvatar, userName, isTeacher, teacher, student, setUserName, setUserAvatar}} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}