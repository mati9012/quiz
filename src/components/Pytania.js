import React from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Button, ChakraProvider, color } from '@chakra-ui/react'
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
import End from "./End";



import { ArrowForwardIcon } from '@chakra-ui/icons'

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText
} from '@mui/material'


import Auth from "../Auth";
import end from "./End";

export default function Pytania(props) {
    const [isActive, setActive] = useState(false);
    const [isOpen, setOpen] = useState(false);

    let pytania = [
        {
            pytanie: "Wybierz hasło zgodne z wymaganiami co do złożoności.",
            dobra: "D!p@0lS6",
            odp2: "malypiesek123",
            odp3: "1234",
            odp4: "R$sb",
            info: "Silne hasło powinno zawierać co najmniej 8 znaków. Musi zawierać wielkie i małe litery, cyfry i znaki specjalne."
        },
        {
            pytanie: "Nieznajoma osoba pyta się gdzie mieszkasz, co robisz?",
            dobra: "Pod żadnym pozorem nie podajesz swojego adresu.",
            odp2: "Po prostu mówisz mu prawdę",
            odp3: "Okłamujesz go i podajesz jakiś losowy adres z twojej miejscowości",
            odp4: "Podajesz adres swojego kolegi",
            info: "Nigdy nie podawaj swoich danych i tym podobnych nieznajomym osobom!"
        },
        {
            pytanie: "Dostaniesz mailem ofertę sprzedaży sprzętu elektronicznego, który planujesz kupić. Cena jest bardzo dobra, bo właśnie trwa promocja. Wchodzisz na stronę sklepu, gdzie znajdujesz ofertę niższą o 30% od cen regularnych. Jak zachowasz się w takiej sytuacji?",
            dobra: `Przed zakupem w jakimkolwiek
            sklepie internetowym najpierw
            sprawdzam opinie na jego temat.
            `,
            odp2: `Dzwonie na podany na stronie
            numer telefonu i przed zakupem
            upewniam sie, czy oferta jest
            prawdziwa,
            `,
            odp3: `Ciesze sie z okazji i kupuje taniej
            sprzet, o którym marze.
            `,
            odp4: `Odpowiadam na maila i pytam czy oferta nadal aktualna.`,
            info: "Zawsze należy upewnić sie czy sklep ma pozytywne opinie i nie jest to żadne oszustwo"
        },
        {
            pytanie: `Czekasz na paczkę od kuriera, wreszcie dostajesz sms z informacją, że dostawa nie jest możliwa z powodu zbyt dużej paczki. W SMS jest link i kwota do dopłacenia. Co robisz?`,
            dobra: `Dzwonię do firmy kurierskiej i pytam czy z moją paczką są problemy.`,
            odp2: `Klikam w link i dopłacam tą kwotę.`,
            odp3: `Wchodzę na stronę i sprawdzam czy jest prawdziwa.`,
            odp4: `Nic nie robisz, ignorujesz SMS'a`,
            info: `Firma kurierska zawsze wyjaśni czy są jakieś problemy i czy należy dopłacić (najczęściej nie ma takich problemów)`
        },
        {
            pytanie: `Dostajesz maila z informacją o nieprawidłowych danych powiązanych z kontem bankowym. W załączniku znajduje sie instrukcja jak to naprawić. Co robisz?`,
            dobra: `Dzwonisz do banku i pytasz się czy faktycznie jest taki problem.`,
            odp2: `Otwierasz plik i poprawiasz swoje dane.`,
            odp3: `Sprawdzasz czy możesz zalogować sie na konto i poprawiasz dane.`,
            odp4: `Otwierasz plik ale nic nie robisz.`,
            info: `Zawsze należy sprawdzać prawdziwość maili od "banku". Otwieranie nieznanych linków może zakończyć sie utratą pieniędzy!`
        },
        {
            pytanie: `Dzwoni do ciebie osoba podająca się za pracownika banku. Podaje twoje dane w celu uwiarygodnienia. Prosi abyś zainstalował nową aplikację banku. Co robisz?`,
            dobra: `Rozłączam się i dzwonię do banku.`,
            odp2: `Proszę o dane tej osoby aby sprawdzić jej wiarygodność i instaluję aplikację`,
            odp3: `Po prostu się rozłączam.`,
            odp4: `Instaluję nową aplikację i się loguję.`,
            info: `Zawsze sprawdzaj czy "telefony od banku" są faktycznie telefonami od twojego banku.`
        },
        {
            pytanie: `Dzwoni do ciebie osoba podająca sie za policjanta i informuje cię, że twoja siostra miała wypadek i potrzebne są pieniądze. Co robisz?`,
            dobra: `Od razu się rozłączam i dzwonię na policję.`,
            odp2: `Proszę ją o podanie swojego imienia i nazwiska po czym przelewam pieniądze.`,
            odp3: `W panice przelewam pieniądze`,
            odp4: `Proszę o podanie jakichś informacji w celu sprawdzenia wiarygodności po czym przelewam pieniądze.`,
            info: `Policja nie bedzie dzwoniła do ciebie w sprawie wypadku a na pewno nie będzie prosiła o pieniądze.`
        },
        {
            pytanie: `Dostajesz wiadomość od kolegi który prosi cię o polubienie jego zdjęcia. Wysyła ci podejrzany link. Sposób w jaki napisana jest wiadomość jest podejrzany. Co robisz?`,
            dobra: `Dzwonisz do kolegi i pytasz się czy to on wysłał tą wiadomość i czy strona jest bezpieczna.`,
            odp2: `Otwierasz link bo to przecież od twojego kolegi, ale on się nie ładuje.`,
            odp3: `Otwieram link i informuję kolegę, że on nie działa`,
            odp4: `Otwieram link na komputerze, bo tam mam oprogramowanie antywirusowe`,
            info: `Nigdy nie otwieraj linków z podejrzanych wiadomości. Zawsze upewnij się czy są bezpieczne.`
        },
        {
            pytanie: `Która firma jest najbardziej narażona na cyberatak`,
            dobra: `Mała firma`,
            odp2: `Duża firma`,
            odp3: `Średnia firma`,
            odp4: `Prywatna, bardzo mała i mało znana firma`,
            info: `Wszystkie te firmy mogą być narażone na ataki lecz większe firmy mają zazwyczaj lepsze zabezpieczenia.`
        },
        {
            pytanie: `Aby być bardziej anonimowym w sieci należy używać`,
            dobra: `bramek proxy`,
            odp2: `programu antywirusowego`,
            odp3: `VPN`,
            odp4: `TOR`,
            info: `Każdy komputer ma swój adres IP po którym można nas zidentyfikować.`
        },
        {
            pytanie: `Która nazwa nie jest nazwą programu antywirusowego`,
            dobra: `Firewall`,
            odp2: `Avast`,
            odp3: `Malwarebytes`,
            odp4: `AVG`,
            info: `Firewall nie jest antywirusem`
        },
        {
            pytanie: `Co to są pliki cookies`,
            dobra: `mały fragment tekstu, który serwis internetowy wysyła do przeglądarki i który przeglądarka wysyła z powrotem przy następnych wejściach na witrynę.`,
            odp2: `nic nieznaczące ciasteczka`,
            odp3: `pliki tekstowe, które strona pobiera ci na komputer.`,
            odp4: `Wszystkie pobrane pliki`,
            info: `Używane są one głównie do utrzymywania sesji np. poprzez wygenerowanie i odesłanie tymczasowego identyfikatora po logowaniu.`
        },
        {
            pytanie: `Jeżeli chcemy sprawdzić czy bezpiecznie możemy wejść na jakąś stronę korzystamy z`,
            dobra: `Skanera antywirusowego do stron internetowych np Virustotal`,
            odp2: `Własnego rozumu`,
            odp3: `Opini w internecie`,
            odp4: `Nie sprawdzamy`,
            info: `Zawsze warto sprawdzić czy strona jest bezpieczna.`
        },
        {
            pytanie: `Idąc przez park znalazłeś pendrive co robisz.`,
            dobra: `Na pewno nie podłączasz go do swojego komputera`,
            odp2: `Pytasz się czy nikt nie zgubił pendriva`,
            odp3: `Podłączasz go do komputera i sprawdzasz co na nim jest`,
            odp4: `Idziesz go sprzedać`,
            info: `Nigdy nie podłączaj użądzeń z nieznanych źródeł do swojego komputera.`
        },
        {
            pytanie: `Ile minimum znaków powinno posiadać silne hasło`,
            dobra: `8`,
            odp2: `4`,
            odp3: `6`,
            odp4: `100`,
            info: `Hasła powinny mieć co najmniej 8 znaków. W tym małe i wielkie litery, cyfry i znaki specjalne.`
        },
        {
            pytanie: `Co powinno zawierać silne hasło`,
            dobra: `Minimum 8 znaków, małe i wielkie litery, cyfry i znaki specjalne.`,
            odp2: `Tylko małe litery`,
            odp3: `Błędy ortograficzne`,
            odp4: `Minimum 4 znaki, cyfry i litery`,
            info: `Hasła powinny mieć co najmniej 8 znaków. W tym małe i wielkie litery, cyfry i znaki specjalne.`
        },
        {
            pytanie: `Wchodzisz na nieznaną stronę, która prosi o zalogowanie się. Wymaga ona podania numeru telefonu i danych karty bankowej. Co robisz?`,
            dobra: `Nie podaję tych danych, po prostu opuszczam stronę.`,
            odp2: `Skanuję ją i podaję dane.`,
            odp3: `Od razu podaję dane, ponieważ strona wygląda bezpiecznie.`,
            odp4: `Podaję dane rodziców.`,
            info: `Nigdy nie podawaj takich danych na nieznanych stronach!`
        },
        {
            pytanie: `Co oznacza litera "s" dodawana po "http" w linku do strony.`,
            dobra: `Oznacza secure czyli bezpieczny.`,
            odp2: `Nic nie oznacza.`,
            odp3: `Dodawana jest dla ładniejszego wyglądu.`,
            odp4: `Oznacza summer czyli lato`,
            info: `HTTPS to protokół HTTP chroniony przy pomocy szyfrowania protokołu TLS (dawniej SSL).`
        },
        {
            pytanie: `Co nie jest sposobem weryfikacji dwuetapowej?`,
            dobra: `Linki wielokrotnego użytku`,
            odp2: `Jednorazowe kody wysyłane SMS`,
            odp3: `Jednorazowe Kody wysyłane mailem`,
            odp4: `Czasowe kody w aplikacji`,
            info: `Weryfikacja dwuetapowa utrudnia zalogowanie się na twoje konto nawet znając hasło i login.`
        },
        {
            pytanie: `Która aplikacja generuje kody weryfikacji dwuetapowej?`,
            dobra: `Google Authenticator`,
            odp2: `Teams`,
            odp3: `SnapChat`,
            odp4: `Google Chrome`,
            info: `Google Authenticator generuje kody weryfikacji dwuetapowej na Twoim telefonie. Weryfikacja dwuetapowa zapewnia większe bezpieczeństwo.`
        },
    ]

    let asasd = window.localStorage.getItem("tessst")
    let num = []

    // for (let i = 0; i < asasd.length; i++) {
    //     if(asasd.charAt(i) === ','){

    //     }else{
    //         num.push(asasd.charAt(i))
    //         pytania.splice(i, i)
    //     }

    //   }

    let iiii = window.localStorage.getItem("pind")
    let iii = parseInt(iiii);

    console.log(pytania)

    function disableClick(){
        document.onclick=function(event){
        if (event.button == 2) {
        return false;
        }
        }
        }

        // document.addEventListener('contextmenu', event => event.preventDefault());

    window.addEventListener("scroll", function(){
        var header = this.document.querySelector("header");
        header.classList.toggle("sticky", this.window.scrollY > 0)
    })

    const handleToggle = () => {
        setActive(!isActive);
      };

    function startQuiz(){
        console.log("start")
    }
    function hideElements(){
        var div = document.getElementById("qdiv");
        div.classList.toggle("none")
    }



    var index = 0;
    var nr = index + 1
    var plos = 0;
    let indexOfQues = window.localStorage.getItem("pytanie");




    function getRandomQuestion(){

        let x = Math.floor((Math.random() * pytania.length));
        const p = document.getElementById("p")
        const o1 = document.getElementById("o1")
        const o2 = document.getElementById("o2")
        const o3 = document.getElementById("o3")
        const o4 = document.getElementById("o4")


        plos = x;

        let list = []
        if(window.localStorage.getItem("pytanie") !== ""){
            let p = window.localStorage.getItem("pytanie");
            list.push(pytania[p].pytanie);
            let pindex = [pytania[p].dobra, pytania[p].odp2, pytania[p].odp3, pytania[p].odp4]
            let it = [];
            plos = p;
            indexOfQues = p;
            for(let a = 0; a < 4; a++){
            
                var item = pindex[Math.floor(Math.random()*pindex.length)];
                it.push(item)
    
                var ind = pindex.indexOf(item);
                pindex.splice(ind, 1)
                
            }
            list.push(it)
            list.push(pytania[p].info)
            list.push(index)
        } else{
            let pindex = [pytania[x].dobra, pytania[x].odp2, pytania[x].odp3, pytania[x].odp4]
            let it = [];

    
    
    
            list.push(pytania[x].pytanie);
            for(let i = 0; i < 4; i++){
                
                var item = pindex[Math.floor(Math.random()*pindex.length)];
                it.push(item)
    
                var ind = pindex.indexOf(item);
                pindex.splice(ind, 1)
                
            }
            indexOfQues = x;
            console.log(it)
            list.push(it)
            list.push(pytania[x].info)
            list.push(index)
            window.localStorage.setItem("pytanie", indexOfQues)
        }


        

        return list;






    }

    let s = []
    s = getRandomQuestion();
    console.log(plos)
    console.log(getRandomQuestion())

    var isA = "";

    async function odp1(){
        var p1 = document.getElementById("o1");
        console.log(p1.textContent)
        if (isA !== "") return
        isA = "o1";
        if(pytania[plos].dobra === p1.textContent){
            console.log("dobra odpowiedz")
            p1.classList.toggle("dobra")
            let dobre = window.localStorage.getItem("dobre");
            console.log(dobre)
            if (dobre === ""){
                window.localStorage.setItem("dobre", 1)
            }else{
                let d = parseInt(dobre)
                window.localStorage.setItem("dobre", d += 1)
            }
            const log = await axios.get(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}`)
            let po = parseInt(log.data.points)

            const log2 = await axios.put(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}/${po + 1}`)

            setTimeout(() => {
                p1.classList.toggle("dobra")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }else{
            console.log("zla odpowiedz")
            p1.classList.toggle("zla")
            setTimeout(() => {
                p1.classList.toggle("zla")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }
    }

    async function odp2(){
        var p1 = document.getElementById("o2");
        console.log(p1.textContent)
        if (isA !== "") return
        isA = "o2";
        if(pytania[plos].dobra === p1.textContent){
            console.log("dobra odpowiedz")
            p1.classList.toggle("dobra")
            let dobre = window.localStorage.getItem("dobre");
            console.log(dobre)
            if (dobre === ""){
                window.localStorage.setItem("dobre", 1)
            }else{
                let d = parseInt(dobre)
                window.localStorage.setItem("dobre", d += 1)
            }
            const log = await axios.get(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}`)
            let po = parseInt(log.data.points)

            const log2 = await axios.put(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}/${po + 1}`)
            setTimeout(() => {
                p1.classList.toggle("dobra")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }else{
            console.log("zla odpowiedz")
            p1.classList.toggle("zla")
            setTimeout(() => {
                p1.classList.toggle("zla")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }
    }

    async function odp3(){
        var p1 = document.getElementById("o3");
        console.log(p1.textContent)
        if (isA !== "") return
        isA = "o3";
        if(pytania[plos].dobra === p1.textContent){
            console.log("dobra odpowiedz")
            p1.classList.toggle("dobra")
            let dobre = window.localStorage.getItem("dobre");
            console.log(dobre)
            if (dobre === ""){
                window.localStorage.setItem("dobre", 1)
            }else{
                let d = parseInt(dobre)
                window.localStorage.setItem("dobre", d += 1)
            }
            const log = await axios.get(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}`)
            let po = parseInt(log.data.points)

            const log2 = await axios.put(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}/${po + 1}`)
            setTimeout(() => {
                p1.classList.toggle("dobra")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }else{
            console.log("zla odpowiedz")
            p1.classList.toggle("zla")
            setTimeout(() => {
                p1.classList.toggle("zla")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }
    }

    async function odp4(){
        var p1 = document.getElementById("o4");
        console.log(p1.textContent)
        console.log(pytania[plos].dobra)
        if (isA !== "") return
        isA = "o4";
        if(pytania[plos].dobra === p1.textContent){
            console.log("dobra odpowiedz")
            p1.classList.toggle("dobra")
            let dobre = window.localStorage.getItem("dobre");
            console.log(dobre)
            if (dobre === ""){
                window.localStorage.setItem("dobre", 1)
            }else{
                let d = parseInt(dobre)
                window.localStorage.setItem("dobre", d += 1)
            }

            const log = await axios.get(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}`)
            let po = parseInt(log.data.points)

            const log2 = await axios.put(`https://backend.dlamati9012.repl.co/api/user/points/${window.localStorage.getItem("name")}/${po + 1}`)
            setTimeout(() => {
                p1.classList.toggle("dobra")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        } else{
            console.log("zla odpowiedz")
            p1.classList.toggle("zla")
            setTimeout(() => {
                p1.classList.toggle("zla")
                isA = "";
                setOpen(!isOpen);
            }, 4800)
        }
    }
    let pind = window.localStorage.getItem("pind");
    let sss = parseInt(pind)

    async function nextP(){
        window.localStorage.setItem("pytanie", "")
        if (sss > 9){
            window.localStorage.setItem("pind", 1)
            window.localStorage.setItem("tessst", "")
            console.log("koniec!!!!")
            ReactDOM.render(<End />, document.getElementById("root"));
        } else {
        window.localStorage.setItem("pind", sss += 1);
        let asasd = window.localStorage.getItem("tessst")
        let num = []

        for (let i = 0; i < asasd.length; i++) {
            if(asasd.charAt(i) === ','){
    
            }else{
                num.push(asasd.charAt(i))
                pytania.splice(i, 1)
            }
    
          }
          num.push(indexOfQues)
          console.log(indexOfQues)
          window.localStorage.setItem("tessst", num)
        s = await getRandomQuestion();


        setOpen(!isOpen);
    }
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
        <body onLoad={disableClick}>
        <section>
            <div className="pytanie">
                <h1 className="index" >{"Pytanie " + pind}</h1>
                <h6 className="gtext" id="p">{s[0]}</h6>
            </div>
            <div className="odp">
                <div className="odpowiedz" id="o1" onClick={odp1}>
                    <p>{s[1][0]}</p>
                </div>
                <div className="odpowiedz" id="o2" onClick={odp2}>
                    <p>{s[1][1]}</p>
                </div>
                <div className="odpowiedz" id="o3" onClick={odp3}>
                    <p>{s[1][2]}</p>
                </div>
                <div className="odpowiedz" id="o4" onClick={odp4}>
                    <p>{s[1][3]}</p>
                </div>
            </div>
            <div className={isOpen ? "okno on" : "okno"}>
                <div className="okno1">
                    <h1>{s[0]}</h1>
                    <p>{s[2]}</p>
                </div>
                <div className="okno2">
                    <Button onClick={() => nextP()} className="nextBtn"><ArrowForwardIcon /></Button>
                </div>

            </div>
        </section>
        </body>



        </>
    )
}
