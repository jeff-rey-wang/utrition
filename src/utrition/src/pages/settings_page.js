import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./settings_page.css";
const Settings = () => {
    const [usersettings, setusersettings] = useState({});
    function getData() {
        axios({
          method: "GET",
          url: "/settings",
        })
          .then((response) => {
            setusersettings({
              weight: response.data.weight,
              weightUnit: response.data.weightUnit,
              heightCm: response.data.heightCm,
              heightFT: response.data.heightFT,
              heightInches: response.data.heightInches,
              heightUnit: response.data.heightUnit,
              age: response.data.age,
              gender: response.data.gender,
              activityLevel: response.data.activityLevel,
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
        <form className="SettingsForm">
        <h2 className="formtitle">Your User Settings</h2>
        <label>
        Birth Sex:
        <select disabled>
        {usersettings.gender === '' ? (
          <option>N/A</option>) : (
          <option>{usersettings.gender}</option>)
        }
        </select>
        </label>
        <br />
          <label>
            Weight:
            {usersettings.weight === '' ? (<input type="number" min="0" max="1500" disabled placeholder="N/A"/>) : (
            <input type="number" min="0" max="1500" disabled placeholder={usersettings.weight}/>)}
            <select  disabled>
            {usersettings.weightUnit === '' ? (
          <option>N/A</option>) : (
          <option>{usersettings.weightUnit}</option>) 
        }
            </select>
          </label>
          <br />
          <label>
            Height:
            {usersettings.heightUnit === '' ? (<input type="number" min="0" max="300" disabled placeholder="N/A" />)
            : (usersettings.heightUnit === "cm" ? (
              <input type="number" min="0" max="300" disabled placeholder={usersettings.heightCm} />
            ) : (
              <div style ={{display: "inline-block"}} >
                <input type="number" min="0" max="8" disabled placeholder={usersettings.heightFT}/>
                <span>ft</span>
                <input type="number" min="0" max="12" disabled placeholder={usersettings.heightInches} />
                <span>in</span>
              </div>
            ))}
            <select disabled>
            {usersettings.heightUnit === '' ? (
          <option>N/A</option>) : (
          <option>{usersettings.heightUnit}</option>) 
        }
            </select>
          </label>
          <br />
          <label>
            Age:
            {usersettings.age === '' ? (
            <input type="number" min="0" max="120" disabled placeholder="N/A"/>) : (
            <input type="number" min="0" max="120" disabled placeholder={usersettings.age}/>
            )}
          </label>
          <br />
          <label>
            Activity Level:
            <select disabled>
            {usersettings.activityLevel === '' ? (
          <option>N/A</option>) : (
          <option>{usersettings.activityLevel}</option>) 
        }
            </select>
          </label>
          <br />
          <Link to="/bmi"
            className="settingss"
          >
            Edit Settings
          </Link>
        </form>
        );
    };
    
    export default Settings;