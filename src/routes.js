import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { RequestProvider } from './hooks/useRequest';
import { RegisterProvider } from './hooks/useRegister';
import { HelpProvider } from './hooks/useHelpManager';
import { useAuth } from './hooks/useAuth';

import index from './pages/index';
import sobre from './pages/sobre';
import ajuda from './pages/ajuda';
import register from './pages/register';
import requests from './pages/requests';
import studentRequests from './pages/studentRequests';
import sendRequest from './pages/sendRequest';
import explorar from './pages/explorar';
import profile from './pages/perfil';
import teacherProfile from './pages/teacherProfile';

import Header from './components/Header';
import Footer from './components/Footer';

import { toast } from 'react-toastify';
import ScrollToTop from './ScrollToTop';
import NotFound from './pages/404';

export default function Routes() {

  const { token } = useAuth();

  const PrivateRoute = ( { component: Component, ...rest } ) => (
    <Route 
      {...rest} 
      render={props => 
        token ? (
          <Component {...props} />
        ) : (
            toast.warn('É necessário estar logado para acessar esta página, cadastre-se'),
            <Redirect to={{ pathname: '/register', state: { from: props.location } }} />
        )
      }
    />
  );

  return(
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <RequestProvider>
          <Header />
            <Route exact path='/' component={index}/>
            <Route exact path='/sobre' component={sobre}/>
            <HelpProvider>
              <Route exact path='/ajuda' component={ajuda}/>
            </HelpProvider>
            <RegisterProvider>
              <Route exact path='/register' component={register}/>
            </RegisterProvider>
            <PrivateRoute exact path='/perfil' component={profile} />
            <PrivateRoute exact path='/teacherProfile' component={teacherProfile} />
            <PrivateRoute exact path='/send' component={sendRequest}/>
            <PrivateRoute exact path='/explorar' component={explorar}/>
            <PrivateRoute exact path='/requests' component={requests}/>
            <PrivateRoute exact path='/studentRequests' component={studentRequests}/>
            <Route exact path="/nadaEncontrado" component={NotFound} />

            {
              (window.location.pathname !== '/' && window.location.pathname !== '/ajuda' && window.location.pathname !== '/register'
                && window.location.pathname !== '/perfil' && window.location.pathname !== '/send' && window.location.pathname !== '/explorar'
                && window.location.pathname !== '/requests' && window.location.pathname !== '/studentRequests' && window.location.pathname !== '/sobre'
                ?
                  <Redirect to="/nadaEncontrado" />
                :
                  ''
              )
            }
          <Footer />
        </RequestProvider>
      </Switch>
    </BrowserRouter>
  );
}