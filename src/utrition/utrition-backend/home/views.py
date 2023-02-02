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
		log_data(food_data)

		if len(food_data) > 1:
			fullJSON = calculateTotalNutrients(food_data)
			json_formatted_str = json.dumps(fullJSON, indent=2)
		else:
			json_formatted_str = json.dumps(food_data[0], indent=2)
		return json_formatted_str

# @home_view.route('/upload', methods=['GET', 'POST'])
# def display_index():
# 	global foodPath
# 	upload_type = request.headers['upload_type']

# 	if upload_type == "image":
# 		if request.method == 'POST':
# 			foodPath = request.get_json()
# 			return foodPath
# 		else:
# 			myFood = interface.open("./ML/"+foodPath["path"].strip(' " " '))

# 	elif upload_type == "voice" or upload_type == "text":
# 		myFood = request.headers['food_text']
			
# 	food_data = get_nutritional_data(myFood)
# 	log_data(food_data)

# 	if len(food_data) > 1:
# 		fullJSON = calculateTotalNutrients(food_data)
# 		json_formatted_str = json.dumps(fullJSON, indent=2)
# 	else:
# 		json_formatted_str = json.dumps(food_data[0], indent=2)
# 	return json_formatted_str

# For voice & text upload
def display_upload_results(food_string):
	food_data = get_nutritional_data(food_string)
	log_data(food_data)
	fullJSON = calculateTotalNutrients(food_data)
	json_formatted_str = json.dumps(fullJSON, indent=2)
	return json_formatted_str

@home_view.route('/profile', methods=['GET'])
def display_profile():
	fullJSON = {
		"allFoodEntries": read_file_as_json(),
		"currentCal": total_calories_per_day(), 
		"mode": most_eaten_food(),
		"caloricSummary": total_calories_per_day_summary_list(),
	}
	
	json_formatted_str = json.dumps(fullJSON, indent=2)
	return json_formatted_str
