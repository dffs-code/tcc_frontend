import React, { useLayoutEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Login from '../Login'


import { FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { Modal } from 'react-bootstrap';

import '../../global.css';
import './style.css';

import api from '../../services/api'
import groupFlag from '../../img/groupFlag.svg';
import logo from '../../img/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { BrowserView, MobileView } from 'react-device-detect';

import { FiLogOut } from 'react-icons/fi';
import { GoPencil } from 'react-icons/go';
import { toast } from 'react-toastify';
import { AiFillSetting } from 'react-icons/ai';


export default function Header(props){
    const [login, setLogin] = useState(false);
    const [explore, setExplore] = useState(false);
    const { token, userAvatar, userName, isTeacher, tokenSetter } = useAuth();
    const [categories, setCategories] = useState([]);
    const [randomIndex, setRandomIndex] = useState();
    const [searchedSubject, setSearchedSubject] = useState();
    const [menuChecked, setMenuChecked] = useState(false);
    const history = useHistory();

    const loginClose = () => setLogin(false);
    const loginShow = () => setLogin(true);

    const setHover = (explore) => {
        setExplore(explore);
    }

    const handleInputChange = (event) => {
        setSearchedSubject(event.target.value);
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            history.push(searchedSubject ? `/explorar?subject=${searchedSubject}` : `/explorar`)
        }
    }
    
    useLayoutEffect(()=>{
        api.get('/categories/all/subjects?limit=4').then((response) => {
            setCategories(response.data)
            setRandomIndex(Math.floor(Math.random() * response.data.length))
        });

    }, [])    

    const logout = () => {
        document.cookie = `token=${token}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        tokenSetter();
        toast('🙁 Poxa que pena, volte logo!')   
    }
    
    const greetingMessage = () => {
        let now = new Date().getHours();
        if (now <= 5) return 'Boa madrugada';
        if (now < 12) return 'Bom dia';
        if (now < 18) return 'Boa tarde';
        return 'Boa noite';
      }

    return (
        <>
            <BrowserView>
                <div className="header content-header" id="header">
                    <div className="main-header d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <Link className="link-header" to="/">
                                <div className="logo d-flex">
                                    <img src={logo} className="logo ml-2 link-header" alt="logo Ensina.me"/>
                                </div>
                            </Link>
                            <div className="search-box ml-5 d-flex align-items-center">
                            <Link to={searchedSubject ? `/explorar?subject=${searchedSubject}` : `/explorar`}>
                                <FaSearch className="search-icon"/>
                             </Link>
                                <input className="font-awesome-icon ml-1" type="text" placeholder="O que você quer aprender hoje?" onChange={handleInputChange} onKeyPress={handleKeyPress}/>
                            </div>
                        </div>
                        <nav>
                            <ul className="header-links d-flex">
                                <li 
                                    className="mr-5  position-relative"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                >
                                    <div className="link-header "><Link className="link-header" to="/explorar">Explorar {explore ? <FaAngleUp/> : <FaAngleDown/> } </Link></div>

                                    <CSSTransition in={explore} timeout={80} classNames="explorar-modal">
                                        <div className="explorar-modal">
                                            <div className="bg-modal">
                                                <div className="d-flex px-4 py-4">
                                                    <div className="explore_left">
                                                        <h2 className="primary-color">Temas mais acessados</h2>
                                                        <ul className="temas-section">
                                                            {categories.map((category) => {
                                                                return(
                                                                    <li key={category.id}>
                                                                        <Link className="link-header" to={`/explorar?categoryId=${category.id}`}>
                                                                            {category.description}
                                                                        </Link>    
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <p className="secondary-color mt-4"><u>
                                                            <Link className="link-header" to={"/explorar"}>
                                                                Outros
                                                            </Link>
                                                            </u></p>
                                                    </div>
                                                    <div className="explore_right">
                                                        <img src={groupFlag} alt="Apoie-se na comunidade" />
                                                        <div className="content-right">
                                                            <h4>Indeciso?<br/>Utilize nossa ferramenta e descubra um novo hobby!</h4>
                                                                <Link to={`/explorar?categoryId=${categories[randomIndex] ? categories[randomIndex].id : 5}`}>
                                                                <button className="form-btn">
                                                                    Descubra!
                                                                </button>
                                                                </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CSSTransition>
                                </li>
                                {isTeacher 
                                    ? <li><Link className="link-header mr-5" to="/requests">Solicitações</Link></li>
                                    : <li><Link className="link-header mr-5" to="/studentRequests">Suas solicitações</Link></li>
                                }
                                <li><Link className="link-header mr-5" to="/sobre">Sobre</Link></li>
                                <li><Link className="link-header" to="/ajuda">Ajuda</Link></li>
                            </ul>
                        </nav>
                        {!token 
                            ? 
                                <nav>
                                    <ul className="header-auth d-flex">
                                        <li className="mr-5 link-header" onClick={loginShow}>Login</li>
                                        <li>
                                            <Link className="primary-color" to={
                                                {
                                                    pathname:"/register",
                                                    state: {
                                                        from:"root"
                                                    }
                                                }
                                            }>Inscreva-se</Link>
                                        </li>
                                    </ul>
                                </nav>
                            :
                                <nav className="position-relative">
                                    <ul className="header-links d-flex">
                                        <li className="user-settings d-flex align-items-center">
                                            <div className="welcome-message mr-2">
                                                <span>{greetingMessage()}{userName ? `, ${userName.split(' ')[0]}` : ''}</span>
                                            </div>
                                            <div className="position-relative setting-hover">
                                                { userAvatar 
                                                    ?   
                                                        <div className="content-image d-flex justify-content-start avatar_logged"> 
                                                                <div style={{backgroundImage: `url(${userAvatar})`}} />
                                                        </div>
                                                    : 
                                                        <div className="d-flex justify-content-center align-items-center avatar_logged" id="google_alike">
                                                            <div className="d-flex justify-content-center align-items-center">{ userName ? (userName.charAt(0)).toUpperCase() : ''}</div>
                                                        </div>
                                                }
                                                <div className="position-absolute config-container">
                                                    <AiFillSetting className="chave"/>
                                                </div>
                                                <div className="position-fixed" id="setting-list">
                                                    <ul>
                                                        <li className="d-flex align-items-center mb-2">
                                                            <GoPencil className="mr-2"/> <Link className="link-header mr-5" to="/perfil">Editar informações</Link>
                                                        </li>
                                                        <li className="d-flex align-items-center" onClick={logout}>
                                                            <FiLogOut className="mr-2"/> Logout
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                        }
                    </div>
                </div>
            </BrowserView>

            <MobileView>
                <div className="header content-header row" id="header_mobile">
                    <div className="d-flex align-items-center justify-content-around w-100">
                        <Link className="link-header" to="/" onClick={() => setMenuChecked(false)}>
                            <div className="logo d-flex">
                                <img src={logo} className="logo_mobile" alt="logo Ensina.me"/>
                            </div>
                        </Link>

                        <nav role="navigation">
                            <div id="menuToggle" onClick={() => setMenuChecked(!menuChecked)}>
                                <input type="checkbox" checked={menuChecked} />
                                <span></span>
                                <span></span>
                                <span></span>
                                <ul id="menu" className={menuChecked ? 'active' : ''}>
                                    <li className={!token ? 'user-settings d-flex align-items-center mobile_adjustment' : 'user-settings d-flex align-items-center noborder'}>
                                        <div className="position-relative">
                                            {!token 
                                                ? 
                                                    <>
                                                        <li><a href="#" onClick={loginShow}>Login</a></li>
                                                        <li><a href="/register" onClick={() => setMenuChecked(false)}>Inscrever-se</a></li>
                                                    </>
                                                :
                                                    userAvatar 
                                                    ?   
                                                        <div className="content-image d-flex justify-content-start "> 
                                                                <div style={{backgroundImage: `url(${userAvatar})`}} />
                                                        </div>
                                                    : 
                                                        <div className="d-flex justify-content-center align-items-center " id="google_alike">
                                                            <div className="d-flex justify-content-center align-items-center">{ userName ? (userName.charAt(0)).toUpperCase() : ''}</div>
                                                        </div>
                                            }
                                        </div>
                                    </li>
                                    
                                    {isTeacher 
                                        ? <li><Link className="text-center" to="/requests" onClick={() => setMenuChecked(false)}>Solicitações</Link></li>
                                        : <li><Link className="text-center" to="/studentRequests" onClick={() => setMenuChecked(false)}>Suas solicitações</Link></li>
                                    }
                                    <li><Link className="text-center" to="/explorar" onClick={() => setMenuChecked(false)}>Explorar</Link></li>
                                    <li><Link className="text-center" to="/sobre" onClick={() => setMenuChecked(false)}>Sobre</Link></li>
                                    <li><Link className="text-center" to="/ajuda" onClick={() => setMenuChecked(false)}>Ajuda</Link></li>
                                    {token 
                                        ? 
                                        <>
                                            <li className="d-flex align-items-center justify-content-center" onClick={() => setMenuChecked(false)} >
                                                <GoPencil className="mr-2"/> <Link className="text-center" to="/perfil" onClick={() => setMenuChecked(false)}>Editar Perfil</Link> 
                                            </li>
                                            <li className="d-flex align-items-center justify-content-center mt-5 noborder primary-color" onClick={() => setMenuChecked(false), logout} >
                                                <FiLogOut className="mr-2"/> Logout
                                            </li>
                                        </>
                                        :
                                        ''
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </MobileView>  
    

            <Modal show={login} onHide={loginClose} id="modal_form">
                <Login loginClose={loginClose}/>
            </Modal>
        </>
    );
}