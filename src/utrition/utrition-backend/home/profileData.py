from statistics import mode
from csv import reader, writer
import datetime
import os
import json


def log_data(food_data):
    # get the current timestamp and format it
    timestamp = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    # convert the timestamp into a datetime object
    datetimeObject = datetime.datetime.strptime(timestamp, "%d/%m/%Y %H:%M:%S")
    # extract only the time from the datetime object
    time = datetime.datetime.strftime(datetimeObject, "%I:%M %p")
    # iterate over each entry in the list of food data
    for entry in food_data:
        # create a row to write to the csv file
        csv_row = [
            timestamp,
            time,
            entry["food_name"],
            entry["serving_qty"],
            entry["serving_unit"],
            entry["serving_weight_grams"],
            entry["calories"],
            entry["total_fat"],
            entry["saturated_fat"],
            entry["cholesterol"],
            entry["sodium"],
            entry["total_carbohydrate"],
            entry["dietary_fiber"],
            entry["sugars"],
            entry["protein"],
            entry["potassium"],
        ]
        # replace any None values with 0 in the row
        csv_row = [0 if x is None else x for x in csv_row]

        # check if the csv file already exists
        if os.path.isfile("./nutrition_log.csv"):
            # if the file exists, append the new row to the end of the file
            with open("./nutrition_log.csv", "a") as csvfile:
                filewriter = writer(csvfile, delimiter=",")
                filewriter.writerow(csv_row)
        else:
            # if the file does not exist, create it and write the header row and the new row
            with open("./nutrition_log.csv", "w") as csvfile:
                filewriter = writer(csvfile, delimiter=",")
                filewriter.writerow(
                    [
                        "Date",
                        "Time",
                        "Name",
                        "Serving Quantity",
                        "Serving Unit",
                        "Serving Weight in Grams",
                        "Calories",
                        "Total Fat",
                        "Saturated Fat",
                        "Cholesterol",
                        "Sodium",
                        "Total Carbohydrate",
                        "Dietary Fiber",
                        "Sugars",
                        "Protein",
                        "Potassium",
                    ]
                )
                filewriter.writerow(csv_row)


def calculateTotalNutrients(food_data):
    # initialize variables to hold total nutrient amounts
    food_name = []
    calories = 0
    total_fat = 0
    saturated_fat = 0
    cholesterol = 0
    sodium = 0
    total_carbohydrate = 0
    dietary_fiber = 0
    sugars = 0
    protein = 0
    potassium = 0

    # loop through each food entry in the input data
    for entry in food_data:
        # extract the nutrient amounts from the entry
        row = [
            entry["food_name"],
            entry["calories"],
            entry["total_fat"],
            entry["saturated_fat"],
            entry["cholesterol"],
            entry["sodium"],
            entry["total_carbohydrate"],
            entry["dietary_fiber"],
            entry["sugars"],
            entry["protein"],
            entry["potassium"],
        ]
        # replace any None values with 0
        row = [0 if x is None else x for x in row]

        # add the food name to the list of names
        food_name.append(row[0] + ", ")
        # add the nutrient amounts to the running totals
        calories += float(row[1])
        total_fat += float(row[2])
        saturated_fat += float(row[3])
        cholesterol += float(row[4])
        sodium += float(row[5])
        total_carbohydrate += float(row[6])
        dietary_fiber += float(row[7])
        sugars += float(row[8])
        protein += float(row[9])
        potassium += float(row[10])

    # remove the trailing comma from the last food name
    food_name[-1] = food_name[-1][:-2]

    # package the total nutrient amounts into a dictionary
    totalNutrients = {
        "food_name": food_name,
        "calories": round(calories, 2),
        "total_fat": round(total_fat, 2),
        "saturated_fat": round(saturated_fat, 2),
        "cholesterol": round(cholesterol, 2),
        "sodium": round(sodium, 2),
        "total_carbohydrate": round(total_carbohydrate, 2),
        "dietary_fiber": round(dietary_fiber, 2),
        "sugars": round(sugars, 2),
        "protein": round(protein, 2),
        "potassium": round(potassium, 2),
    }

    # return the dictionary of total nutrient amounts
    return totalNutrients


def read_file():
    existing_data = []

    # Open the CSV file for reading
    with open("./nutrition_log.csv", "r") as csvfile:
        # Use csv.reader to read the file and parse it as a list of rows
        filereader = reader(csvfile, delimiter=",")
        for row in filereader:
            existing_data.append(row)

        # Remove the header row from the data
        existing_data = existing_data[1:]

        # Sort the entries in descending order based on the date and time
        existing_data = sorted(
            existing_data,
            key=lambda row: datetime.datetime.strptime(row[0], "%d/%m/%Y %H:%M:%S"),
            reverse=True,
        )

    return existing_data


