import requests


# Fetch the nutritional data for the identified food item by calling Nutritionix API
def get_nutritional_data(food_item):
    headers = {
        "x-app-id": "cd0a614a",
        "x-app-key": "b402410505e300f91424be27483f7ec0",
        "x-remote-user-id": "chenc134",
    }
    query = {"query": food_item}

    post_response = requests.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        json=query,
        headers=headers,
    )
    result_list = []

    try:
        food_details = post_response.json()["foods"]

        for food in food_details:
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
            result_list.append(food_data)
    except:
        result_list.append({"error_msg": "Food item not found, try entering something else!"})

    return result_list
