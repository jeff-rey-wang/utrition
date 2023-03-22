import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <div
      style={{
        padding: "0 calc((100vw - 1100px) / 2)",
        display: "flex",
        height: "fit-content",
      }}
    >
      <div
        class="left-container"
        style={{
          position: "relative",
          color: "#EAFAF1",
          left: "0px",
          display: "grid",
          float: "left",
          justifyContent: "left",
          alignItems: "left",
          fontSize: 40,
          fontWeight: 20,
          width: "50%",
          marginTop: "5vh",
          backgroundColor: "#0B5345",
          height: "fit-content",
        }}
      >
        Where healthy...
        <h1
          style={{
            color: "#D6FF54",
            // display: "flex",
            fontSize: 40,
            height: "10vh",
            // right: "9vh",
            // width: "50%",
            backgroundColor: "#0B5345",
          }}
        >
          Meets happy!
        </h1>
        <h1
          style={{
            color: "#FFFFFF",
            // display: "flex",
            fontSize: 18,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            right: "70vh",
            height: "30vh",
          }}
        >
          Utrition is an open source project that allows you to track your
          progress towards your health goals. You have the choice to upload a picture, enter a
          voice message or type out what you ate and Utrition will provide you
          with all the nutritional data of your meal! All your meals and their nutritional data is saved in your profile.
          For further customization, go to the settings page to input your personal statistics which Utrition will use to calculate your recommended calories per day.
        </h1>
        <h1
          style={{
            color: "#E9FFA4",
            // display: "flex",
            fontSize: 30,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            right: "70vh",
          }}
        >
          Step One: Upload your meal!
        </h1>
        <h1
          style={{
            color: "#FFFFFF",
            // display: "flex",
            fontSize: 18,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            height: "10vh",
            right: "70vh",
          }}
        >
          Take a picture of your meal, type out what you ate or
          record a voice message.{" "}
        </h1>
        <h1
          style={{
            color: "#E9FFA4",
            // display: "flex",
            fontSize: 30,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            right: "70vh",
          }}
        >
          Step Two: View nutritional facts.
        </h1>
        <h1
          style={{
            color: "#FFFFFF",
            // display: "flex",
            fontSize: 18,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            height: "7vh",
            right: "70vh",
          }}
        >
          Utrition will display your meal's nutritional data.{" "}
        </h1>
        <h1
          style={{
            color: "#E9FFA4",
            // display: "flex",
            fontSize: 30,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            right: "70vh",
          }}
        >
          Step Three: Head to your profile.{" "}
        </h1>
        <h1
          style={{
            color: "#FFFFFF",
            // display: "flex",
            fontSize: 18,
            fontFamily: "Avenir",
            fontWeight: "thin",
            // width: "50%",
            backgroundColor: "#0B5345",
            height: "8vh",
            right: "70vh",
          }}
        >
          Check your profile to see everything you ate!
        </h1>
          <Link to="/upload"
            class="bmibutton button"
          >
            Get started!
          </Link>
          

      </div>
      <div
        class="right-container"
        style={{
          right: "0px",
          backgroundColor: "#0B5345",
          width: "50%",
          position: "relative",
        }}
      >
        <img
          style={{
            height: "100%",
            // marginTop: "6vh",
            width: "100%",
            objectFit: "cover",
            padding: "0 10px",
            // height:
          }}
          src={require("./upload.jpeg")}
          alt="Home Food"
        ></img>
      </div>
    </div>
  );
};

export default Home;
