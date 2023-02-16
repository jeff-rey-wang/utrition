from flask import Blueprint, render_template, request, jsonify
from .nutritionalDataFetcher import get_nutritional_data
from csv import writer
from datetime import datetime
import ML.Interface as interface
import json
import os

home_view = Blueprint("home_view", __name__)

foodPath = ""


@home_view.route("/upload", methods=["GET", "POST"])
def display_index():
    global foodPath

    if request.method == "POST":
        foodPath = request.get_json()
        return foodPath
    else:
        myFood = interface.open("./ML/" + foodPath["path"].strip(' " " '))
        food_data = get_nutritional_data(myFood)
        log_data(food_data)
        return jsonify(food_data)


def log_data(food_data):
    timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    csv_row = [
        timestamp,
        food_data["food_name"],
        food_data["serving_qty"],
        food_data["calories"],
        food_data["total_fat"],
        food_data["saturated_fat"],
        food_data["cholesterol"],
        food_data["sodium"],
        food_data["total_carbohydrate"],
        food_data["dietary_fiber"],
        food_data["sugars"],
        food_data["protein"],
    ]

    if os.path.isfile("./nutrition_log.csv"):
        with open("./nutrition_log.csv", "a") as csvfile:
            filewriter = writer(csvfile, delimiter=",")
            filewriter.writerow(csv_row)
    else:
        with open("./nutrition_log.csv", "w") as csvfile:
            filewriter = writer(csvfile, delimiter=",")
            filewriter.writerow(
                [
                    "Time",
                    "Name",
                    "Serving Quantity",
                    "Calories",
                    "Total Fat",
                    "Saturated Fat",
                    "Cholesterol",
                    "Sodium",
                    "Total Carbohydrate",
                    "Dietary Fiber",
                    "Sugars",
                    "Protein",
                ]
            )
            filewriter.writerow(csv_row)
