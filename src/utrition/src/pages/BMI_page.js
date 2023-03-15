import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BMI_page.css";


const BMI = () => {
    const [birthSex, setBirthSex] = useState("Male");
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [heightCm, setHeightCm] = useState("");
    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [heightUnit, setHeightUnit] = useState("cm");
    const [age, setAge] = useState("");
    const [activityLevel, setActivityLevel] = useState("Sedentary");
    const [errorMessage, setErrorMessage] = useState("");

    const handleBirthSexChange = (event) => {
        setBirthSex(event.target.value);
    };
    const handleWeightChange = (event) => {
      setWeight(event.target.value);
    };
  
    const handleWeightUnitChange = (event) => {
      setWeightUnit(event.target.value);
    };
  
    const handleHeightCmChange = (event) => {
        setHeightCm(event.target.value);
    };

    const handleHeightFeetChange = (event) => {
      setHeightFeet(event.target.value);
    };
  
    const handleHeightInchesChange = (event) => {
      setHeightInches(event.target.value);
    };
  
    const handleHeightUnitChange = (event) => {
      setHeightUnit(event.target.value);
    };
  
    const handleAgeChange = (event) => {
      setAge(event.target.value);
    };
  
    const handleActivityLevelChange = (event) => {
      setActivityLevel(event.target.value);
    };

    async function getData() {
      const formData = new FormData();
      formData.append('heightUnit', heightUnit);
      formData.append('heightFeet', heightFeet);
      formData.append('heightInches', heightInches);
      formData.append('heightCm', heightCm);
      formData.append('weightUnit', weightUnit);
      formData.append('weight', weight);
      formData.append('birthSex', birthSex);
      formData.append('activityLevel', activityLevel);
      formData.append('age', age);
      await axios({
        method: "POST",
        url: "/bmi",
        data: formData
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
      setErrorMessage("Your statistics have been saved!");
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!weight || (heightUnit === "cm"  && !heightCm) || (heightUnit === "ft" && !heightFeet && !heightInches) || !age || !activityLevel) {
        setErrorMessage("Please fill out all fields.");
      } 
      else {
        getData()
      }
    };

    return (
      <div>
        <div className="title">BMI Calculator</div>
        <div className="explanation">Take a look at the following chart to determine your activity level and then complete the form below!
        </div>
        <table className="activity-level">
      <thead>
        <tr>
          <th>Activity Level</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sedentary</td>
          <td>Little or no exercise / Desk job</td>
        </tr>
        <tr>
          <td>Lightly active</td>
          <td>Light exercise / Sports 1-3 days per week</td>
        </tr>
        <tr>
          <td>Moderately active</td>
          <td>Moderate exercise / Sports 6-7 days per week</td>
        </tr>
        <tr>
          <td>Very active</td>
          <td>Hard exercise every day / Exercising 2 times per day</td>
        </tr>
        <tr>
          <td>Extra active</td>
          <td>Hard exercise 2 or more times per day / Training for marathon, triathlon, etc</td>
        </tr>
      </tbody>
    </table>
        <form className="BMIform" onSubmit={handleSubmit}>
        <h2 className="formtitle">Enter Your Statistics</h2>
        <label>
        Birth Sex:
        <select value={birthSex} onChange={handleBirthSexChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        </label>
        <br />
          <label>
            Weight:
            <input type="number" min="0" max="1500" value={weight} onChange={handleWeightChange} />
            <select value={weightUnit} onChange={handleWeightUnitChange}>
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </label>
          <br />
          <label>
            Height:
            {heightUnit === "cm" ? (
              <input type="number" min="0" max="300" value={heightCm} onChange={handleHeightCmChange} />
            ) : (
              <div style ={{display: "inline-block"}} >
                <input type="number" min="0" max="8" value={heightFeet} onChange={handleHeightFeetChange} />
                <span>ft</span>
                <input type="number" min="0" max="12"value={heightInches} onChange={handleHeightInchesChange} />
                <span>in</span>
              </div>
            )}
            <select value={heightUnit} onChange={handleHeightUnitChange}>
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </label>
          <br />
          <label>
            Age:
            <input type="number" min="0" max="120" value={age} onChange={handleAgeChange} />
          </label>
          <br />
          <label>
            Activity Level:
            <select value={activityLevel} onChange={handleActivityLevelChange}>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly active">Lightly active</option>
              <option value="Moderately active">Moderately active</option>
              <option value="Very active">Very active</option>
              <option value="Extra active">Extra active</option>
            </select>
          </label>
          <br />
          <button className="submitbutton" type="submit">Calculate BMI</button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
        {errorMessage && errorMessage === "Your statistics have been saved!" && <div className = "links">
        <Link to="/upload"
            class="uploadbutton button"
          >
            Upload what you ate to Utrition!
          </Link>
        <Link to="/profile"
            class="profilebutton button"
          >
            Check out your profile!
          </Link>
      </div>}
      </div>
    );
  };
  
  export default BMI;