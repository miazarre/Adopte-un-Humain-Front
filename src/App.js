import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';
import LoginForm from './component/LoginForm';
import SigninForm from './component/SigninForm';
import './styles/index.scss';
import './styles/reset.scss';
import Trombinoscope from './component/Trombinoscope';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signin' element={<SigninForm />} />
      </Routes>
      <Trombinoscope/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
