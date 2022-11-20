from flask import Blueprint, render_template, request
import ML.Interface as interface

home_view = Blueprint('home_view', __name__)

@home_view.route('/', methods=['GET', 'POST'])
def display_index():
	if request.method == 'POST':
		foodPath = "./ML/orange.jpeg" # make this from user input
		myFood = interface.open(foodPath)
		return render_template('index.html', food=myFood)
	return render_template('index.html')
