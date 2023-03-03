import sys
sys.path.append("src/utrition/utrition-backend/")
from home.nutritionalDataFetcher import get_nutritional_data

import json
from unittest.mock import patch


def test_get_nutritional_data_JSON_from_string_input():
    expected_result = [
        {
            "food_name": "banana",
            "serving_qty": 1.0,
            "serving_unit": 'medium (7" to 7-7/8" long)',
            "serving_weight_grams": 118.0,
            "calories": 105.0,
            "total_fat": 0.4,
            "saturated_fat": 0.1,
            "cholesterol": 0.0,
            "sodium": 1.0,
            "total_carbohydrate": 27.0,
            "dietary_fiber": 3.1,
            "sugars": 14.4,
            "protein": 1.3,
            "potassium": 422.0,
        }
    ]

    # Mock the post response with a sample JSON string
    with patch("requests.post") as mock_post:
        mock_post.return_value.json.return_value = {
            "foods": [
                {
                    "food_name": "banana",
                    "serving_qty": 1.0,
                    "serving_unit": 'medium (7" to 7-7/8" long)',
                    "serving_weight_grams": 118.0,
                    "nf_calories": 105.0,
                    "nf_total_fat": 0.4,
                    "nf_saturated_fat": 0.1,
                    "nf_cholesterol": 0.0,
                    "nf_sodium": 1.0,
                    "nf_total_carbohydrate": 27.0,
                    "nf_dietary_fiber": 3.1,
                    "nf_sugars": 14.4,
                    "nf_protein": 1.3,
                    "nf_potassium": 422.0,
                }
            ]
        }

        result = get_nutritional_data("banana")

    # Check that the result is a list of expected length
    assert isinstance(result, list)
    assert len(result) == 1

    # Check that the result matches the expected result
    assert result == expected_result

    # Check that the result can be converted to JSON without errors
    assert json.dumps(result) is not None
