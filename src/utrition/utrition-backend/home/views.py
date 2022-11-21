from flask import Blueprint, render_template, request, jsonify
import ML.Interface as interface

home_view = Blueprint('home_view', __name__)

@home_view.route('/upload', methods=['GET', 'POST'])
def display_index():
	if request.method == 'POST':
		content_type = request.headers.get('Content-Type')
		if (content_type == 'application/json'):
			foodPath = request.get_json()
			return foodPath
		else:
			return "Content type is not supported."
	else:
		foodPath = "./ML/orange.jpeg" # make this from user input
		#myFood = "orange"
		myFood = interface.open(foodPath)
		return jsonify(myFood)
		# Make call to api here
		# Should return food and nutritionix api call 
	#return render_template('index.html')
