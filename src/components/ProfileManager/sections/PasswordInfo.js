import { useState } from 'react';
import groupFlag from '../../../img/groupFlag.svg';
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsCheck, BsCheckAll } from 'react-icons/bs';

import { useAuth } from '../../../hooks/useAuth';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

export default function PasswordInfo() {
    const { userId, isTeacher } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [doesntMatch, setDoesntMatch] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();

        if(confirmNewPassword !== newPassword) {
            setDoesntMatch(true);
            toast.error('As senhas não conferem');
            return false;
        }

        if(newPassword.length < 6){
            setDoesntMatch(true);
            toast.error('Favor colocar no mínimo 6 (seis) caracteres');
            return false;
        }

        const payload = {
            password,
            new_password: newPassword
        }

        if(payload.password && payload.new_password){
            api.put(`users/${userId}/changePassword`, payload)
                .then(res => {
                    toast.success('Senha alterada com sucesso');
                }).catch(error => {
                    switch (error.response.status) {
                        case 401:
                          toast.error('A senha atual não confere!');
                            break;
                        default:
                          toast.error('Erro ao cadastrar, tente novamente mais tarde.');
                          break;
                      }
                });
        }else{
            toast.warn("Favor preencher todos os campos");
        }
    }

    return(
        <>
            <h2>Alterar Senha</h2>
            <div className="card" id="edit-profile">
                <form className="d-flex justify-content-center w-100 flex-wrap pb-4 " onSubmit={handleSubmit}>
                    <div className={ isMobile ? "w-100 d-block p-4" : "justify-content-between w-100 d-flex flex-wrap p-5 align-items-center"}>
                        <div className={ isMobile ? "editable-content-left w-100" : "w-50"}>
                            <TextField
                                fullWidth
                                label="Senha atual"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                          <RiLockPasswordLine />
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                            />
                            <TextField
                                fullWidth
                                label="Nova senha"
                                type="password"
                                value={newPassword}
                                className="my-4"
                                onChange={(event) => setNewPassword(event.target.value)}
                                error={doesntMatch}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                          <BsCheck />
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                            />
                            <TextField
                                fullWidth
                                label="Confirme a nova senha"
                                type="password"
                                value={confirmNewPassword}
                                onChange={(event) => setConfirmNewPassword(event.target.value)}
                                error={doesntMatch}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                          <BsCheckAll />
                                      </InputAdornment>
                                    ),
                                  }}
                                  variant="standard"
                            />
                        </div>
                        <div id="tips_teacherCard" className="editable-content-right d-flex justify-content-center align-items-center" >
                            <div className="d-block w-100">
                                <img src={groupFlag} alt="Logo da comunidade" />  
                                <p className="text-center"><b>Boas dicas:</b></p>  
                                <ul>
                                    <li>Coloque pelo menos 1 carácter especial, 1 Número e 1 Letra maiúscula</li>
                                    <li className="mt-2">Fique atento à sua segurança!</li>
                                </ul>
                            </div>   
                        </div>
                    </div>
                    <Button
                        className={ isTeacher ? "btn-register-secondary" : "btn-register"}
                        variant="contained"
                        type="submit"
                    >
                        Alterar Senha
                    </Button>
                </form>
            </div>
        </>
    )
}