import React from "react";

const Home = () => {
  return (
    <div
      style={{
        padding: "0.5rem calc((100vw - 1300px) / 2)",
        display: "flex",
        height: "fit-content",
      }}
    >
      <div
        class="left-container"
        style={{
          color: "#EAFAF1",
          display: "grid",
          float: "left",
          justifyContent: "left",
          alignItems: "left",
          fontSize: 40,
          fontWeight: 20,
          width: "50%",
          marginTop: "5vh",
          // marginLeft: "20px",
          // left:"10px",
          // marginRight: "5vh",
          // right:"5px",
          backgroundColor: "#0B5345",
          height: "30vh",
          // right: "50vh",
          width: "60%",
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
            height: "25vh",
          }}
        >
          Utrition is an open source project where you have the choice to upload
          a picture, enter a voice message or type out what you ate and Utrition
          will provide you with all the nutritional data of your meal!
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
          Step One: Make a choice!
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
          Your choice! Take a picture of your meal, type out what you ate or
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
          Step Two: Upload your meal.
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
          The upload page will generate your meal's nutritional data.{" "}
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
            height: "10vh",
            right: "70vh",
          }}
        >
          Check your profile to see everything you ate!
        </h1>
      </div>
      <div
        class="right-container"
        style={{
          right: "0px",
          marginTop: "8vh",
          marginRight: "20vh",
          backgroundColor: "#0B5345",
          width: "30%",
          position: "absolute",
        }}
      >
        <div
          style={{
            position: "relative",
            justifyContent: "right",
            // height: "20vh",
            display: "grid",
            float: "right",
            right: "0px",
            // left:"100px",
            backgroundColor: "#EAFAF1",
            // width: "40%",
          }}
        >
          <img
            style={{ width: 440, height: 750 }}
            src={require("./utritionfilter.jpg")}
            alt="Home Food"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
