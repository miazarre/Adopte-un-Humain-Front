import Header from './component/Header';
import Footer from './component/Footer';
import Board from './component/Board';
import Users from './component/Users';
import Animals from './component/Animals';
import './styles/index.scss';
import './styles/reset.scss';

function App() {
  return (
    <>
      <Header/>
      <Users /> 
      <Footer/>
    </>
  );
}

export default App;
