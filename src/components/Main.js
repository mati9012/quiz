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

export default function Main(props) {
    const [isActive, setActive] = useState(false);

    window.addEventListener("scroll", function(){
        var header = this.document.querySelector("header");
        header.classList.toggle("sticky", this.window.scrollY > 0)
    })

    
    // var ham = document.querySelector(".hamburger");
    // var men = document.querySelector(".navmenu");

    // // ham.addEventListener("click", function(){
    // //     ham.classList.toggle("active");
    // //     men.classList.toggle("active");
    // // })

    // const nav = () =>{
    //     ham.classList.toggle("active");
    //     men.classList.toggle("active");
    // }

    const handleToggle = () => {
        setActive(!isActive);
      };
    //   document.addEventListener('contextmenu', event => event.preventDefault());

    return(
        
        <>
        <NotificationContainer />
        <div class="loadingio-spinner-ellipsis-qhk7offi34"><div class="ldio-e7sipi1dll">
        <div></div><div></div><div></div><div></div><div></div>
        </div></div>
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
            <div className="infoDiv">
                <h1 className="gtit">CyberQuizz</h1>
                <p className="gtext">to gra o cyberbezpieczeństwie umożliwiająca naukę przez zabawę tego jak postępować w internecie i być bezpiecznym.</p>
            </div>
        </section>


        </>
    )
}
