from flask import Blueprint, request
from .nutritionalDataFetcher import get_nutritional_data
from .profileData import *
import ML.Interface as interface
import json

home_view = Blueprint("home_view", __name__)

foodPath = ""


@home_view.route("/upload", methods=["GET", "POST"])
def display_index():
    global foodPath
    upload_type = request.headers["upload_type"]

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

    food_data = get_nutritional_data(myFood)
    try:
        log_data(food_data)

        if len(food_data) > 1:
            fullJSON = calculateTotalNutrients(food_data)
            json_formatted_str = json.dumps(fullJSON, indent=2)
        else:
            json_formatted_str = json.dumps(food_data[0], indent=2)
    except KeyError:
        json_formatted_str = json.dumps(
            {"error_msg": "Food item not found, try entering something else!"}, indent=2
        )
    return json_formatted_str


@home_view.route("/profile", methods=["GET"])
def display_profile():
    fullJSON = {
        "allFoodEntries": read_file_as_json(),
        "currentCal": total_calories_per_day(),
        "mode": most_eaten_food(),
        "caloricSummary": total_calories_per_day_summary_list(),
        "bmi": calculate_bmi(),
        "recommendedCal": calculate_recommended_calories()
    }

    json_formatted_str = json.dumps(fullJSON, indent=2)
    return json_formatted_str


@home_view.route("/bmi", methods=["GET", "POST"])
def display_settings():
    if request.method == "POST":
        update_user_settings(request.form['birthSex'], request.form['heightCm'], request.form['heightFeet'], request.form['heightInches'], request.form['heightUnit'], request.form['weight'], request.form['weightUnit'], request.form['age'], request.form['activityLevel'])
    fullJSON = {
        "user_bmi": calculate_bmi(),
        "user_calories": calculate_recommended_calories()
    }
    json_formatted_str = json.dumps(fullJSON, indent=2)
    return json_formatted_str