def delete_entry(index=0):
    # Get all the existing entries from the CSV file
    all_entries = read_file()

    # Remove the entry at the specified index
    all_entries.pop(int(index))

    # Open the CSV file for writing
    with open("./nutrition_log.csv", "w") as csvfile:
        # Use csv.writer to write the data to the file
        filewriter = writer(csvfile, delimiter=",")

        # Write the header row to the file
        filewriter.writerow(
            [
                "Date",
                "Time",
                "Name",
                "Serving Quantity",
                "Serving Unit",
                "Serving Weight in Grams",
                "Calories",
                "Total Fat",
                "Saturated Fat",
                "Cholesterol",
                "Sodium",
                "Total Carbohydrate",
                "Dietary Fiber",
                "Sugars",
                "Protein",
                "Potassium",
            ]
        )

        # Write all the remaining entries to the file
        for entry in all_entries:
            filewriter.writerow(entry)


def read_file_as_json():
    # read file and get data as a list
    dataInList = read_file()
    # create an empty list to store JSON formatted data
    dataAsJson = []
    # loop through each entry in the data list
    for entry in dataInList:
        # convert the date string to a datetime object
        datetimeObject = datetime.datetime.strptime(entry[0], "%d/%m/%Y %H:%M:%S")
        # format the date in the desired format
        dateFormatted = datetimeObject.strftime("%b %d")
        # create a dictionary with the food data
        food_data = {
            "date": dateFormatted,
            "time": entry[1],
            "food_name": entry[2],
            "serving_qty": entry[3],
            "serving_unit": entry[4],
            "serving_weight_grams": entry[5],
            "calories": entry[6],
            "total_fat": entry[7],
            "saturated_fat": entry[8],
            "cholesterol": entry[9],
            "sodium": entry[10],
            "total_carbohydrate": entry[11],
            "dietary_fiber": entry[12],
            "sugars": entry[13],
            "protein": entry[14],
            "potassium": entry[15],
        }
        # add the food data to the JSON formatted list
        dataAsJson.append(food_data)
    # return the JSON formatted list
    return dataAsJson


def to_metric_weight(weight, weightUnit):
    # check if weight unit is in lbs
    if weightUnit == "lbs":
        # convert weight to kg
        user_weight = int(weight) * 0.45359237
    else:
        user_weight = int(weight)
    # return the weight in kg
    return user_weight


def to_metric_height(heightCm, heightFT, heightInches, heightUnit):
    # check if height unit is in feet
    if heightUnit == "ft":
        # convert height to cm
        user_height = int(heightFT) * 30.48 + int(heightInches) * 2.54
    else:
        user_height = int(heightCm)
    # return the height in cm
    return user_height


def read_user_settings():
    # check if the JSON file exists and is not empty
    if os.path.isfile("./user.json") and 0 != os.path.getsize("./user.json"):
        # open the JSON file and load the data
        with open("./user.json", "r", encoding="utf-8") as jsonfile:
            return json.load(jsonfile)
    else:
        # return 0 if the JSON file doesn't exist or is empty
        return 0


def update_user_settings(changedVal):
    if os.path.isfile("./user.json"):
        data = read_user_settings()
        if changedVal["birthSex"] != "":
            data["gender"] = changedVal["birthSex"]
        if changedVal["weight"] != "":
            data["weight"] = changedVal["weight"]
        if changedVal["weightUnit"] != "":
            data["weightUnit"] = changedVal["weightUnit"]
        if changedVal["heightCm"] != "":
            data["heightCm"] = changedVal["heightCm"]
        if changedVal["heightFeet"] != "":
            data["heightFT"] = changedVal["heightFeet"]
        if changedVal["heightInches"] != "":
            data["heightInches"] = changedVal["heightInches"]
        if changedVal["heightUnit"] != "":
            data["heightUnit"] = changedVal["heightUnit"]
        if changedVal["age"] != "":
            data["age"] = changedVal["age"]
        if changedVal["activityLevel"] != "":
            data["activityLevel"] = changedVal["activityLevel"]
        with open("./user.json", "w") as jsonfile:
            myJSON = json.dumps(data)
            jsonfile.write(myJSON)
            jsonfile.close()
    else:
        with open("./user.json", "w") as jsonfile:
            user_info = {
                "weight": changedVal["weight"],
                "weightUnit": changedVal["weightUnit"],
                "heightCm": changedVal["heightCm"],
                "heightFT": changedVal["heightFeet"],
                "heightInches": changedVal["heightInches"],
                "heightUnit": changedVal["heightUnit"],
                "age": changedVal["age"],
                "gender": changedVal["birthSex"],
                "activityLevel": changedVal["activityLevel"],
            }
            myJSON = json.dumps(user_info)

            jsonfile.write(myJSON)
            jsonfile.close()


