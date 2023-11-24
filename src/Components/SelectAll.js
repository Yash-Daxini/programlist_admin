import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const SelectAll = () => {
  const navigate = useNavigate();
  const [programObj, setProgramObj] = useState([]);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [filterObj, setFilterObj] = useState({
    program_topic: "all",
    difficulty: "all",
  });
  const [deleteArr, setDeleteArr] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  let isTopicPresent = true;
  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  const fetchAllPrgrams = () => {
    fetch(`https://programlist-backend.onrender.com/programs`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProgramObj(data);
        setFilterArr(data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    fetchAllPrgrams();
  }, []);

  let setForTopic = new Set();

  let topicObj = [];

  programObj.forEach((element) => {
    setForTopic.add(element.program_topic);
  });

  setForTopic.forEach((element) => {
    topicObj.push(element);
  });

  let deleteFromArray = () => {
    deleteArr.forEach((element) => {
      Delete(element.id, element.topic);
    });
  };

  const Delete = (id, topic) => {
    if (programObj.filter((ele) => ele.program_topic === topic).length === 1) {
      fetch(
        `https://programlist-backend.onrender.com/topic/deleteFromTopic/${topic}`,
        {
          method: "DELETE",
        }
      ).then((res) => {
      });
    }
    fetch(`https://programlist-backend.onrender.com/programs/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        navigate("../");
        setTimeout(() => {
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
          navigate("../SelectAll");
        }, 0.01);
      })
      .catch((e) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Some error occured!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const allTopicsName = topicObj.map((topic) => {
    return (
      <>
        <option value={topic} style={{ textTransform: "capitalize" }}>
          {topic}
        </option>
      </>
    );
  });

  const allPrograms = filterArr.map((program) => {
    return (
      <>
        <tr>
          <td>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked === true) {
                  if (isAnyChecked === false) {
                    toast.dismiss();
                    toast.info(<DeleteButtonToast />, {
                      className: "deleteAlert",
                      containerId: "deleteAlert",
                      closeButton: false,
                      position: toast.POSITION.TOP_CENTER,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      autoClose: false,
                      theme: "light",
                    });
                    setIsAnyChecked(true);
                  }
                  deleteArr.push({
                    id: program._id,
                    topic: program.program_topic,
                  });
                  setDeleteArr(deleteArr);
                } else {
                  let index = 0;
                  deleteArr.forEach((element, ind) => {
                    if (
                      element.id === program._id &&
                      element.topic === program.program_topic
                    ) {
                      index = ind;
                    }
                  });
                  if (index !== 0) deleteArr.splice(index, index);
                  else deleteArr.shift();
                  setDeleteArr(deleteArr);
                }
                if (isAnyChecked === true && deleteArr.length === 0) {
                  toast.dismiss();
                  toast.error(`Delete Button Deactivated! You can't delete`, {
                    className: "deleteAlert",
                    containerId: "deleteAlert",
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    autoClose: 5000,
                    theme: "light",
                  });
                  setIsAnyChecked(false);
                }
              }}
            />
          </td>
          <td>
            <Link
              to={"./SelectByID/" + program._id}
              style={{ textDecoration: "none" }}
            >
              <p>{program.program_name}</p>
            </Link>
          </td>
          <td>
            <p>{program.program_topic}</p>
          </td>
          <td>
            <Link to={program.program_link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>
            <Link to={program.solution_link} target="_blank">
              <ion-icon name="link-outline"></ion-icon>
            </Link>
          </td>
          <td>
            <p>{program.difficulty}</p>
          </td>
          <td>
            <button
              className="btn btn-outline-info"
              onClick={() => {
                toast.info(<UpdateToast id={program._id} topic={program.program_topic.toString()} />, {
                  className: "insertToast",
                  closeButton: false,
                  containerId: "insertUpdate",
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  autoClose: false,
                  theme: "light",
                });
              }}
            >
              <ion-icon id={`editIcon`} name="create-outline"></ion-icon>
            </button>
          </td>
        </tr>
      </>
    );
  });

  const DeleteButtonToast = ({ closeToast }) => {
    return (
      <div>
        <p className="fw-bold">Delete Button Activated! Now you can delete</p>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: `You want to delete ${deleteArr.length} records ?`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteFromArray();
                closeToast();
              }
            });
          }}
        >
          Delete <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    );
  };
  const InsertToast = ({ closeToast }) => {
    let [newProgram, setNewProgram] = useState({});
    return (
      <>
        <div class="mb-3">
          <label for="exampleFormControlInput1 my-5" class="form-label">
            Program Name
          </label>
          <input
            required
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Program Name"
            value={newProgram.program_name}
            onChange={(e) => {
              setNewProgram({ ...newProgram, program_name: e.target.value });
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Program Topic
          </label>
          <select
            required
            className="form-control"
            id="selectionBoxForTopic"
            value={newProgram.program_topic}
            style={{ display: "" }}
            onChange={(e) => {
              setNewProgram({ ...newProgram, program_topic: e.target.value });
            }}
          >
            <option>Select Topic Name</option>
            {allTopicsName}
          </select>
          <input
            required
            type="text"
            class="form-control"
            id="textBoxForTopic"
            style={{ display: "none" }}
            placeholder="Program Topic"
            value={newProgram.program_topic}
            onChange={(e) => {
              setNewProgram({ ...newProgram, program_topic: e.target.value });
            }}
          />
          <input
            type="button"
            className="btn btn-outline-primary my-2"
            value={"Not Present in list ? Want to add new topic !"}
            onClick={(e) => {
              if (
                document.getElementById("selectionBoxForTopic").style
                  .display === "none"
              ) {
                document.getElementById("selectionBoxForTopic").style.display =
                  "";
                document.getElementById("textBoxForTopic").style.display =
                  "none";
                e.target.value =
                  "Not Present in list ? Want to add new topic !";
              } else {
                document.getElementById("selectionBoxForTopic").style.display =
                  "none";
                document.getElementById("textBoxForTopic").style.display = "";
                // document.getElementById("textBoxForTopic").style.value = "";
                isTopicPresent = false;
                e.target.value = "Want to select from list ? ";
              }
            }}
          ></input>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Program Link
          </label>
          <input
            required
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Program Link"
            value={newProgram.program_link}
            onChange={(e) => {
              setNewProgram({ ...newProgram, program_link: e.target.value });
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Solution Link
          </label>
          <input
            required
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Solution Link"
            value={newProgram.solution_link}
            onChange={(e) => {
              setNewProgram({
                ...newProgram,
                solution_link: e.target.value,
              });
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Difficulty
          </label>
          <select
            required
            class="form-control"
            value={newProgram.difficulty}
            onChange={(e) => {
              setNewProgram({
                ...newProgram,
                difficulty: e.target.value,
              });
            }}
          >
            <option>Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div class="mb-3">
          <button
            type="submit"
            className="mx-5 btn btn-outline-success"
            onClick={(e) => {
              e.preventDefault();
              closeToast();
              if (
                newProgram.program_name === undefined ||
                newProgram.program_topic === undefined ||
                newProgram.program_topic === "Select Topic Name" ||
                newProgram.program_topic === "" ||
                newProgram.program_link === undefined ||
                newProgram.solution_link === undefined ||
                newProgram.difficulty === undefined ||
                newProgram.difficulty === "Select Difficulty"
              ) {
                Swal.fire({
                  title: "Error!",
                  text: "All fields are not fullfilled",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
                return;
              }
              if (isTopicPresent) {
                fetch("https://programlist-backend.onrender.com/topic", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    topic_name: newProgram.program_topic,
                  }),
                }).then((res) => {});
              }
              fetch("https://programlist-backend.onrender.com/programs", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newProgram),
              })
                .then((r) => r.json())
                .then((res) => {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Data Inserted Successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  fetchAllPrgrams();
                })
                .catch((e) => {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Some Error Occured!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            }}
          >
            Add
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger"
            onClick={(e) => {
              closeToast();
            }}
          >
            Cancel
          </button>
        </div>
      </>
    );
  };
  const UpdateToast = ({ closeToast, id , topic }) => {
    const [newProgram, setNewProgram] = useState({});
    const [listOrTextAreaBtn, setListOrTextAreaBtn] = useState(
      "Not Present in list ? Want to add new topic !"
    );
    useEffect(() => {
      fetch("https://programlist-backend.onrender.com/programs/" + id)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNewProgram(data);
        })
        .catch((e) => {});
      }, [id]);
    let lastTopic = topic;
    return (
      <>
        {/* <div className="main my-5 mx-5 w-75"> */}
          <div class="mb-3 mt-5">
            <label for="exampleFormControlInput1" class="form-label">
              Program Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Program Name"
              value={newProgram.program_name}
              onChange={(e) => {
                setNewProgram({ ...newProgram, program_name: e.target.value });
              }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Program Topic
            </label>
            <select
              required
              className="form-control"
              id="selectionBoxForTopic"
              value={newProgram.program_topic}
              style={{ display: "" }}
              onChange={(e) => {
                setNewProgram({ ...newProgram, program_topic: e.target.value });
              }}
            >
              <option>Select Topic Name</option>
              {allTopicsName}
            </select>
            <input
              required
              type="text"
              class="form-control"
              id="textBoxForTopic"
              style={{ display: "none" }}
              placeholder="Program Topic"
              value={newProgram.program_topic}
              onChange={(e) => {
                setNewProgram({ ...newProgram, program_topic: e.target.value });
              }}
            />
            <input
              type="button"
              className="btn btn-outline-primary my-2"
              value={listOrTextAreaBtn}
              onClick={(e) => {
                if (
                  document.getElementById("selectionBoxForTopic").style
                    .display === "none"
                ) {
                  document.getElementById(
                    "selectionBoxForTopic"
                  ).style.display = "";
                  document.getElementById("textBoxForTopic").style.display =
                    "none";
                  setListOrTextAreaBtn(
                    "Not Present in list ? Want to add new topic !"
                  );
                } else {
                  document.getElementById(
                    "selectionBoxForTopic"
                  ).style.display = "none";
                  document.getElementById("textBoxForTopic").style.display = "";
                  setListOrTextAreaBtn("Want to select from list ? ");
                }
              }}
            ></input>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Program Link
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Program Link"
              value={newProgram.program_link}
              onChange={(e) => {
                setNewProgram({ ...newProgram, program_link: e.target.value });
              }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Solution Link
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Solution Link"
              value={newProgram.solution_link}
              onChange={(e) => {
                setNewProgram({ ...newProgram, solution_link: e.target.value });
              }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Difficulty
            </label>
            <select
              class="form-control"
              value={newProgram.difficulty}
              onChange={(e) => {
                setNewProgram({
                  ...newProgram,
                  difficulty: e.target.value,
                });
              }}
            >
              <option>Select Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div class="mb-3">
            <button
              type="submit"
              className="mx-5 btn btn-outline-success"
              onClick={(e) => {
                e.preventDefault();
                closeToast();
                if (
                  newProgram.program_name === undefined ||
                  newProgram.program_topic === undefined ||
                  newProgram.program_topic === "Select Topic Name" ||
                  newProgram.program_topic === "" ||
                  newProgram.program_link === undefined ||
                  newProgram.solution_link === undefined ||
                  newProgram.difficulty === undefined ||
                  newProgram.difficulty === "Select Difficulty"
                ) {
                  Swal.fire({
                    title: "Error!",
                    text: "All fields are not fullfilled",
                    icon: "error",
                    confirmButtonText: "Ok",
                  });
                  return;
                }
                let lastIsEq = lastTopic !== newProgram.program_topic;
                if (lastIsEq) {
                  let count = programObj.filter(
                    (ele) =>
                      ele.program_topic.toLowerCase() ===
                      lastTopic.toLowerCase()
                  ).length;
                  if (count === 1) {
                    fetch(
                      `https://programlist-backend.onrender.com/topic/deleteFromTopic/${lastTopic}`,
                      {
                        method: "DELETE",
                      }
                    ).then((res) => {});
                  }
                }
                if (
                  topicObj.filter(
                    (ele) =>
                      ele.toLowerCase() ===
                      newProgram.program_topic.toLowerCase()
                  ).length === 0
                ) {
                  fetch("https://programlist-backend.onrender.com/topic", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                      topic_name: newProgram.program_topic,
                    }),
                  }).then((res) => {
                  });
                }
                fetch(
                  `https://programlist-backend.onrender.com/programs/${id}`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify(newProgram),
                  }
                )
                  .then((r) => r.json())
                  .then((res) => {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Data Updated Successfully!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    fetchAllPrgrams();
                  })
                  .catch((e) => {
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Some Error Occured!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });

                setNewProgram({
                  ...newProgram,
                  program_name: "",
                  program_topic: "",
                  program_link: "",
                  solution_link: "",
                  difficulty: "",
                });

              }}
            >
              Update
            </button>
            <button
              type="submit"
              className="btn btn-outline-danger"
              onClick={(e) => {
                closeToast();
              }}
            >
              Cancel
            </button>
          </div>
      </>
    );
  };
  return (
    <div className="selectAll main">
      <ToastContainer
        enableMultiContainer
        containerId={"deleteAlert"}
        className="custom-toast-container rounded-5 deleteAlert"
      />
      <ToastContainer
        enableMultiContainer
        containerId={"insertUpdate"}
        className="custom-toast-container insertUpdateToastContainer"
      />
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <h1>Programs</h1>
        </div>
        <div className="d-flex justify-content-center aligm-items-center flex-wrap w-50">
          <select
            className="form-control m-2"
            value={filterObj.program_topic}
            onChange={(e) => {
              setFilterObj({ ...filterObj, program_topic: e.target.value });
              if (e.target.value === "all" && filterObj.difficulty === "all") {
                setFilterArr(programObj);
              } else if (e.target.value === "all") {
                setFilterArr(
                  programObj.filter(
                    (ele) => ele.difficulty === filterObj.difficulty
                  )
                );
              } else if (filterObj.difficulty === "all") {
                let arr = programObj.filter(
                  (ele) => ele.program_topic === e.target.value
                );
                setFilterArr(arr);
              } else {
                setFilterArr(
                  programObj.filter(
                    (ele) =>
                      ele.program_topic === e.target.value &&
                      ele.difficulty === filterObj.difficulty
                  )
                );
              }
            }}
          >
            <option value={"all"}>Select Topic Name</option>
            {allTopicsName}
          </select>
          <select
            className="form-control m-2"
            value={filterObj.difficulty}
            onChange={(e) => {
              setFilterObj({
                ...filterObj,
                difficulty: e.target.value,
              });
              if (
                e.target.value === "all" &&
                filterObj.program_topic === "all"
              ) {
                setFilterArr(programObj);
              } else if (e.target.value === "all") {
                setFilterArr(
                  programObj.filter(
                    (ele) => ele.program_topic === filterObj.program_topic
                  )
                );
              } else if (filterObj.program_topic === "all") {
                setFilterArr(
                  programObj.filter((ele) => ele.difficulty === e.target.value)
                );
              } else {
                setFilterArr(
                  programObj.filter(
                    (ele) =>
                      ele.program_topic === filterObj.program_topic &&
                      ele.difficulty === e.target.value
                  )
                );
              }
            }}
          >
            <option value={"all"}>Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div>
          <button
            className="btn btn-outline-success rounded-3 m-2"
            id="addBtn"
            onClick={() => {
              toast.info(<InsertToast />, {
                className: "insertToast",
                closeButton: false,
                containerId: "insertUpdate",
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
                theme: "light",
              });
            }}
          >
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Topic</th>
              <th scope="col">Program Link</th>
              <th scope="col">Solution Link</th>
              <th scope="col">Difficulty</th>
              <th scope="col" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          {allPrograms.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6}>
                  <h3>No match found</h3>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="text-center">{allPrograms}</tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SelectAll;
