import React from "react";

const Home = () => {
  return (
    <div>
      
      <div class="left" style={{
        color: "#EAFAF1",
        display: "grid",
        float: "left",
        justifyContent: "left",
        alignItems: "left",
        fontSize: 40,
        fontWeight: 20,
        marginTop: "5vh",
        marginLeft: "20px",
        // left:"10px",
        marginRight: "5vh",
        // right:"5px",
        backgroundColor: "#0B5345",
        height: "40vh",
        right: "50vh",
        width: "60%"
      }}>Where healthy... 
      <h1 style={{
        color: "#D6FF54",
        // display: "flex",
        fontSize: 40,
        height: "10vh",
        // right: "9vh",
        // width: "50%",
        backgroundColor: "#0B5345",
      }}>Meets happy!</h1>
      
        <h1 style={{
        color: "#FFFFFF",
        // display: "flex",
        fontSize: 18,
        fontFamily: 'Avenir',
        fontWeight: 'thin',
        // width: "50%",
        backgroundColor: "#0B5345",
        right: "70vh",
        height: "70vh",
      }}>Utrition is an open source project where you have the choice to upload a picture, enter a voice message or type out what you 
      ate and Utrition will provide you with all the nutritional data of your meal!</h1>
      </div>
      <div class="right" style={{right:"5px", marginTop: "5vh", marginRight: "5vh", backgroundColor: "#0B5345", width: "30%", position:"absolute"}}>
       <div style={{
          justifyContent: "right",
          // height: "20vh",
          display: "grid",
          float: "right",
          // left:"100px",
          backgroundColor: "#EAFAF1",
          width: "40%"
          }}><img src={require("./homefood.jpg")} alt="Home Food"></img>
        </div>
      </div>
      
  
    </div>
    
  );
};

export default Home;
