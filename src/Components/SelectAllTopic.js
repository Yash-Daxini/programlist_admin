import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SelectAllTopic = () => {
  const [topicObj, setTopicObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") === null) {
      navigate("../login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://programlist-backend.onrender.com/programs")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicObj(data);
        setIsLoading(false);
      })
      .catch((e) => {});
  }, []);

  let setForTopic = new Set();

  topicObj.forEach((element) => {
    setForTopic.add(element.program_topic);
  });

  let topicsArray = [];

  setForTopic.forEach((element) => {
    topicsArray.push(element);
  });

  const allTopics = topicsArray.map((topic) => {
    return (
      <>
        <tr>
          <td>
            <Link
              to={"./SelectByTopicName/" + topic}
              style={{ textDecoration: "none" }}
            >
              {topic}
            </Link>
          </td>
        </tr>
      </>
    );
  });

  const placeholderForAllTopics = [];

  for (let i = 0; i < 9; i++) {
    placeholderForAllTopics.push(
      <tr>
        <td className="placeholder-glow w-25">
          <span className="placeholder col-8" style={{height:"30px"}}></span>
        </td>
      </tr>
    );
  }

  return (
    <div className="selectAll main">
      <div className="d-flex justify-content-between">
        <div>
          <h1>Topics</h1>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>{isLoading ? placeholderForAllTopics : allTopics}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectAllTopic;
