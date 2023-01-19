import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ChakraProvider, color } from '@chakra-ui/react'
import { useState } from "react";
import '../../Auth.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import AuthInfo from  './AuthInfo'
import 'react-notifications/lib/notifications.css';
import Auth from '../../Auth';
import Main from "../Main";


import {
  Input,
  Button,
} from '@chakra-ui/react'

import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

export default function EditLicense(props){
    const [showForm, setShowForm] = useState(false)
    const  [login, setLogin] = useState("");
    const  [pass, setPass] = useState("");
    const  [pass2, setPass2] = useState("");
    const  [name, setName] = useState("");

    // document.addEventListener('contextmenu', event => event.preventDefault());

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    

    
    const changeLogin= event => {
        const value = event.target.value;
        setLogin(value);
    }

    const changePassword= event => {
        const value = event.target.value;
        setPass(value);
    }

    const changePass2= event => {
        const value = event.target.value;
        setPass2(value);
    }

    const changeName= event => {
        const value = event.target.value;
        setName(value);
    }

    const register = async () => {
        console.log(login)
        if(login === "" || pass === "" || name === "" || pass2 === ""){
            return NotificationManager.warning("Nie wypełniłeś pól!");
         } else{
            if (pass !== pass2){
                return NotificationManager.warning("Hasła nie są identyczne!");
            }
            const log = await axios.get(`https://backend.dlamati9012.repl.co/api/register/${login}/${pass}/${name}`)
            console.log(log.data)
            if(log.data === "Taki użytkownik już istnieje!"){
                return NotificationManager.warning(log.data);
            } else if(log.data === "Dodano nowego użytkownika!"){
                ReactDOM.render(<Main />, document.getElementById("root"));
                window.localStorage.setItem("isLogged", true)
                window.localStorage.setItem("name", name)
                window.localStorage.setItem("login", login)
                return NotificationManager.success("Pomyślnie zarejestrowano!");
            } else if(log.data === "Hasło musi zawierać małe i duże litery, cyfry i znaki specjalne!"){
              return NotificationManager.warning(log.data);
            } else if(log.data === "Hasło jest zbyt krótkie!"){
              return NotificationManager.warning(log.data);
            } else if(log.data === "Użytkownik o takiej nazwie juz istnieje"){
              return NotificationManager.warning(log.data);
            }
           console.log(log.data);
         }
    }
    function App() {
        return (
          <BrowserRouter>
            <Routes>
                {/* <Route index element={<Main />} /> */}
            </Routes>
          </BrowserRouter>
        );
      }



      const noAcc = async () => {
        ReactDOM.render(<Main />, document.getElementById("root"));
        return NotificationManager.warning('Podczas gry bez konta punkty nie zostaną ci dodane!');
      }

      const Login = async () => {
        ReactDOM.render(<Auth />, document.getElementById("root"));
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


                  <Avatar src='https://bit.ly/broken-link' className="avr"/>


                <div className="title">
                    <h1>REJESTRACJA</h1>
                </div>
                <Input onChange={changeLogin} placeholder=" Wpisz login" w={260} h={50} className="inp"/>
                <Input onChange={changeName} placeholder=" Wpisz nazwę" w={260} h={50} className="inp"/>
                <Input onChange={changePassword} placeholder=" Wpisz haslo" type={show ? 'text' : 'password'} w={260} h={50} className="inp"/>
                <Input onChange={changePass2} placeholder=" Potwierdź haslo" type={show ? 'text' : 'password'} w={260} h={50} className="inp"/>
                <Button onClick={( ) => register()} w={300} h={50} colorScheme='blue' className="login">ZARAJESTRUJ SIE</Button>

                  <a onClick={( ) => Login()} colorScheme='blue' className="reg">ZALOGUJ SIE</a>


                  <a onClick={() => noAcc()} className="bez">KONTYNUUJ JAKO GOSC</a>



            </div>


      
            <InfoOutlineIcon className="info" color="#fff" w="30px" h="30px" />
            <AuthInfo />
        </section> 
        </>
      );
}