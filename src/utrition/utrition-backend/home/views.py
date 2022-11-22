from flask import Blueprint, render_template, request, jsonify
import ML.Interface as interface
import json
import requests

home_view = Blueprint('home_view', __name__)

foodPath = ""

def get_nutritional_data(food_item):
	headers = {
		'x-app-id': 'cd0a614a',
		'x-app-key': 'b402410505e300f91424be27483f7ec0',
		'x-remote-user-id': 'chenc134'
	}
	query = {"query": food_item}
	
	post_response = requests.post("https://trackapi.nutritionix.com/v2/natural/nutrients", json=query, headers=headers)
	food_details = post_response.json()['foods'][0]

	result = {
		"food_name": food_details['food_name'],
		"calories": food_details['nf_calories'],
		"total_fat": food_details['nf_total_fat'],
		"saturated_fat": food_details['nf_saturated_fat'],
		"cholesterol": food_details['nf_cholesterol'],
		"sodium": food_details['nf_sodium'],
		"total_carbohydrate": food_details['nf_total_carbohydrate'],
		"dietary_fiber": food_details['nf_dietary_fiber'],
		"sugars": food_details['nf_sugars'],
		"protein": food_details['nf_protein'],
		"potassium": food_details['nf_potassium'],
	}	
	return result


@home_view.route('/upload', methods=['GET', 'POST'])
def display_index():
	global foodPath

	if request.method == 'POST':
		foodPath = request.get_json()
		return foodPath
	else:
		myFood = interface.open("./ML/"+foodPath["path"].strip(' " " '))
		return jsonify(get_nutritional_data(myFood))
		# Make call to api here
		# Should return food and nutritionix api call 
