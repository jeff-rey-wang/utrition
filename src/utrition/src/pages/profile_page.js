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
        caloricSummary: response.data.caloricSummary,
        index: 0
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

  const left_click_forward = () => {
    if (totalcal.index+4 >= totalcal.allFoodEntries.length) {
      alert("There are no more food entries available to be seen!")
    } else {
      settotalcal({
        currentCal: totalcal.currentCal,
        mode: totalcal.mode,
        allFoodEntries: totalcal.allFoodEntries,
        caloricSummary: totalcal.caloricSummary,
        index: totalcal.index+4
    });
  }
  };
  const left_click_backward = () => {
    if (totalcal.index-4 < 0) {
      alert("There are no more previous entries to look at!")
    } else {
      settotalcal({
        currentCal: totalcal.currentCal,
        mode: totalcal.mode,
        allFoodEntries: totalcal.allFoodEntries,
        caloricSummary: totalcal.caloricSummary,
        index: totalcal.index-4
    });
  }
  };

  return (
  <div style={{ display: "flex" }}>
    <div class="left" style={{ flex: 1 }}>
      <div class="most_eaten">Your most eaten food is a {totalcal.mode}</div>
      <div class="average_cal">Your total calories consumed for today is {totalcal.currentCal}</div>
      <dic class="past_meals">PAST MEALS</dic>
      <table class = "left_table">
      <tbody>
      {totalcal.allFoodEntries && totalcal.allFoodEntries.length >= 1 && totalcal.allFoodEntries.length > totalcal.index && (
        <tr class = "row_1">
          <td>
            <div className="orange-square">{totalcal.allFoodEntries[totalcal.index].timestamp}</div>
          </td>
          <td>
            <div>
              <div className="large-text">{totalcal.allFoodEntries[totalcal.index].food_name}</div>
              <div className="small-text">serving quantity: {totalcal.allFoodEntries[totalcal.index].serving_qty}, serving unit: {totalcal.allFoodEntries[totalcal.index].serving_unit}, serving weight grams: {totalcal.allFoodEntries[totalcal.index].serving_weight_grams}, calories: {totalcal.allFoodEntries[totalcal.index].calories}, total fat: {totalcal.allFoodEntries[totalcal.index].total_fat}, saturated fat: {totalcal.allFoodEntries[totalcal.index].saturated_fat}, cholesterol: {totalcal.allFoodEntries[totalcal.index].cholesterol}, sodium: {totalcal.allFoodEntries[totalcal.index].sodium}, total carbohydrate: {totalcal.allFoodEntries[totalcal.index].total_carbohydrate}, dietary fiber: {totalcal.allFoodEntries[totalcal.index].dietary_fiber}, sugars: {totalcal.allFoodEntries[totalcal.index].sugars}, protein: {totalcal.allFoodEntries[totalcal.index].protein}, potassium: {totalcal.allFoodEntries[totalcal.index].potassium}</div>
            </div>
          </td>
        </tr>
      )}
      {totalcal.allFoodEntries && totalcal.allFoodEntries.length >= 2 && totalcal.allFoodEntries.length > totalcal.index+1 && (
        <tr class = "row_2">
          <td>
            <div className="orange-square">{totalcal.allFoodEntries[totalcal.index+1].timestamp}</div>
          </td>
          <td>
            <div>
              <div className="large-text">{totalcal.allFoodEntries[totalcal.index+1].food_name}</div>
              <div className="small-text">serving quantity: {totalcal.allFoodEntries[totalcal.index+1].serving_qty}, serving unit: {totalcal.allFoodEntries[totalcal.index+1].serving_unit}, serving weight grams: {totalcal.allFoodEntries[totalcal.index+1].serving_weight_grams}, calories: {totalcal.allFoodEntries[totalcal.index+1].calories}, total fat: {totalcal.allFoodEntries[totalcal.index+1].total_fat}, saturated fat: {totalcal.allFoodEntries[totalcal.index+1].saturated_fat}, cholesterol: {totalcal.allFoodEntries[totalcal.index+1].cholesterol}, sodium: {totalcal.allFoodEntries[totalcal.index+1].sodium}, total carbohydrate: {totalcal.allFoodEntries[totalcal.index+1].total_carbohydrate}, dietary fiber: {totalcal.allFoodEntries[totalcal.index+1].dietary_fiber}, sugars: {totalcal.allFoodEntries[totalcal.index+1].sugars}, protein: {totalcal.allFoodEntries[totalcal.index+1].protein}, potassium: {totalcal.allFoodEntries[totalcal.index+1].potassium}</div>
            </div>
          </td>
        </tr>
      )}
      {totalcal.allFoodEntries && totalcal.allFoodEntries.length >= 3 && totalcal.allFoodEntries.length > totalcal.index+2 && (
        <tr class = "row_3">
          <td>
            <div className="orange-square">{totalcal.allFoodEntries[totalcal.index+2].timestamp}</div>
          </td>
          <td>
            <div>
              <div className="large-text">{totalcal.allFoodEntries[totalcal.index+2].food_name}</div>
              <div className="small-text">serving quantity: {totalcal.allFoodEntries[totalcal.index+2].serving_qty}, serving unit: {totalcal.allFoodEntries[totalcal.index+2].serving_unit}, serving weight grams: {totalcal.allFoodEntries[totalcal.index+2].serving_weight_grams}, calories: {totalcal.allFoodEntries[totalcal.index+2].calories}, total fat: {totalcal.allFoodEntries[totalcal.index+2].total_fat}, saturated fat: {totalcal.allFoodEntries[totalcal.index+2].saturated_fat}, cholesterol: {totalcal.allFoodEntries[totalcal.index+2].cholesterol}, sodium: {totalcal.allFoodEntries[totalcal.index+2].sodium}, total carbohydrate: {totalcal.allFoodEntries[totalcal.index+2].total_carbohydrate}, dietary fiber: {totalcal.allFoodEntries[totalcal.index+2].dietary_fiber}, sugars: {totalcal.allFoodEntries[totalcal.index+2].sugars}, protein: {totalcal.allFoodEntries[totalcal.index+2].protein}, potassium: {totalcal.allFoodEntries[totalcal.index+2].potassium}</div>
            </div>
          </td>
        </tr>
      )}
      {totalcal.allFoodEntries && totalcal.allFoodEntries.length >= 4 && totalcal.allFoodEntries.length > totalcal.index+3 && (
        <tr class = "row_4">
          <td>
            <div className="orange-square">{totalcal.allFoodEntries[totalcal.index+3].timestamp}</div>
          </td>
          <td>
            <div>
              <div className="large-text">{totalcal.allFoodEntries[totalcal.index+3].food_name}</div>
              <div className="small-text">serving quantity: {totalcal.allFoodEntries[totalcal.index+3].serving_qty}, serving unit: {totalcal.allFoodEntries[totalcal.index+3].serving_unit}, serving weight grams: {totalcal.allFoodEntries[totalcal.index+3].serving_weight_grams}, calories: {totalcal.allFoodEntries[totalcal.index+3].calories}, total fat: {totalcal.allFoodEntries[totalcal.index+3].total_fat}, saturated fat: {totalcal.allFoodEntries[totalcal.index+3].saturated_fat}, cholesterol: {totalcal.allFoodEntries[totalcal.index+3].cholesterol}, sodium: {totalcal.allFoodEntries[totalcal.index+3].sodium}, total carbohydrate: {totalcal.allFoodEntries[totalcal.index+3].total_carbohydrate}, dietary fiber: {totalcal.allFoodEntries[totalcal.index+3].dietary_fiber}, sugars: {totalcal.allFoodEntries[totalcal.index+3].sugars}, protein: {totalcal.allFoodEntries[totalcal.index+3].protein}, potassium: {totalcal.allFoodEntries[totalcal.index+3].potassium}</div>
            </div>
          </td>
        </tr>
      )}
      </tbody>
    </table>
    <button onClick={left_click_backward}>Look at previous 4 entries</button><button onClick={left_click_forward}>Look at next 4 entries</button>
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
        <tr>
          <td>{totalcal.caloricSummary && totalcal.caloricSummary[0].date}</td>
          <td>{totalcal.caloricSummary && totalcal.caloricSummary[0].sumPerDay}</td>
          <td>{totalcal.caloricSummary && totalcal.caloricSummary[0].foodsPerDay}</td>
        </tr>
      </table>
      <button onClick={left_click_forward}>Change Data</button><button onClick={left_click_forward}>Change Data</button>
    </div>
</div>

  );
};

export default Profile;
