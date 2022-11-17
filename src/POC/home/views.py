from flask import Blueprint, render_template

home_view = Blueprint('home_view', __name__)

@home_view.route('/')  # Route for the page
def display_index():
	myFood = "apple"
	return render_template('index.html', food=myFood)
