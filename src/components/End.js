import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Button, ChakraProvider, color } from '@chakra-ui/react'
import { useState } from "react";
import './Main.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import AuthInfo from  './Auth/AuthInfo'
import 'react-notifications/lib/notifications.css';
import RegPanel from './Auth/RegPanel';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import UserPanel from './UserPanel'
import { StarIcon } from '@chakra-ui/icons'

export default function End(props){
    const [isActive, setActive] = useState(false);
    // document.addEventListener('contextmenu', event => event.preventDefault());

    
    const handleToggle = () => {
        setActive(!isActive);
      };

      const getProc = () =>{
        let dob = window.localStorage.getItem("dobre");
        let idobre = parseInt(dob);
        let proc = idobre * 100 / 10;
        let res = parseInt(proc)

        return res
      }

    function end(){
        window.localStorage.setItem("dobre", "")
    }

    return(
        <>
                <NotificationContainer />
        <header>
            <nav className="nav">
{/* 
            <Avatar src='https://bit.ly/broken-link' className="avm"/> */}
                <UserPanel />
                

                    <ul className={isActive ? "navmenu active" : "navmenu"} >
                        <li><a href="/" className="navitem">Główna</a></li>
                        <li><a href="/quiz" className="navitem">Quiz</a></li>
                    </ul>


                <div className={isActive ? "hamburger active" : "hamburger"} onClick={handleToggle}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
        <section>
            <div className="endDiv">
                <h1>Koniec Quizzu</h1>
                <p>Udało ci się ukończyć quizz o cyberbezpieczeństwie! Gratulacje!</p>
                <h5>Zdobyłeś:</h5>
                <div className="zdobyte">
                    <StarIcon color='yellow' className="picon2" scale="20%"/>
                    <p>{window.localStorage.getItem("dobre")}</p>
                </div>
                <span>{"Twój wynik: " +  getProc() + "%"}</span>

                <a href="/quiz" onClick={end}>Koniec</a>
            </div>
        </section>
        </>
    )
}