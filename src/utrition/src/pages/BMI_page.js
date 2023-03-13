import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BMI_page.css";


const BMI = () => {
    const [birthSex, setBirthSex] = useState("");
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [heightCm, setHeightCm] = useState("");
    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [heightUnit, setHeightUnit] = useState("cm");
    const [age, setAge] = useState("");
    const [activityLevel, setActivityLevel] = useState("Sedentary");
    const [errorMessage, setErrorMessage] = useState("");
    const [bmiMessage, setBmiMessage] = useState("");
    const [CaloriesMessage, setCaloriesMessage] = useState("");
    let user_height = 0.0;
    let user_weight = 0.0;
    let user_calories = 0.0;
    let user_bmi = 0.0;
  
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
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!weight || (heightUnit === "ft"  && !heightCm) || (heightUnit === "ft" && !heightFeet && !heightInches) || !age || !activityLevel) {
        setErrorMessage("Please fill out all fields.");
      } else {
        if (heightUnit === "ft" ){
            user_height = heightFeet * 30.48 + heightInches * 2.54;
        }
        else{
            user_height = heightCm;
        }
        if (weightUnit === "lbs"){
            user_weight = weight * 0.45359237;
        }
        else{
            user_weight = weight;
        }
        if (birthSex === "Male"){
            if (activityLevel === "Sedentary"){
                user_calories = Math.round((1.2 * (66 + 13.7 * user_weight + 5 * user_height - 6.8 * age))*100)/100;
            }
            else if (activityLevel === "Lightly active"){
                user_calories = Math.round((1.375 * (66 + 13.7 * user_weight + 5 * user_height - 6.8 * age))*100)/100;
            }
            else if (activityLevel === "Moderately active"){
                user_calories = Math.round((1.55 * (66 + 13.7 * user_weight + 5 * user_height - 6.8 * age))*100)/100;
            }
            else if (activityLevel === "Very active"){
                user_calories = Math.round((1.725 * (66 + 13.7 * user_weight + 5 * user_height - 6.8 * age))*100)/100;
            }
            else{
                user_calories = Math.round((1.9 * (66 + 13.7 * user_weight + 5 * user_height - 6.8 * age))*100)/100;
            }
        }
        else{
            if (activityLevel === "Sedentary"){
                user_calories = Math.round((1.2 * (655 + 9.6 * user_weight + 1.8 * user_height - 4.7 * age))*100)/100;
            }
            else if (activityLevel === "Lightly active"){
                user_calories = Math.round((1.375 * (655 + 9.6 * user_weight + 1.8 * user_height - 4.7 * age))*100)/100;
            }
            else if (activityLevel === "Moderately active"){
                user_calories = Math.round((1.55 * (655 + 9.6 * user_weight + 1.8 * user_height - 4.7 * age))*100)/100;
            }
            else if (activityLevel === "Very active"){
                user_calories = Math.round((1.725 * (655 + 9.6 * user_weight + 1.8 * user_height - 4.7 * age))*100)/100;
            }
            else{
                user_calories = Math.round((1.9 * (655 + 9.6 * user_weight + 1.8 * user_height - 4.7 * age))*100)/100;
            }
        }

        user_bmi = Math.round((user_weight/Math.pow(user_height/100,2)) * 10) / 10;

        if (user_bmi < 18.5){
            setBmiMessage(`Your BMI is ${user_bmi}, which means you are underweight!`);
            setCaloriesMessage(`You need to eat more than ${user_calories} calories today if you'd like to gain some weight.`);
        }
        else if (user_bmi <= 24.9 && user_bmi >= 18.5){
            setBmiMessage(`Your BMI is ${user_bmi}, which means you are normal weight!`);
            setCaloriesMessage(`You need to eat around ${user_calories} calories today if you'd like to maintain your weight!`);
        }
        else if (user_bmi <= 29.9 && user_bmi >= 25){
            setBmiMessage(`Your BMI is ${user_bmi}, which means you are overweight weight!`);
            setCaloriesMessage(`You need to eat less than ${user_calories} calories today if you'd like to lose some weight!`);
        }
        else {
            setBmiMessage(`Your BMI is ${user_bmi}, which means you are obese!`);
            setCaloriesMessage(`You need to eat less than ${user_calories} calories today if you'd like to lose some weight!`);
        }
        axios({
            method: "POST",
            url: "/bmi",
            user_bmi: user_bmi,
            user_calories: user_calories,
          })
            .then((response) => response.json())
            .catch((error) => console.log(error));
            setErrorMessage("Your statistics have been saved!");
        }

    };

    return (
      <div>
        <div className="title">BMI Calculator</div>
        <div className="explanation">Enter in the fields below to find out if you're at a healthy weight!
        Use the following to determine activity level: Sedentary = BMR x 1.2 (little or no exercise, desk job)
Lightly active = BMR x 1.375 (light exercise/ sports 1-3 days/week)
Moderately active = BMR x 1.55 (moderate exercise/ sports 6-7 days/week)
Very active = BMR x 1.725 (hard exercise every day, or exercising 2 xs/day)
Extra active = BMR x 1.9 (hard exercise 2 or more times per day, or training for
marathon, or triathlon, etc) THINKING ABOUT MAKING THIS A TABLE TBH, PROB WILL BE MORE READABLE</div>
        <form className="BMIform" onSubmit={handleSubmit}>
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
          <button type="submit">Calculate BMI</button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
        {bmiMessage && <div className="bmiii">{bmiMessage}</div>}
        {CaloriesMessage && <div className="calories">{CaloriesMessage}</div>}
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