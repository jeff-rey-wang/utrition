import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile_page.css";

const Profile = () => {
  const [totalcal, settotalcal] = useState({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [showTable, setShowTable] = useState(false);

  function handleExplanationClick() {
    setShowTable(!showTable);
  }

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
          bmi : response.data.bmi,
          recommendedCal : response.data.recommendedCal,
          index: 0,
          right_index: 0,
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
    if (totalcal.index + 4 >= totalcal.allFoodEntries.length) {
      alert("There are no more food entries available to be seen!");
    } else {
      settotalcal({
        currentCal: totalcal.currentCal,
        mode: totalcal.mode,
        allFoodEntries: totalcal.allFoodEntries,
        caloricSummary: totalcal.caloricSummary,
        bmi : totalcal.bmi,
        recommendedCal : totalcal.recommendedCal,
        index: totalcal.index + 4,
        right_index: totalcal.right_index,
      });
    }
  };
  const left_click_backward = () => {
    if (totalcal.index - 4 < 0) {
      alert("There are no more previous entries to look at!");
    } else {
      settotalcal({
        currentCal: totalcal.currentCal,
        mode: totalcal.mode,
        allFoodEntries: totalcal.allFoodEntries,
        caloricSummary: totalcal.caloricSummary,
        bmi : totalcal.bmi,
        recommendedCal : totalcal.recommendedCal,
        index: totalcal.index - 4,
        right_index: totalcal.right_index,
      });
    }
  };

  const right_click_forward = () => {
    if (totalcal.right_index + 7 >= totalcal.caloricSummary.length) {
      alert("There is no more data left on the previous weeks!");
    } else {
      settotalcal({
        currentCal: totalcal.currentCal,
        mode: totalcal.mode,
        allFoodEntries: totalcal.allFoodEntries,
        caloricSummary: totalcal.caloricSummary,
        bmi : totalcal.bmi,
        recommendedCal : totalcal.recommendedCal,
        index: totalcal.index,
        right_index: totalcal.right_index + 7,
      });
    }
  };

  const right_click_backward = () => {
    if (totalcal.right_index - 7 < 0) {
      alert("There is no data left for the future weeks!");
    } else {
      settotalcal({
        currentCal: totalcal.currentCal,
        mode: totalcal.mode,
        allFoodEntries: totalcal.allFoodEntries,
        caloricSummary: totalcal.caloricSummary,
        bmi : totalcal.bmi,
        recommendedCal : totalcal.recommendedCal,
        index: totalcal.index,
        right_index: totalcal.right_index - 7,
      });
    }
  };

  const handleDeleteEntry = (entry) => {
    setEntryToDelete(entry);
    setShowConfirmationDialog(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationDialog(false);
    setEntryToDelete(null);
  };

  async function handleConfirmDelete(){
    const formData = new FormData();
    formData.append('index', entryToDelete);
    await axios({
      method: "POST",
      url: "/profile",
      data: formData,
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    await axios({
        method: "GET",
        url: "/profile",
      })
        .then((response) => {
          settotalcal({
            currentCal: response.data.currentCal,
            mode: response.data.mode,
            allFoodEntries: response.data.allFoodEntries,
            caloricSummary: response.data.caloricSummary,
            bmi : response.data.bmi,
            recommendedCal : response.data.recommendedCal,
            index: totalcal.index,
            right_index: totalcal.right_index,
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    setShowConfirmationDialog(false);
    setEntryToDelete(null);
  };

  const renderConfirmationDialog = () => {

    if (!showConfirmationDialog) {
      return null;
    }

    return (
    <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <span className="close" onClick={handleCancelDelete}>
                &times;
              </span>
              <h2>Confirm Delete</h2>
            </div>
            <div className="overlay-body">
              <p>Are you sure you want to delete the {totalcal.allFoodEntries[entryToDelete].food_name} entry?</p>
            </div>
            <div className="overlay-footer">
            <button className="overlay-yes" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button className="overlay-no" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
    );
  };

  function getBMIMessage(bmi) {
    if (bmi < 18.5) {
      return "which means you are underweight!";
    } else if (bmi <= 24.9 && bmi >= 18.5) {
      return "which means you are normal weight!";
    } else if (bmi <= 29.9 && bmi >= 25) {
      return "which means you are overweight!";
    } else if (bmi >= 30) {
      return "which means you are obese!";
    } else {
      return "";
    }
  }

  return (
    <div
      style={{ display: "flex", padding: "0.5rem calc((100vw - 1100px) / 2)" }}>
      <div class="left" style={{ flex: 1, height: "5vh" }}>
        <div class="past_meals">PAST MEALS</div>
        <table class="left_table">
          <tbody>
            {totalcal.allFoodEntries &&
              totalcal.allFoodEntries.length >= 1 &&
              totalcal.allFoodEntries.length > totalcal.index && (
                <tr class="row_1">
                  <td>
                    <div className="orange-square">
                      <div className = "date-square">
                      {totalcal.allFoodEntries[totalcal.index].date}
                      </div>
                      <div className = "timetimetime">
                      {totalcal.allFoodEntries[totalcal.index].time}
                      </div>
                    <button
                        className="delete-entry"
                        onClick={() =>
                          handleDeleteEntry(
                            totalcal.index
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index].food_name}
                      </div>
                      <div className="small-text">
                        <strong>serving quantity:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].serving_qty},{" "}
                        </div><div className="small-text">
                        <strong>serving unit:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].serving_unit},{" "}
                        </div><div className="small-text">
                        <strong>serving weight:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index]
                            .serving_weight_grams
                        }
                        g,
                        </div><div className="small-text"> 
                        <strong>calories:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].calories},{" "}
                        </div><div className="small-text">
                        <strong>total fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].total_fat}g,{" "}
                        </div><div className="small-text">
                        <strong>saturated fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].saturated_fat}g,{" "}
                        </div><div className="small-text">
                        <strong>cholesterol:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].cholesterol}mg,{" "}
                        </div><div className="small-text">
                        <strong>sodium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].sodium}mg,{" "}
                        </div><div className="small-text">
                        <strong>total carbohydrates:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index]
                            .total_carbohydrate
                        }
                        g,
                        </div><div className="small-text">
                        <strong>dietary fiber:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].dietary_fiber}g,{" "}
                        </div><div className="small-text">
                        <strong>sugars:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].sugars}g,{" "}
                        </div><div className="small-text">
                        <strong>protein:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].protein}g,{" "}
                        </div><div className="small-text">
                        <strong>potassium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].potassium}
                        mg
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            {totalcal.allFoodEntries &&
              totalcal.allFoodEntries.length >= 2 &&
              totalcal.allFoodEntries.length > totalcal.index + 1 && (
                <tr class="row_2">
                  <td>
                    <div className="orange-square">
                      <div className = "date-square">
                      {totalcal.allFoodEntries[totalcal.index + 1].date}
                      </div>
                      <div className = "timetimetime">
                      {totalcal.allFoodEntries[totalcal.index + 1].time}
                      </div>
                      <button
                        className="delete-entry"
                        onClick={() =>
                          handleDeleteEntry(
                            totalcal.index + 1
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index + 1].food_name}
                      </div>
                      <div className="small-text">
                      <strong>serving quantity:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .serving_qty
                        }
                        ,
                        </div><div className="small-text">
                        <strong>serving unit:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .serving_unit
                        }
                        ,
                        </div><div className="small-text">
                        <strong>serving weight:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .serving_weight_grams
                        }
                        g,
                        </div><div className="small-text">
                        <strong>calories:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].calories}
                        ,
                        </div><div className="small-text">
                        <strong>total fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].total_fat}
                        g,
                        </div><div className="small-text">
                        <strong>saturated fat:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .saturated_fat
                        }
                        g,
                        </div><div className="small-text">
                        <strong>cholesterol:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .cholesterol
                        }
                        mg,
                        </div><div className="small-text">
                        <strong>sodium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].sodium}
                        mg,
                        </div><div className="small-text">
                        <strong>total carbohydrate:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .total_carbohydrate
                        }
                        g,
                        </div><div className="small-text">
                        <strong>dietary fiber:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .dietary_fiber
                        }
                        g,
                        </div><div className="small-text">
                        <strong>sugars:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].sugars}
                        g,
                        </div><div className="small-text">
                        <strong>protein:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].protein}
                        g,
                        </div><div className="small-text">
                        <strong>potassium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].potassium}
                      mg</div>
                    </div>
                  </td>
                </tr>
              )}
            {totalcal.allFoodEntries &&
              totalcal.allFoodEntries.length >= 3 &&
              totalcal.allFoodEntries.length > totalcal.index + 2 && (
                <tr class="row_3">
                  <td>
                    <div className="orange-square">
                    <div className = "date-square">
                      {totalcal.allFoodEntries[totalcal.index + 2].date}
                      </div>
                      <div className = "timetimetime">
                      {totalcal.allFoodEntries[totalcal.index + 2].time}
                      </div>
                      <button
                        className="delete-entry"
                        onClick={() =>
                          handleDeleteEntry(
                            totalcal.index + 2
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index + 2].food_name}
                      </div>
                      <div className="small-text">
                      <strong>serving quantity:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .serving_qty
                        }
                        ,
                        </div><div className="small-text">
                        <strong>serving unit:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .serving_unit
                        }
                        ,
                        </div><div className="small-text">
                        <strong>serving weight:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .serving_weight_grams
                        }
                        g,
                        </div><div className="small-text">
                        <strong>calories:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].calories}
                        ,
                        </div><div className="small-text">
                        <strong>total fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].total_fat}
                        g,
                        </div><div className="small-text">
                        <strong>saturated fat:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .saturated_fat
                        }
                        g,
                        </div><div className="small-text">
                        <strong>cholesterol:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .cholesterol
                        }
                        mg,
                        </div><div className="small-text">
                        <strong>sodium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].sodium}
                        mg,
                        </div><div className="small-text">
                        <strong>total carbohydrate:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .total_carbohydrate
                        }
                        g,
                        </div><div className="small-text">
                        <strong>dietary fiber:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .dietary_fiber
                        }
                        g,
                        </div><div className="small-text">
                        <strong>sugars:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].sugars}
                        g,
                        </div><div className="small-text">
                        <strong>protein:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].protein}
                        g,
                        </div><div className="small-text">
                        <strong>potassium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].potassium}
                      mg</div>
                    </div>
                  </td>
                </tr>
              )}
            {totalcal.allFoodEntries &&
              totalcal.allFoodEntries.length >= 4 &&
              totalcal.allFoodEntries.length > totalcal.index + 3 && (
                <tr class="row_4">
                  <td>
                    <div className="orange-square">
                    <div className = "date-square">
                      {totalcal.allFoodEntries[totalcal.index + 3].date}
                      </div>
                      <div className = "timetimetime">
                      {totalcal.allFoodEntries[totalcal.index + 3].time}
                      </div>
                      <button
                        className="delete-entry"
                        onClick={() =>
                          handleDeleteEntry(
                            totalcal.index + 3
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index + 3].food_name}
                      </div>
                      <div className="small-text">
                      <strong>serving quantity:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .serving_qty
                        }
                        ,
                        </div><div className="small-text">
                        <strong>serving unit:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .serving_unit
                        }
                        ,
                        </div><div className="small-text">
                        <strong>serving weight:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .serving_weight_grams
                        }
                        g,
                        </div><div className="small-text">
                        <strong>calories:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].calories}
                        ,
                        </div><div className="small-text">
                        <strong>total fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].total_fat}
                        g,
                        </div><div className="small-text">
                        <strong>saturated fat:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .saturated_fat
                        }
                        g,
                        </div><div className="small-text">
                        <strong>cholesterol:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .cholesterol
                        }
                        mg,
                        </div><div className="small-text">
                        <strong>sodium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].sodium}
                        mg,
                        </div><div className="small-text">
                        <strong>total carbohydrate:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .total_carbohydrate
                        }
                        g,
                        </div><div className="small-text">
                        <strong>dietary fiber:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .dietary_fiber
                        }
                        g,
                        </div><div className="small-text">
                        <strong>sugars:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].sugars}
                        g,
                        </div><div className="small-text">
                        <strong>protein:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].protein}
                        g,
                        </div><div className="small-text">
                        <strong>potassium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].potassium}
                      mg</div>
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        {renderConfirmationDialog()}
        {totalcal.index - 4 >= 0 ? (
          <button class="left_click_back button" onClick={left_click_backward}>
            Look at previous 4 entries
          </button>
        ) : null}
        {totalcal.allFoodEntries &&
        totalcal.index + 4 < totalcal.allFoodEntries.length ? (
          <button class="left_click_front button" onClick={left_click_forward}>
            Look at next 4 entries
          </button>
        ) : null}
      </div>
      <div class="right" style={{ flex: 1, marginLeft: "100px" }}>
        <div class="settingsbutton">
      <Link to="/settings"
      className="button"
          >
            Edit Profile Statistics
          </Link>
          </div>
          <div class="most_eaten">
          Your most logged food: {totalcal.mode}
        </div>
        {totalcal.recommendedCal && totalcal.recommendedCal ? (
          <div class="average_cal">
          Today you have eaten {totalcal.currentCal} calories out of {totalcal.recommendedCal} calories to maintain your weight.
        </div>) : (
        <div class="average_cal">
          Your total calories consumed for today is {totalcal.currentCal}
        </div>)}
          <div>
      {totalcal.bmi && (
        <div>
          <div className="bmidisplay">
            Your BMI is {totalcal.bmi}, {getBMIMessage(totalcal.bmi)}
          </div>
          <div className="bmiexplanation">
            <button className = "explanationbutton" onClick={handleExplanationClick}>How close am I to being classified differently?</button>
          </div>
        </div>
      )}
      {showTable && (
        <div>
          <table className="bmii">
            <thead>
              <tr>
                <th>BMI</th>
                <th>Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{'<' + '18.5'}</td>
                <td>Underweight</td>
              </tr>
              <tr>
                <td>18.5–24.9</td>
                <td>Normal weight</td>
              </tr>
              <tr>
                <td>25–29.9</td>
                <td>Overweight</td>
              </tr>
              <tr>
                <td>{'>' + '30'}</td>
                <td>Obesity</td>
              </tr>
            </tbody>
          </table>
          <button className="closebmi button" onClick={handleExplanationClick}>Close</button>
        </div>
      )}
    </div>
        <table class="right_table">
          <caption class="right_caption">My Caloric Intake</caption>
          <tr>
            <th class="right_headers">Date</th>
            <th class="right_headers">Total Calories</th>
            <th class="right_headers">What you ate</th>
          </tr>
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 1 &&
            totalcal.caloricSummary.length > totalcal.right_index && (
              <tr class="right_row_1">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index].foodsPerDay}
                </td>
              </tr>
            )}
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 2 &&
            totalcal.caloricSummary.length > totalcal.right_index + 1 && (
              <tr class="right_row_2">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 1].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 1].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 1]
                      .foodsPerDay}
                </td>
              </tr>
            )}
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 3 &&
            totalcal.caloricSummary.length > totalcal.right_index + 2 && (
              <tr class="right_row_3">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 2].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 2].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 2]
                      .foodsPerDay}
                </td>
              </tr>
            )}
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 4 &&
            totalcal.caloricSummary.length > totalcal.right_index + 3 && (
              <tr class="right_row_4">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 3].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 3].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 3]
                      .foodsPerDay}
                </td>
              </tr>
            )}
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 5 &&
            totalcal.caloricSummary.length > totalcal.right_index + 4 && (
              <tr class="right_row_5">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 4].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 4].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 4]
                      .foodsPerDay}
                </td>
              </tr>
            )}
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 6 &&
            totalcal.caloricSummary.length > totalcal.right_index + 5 && (
              <tr class="right_row_6">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 5].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 5].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 5]
                      .foodsPerDay}
                </td>
              </tr>
            )}
          {totalcal.caloricSummary &&
            totalcal.caloricSummary.length >= 7 &&
            totalcal.caloricSummary.length > totalcal.right_index + 6 && (
              <tr class="right_row_7">
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 6].date}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 6].sumPerDay}
                </td>
                <td class="right_data">
                  {totalcal.caloricSummary &&
                    totalcal.caloricSummary[totalcal.right_index + 6]
                      .foodsPerDay}
                </td>
              </tr>
            )}
        </table>
        {totalcal.right_index - 7 >= 0 ? (
          <button
            class="right_click_back button"
            onClick={right_click_backward}
          >
            Next Week
          </button>
        ) : null}
        {totalcal.caloricSummary &&
        totalcal.right_index + 7 < totalcal.caloricSummary.length ? (
          <button
            class="right_click_front button"
            onClick={right_click_forward}
          >
            Previous Week
          </button>
        ) : null}
        <img className="graphh"
          src={require("./data_graph.png")}
          alt="User Data Graph"
        ></img>
      </div>
    </div>
  );
};

export default Profile;
