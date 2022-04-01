//import TesteConsomeApi from './components/TesteConsomeAPI'
import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <AuthProvider>
        
        <Routes />

        {/* PARA EXIBIR TODAS MENSAGENS PARA O USUÁRIO: */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </>
  );
}

export default App;