import sys

sys.path.append("src/utrition/utrition-backend/")
from home.profileData import log_data, read_file

import os
import datetime


def test_log_data():
    # Call log_data with sample data
    sample_data = [
        {
            "food_name": "Test Food",
            "serving_qty": 1,
            "serving_unit": "unit",
            "serving_weight_grams": 100,
            "calories": 200,
            "total_fat": 10,
            "saturated_fat": 2,
            "cholesterol": 20,
            "sodium": 300,
            "total_carbohydrate": 30,
            "dietary_fiber": 5,
            "sugars": 10,
            "protein": 5,
            "potassium": 200,
        },
    ]
    log_data(sample_data)

    # Read the contents of the CSV file and check that it contains the expected data
    with open("./nutrition_log.csv", "r") as f:
        lines = f.readlines()
    assert len(lines) == 2  # header + 1 data row
    assert lines[1].strip() == ",".join(
        [
            datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            "Test Food",
            "1",
            "unit",
            "100",
            "200",
            "10",
            "2",
            "20",
            "300",
            "30",
            "5",
            "10",
            "5",
            "200",
        ]
    )

    # Delete the CSV file
    os.remove("./nutrition_log.csv")


def test_read_file_can_read_multiple_data():
    # Call log_data with sample data
    sample_data = [
        {
            "food_name": "Test Food1",
            "serving_qty": 1,
            "serving_unit": "unit",
            "serving_weight_grams": 100,
            "calories": 200,
            "total_fat": 10,
            "saturated_fat": 2,
            "cholesterol": 20,
            "sodium": 300,
            "total_carbohydrate": 30,
            "dietary_fiber": 5,
            "sugars": 10,
            "protein": 5,
            "potassium": 200,
        },
        {
            "food_name": "Test Food2",
            "serving_qty": 1,
            "serving_unit": "unit",
            "serving_weight_grams": 100,
            "calories": 200,
            "total_fat": 10,
            "saturated_fat": 2,
            "cholesterol": 20,
            "sodium": 300,
            "total_carbohydrate": 30,
            "dietary_fiber": 5,
            "sugars": 10,
            "protein": 5,
            "potassium": 200,
        },
        {
            "food_name": "Test Food3",
            "serving_qty": 1,
            "serving_unit": "unit",
            "serving_weight_grams": 100,
            "calories": 200,
            "total_fat": 10,
            "saturated_fat": 2,
            "cholesterol": 20,
            "sodium": 300,
            "total_carbohydrate": 30,
            "dietary_fiber": 5,
            "sugars": 10,
            "protein": 5,
            "potassium": 200,
        },
        {
            "food_name": "Test Food4",
            "serving_qty": 1,
            "serving_unit": "unit",
            "serving_weight_grams": 100,
            "calories": 200,
            "total_fat": 10,
            "saturated_fat": 2,
            "cholesterol": 20,
            "sodium": 300,
            "total_carbohydrate": 30,
            "dietary_fiber": 5,
            "sugars": 10,
            "protein": 5,
            "potassium": 200,
        },
    ]
    log_data(sample_data)

    # Call read_file on sample data
    result = read_file()

    # Assert that four lines were returned
    assert len(result) == 4

    # Delete the CSV file
    os.remove("./nutrition_log.csv")
