import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SelectByID = () => {
  const [programObj, setProgramObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const navigate = useNavigate();

  const location = useLocation();

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

  const scriptRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      if (!scriptRef.current && !isLoading) {
        const script = document.createElement("script");
        script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
        script.async = true;

        document.body.appendChild(script);
        scriptRef.current = script;
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    }
  }, [location.key, isLoading]);

  return (
    <>
      {!isLoading ? (
        <>
          <h4 className="my-5">{programObj.program_name}</h4>
          <div className="d-flex flex-wrap justify-content-center gap-5 my-2">
            <div className="description">
              <div className="mb-5 d-flex justify-content-center align-items-center flex-wrap gap-5">
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
                {/* <Link
                to={programObj.program_link}
                target={"_blank"}
                className="text-decoration-none"
              >
                <button className="btn btn-outline-dark mx-5">
                  Solve Here{" "}
                </button>
              </Link>
              <Link
                to={programObj.program_solutionlink}
                className="text-decoration-none"
                target={"_blank"}
              >
                <button className="btn btn-outline-dark mx-5">
                  See Solution{" "}
                </button>
              </Link> */}
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
            <div className="compiler">
              <div data-pym-src="https://www.jdoodle.com/plugin/v0/2e28a111104a265988dbce9b3f71a0ef/2dfd313b1308059a6006df5a0de7cf4e"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h4 className="my-5 placeholder-glow">
            <span className="placeholder col-6"></span>
          </h4>
          <div className="d-flex flex-wrap justify-content-center gap-5 my-2">
            <div className="description">
              <div className="mb-5 d-flex justify-content-center align-items-center flex-wrap gap-5">
                <h4 className="placeholder-glow w-100">
                  <span className="placeholder col-12"></span>
                </h4>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-wrap text-start w-100">
                <h4 className="placeholder-glow w-100">
                  <span className="placeholder col-8"></span>
                </h4>
                <p className="placeholder-glow w-100">
                  <span className="placeholder col-6"></span>
                </p>
                <h4 className="placeholder-glow w-100">
                  <span className="placeholder col-4"></span>
                </h4>
                <div className="my-3 fs-3 w-100">
                  <p className="plachoder-glow">
                    <span className="placeholder col-5"></span>
                    <span className="placeholder col-5 mx-3"></span>
                  </p>
                  <p className="plachoder-glow">
                    <span className="placeholder col-5"></span>
                    <span className="placeholder col-5 mx-3"></span>
                  </p>
                </div>
              </div>
              <div className="my-5 d-flex justify-content-center align-items-center flex-column">
                <hr />
              </div>
              <div className="my-5 d-flex justify-content-center align-items-center"></div>
            </div>
            <div className="compiler">
              <span className="" style={{ height: "60vh" }}></span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectByID;
