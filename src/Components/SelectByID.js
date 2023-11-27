import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState([]);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://programlist-backend.onrender.com/programs/" + params.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
      })
      .catch((e) => {});
  }, [params.id]);

  return (
    <div className="align-items-center my-5">
      <h1 className="my-5">{programObj.program_name}</h1>
      <div className="my-5 d-flex justify-content-center align-items-center flex-column">
        <h4 style={{ textTransform: "capitalize" }}>
          Topic : {programObj.program_topic}{" "}
        </h4>
        <hr />
        {programObj.difficulty === "Easy" ? (
          <h4 className="customBadgeSuccess">
            <span className="fs-6">{programObj.difficulty}</span>
          </h4>
        ) : programObj.difficulty === "Medium" ? (
          <h4 className="customBadgeWarning">
            <span className="fs-6">{programObj.difficulty}</span>
          </h4>
        ) : (
          <h4 className="customBadgeDanger">
            <span className="fs-6">{programObj.difficulty}</span>
          </h4>
        )}
      </div>
      <div className="my-5 d-flex justify-content-center align-items-center">
        <Link
          to={programObj.program_link}
          target={"_blank"}
          className="text-decoration-none"
        >
          <button className="btn btn-outline-dark mx-5">Solve Here </button>
        </Link>
        <Link
          to={programObj.program_solutionlink}
          className="text-decoration-none"
          target={"_blank"}
        >
          <button className="btn btn-outline-dark mx-5">See Solution </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectByID;
