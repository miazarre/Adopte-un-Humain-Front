import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Header from './component/Header';
import Footer from './component/Footer';
import LoginForm from './component/LoginForm';
import SigninForm from './component/SigninForm';
import Board from './component/Board';
import Users from './component/Users';
import Animals from './component/Animals';
import Adoptions from './component/Adoptions';
import Trombinoscope from './component/Trombinoscope';
import AnimalProfil from './component/AnimalProfil';
import AdoptionsDetail from './component/AdoptionsDetail';

import './styles/index.scss';
import './styles/reset.scss';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/board' element={<Board />} />
          <Route path='/users' element={<Users />} />
          <Route path='/animals' element={<Animals />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/trombinoscope' element={<Trombinoscope/>} />
          <Route path='/trombinoscope/:id' element={<AnimalProfil/>} />
          <Route path='/adoptions' element={<Adoptions />} />
          <Route path='/adoptions/:id' element={<AdoptionsDetail />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
