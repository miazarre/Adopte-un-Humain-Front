import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';
import LoginForm from './component/LoginForm';
import SigninForm from './component/SigninForm';
import Trombinoscope from './component/Trombinoscope';
import AnimalProfil from './component/AnimalProfil';
import ProfilUser from './component/ProfilUser';
import Preferences from './component/Preferences';
import './styles/index.scss';
import './styles/reset.scss';

import React, { useState } from 'react';


function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState() ;

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
        <Route path='/login' element={<LoginForm setUser={setUser} setIsLogged={setIsLogged} />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/trombinoscope' element={<Trombinoscope isLogged={isLogged}/>} />
        <Route path='/trombinoscope/:id' element={<AnimalProfil/>}/>
        <Route path='/profil' element={<ProfilUser user={user} isLogged={isLogged} />}/>
        <Route path='/preferences' element={<Preferences isLogged={isLogged}/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
