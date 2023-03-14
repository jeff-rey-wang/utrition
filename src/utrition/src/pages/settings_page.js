import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./settings_page.css";
const Settings = () => {
    const [usersettings, setusersettings] = useState({});
    function getData() {
        axios({
          method: "GET",
          url: "/profile",
        })
          .then((response) => {
            setusersettings({
              swag: response.data.placeholder
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

    return (
        <form className="BMIform">
        <h2 className="formtitle">Enter Your Statistics</h2>
        <label>
        Birth Sex:
        <select value={"PLACEHOLDER"} disabled>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        </label>
        <br />
          <label>
            Weight:
            <input type="number" min="0" max="1500" value={"aass"} disabled placeholder="aa"/>
            <select value={"WEIGHTUNIT"} disabled>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </label>
          <br />
          <label>
            Height:
            {"HEIGHT UNIT == PLACEHOLDER" === "cm" ? (
              <input type="number" min="0" max="300" value={"PLACEHOLDER"} />
            ) : (
              <div style ={{display: "inline-block"}} >
                <input type="number" min="0" max="8" value={"PLACEHOLDER"}/>
                <span>ft</span>
                <input type="number" min="0" max="12"value={"PLACEHOLDER"} />
                <span>in</span>
              </div>
            )}
            <select value={"PLACEHOLDER"}>
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </label>
          <br />
          <label>
            Age:
            <input type="number" min="0" max="120" value={"PLACEHOLDER"}/>
          </label>
          <br />
          <label>
            Activity Level:
            <select value={"PLACEHOLDER"}>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly active">Lightly active</option>
              <option value="Moderately active">Moderately active</option>
              <option value="Very active">Very active</option>
              <option value="Extra active">Extra active</option>
            </select>
          </label>
          <br />
          <Link to="/bmi"
            class="settings button"
          >
            Edit Settings
          </Link>
        </form>
        );
    };
    
    export default Settings;