import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import { AiFillCamera } from 'react-icons/ai';
import differenceInYears from "date-fns/differenceInYears";
import { useFormik } from "formik";

import * as Yup from "yup";
import { parse, isDate } from "date-fns";

import { GiTeacher } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { useRegister } from "../../../../hooks/useRegister";
import { toast } from 'react-toastify';
import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/useAuth';
import jwt from 'jwt-decode';

import Compressor from 'compressorjs'
import { FaTimes } from "react-icons/fa";

function onChangeCep(ev, setFieldValue) {
  const { value } = ev.target;

  if (value?.length !== 9) {
    return;
  }

  fetch(`https://viacep.com.br/ws/${value}/json`)
    .then((res) => res.json())
    .then((data) => {
      setFieldValue("district", data.bairro);
      setFieldValue("address", data.logradouro);
      setFieldValue("state", data.uf);
      setFieldValue("city", data.localidade);
      setFieldValue("zipCode", value);
    });
}

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());
  return parsedDate;
}

export default function First() {
  const { tokenSetter, userId } = useAuth();
  const [active, setActive] = useState(true);
  const { userSetter, stepSetter } = useRegister();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatar, setAvatar] = useState();
  const [finished, setFinished] = useState(false);

  // const today = new Date();

  const handleUser = (user, setFieldValue) => {
    setFieldValue("user", user);
    setActive(user);
    userSetter(user);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Nada de apelidinhos, coloque seu nome completo!")
      .required("Insira seu nome"),
    email: Yup.string()
      .email("Preencha um e-mail válido")
      .required("Insira seu e-mail, será importante caso esqueça sua senha"),
    dateBirth: Yup.date()
      .transform(parseDateString)
      .required("Insira sua data de nascimento")
      .test("dob", "Ops... A menos que seja um bebê, sua idade parece estar errada 👶", function (parseDateString) {
        return differenceInYears(new Date(), new Date(parseDateString)) >= 3;
      }),
    password: Yup.string()
      .required("Insira uma senha para logar no Ensina.me")
      .min(6, "Mínimo de 6 dígitos"),
    zipCode: Yup.string().required("Insira seu CEP"),
    state: Yup.string().required("Insira seu CEP, o estado será preenchido automaticamente"),
    city: Yup.string().required("Insira seu CEP, a cidade será preenchido automaticamente"),
    district: Yup.string().required("Insira seu CEP, o bairro será preenchido automaticamente"),
    
  });

  const formik = useFormik({
    initialValues: {
      user: 0,
      name: "",
      email: "",
      password: "",
      dateBirth: "",
      zipCode: "",
      state: "",
      city: "",
      district: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      var imageUrl = '';
      
      if(avatar){
        const s3Url = await api.get('/s3UploadImage').then((res) => res.data.url)
      
        new Compressor(avatar, { 
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
          name: values.name,
          email: values.email,
          password: values.password,
          dateBirth: values.dateBirth,
          zipCode: values.zipCode,
          state: values.state,
          city: values.city,
          district: values.district,
          address: values.address,
          avatar: imageUrl
        }



        await api.post('users',payload)
        .then(res => {
          if(res.status === 201){
            var decodedToken = jwt(res.data.token);
            var date = new Date();

            date.setTime(date.getTime()+decodedToken.exp);
            document.cookie = 'token ='+res.data.token+';expires='+date.toGMTString()+'; SameSite=Strict; Secure; ';
          
            toast.success('Olá '+payload.name+' estamos felizes por ter você conosco!');
            tokenSetter(res.data.token);

            if(!active) {
              stepSetter(1);
            }else{
              setFinished(true);
            }
          }else{
            toast.error('Erro desconhecido ao cadastrar, tente novamente mais tarde');
          }
        }).catch((error) => {
          switch (error.response.status) {
            case 401:
              toast.warning('E-mail já existente');
              break;
            default:
              toast.error('Erro ao cadastrar, tente novamente mais tarde.');
              break;
          }
        });
    },
  });

  useEffect(() => {
    if(finished){
      api.post(`/users/students`, {
        user_id: userId,
        interest: ""
      }).then(res => {
          window.location.assign('/');
        }).catch(error => {
          toast.error('Erro interno, informar administradores');
        });
    }
  }, [userId]);


  useEffect(() => {
    if(avatar){
      setAvatarUrl(URL.createObjectURL(avatar));
    }else{
      setAvatarUrl(null);
    }
  }, [avatar]);

  return (
    <>
      <Card className="form-content">
        <CardContent>
          <form className="main-form px-3" onSubmit={formik.handleSubmit}>
            <input id="user" type="hidden" name="user" value={formik.values.user} />
            <h3 className="my-3 mb-5 text-center">Olá {formik.values.name}! <br/>Escolha entre lecionar ou ter aulas!</h3>
            <div className="my-3 mb-4 user_group d-flex ">
              <div
                className={`teacher ${!active ? "active" : ""}`}
                onClick={() => handleUser(0, formik.setFieldValue)}
              >
                <GiTeacher className="icon d-block explore" />
                <span>Sou Professor!</span>
              </div>
              <div
                className={`student ${active ? "active" : ""}`}
                onClick={() => handleUser(1, formik.setFieldValue)}
              >
                <IoPerson className="icon d-block" />
                <span>Sou Aluno!</span>
              </div>
            </div>
          {avatar 
            ?
              <div className="d-flex flex-wrap">
                <div className="erase_avatar" onClick={() => setAvatar(undefined)}><div className="d-flex align-items-center"><FaTimes className="mr-1" /> Remover</div></div>
                <div className="w-100">
                  <div className="content-image d-flex justify-content-center">
                      <div style={{backgroundImage: `url(${avatarUrl})`}} />
                  </div>
                  <p className="text-center w-100 mt-1" style={{fontSize: `0.75rem`}}><b>90x90 Pixels</b></p>
                </div>
              </div>
            :
            ''
          }         
          <div className="mt-1 text-center">
              <input
                accept="image/*"
                type="file"
                id="avatar"
                name="avatar"
                className="d-none"
                onChange={e => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar">
                <Button
                  className={active ? "btn-register" : "btn-register-secondary"}
                  variant="contained"
                  fullWidth
                  component="span"
                >
                  <AiFillCamera className="mr-1"/> Escolha uma imagem de perfil
                </Button>
              </label>
            </div>

            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nome"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              fullWidth
              id="date"
              name="dateBirth"
              label="Data de nascimento"
              type="date"
              // defaultValue="2000-01-01"
              value={formik.values.dateBirth}
              onChange={formik.handleChange}
              error={
                formik.touched.dateBirth && Boolean(formik.errors.dateBirth)
              }
              helperText={formik.touched.dateBirth && formik.errors.dateBirth}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <InputMask
              mask="99999-999"
              disabled={false}
              maskChar=""
              onChange={(ev) => (onChangeCep(ev, formik.setFieldValue), formik.handleChange)}
            >
              {() => (
                <TextField
                  placeholder="CEP"
                  name="zipCode"
                  type="text"
                  fullWidth
                />
              )}
            </InputMask>

            <TextField
              className="select"
              name="state"
              label="Estado"
              fullWidth
              select
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              disabled
            >
              <MenuItem selected disabled>
                Selecione seu estado
              </MenuItem>
              <MenuItem value="AC">Acre</MenuItem>
              <MenuItem value="AL">Alagoas</MenuItem>
              <MenuItem value="AP">Amapá</MenuItem>
              <MenuItem value="AM">Amazonas</MenuItem>
              <MenuItem value="BA">Bahia</MenuItem>
              <MenuItem value="CE">Ceará</MenuItem>
              <MenuItem value="DF">Distrito Federal</MenuItem>
              <MenuItem value="ES">Espírito Santo</MenuItem>
              <MenuItem value="GO">Goiás</MenuItem>
              <MenuItem value="MA">Maranhão</MenuItem>
              <MenuItem value="MT">Mato Grosso</MenuItem>
              <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
              <MenuItem value="MG">Minas Gerais</MenuItem>
              <MenuItem value="PA">Pará</MenuItem>
              <MenuItem value="PB">Paraíba</MenuItem>
              <MenuItem value="PR">Paraná</MenuItem>
              <MenuItem value="PE">Pernambuco</MenuItem>
              <MenuItem value="PI">Piauí</MenuItem>
              <MenuItem value="RJ">Rio de Janeiro</MenuItem>
              <MenuItem value="RN">Rio Grande do Norte</MenuItem>
              <MenuItem value="RS">Rio Grande do Sul</MenuItem>
              <MenuItem value="RO">Rondônia</MenuItem>
              <MenuItem value="RR">Roraima</MenuItem>
              <MenuItem value="SC">Santa Catarina</MenuItem>
              <MenuItem value="SP">São Paulo</MenuItem>
              <MenuItem value="SE">Sergipe</MenuItem>
              <MenuItem value="TO">Tocantins</MenuItem>
            </TextField>

            <TextField
              fullWidth
              id="city"
              name="city"
              label="Cidade"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              disabled
            />

            <TextField
              fullWidth
              id="district"
              name="district"
              label="Bairro"
              value={formik.values.district}
              onChange={formik.handleChange}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
              disabled
            />

            <TextField
              fullWidth
              id="address"
              name="address"
              label="Endereço"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />

            <Button
              className={active ? "btn-register" : "btn-register-secondary"}
              variant="contained"
              fullWidth
              type="submit"
            >
              {active 
                ? 'Registrar'
                : 'Próxima Etapa'
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
  
}
