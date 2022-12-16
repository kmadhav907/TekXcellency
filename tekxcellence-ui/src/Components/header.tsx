// import "./ResponsiveHeader.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import {BrowserRouter,  Link,  Route} from "react-router-dom";
import { Switch } from "@mui/material";
// import {HashLink as Link} from "react-router-hash-link";



const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const Header = () => {
  let subtitle: { style: { color: string; }; };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header>
      <div className="wraper-header">
        <div className="logo-header">
          <h1>TEKxcellency</h1>
        </div>
        <nav >
          <ul className="list-header">
            <li>
              {/* <a href="/">AWARDS</a> */}
              <a href="#awards">AWARDS</a>

            </li>
            <li>
              {/* <a href="/">ABOUT US</a> */}
              <a href="#about">ABOUT</a>

            </li>
            <li>
              {/* <a href="/">SHARE</a> */}
              <a href="#feedback">FEEDBACK</a>
            </li>
          </ul>
         
          <div className="btn-header">        
              <Link to="/login" ><input type="button" value="LOGIN" className="button1"></input></Link>            
          </div>
        </nav>
      </div>
    
    </header>
  );
};
