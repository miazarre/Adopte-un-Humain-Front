import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './component/Home';
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
import ProfilUser from './component/ProfilUser';
import Preferences from './component/Preferences';

import './styles/index.scss';
import './styles/reset.scss';
import Favorites from './component/Favorites';

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState() ;
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (animal) => {
    if (favorites.includes(animal)) {
    const newFavorites = favorites.filter((fav) => fav !== animal);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
    const newFavorites = [...favorites, animal];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
};
  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm setUser={setUser} setIsLogged={setIsLogged} />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/trombinoscope' element={<Trombinoscope isLogged={isLogged} favorites={favorites} setFavorites={setFavorites} toggleFavorite={toggleFavorite}/>} />
        <Route path='/trombinoscope/:id' element={<AnimalProfil user={user} isLogged={isLogged} favorites={favorites} setFavorites={setFavorites} toggleFavorite={toggleFavorite}/>}/>
        <Route path='/favorites' element={<Favorites isLogged={isLogged} favorites={favorites} setFavorites={setFavorites} toggleFavorite={toggleFavorite}/>} />
        <Route path='/profil' element={<ProfilUser user={user} isLogged={isLogged} />}/>
        <Route path='/preferences' element={<Preferences isLogged={isLogged}/>}/>
        <Route path='/board' element={<Board />} />
        <Route path='/users' element={<Users />} />
        <Route path='/animals' element={<Animals />} />
        <Route path='/adoptions' element={<Adoptions />} />
        <Route path='/adoptions/:id' element={<AdoptionsDetail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;