"""
import json
import requests

parameters = {}
headers = {
    'x-app-id': 'cd0a614a',
    'x-app-key': 'b402410505e300f91424be27483f7ec0',
    'x-remote-user-id': 'chenc134'
}
get_response = requests.get("https://trackapi.nutritionix.com/v2/search/instant?query=grilled cheese", params=parameters, headers=headers)
food_name = get_response.json()['common'][0]['food_name']

query = {"query": food_name}
# This endpoint is able to get detailed nutrient breakdown from natural language text
post_response = requests.post("https://trackapi.nutritionix.com/v2/natural/nutrients", json=query, headers=headers)

# Nutrient Mappings Doc:
# https://docs.google.com/spreadsheets/d/14ssR3_vFYrVAidDLJoio07guZM80SMR5nxdGpAX-1-A/edit#gid=0

print(post_response.json())
"""
