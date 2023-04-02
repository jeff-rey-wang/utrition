from flask import Blueprint, request
from .nutritionalDataFetcher import get_nutritional_data
from .profileData import *
import ML.Interface as interface
import plotly.graph_objs as go
import plotly.io as pio
import json

# Create a new blueprint for home view
home_view = Blueprint("home_view", __name__)

# Initialize global variables
foodPath = ""


# Create a route for the /upload endpoint that accepts GET and POST requests
@home_view.route("/upload", methods=["GET", "POST"])
def display_index():
    global foodPath
    myFood = ""
    upload_type = request.headers["upload_type"]

    # Check the type of upload (image, voice, or text) and handle accordingly
    if upload_type == "image":
        if request.method == "POST":
            image = request.files["image"]
            image.save("./ML/uploaded_images/" + image.filename)
            foodPath = image.filename
            return foodPath
        else:
            myFood = interface.open("./ML/uploaded_images/" + foodPath)
    elif upload_type == "voice" or upload_type == "text":
        myFood = request.headers["food_text"]
    elif upload_type == "confirm":
        if request.method == "POST":
            delete_entry()
            return ""

    # Get nutritional data for the food item
    food_data = get_nutritional_data(myFood)
    try:
        log_data(food_data)

        # Calculate total nutrients if there are multiple food items
        if len(food_data) > 1:
            fullJSON = calculateTotalNutrients(food_data)
            json_formatted_str = json.dumps(fullJSON, indent=2)
        # Otherwise, just return the nutritional data for the single food item
        else:
            json_formatted_str = json.dumps(food_data[0], indent=2)
    except KeyError:
        # Return an error message if the food item is not found
        json_formatted_str = json.dumps(
            {"error_msg": "Food item not found, try entering something else!"}, indent=2
        )
    return json_formatted_str


# Create a route for the /profile endpoint that accepts GET and POST requests
@home_view.route("/profile", methods=["GET", "POST"])
def display_profile():
    if request.method == "POST":
        delete_entry(request.form["index"])
        return ""

    # Get profile data and generate a graph of daily calories
    fullJSON = {
        "allFoodEntries": read_file_as_json(),
        "currentCal": total_calories_per_day(),
        "mode": most_eaten_food(),
        "caloricSummary": total_calories_per_day_summary_list(),
        "bmi": calculate_bmi(),
        "recommendedCal": calculate_recommended_calories(),
    }

    profile_data = total_calories_per_day_summary_list()
    dates = [d["date"] for d in profile_data]
    calories = [c["sumPerDay"] for c in profile_data]

    dates = dates[::-1]
    calories = calories[::-1]

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=dates, y=calories, mode="lines"))
    fig.update_layout(
        title="Calories per day", xaxis_title="Date", yaxis_title="Calories"
    )
    image_bytes = pio.to_image(fig, format="png", width=800, height=600)
    with open("../src/pages/data_graph.png", "wb") as f:
        f.write(image_bytes)

    # Return the profile data in JSON format
    json_formatted_str = json.dumps(fullJSON, indent=2)
    return json_formatted_str


# Defining the "/settings" route with the GET method
@home_view.route("/settings", methods=["GET"])
def display_settings():
    # Reading user settings
    settings = read_user_settings()
    # If the settings are not found (i.e., equal to zero), then create an empty JSON object with default values
    if 0 == settings:
        fullJSON = {
            "weight": "",
            "weightUnit": "",
            "heightCm": "",
            "heightFT": "",
            "heightInches": "",
            "heightUnit": "",
            "age": "",
            "gender": "",
            "activityLevel": "",
        }
        # Converting the JSON object to a formatted string and returning it
        json_formatted_str = json.dumps(fullJSON, indent=2)
        return json_formatted_str
    # If the settings are found, then return them as is
    else:
        return settings


# Defining the "/bmi" route with the POST method
@home_view.route("/bmi", methods=["POST"])
def display_bmi():
    # Checking if the request method is POST
    if request.method == "POST":
        # Updating user settings with the submitted form data
        update_user_settings(request.form)
        # Returning an empty string
        return ""