def total_calories_per_day(day=datetime.datetime.now().strftime("%d/%m/%Y")):
    # initialize sum to zero
    sum = 0
    # read data from file
    data = read_file()

    # iterate over each entry in the data list
    for entry in data:
        # check if the given day is in the date string of the entry
        if day in entry[0]:
            # add the calorie value of the entry to sum
            sum += float(entry[6])

    # round the sum to 2 decimal places
    sum = round(sum, 2)
    return sum


def total_foods_per_day(day=datetime.datetime.now().strftime("%d/%m/%Y")):
    # initialize an empty list to hold the food names
    foods = []
    # read data from file
    data = read_file()

    # iterate over each entry in the data list
    for entry in data:
        # check if the given day is in the date string of the entry
        if day in entry[0]:
            # append the food name to the foods list
            foodStr = entry[2] + ", "
            foods.append(foodStr)
    # remove the trailing comma and space from the last food name
    foods[-1] = foods[-1][:-2]
    return foods


def total_calories_per_day_summary_list():
    # initialize an empty list to hold the summary data
    foodData = []
    # initialize the sum and foods lists for the current day
    sumPerDay = 0
    foodsPerDay = []

    # read data from file
    data = read_file()
    # initialize the day variable to an empty string
    day = ""

    # iterate over each entry in the data list
    for entry in data:
        # check if the date string of the entry has changed
        if day != entry[0][:10]:
            # if it has, update the day variable and the sum and foods lists
            day = entry[0][:10]

            sumPerDay = total_calories_per_day(day)
            foodsPerDay = total_foods_per_day(day)

            # format the date string and create a new dictionary entry
            datetimeObject = datetime.datetime.strptime(day, "%d/%m/%Y")
            dateFormatted = datetimeObject.strftime("%b %d")

            newEntry = {
                "date": dateFormatted,
                "sumPerDay": sumPerDay,
                "foodsPerDay": foodsPerDay,
            }

            # append the new dictionary entry to the foodData list
            foodData.append(newEntry)
    return foodData


def most_eaten_food():
    # initialize an empty list to hold the food names
    foods = []
    # read data from file
    data = read_file()

    # check if there is any data in the file
    if 0 == len(data):
        return ""

    # iterate over each entry in the data list
    for entry in data:
        # append the food name to the foods list
        foods.append(entry[2])

    # find the mode (most common value) in the foods list and return it
    return mode(foods)


def calculate_bmi():
    # Read user data from settings file
    data = read_user_settings()

    # If there's no user data, return 0
    if 0 == (data):
        return 0

    # Convert weight and height to metric units
    weight = to_metric_weight(data["weight"], data["weightUnit"])
    height = to_metric_height(
        data["heightCm"], data["heightFT"], data["heightInches"], data["heightUnit"]
    )

    # Calculate BMI and round to 2 decimal places
    return round(weight / pow(height / 100, 2), 2)


def calculate_recommended_calories():
    # Read user data from settings file
    data = read_user_settings()

    # If there's no user data, return 0
    if 0 == (data):
        return 0

    # Convert weight and height to metric units
    weight = to_metric_weight(data["weight"], data["weightUnit"])
    height = to_metric_height(
        data["heightCm"], data["heightFT"], data["heightInches"], data["heightUnit"]
    )

    # Get user's age, gender, and activity level
    age = int(data["age"])
    birthSex = data["gender"]
    activityLevel = data["activityLevel"]

    # Determine activity level multiplier based on activity level
    if activityLevel == "Sedentary":
        activityMultiplier = 1.2
    elif activityLevel == "Lightly active":
        activityMultiplier = 1.375
    elif activityLevel == "Moderately active":
        activityMultiplier = 1.55
    elif activityLevel == "Very active":
        activityMultiplier = 1.725
    else:
        activityMultiplier = 1.9

    # Calculate recommended daily calories based on user data
    if birthSex == "Male":
        calories = round(
            activityMultiplier * (9.99 * weight + 6.25 * height - 4.92 * age + 5), 2
        )
    else:
        calories = round(
            activityMultiplier * (9.99 * weight + 6.25 * height - 4.92 * age - 161), 2
        )

    return calories
