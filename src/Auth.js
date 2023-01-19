import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ChakraProvider, color } from '@chakra-ui/react'
import { useState } from "react";
import '../src/Auth.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import AuthInfo from  './components/Auth/AuthInfo'
import 'react-notifications/lib/notifications.css';
import RegPanel from './components/Auth/RegPanel';
import Main from "./components/Main.js";




import {
  Input,
  Button,
} from '@chakra-ui/react'

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'



function App() {
    return (
      <BrowserRouter>
        <Routes>
            {/* <Route index element={} /> */}
        </Routes>
      </BrowserRouter>
    );
  }

  
function Reg() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={RegPanel} />
      </Routes>
    </BrowserRouter>
  );
}

export default function Auth(props) {
    const  [login, setLogin] = useState("");
    const  [pass, setPass] = useState("");

    const  [showI, setShowI] = useState(false);



    const changeLogin= event => {
        const value = event.target.value;
        setLogin(value);
    }

    const changePassword= event => {
        const value = event.target.value;
        setPass(value);
    }
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
 
    // document.addEventListener('contextmenu', event => event.preventDefault());
    const checkLogin = async () => {
        console.log(login)
        if(login === "" || pass === ""){
            return NotificationManager.warning("Nie wypełniłeś pól!");
         } else{
            const log = await axios.get(`https://backend.dlamati9012.repl.co/api/login/${login}/${pass}`)
            console.log(log.data)
            if(log.data === "Nie ma takiego użytkownika!"){
                return NotificationManager.warning(log.data);
            } else if(log.data === "Podano złe hasło!"){
                return NotificationManager.warning(log.data);
            }else if(log.data === "Zalogowano prawidłowo!"){
                ReactDOM.render(<Main />, document.getElementById("root"));
                window.localStorage.setItem("isLogged", true)
                window.localStorage.setItem("login", login)
                const log2 = await axios.get(`https://backend.dlamati9012.repl.co/api/user/${login}`)
                console.log(log2.data.name)
                window.localStorage.setItem("name", log2.data.name)
                return NotificationManager.success(log.data);
            }
           console.log(log.data);
         }
    }

    const register = async () => {
      ReactDOM.render(<RegPanel />, document.getElementById("root"));
  }

    const noAcc = async () => {
      ReactDOM.render(<Main />, document.getElementById("root"));
      return NotificationManager.warning('Podczas gry bez konta punkty nie zostaną ci dodane!');
    }



    return (
      
      <>

      <section>
      <NotificationContainer />

          <div className="box-auth">

          <span></span>

              <span></span>
              <span></span>
              <span></span>


              {/* <div className="form_icon" aria-hidden="true"></div> */}
              <Avatar src='https://bit.ly/broken-link' className="av"/>
              <div className="title">
                  <h1>LOGOWANIE</h1>
              </div>
              
              <Input onChange={changeLogin} placeholder=" Wpisz login" w={260} h={50} className="inp"/>
              <Input onChange={changePassword} placeholder=" Wpisz haslo" type={show ? 'text' : 'password'} w={260} h={50} className="inp"/>
              <Button onClick={( ) => checkLogin()} w={300} h={50} colorScheme='blue' className="login">ZALOGUJ SIE</Button>

                <a onClick={( ) => register()} colorScheme='blue' className="reg">ZARAJESTRUJ SIE</a>


                <a onClick={() => noAcc()} className="bez">KONTYNUUJ JAKO GOSC</a>



          </div>


    
          <InfoOutlineIcon className="info" color="#fff" w="30px" h="30px" />
          <AuthInfo />
      </section> 
      </>
        
     )   
    
}

function MainApp(){
    return (
      <ChakraProvider>
        <Auth />
      </ChakraProvider>
    )
  }