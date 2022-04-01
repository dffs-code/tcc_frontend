import { useState, useEffect } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { Button } from "@material-ui/core";
import InputMask from "react-input-mask";

import { useAuth } from '../../../hooks/useAuth';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import Compressor from 'compressorjs'

export default function BasicInfos() {
    const { userId, isTeacher, setUserName, setUserAvatar } = useAuth();

    const [name, setName] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);


    function onChangeCep(ev) {
        const { value } = ev.target;
      
        if (value?.length !== 9) {
          return;
        }else{
            fetch(`https://viacep.com.br/ws/${value}/json`)
                .then((res) => res.json())
                .then((data) => {
                    if(data.erro){
                        toast.error("CEP incorreto");
                    }
                    setDistrict(data.bairro);
                    setAddress(data.logradouro);
                    setState(data.uf);
                    setCity(data.localidade);
                    setZipCode(value);
                });
        }
      
    }

    useEffect(() => {
		api.get(`users/${userId}/profile`).then((res) => {
            setName(res.data.name);
            setDateBirth(res.data.dateBirth)
            setEmail(res.data.email);
            setZipCode(res.data.zipCode);
            setAddress(res.data.address);
            setAvatar(res.data.avatar);
            setState(res.data.state);
            setCity(res.data.city);
            setDistrict(res.data.district);
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        var imageUrl = '';
      
        if(newAvatar){
            
            const s3Url = await api.get('/s3UploadImage').then((res) => res.data.url)
            // console.log(newAvatar)
        
            new Compressor(newAvatar, { 
            quality: 0.3,
            success: async (compressedImage) => {
                await fetch(s3Url, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: compressedImage
                })
            },
            error: (err) => console.log(err.message)
            })
            imageUrl = s3Url.split('?')[0]
        }
        const payload = {
            name,
            dateBirth,
            email,
            zipCode,
            address,
            avatar: imageUrl,
            state,
            city,
            district
        }
        

        if(payload.name && payload.email && payload.zipCode && payload.address){
            await api.put(`users/${userId}`, payload)
                .then(res => {
                    toast.success('Dados modificados com sucesso');
                    setUserName(payload.name)
                    setUserAvatar(payload.avatar)
                }).catch(error => {
                    switch (error.response.status) {
                        case 401:
                          toast.warning('E-mail já existente');
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

    useEffect(() => {
        if(newAvatar){
          setAvatar(URL.createObjectURL(newAvatar));
        }else{
          setAvatar(null);
        }
      }, [newAvatar]);
    

    return(
        <>
            <h2>Editar Perfil</h2>
            <div className="card" id="edit-profile">
                <form className="d-flex justify-content-center w-100 flex-wrap pb-4" onSubmit={handleSubmit}>
                    <div className={ isMobile ? "w-100 d-block p-4" : "align-items-center justify-content-between w-100 d-flex flex-wrap p-5"}>
                        <div className="editable-content-left">
                            <p><b>Nome: </b><input type="text" placeholder={name} onChange={(e) => setName(e.target.value)}/></p>
                            <p><b>Email: </b><input type="email" placeholder={email} onChange={(e) => setEmail(e.target.value)}/></p>
                            <p>
                                <b>CEP: </b>
                                <InputMask 
                                    mask="99999-999"
                                    disabled={false}
                                    maskChar=""
                                    onChange={(e) => (onChangeCep(e))}
                                >
                                    {() => (
                                        <input type="text" placeholder={zipCode} />
                                    )}
                                </InputMask>
                            </p>
                            <p>Estado: {state}</p>
                            <p>Cidade: {city}</p>
                            <p>Bairro: {district}</p>
                            <p><b>Endereço: </b><input type="text" placeholder={address} onChange={(e) => setAddress(e.target.value)}/></p>
                        </div>
                        <div className="editable-content-right">
                            <div className="mt-1 text-center">
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    className="d-none"
                                    onChange={e =>  setNewAvatar(e.target.files[0])}
                                />
                                { avatar 
                                    ?   
                                        <div className="content-image d-flex justify-content-center flex-wrap "> 
                                                <div style={{backgroundImage: `url(${avatar})`}} />
                                                <p className="text-center w-100 mt-1" style={{fontSize: `0.75rem`}}><b>90x90 Pixels</b></p>

                                        </div>
                                    : 
                                        <div className="d-flex justify-content-center align-items-center flex-wrap " id="google_alike">
                                            <div className="d-flex justify-content-center align-items-center">{ name ? (name.charAt(0)).toUpperCase() : ''}</div>
                                            <p className="text-center w-100 mt-1" style={{fontSize: `0.75rem`}}><b>90x90 Pixels</b></p>
                                        </div>
                                }
                                <label htmlFor="avatar">
                                    <Button
                                    className={isTeacher ? "btn-register-secondary mt-2" : "btn-register mt-2"}
                                    variant="contained"
                                    fullWidth
                                    component="span"
                                    >
                                        <AiFillCamera className="mr-1"/> Alterar imagem de perfil
                                        
                                    </Button>
                                </label>
                            </div>
                        </div>
                    </div>
                    <Button
                        className={ isTeacher ? "btn-register-secondary" : "btn-register"}
                        variant="contained"
                        type="submit"
                    >
                        Alterar informações
                    </Button>
                </form>
            </div>
        </>
    )
}