import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './component/Home';
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
<<<<<<< HEAD
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
=======

>>>>>>> 3fae22783a8bf06b88e2b6a0319f0834d0c16cf9
  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<Home />} />
=======
>>>>>>> 3fae22783a8bf06b88e2b6a0319f0834d0c16cf9
        <Route path='/login' element={<LoginForm setUser={setUser} setIsLogged={setIsLogged} />} />
        <Route path='/signin' element={<SigninForm />} />
        <Route path='/trombinoscope' element={<Trombinoscope/>} />
        <Route path='/trombinoscope/:id' element={<AnimalProfil/>}/>
        <Route path='/profil' element={<ProfilUser user={user} isLogged={isLogged}/>}/>
        <Route path='/preferences' element={<Preferences isLogged={isLogged}/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;