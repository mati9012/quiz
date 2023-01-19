import './App.css';
import Auth from './Auth';
import { ChakraProvider } from '@chakra-ui/react'
import Main from './components/Main';
import Quiz from './components/Quiz'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Pytania from './components/Pytania';
import End from './components/End';

// document.addEventListener('contextmenu', event => event.preventDefault());

function App() {
  const log = window.localStorage.getItem("isLogged") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={log ? <Main /> : <Auth />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/pytania" element={<Pytania />} />
        <Route path="/quiz/end" element={<End />} />
      </Routes>
    </Router>


  );
}

export default App;







