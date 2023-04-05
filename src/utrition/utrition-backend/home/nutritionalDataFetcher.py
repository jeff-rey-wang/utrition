import requests


# Fetch the nutritional data for the identified food item by calling Nutritionix API
def get_nutritional_data(food_item):
    # Set the headers needed to make the API request
    headers = {
        "x-app-id": "cd0a614a",
        "x-app-key": "b402410505e300f91424be27483f7ec0",
        "x-remote-user-id": "chenc134",
    }

    # Set the query parameters needed for the API request
    query = {"query": food_item}

    # Send a POST request to the Nutritionix API and get the response
    post_response = requests.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        json=query,
        headers=headers,
    )

    # Initialize an empty list to store the results
    result_list = []

    try:
        # Extract the food details from the response and loop through them
        food_details = post_response.json()["foods"]

        for food in food_details:
            # Extract the relevant nutritional information for each food item and store it in a dictionary
            food_data = {
                "food_name": food["food_name"],
                "serving_qty": food["serving_qty"],
                "serving_unit": food["serving_unit"],
                "serving_weight_grams": food["serving_weight_grams"],
                "calories": food["nf_calories"],
                "total_fat": food["nf_total_fat"],
                "saturated_fat": food["nf_saturated_fat"],
                "cholesterol": food["nf_cholesterol"],
                "sodium": food["nf_sodium"],
                "total_carbohydrate": food["nf_total_carbohydrate"],
                "dietary_fiber": food["nf_dietary_fiber"],
                "sugars": food["nf_sugars"],
                "protein": food["nf_protein"],
                "potassium": food["nf_potassium"],
            }
            # Append the food data to the result list
            result_list.append(food_data)

    except KeyError:
        # If there is an error in extracting the data, append an error message to the result list
        result_list.append(
            {"error_msg": "Food item not found, try entering something else!"}
        )

    # Return the result list
    return result_list
