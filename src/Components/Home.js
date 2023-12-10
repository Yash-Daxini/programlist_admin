import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const [totalProgram,setTotalProgram] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://programlist-backend.onrender.com/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {});
  }, []);

  let cardNumbers = document.querySelectorAll(".cardNumber");
  let interval = 1000;

  cardNumbers.forEach((cardNumber) => {
    let startValue = 0;
    let endValue = parseInt(cardNumber.getAttribute("data-val"));
    let duration;
    duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      startValue += 1;
      cardNumber.textContent = startValue;
      if (endValue === 0) {
        cardNumber.textContent = endValue;
        clearInterval(counter);
      }
      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  });

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("https://programlist-backend.onrender.com/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPrograms(data);
      })
      .catch((e) => {});
  }, []);

  // setTotalProgram(programs.length);

  let setForTopics = new Set();

  programs.forEach(element => {
    setForTopics.add(element.program_topic);
  });

  let topicsArr = [];

  setForTopics.forEach(element => {
    topicsArr.push(element);
  });


  const dispayAdminUser = users.map((user) => {
    return (
      <>
        <tr>
          <td>
            <span>
              <ion-icon name="person-outline" className="ion"></ion-icon>
            </span>
          </td>
          <td>{user.user_name}</td>
        </tr>
      </>
    );
  });

  const cardsOfCount = topicsArr.map((obj) => {
    let arr = programs.filter((program)=>program.program_topic === obj);
    let programCount = arr.length;
    return (
      <div className="card">
        <div>
          <div className="cardNumber" data-val={programCount}>
            {programCount}
          </div>
        </div>
        <div className="cardName">{obj}</div>
      </div>
    );
  });

  return (
    <div>
      <div className="cardBox text-center">
        {cardsOfCount}
        <div className="card">
          {/* <div> */}
          <div className="cardNumber" data-val={programs.length}>
            {programs.length}
          </div>
          <div className="cardName">Total Questions</div>
          {/* </div> */}
        </div>
      </div>
      <div className="homePart d-flex flex-wrap">
        <div className="userFeedback">
          <h4>Login User Inforamation</h4>
          <div className="table-responsive">
            <table
              className="table text-center my-3"
              cellpadding="40px"
              cellspacing="40px"
            >
              <thead>
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">User Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {sessionStorage.getItem("user") === null ? (
                    <td></td>
                  ) : (
                    <>
                      <td>
                        {JSON.parse(sessionStorage.getItem("user")).user_name}
                      </td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem("user"))
                            .user_emailaddress
                        }
                      </td>
                      <td>
                        {
                          JSON.parse(sessionStorage.getItem("user"))
                            .user_mobilenumber
                        }
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="recentUser">
          <h4>Recent Admin User</h4>
          <table
            className="table text-center my-3"
            cellpadding="40px"
            cellspacing="40px"
          >
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {dispayAdminUser}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
