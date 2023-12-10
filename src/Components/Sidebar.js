import React from "react";
import { Link , useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../CSS/style.css";

const Sidebar = () => {
  const location = useLocation();

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

  useEffect(() => {
    let toggle = document.querySelector(".toggle");
    if( toggle.classList.contains("active") ) toggleMenu();
  }, [location]);

  return (
    <>
      <div className="navigation" id="navigation">
      <div className="toggleInSideBar" onClick={toggleMenu}></div>
        <ul>
          <li>
            <Link className="" to="./">
              <span className="icon"></span>
              <span className="title">
                <h3>ProgramList</h3>
              </span>
            </Link>
          </li>
          <li>
            <Link className="" to="./">
              <span className="icon">
                <ion-icon className="ion" name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashbord</span>
            </Link>
          </li>
          <li>
            <Link className="" to="./SelectAll">
              <span className="icon">
                <ion-icon className="ion" name="code-outline"></ion-icon>
              </span>
              <span className="title">Programs</span>
            </Link>
          </li>
          <li>
            <Link className="" to="./SelectAllTopic">
              <span className="icon">
                <ion-icon className="ion" name="podium-outline"></ion-icon>
              </span>
              <span className="title">Topics</span>
            </Link>
          </li>
          <li>
            <Link className="" to="./SelectAllUser">
              <span className="icon">
                <ion-icon className="ion" name="people-outline"></ion-icon>
              </span>
              <span className="title">Users</span>
            </Link>
          </li>
          {/* <li>
                    <Link className="" to={"./Insert"}>
                        <span className="icon"><ion-icon className="ion" name="add-circle-outline"></ion-icon></span>
                        <span className="title">Insert Program</span>
                    </Link>
                </li> */}
          {/* <li>
                    <Link className="" to={"./InsertUser"}>
                        <span className="icon"><ion-icon className="ion" name="add-circle-outline"></ion-icon></span>
                        <span className="title">Insert User</span>
                    </Link>
                </li> */}
          {/* <li>
                    <a className="" asp-area="LOC_City" asp-controller="Home" asp-action="Index">
                        <span className="icon"><ion-icon className="ion" name="location-outline"></ion-icon></span>
                        <span className="title">City</span>
                    </a>
                </li>
                <li>
                    <a className="" asp-area="CON_ContactCategory" asp-controller="Home" asp-action="Index">
                        <span className="icon"><ion-icon className="ion" name="copy-outline"></ion-icon></span>
                        <span className="title">Category</span>
                    </a>
                </li>
                <li>
                    <a className="" asp-area="MST_Contact" asp-controller="Home" asp-action="Index">
                        <span className="icon"><ion-icon className="ion" name="person-outline"></ion-icon></span>
                        <span className="title">Contact</span>
                    </a>
                </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
