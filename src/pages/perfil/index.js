import React from 'react';
import ProfileManager from "../../components/ProfileManager";
import { useAuth } from "../../hooks/useAuth";

function Profile() {
    const { isTeacher } = useAuth();

    if(isTeacher !== undefined){
        return (
            <ProfileManager isTeacher={isTeacher}/>
        )
    }else {
        // Criar um loader para as páginas
        return <h1>Loading</h1>
    }
}

export default Profile;
