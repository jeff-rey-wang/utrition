from PIL import Image
import ML.MainML
import numpy as np

global userFlag
userFlag = 0 #flag for if user uploaded an image

global iconPA
iconPA = []

def open(path):
	global userFlag #use global value of userFlag
	global iconPA

	#pre-processing image: use PIL to convert image to usable format
	imgIcon = Image.open(path).resize((32, 32), Image.ANTIALIAS) #icon image for passing into ML algorithm
	imgIcon.save('userIcon.jpg','JPEG')

	iconPA = np.concatenate(np.array(imgIcon))

	tempArray = []
	for i in range(3):
		for j in range(len(iconPA)):
			tempArray.append(iconPA[j][i])

	iconPA = tempArray
	userFlag = 1 #image uploaded

	return ML.MainML.startModel(userFlag, iconPA)