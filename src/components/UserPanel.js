import React, { useState, useRef } from "react";
import Main from "./Main";
import { Drawer, Box, Typography } from "@mui/material";
import {Avatar} from '@chakra-ui/react'
import {SettingsIcon, StarIcon} from '@chakra-ui/icons'
import { LogOut } from "./Icons/LogOut";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../Auth";
import axios from "axios";



  export default function UserPanel(props) {
    const [show, setShow] = useState(false);
    const [points, setPoints] = useState(0)

    function logout(){
      window.localStorage.setItem("isLogged", false)
      ReactDOM.render(<Auth />, document.getElementById("root"));
      console.log(localStorage.getItem("login"))
      window.localStorage.setItem("name", "")
    }

    async function getPoints(name){
      const log2 = await axios.get(`http://localhost:3001/api/user/points/${name}`)
      let num = log2.data.points;
      setPoints(num)

    }
    async function renderPoints(){
      const h6 = document.getElementById('poin');
      const h62 = document.getElementById('poin2');
      getPoints(window.localStorage.getItem("name"));
      if(window.localStorage.getItem("name") === ""){
        h6.innerText = "brak"
        h62.innerText = "brak"
      } else{
        h6.innerText = points
        h62.innerText = points
      }

    }
    getPoints(window.localStorage.getItem("name"))
    renderPoints();

    // document.addEventListener('contextmenu', event => event.preventDefault());
    

  
    return (
      <>
      <div className="userdiv">
        <Avatar src='https://bit.ly/broken-link' className="avm" onClick={() => setShow(!show)}/>
        <div className="points2">
                <StarIcon color='yellow' className="picon2" scale="20%"/>
                <h6 id="poin"></h6>
        </div>
      </div>

      <Drawer anchor="left" open={show} onClose={() => setShow(false)}>
        <Box p={2} width="250px" role="presentation">
          <Typography variant="h6" component="div">
            <div className="sec1">
              <div className="sec2">
                <Avatar src='https://bit.ly/broken-link' className="avmin"/>
                <h6 className="Uname">{window.localStorage.getItem("name")}</h6>
              </div>

              <div className="points">
                <StarIcon color='yellow' className="picon"/>
                <h6 id="poin2" className="poinDisplay"></h6>
              </div>
            </div>
            <div className="">
              <div className="ustawienia">
                <SettingsIcon color="#a8a8a8" className="zeb"/>
                <h5>Ustawienia</h5>
              </div>
              <div className="log">
              </div>
              <div className="wyloguj" onClick={() => logout()}>
                  <LogOut color="#a8a8a8" className="zeb"/>
                  <h5>Wyloguj</h5>
                </div>


            </div>

          </Typography>
        </Box>
      </Drawer>
      </>
)
  }




