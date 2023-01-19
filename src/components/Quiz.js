import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ChakraProvider, color } from '@chakra-ui/react'
import { useState, useRef } from "react";
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
import Pytania from "./Pytania";





import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input
  } from '@chakra-ui/react'


import Auth from "../Auth";

export default function Quizz(props) {
    const [isActive, setActive] = useState(false);


    window.addEventListener("scroll", function(){
        var header = this.document.querySelector("header");
        header.classList.toggle("sticky", this.window.scrollY > 0)
    })
    // document.addEventListener('contextmenu', event => event.preventDefault());
    const handleToggle = () => {
        setActive(!isActive);
      };

    function startQuiz(){
        console.log("start")
        ReactDOM.render(<Pytania />, document.getElementById("root"));
        window.localStorage.setItem("dobre", "")
    }
    function hideElements(){
        var div = document.getElementById("qdiv");
        div.classList.toggle("none")
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
                        <li><a href="quiz" className="navitem">Quiz</a></li>
                    </ul>


                <div className={isActive ? "hamburger active" : "hamburger"} onClick={handleToggle}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>

        <InfoOutlineIcon className="info" color="#fff" w="30px" h="30px" />
        <AuthInfo />
        <section>
            <div className="infoDiv" id="qdiv">
                <h1 className="gtit">Quizz</h1>
                <p className="gtext">Polega na wybieraniu odpowiedniej odpowiedzi do podanego pytania. Po każdej poprawnej odpowiedzi zdobywasz punkty! Uwaga jeśli nie masz konta punkty nie zostaną naliczone!</p>
                <h1 className="qstart" ><a href="/quiz/pytania">Start</a></h1>
            </div>
        </section>


        </>
    )
}
