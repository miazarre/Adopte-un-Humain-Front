import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';
// import LoginForm from './component/LoginForm';
import SigninForm from './component/SigninForm';
import Board from './component/Board';
import Users from './component/Users';
import Animals from './component/Animals';
import GestionAnimals from './component/GestionAnimals';

import './styles/index.scss';
import './styles/reset.scss';


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          {/* <Route path='/login' element={<LoginForm />} /> */}
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/board' element={<Board />} />
          <Route path='/users' element={<Users />} />
          <Route path='/animals' element={<Animals />} />
          <Route path='/gestionanimals' element={<GestionAnimals />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
