import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      })
      .catch((e) => {});
  }, [params.id]);

  return (
    <>
      {!isLoading ? (
        <div className="container align-items-center my-5">
          <h4 className="my-5">{programObj.program_name}</h4>
          <div className="my-5 d-flex justify-content-center align-items-center flex-wrap gap-5">
            {programObj.difficulty === "Easy" ? (
              <h4 className="customBadgeSuccess">
                <span className="">{programObj.difficulty}</span>
              </h4>
            ) : programObj.difficulty === "Medium" ? (
              <h4 className="customBadgeWarning">
                <span className="">{programObj.difficulty}</span>
              </h4>
            ) : (
              <h4 className="customBadgeDanger">
                <span className="">{programObj.difficulty}</span>
              </h4>
            )}
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
              <button className="btn btn-outline-dark mx-5">
                See Solution{" "}
              </button>
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-wrap text-start">
            <div className="">
              <h4>Description</h4>
              <p>{programObj.program_description}</p>
              <h4 style={{ textTransform: "capitalize" }}>Test Case :</h4>
              <div>
                <div className="my-3 fs-6">
                  <p>
                    <span className="fw-semibold">Input:</span>
                    <span className="mx-2">
                      {programObj.program_testcases.input}
                    </span>
                  </p>
                  <p>
                    <span className="fw-semibold">Output:</span>
                    <span className="mx-2">
                      {programObj.program_testcases.output}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 d-flex justify-content-center align-items-center flex-column">
            <hr />
          </div>
          <div className="my-5 d-flex justify-content-center align-items-center"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SelectByID;
