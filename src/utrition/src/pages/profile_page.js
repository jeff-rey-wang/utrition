import React, {useState, useEffect} from "react";
import axios from "axios";
import "./profile_page.css";

const Profile = () => {
  const [totalcal,settotalcal] = useState({});

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
    .then((response) => {
      settotalcal({
        currentCal: response.data.currentCal,
        mode: response.data.mode,
        allFoodEntries: response.data.allFoodEntries,
        caloricSummary: response.data.caloricSummary
      });
    })
    .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const [data_left, setData_left] = useState([
    { date: "Jan 23rd", fruits: "Grapes", info: "carbohydrates" },
    { date: "Jan 24th", fruits: "Apple", info: "Vitamin C" },
  ]);

  const handleClick = () => {
    setData_left([
      { date: "Jan 25th", fruits: "Banana", info: "Potassium" },
      { date: "Jan 26th", fruits: "Mango", info: "Vitamin A" },
    ]);
  };

  const [data_right, setData_right] = useState([
    { date: "Jan 23rd", totalcals: "11111", fooditems: "carbohydrates" },
    { date: "Jan 24th", totalcals: "22222", fooditems: "Vitamin C" },
  ]);

  const placeholderclick = () => {
    setData_right([
      { date: "Jan 25th", totalcals: "33333", fooditems: "Potassium" },
      { date: "Jan 26th", totalcals: "55555", fooditems: "Vitamin A" },
    ]);
  };

  return (
  <div style={{ display: "flex" }}>
    <div class="left" style={{ flex: 1 }}>
      <div class="most_eaten">Your most eaten food is a {totalcal.mode}</div>
      <div class="average_cal">Your total calories consumed for today is {totalcal.currentCal}</div>
      <dic class="past_meals">PAST MEALS</dic>
      <table class = "left_table">
      <tbody>
      {data_left.map((item) => (
        <tr>
          <td>
            <div className="orange-square">{item.date}</div>
          </td>
          <td>
            <div>
              <div className="large-text">{item.fruits}</div>
              <div className="small-text">{item.info}</div>
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    <button onClick={handleClick}>Change Data</button><button onClick={handleClick}>Change Data</button>
    </div>
    <div class= "right" style={{ flex: 1 }}>
      <table class = "right_table">
        <caption class = "right_caption">
          My Caloric Intake
        </caption>
        <tr>
          <th class = "right_headers">Date</th>
          <th class = "right_headers">Total Calories</th> 
          <th class = "right_headers">What you ate</th>
        </tr>
        {data_right.map((item) => (
        <tr key={item.date}>
          <td>{item.date}</td>
          <td>{item.totalcals}</td>
          <td>{item.fooditems}</td>
        </tr>
        ))}
      </table>
      <button onClick={placeholderclick}>Change Data</button><button onClick={placeholderclick}>Change Data</button>
    </div>
</div>

  );
};

export default Profile;
