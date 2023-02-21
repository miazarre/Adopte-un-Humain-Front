import Header from './component/Header';
import Footer from './component/Footer';
import './styles/reset.scss';
import './styles/index.scss';
import Trombinoscope from './component/Trombinoscope';
import AnimalProfil from './component/AnimalProfil'
import { Routes, Route} from "react-router-dom";


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/trombinoscope' element={<Trombinoscope/>} />
        <Route path='/trombinoscope/:id' element={<AnimalProfil/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
