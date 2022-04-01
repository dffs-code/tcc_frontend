import React from 'react';
import UserForm from '../../components/Register/UserForm';

import '../../global.css';
import './style.css';

function Register(){
    return(
        <>
            <div className="body-principal d-flex flex-wrap justify-content-between row content" id="register">
                <UserForm />
            </div>
        </>
    )
}

export default Register;
