import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile_page.css";

const Profile = () => {
  const [totalcal, settotalcal] = useState({});

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
        index: totalcal.index,
        right_index: totalcal.right_index - 7,
      });
    }
  };

  return (
    <div
      style={{ display: "flex", padding: "0.5rem calc((100vw - 1100px) / 2)" }}
    >
      <div class="left" style={{ flex: 1, height: "5vh" }}>
        <div class="most_eaten" style={{ color: "#FFC300", height: "55px" }}>
          Your most eaten food is a {totalcal.mode}
        </div>
        <div class="average_cal" style={{ color: "#E9FFA4", height: "85px" }}>
          Your total calories consumed for today is {totalcal.currentCal}
        </div>
        <dic class="past_meals">PAST MEALS</dic>
        <table class="left_table">
          <tbody>
            {totalcal.allFoodEntries &&
              totalcal.allFoodEntries.length >= 1 &&
              totalcal.allFoodEntries.length > totalcal.index && (
                <tr class="row_1">
                  <td>
                    <div className="orange-square">
                      {totalcal.allFoodEntries[totalcal.index].timestamp}
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
                        <strong>serving unit:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].serving_unit},{" "}
                        <strong>serving weight grams:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index]
                            .serving_weight_grams
                        }
                        , <strong>calories:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].calories},{" "}
                        <strong>total fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].total_fat},{" "}
                        <strong>saturated fat:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].saturated_fat},{" "}
                        <strong>cholesterol:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].cholesterol},{" "}
                        <strong>sodium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].sodium},{" "}
                        <strong>total carbohydrates:</strong>{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index]
                            .total_carbohydrate
                        }
                        , <strong>dietary fiber:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].dietary_fiber},{" "}
                        <strong>sugars:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].sugars},{" "}
                        <strong>protein:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].protein},{" "}
                        <strong>potassium:</strong>{" "}
                        {totalcal.allFoodEntries[totalcal.index].potassium}
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
                      {totalcal.allFoodEntries[totalcal.index + 1].timestamp}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index + 1].food_name}
                      </div>
                      <div className="small-text">
                        serving quantity:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .serving_qty
                        }
                        , serving unit:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .serving_unit
                        }
                        , serving weight grams:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .serving_weight_grams
                        }
                        , calories:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].calories},
                        total fat:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].total_fat},
                        saturated fat:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .saturated_fat
                        }
                        , cholesterol:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .cholesterol
                        }
                        , sodium:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].sodium},
                        total carbohydrate:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .total_carbohydrate
                        }
                        , dietary fiber:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 1]
                            .dietary_fiber
                        }
                        , sugars:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].sugars},
                        protein:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].protein},
                        potassium:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 1].potassium}
                      </div>
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
                      {totalcal.allFoodEntries[totalcal.index + 2].timestamp}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index + 2].food_name}
                      </div>
                      <div className="small-text">
                        serving quantity:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .serving_qty
                        }
                        , serving unit:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .serving_unit
                        }
                        , serving weight grams:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .serving_weight_grams
                        }
                        , calories:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].calories},
                        total fat:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].total_fat},
                        saturated fat:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .saturated_fat
                        }
                        , cholesterol:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .cholesterol
                        }
                        , sodium:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].sodium},
                        total carbohydrate:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .total_carbohydrate
                        }
                        , dietary fiber:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 2]
                            .dietary_fiber
                        }
                        , sugars:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].sugars},
                        protein:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].protein},
                        potassium:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 2].potassium}
                      </div>
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
                      {totalcal.allFoodEntries[totalcal.index + 3].timestamp}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="large-text">
                        {totalcal.allFoodEntries[totalcal.index + 3].food_name}
                      </div>
                      <div className="small-text">
                        serving quantity:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .serving_qty
                        }
                        , serving unit:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .serving_unit
                        }
                        , serving weight grams:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .serving_weight_grams
                        }
                        , calories:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].calories},
                        total fat:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].total_fat},
                        saturated fat:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .saturated_fat
                        }
                        , cholesterol:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .cholesterol
                        }
                        , sodium:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].sodium},
                        total carbohydrate:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .total_carbohydrate
                        }
                        , dietary fiber:{" "}
                        {
                          totalcal.allFoodEntries[totalcal.index + 3]
                            .dietary_fiber
                        }
                        , sugars:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].sugars},
                        protein:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].protein},
                        potassium:{" "}
                        {totalcal.allFoodEntries[totalcal.index + 3].potassium}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};

export default Profile;
