from flask import Blueprint, render_template, request, jsonify
import ML.Interface as interface

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
		return jsonify(myFood)
		# Make call to api here
		# Should return food and nutritionix api call 
