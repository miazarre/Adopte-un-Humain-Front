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

import React from 'react';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/trombinoscope' element={<Trombinoscope/>} />
        <Route path='/trombinoscope/:id' element={<AnimalProfil/>}/>
        <Route path='/profil' element={<ProfilUser/>}/>
        <Route path='/preferences' element={<Preferences/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
