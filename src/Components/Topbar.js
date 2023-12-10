import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {

    const naviagate = useNavigate();

    const toggleMenu = () => {
      let toggle = document.querySelector(".toggle");
      let toggleInSideBar = document.querySelector(".toggleInSideBar");
      let navigation = document.querySelector(".navigation");
      let main = document.querySelector(".main");
      toggle.classList.toggle("active");
      toggleInSideBar.classList.toggle("active");
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };

  return (
    <>
      <div className="topbar">
        <div className="toggle" onClick={toggleMenu}></div>
        <div className="logoName">
          <div className="logo">
            {/* <ion-icon className="ion" name="book-outline"></ion-icon> */}
          </div>
          <div className="name">ProgramList</div>
        </div>
        {/* <button className="themeBtn w-25 h-75 darkTheme" onClick={(e)=>{
          e.target.classList.toggle("darkTheme");
          e.target.classList.toggle("lightTheme");
          document.getElementsByClassName("main")[0].classList.toggle("lightTheme");
          document.getElementsByClassName("main")[0].classList.toggle("darkTheme");
        }}>Change theme</button> */}
        <div>
          <button className="logout btn border-0 text-primary" onClick={(e)=>{
            sessionStorage.clear();
            naviagate("./login");
          }}>
            <ion-icon name="log-out-outline"></ion-icon>
          </button>
        </div>
        {/* <div className="user">
          <ion-icon name="person-circle-outline"></ion-icon>
        </div> */}
      </div>
    </>
  );
};

export default Topbar;
