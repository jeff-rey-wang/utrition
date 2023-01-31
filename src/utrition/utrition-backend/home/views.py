from flask import Blueprint, render_template, request, jsonify
from .nutritionalDataFetcher import get_nutritional_data
from .profileData import *
import ML.Interface as interface
import json

home_view = Blueprint('home_view', __name__)

foodPath = ""

@home_view.route('/upload', methods=['GET', 'POST'])
def display_index():
	global foodPath

	if request.method == 'POST':
		foodPath = request.get_json()
		return foodPath
	else:
		myFood = interface.open("./ML/"+foodPath["path"].strip(' " " '))
		
		food_data = get_nutritional_data(myFood)
		json_formatted_str = json.dumps(food_data, indent=2)

		log_data(food_data)

		return json_formatted_str

@home_view.route('/profile', methods=['GET'])
def display_profile():
	allData = []
	allData.append(read_file_as_json())
	currentCalJson = {
		"current_calories": total_calories_per_day()
	}
	allData.append(currentCalJson)
	allData.append(most_eaten_food())
	allData.append(total_calories_per_day_summary_list())

	json_formatted_str = json.dumps(allData, indent=2)
	return json_formatted_str
