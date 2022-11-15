from PIL import Image
import MainML
import numpy as np

global userFlag
userFlag = 0 #flag for if user uploaded an image

global iconPA
iconPA = []

if __name__ == '__main__': #code only executed to run as a program not when simply imported as a module
	def open():
		global userFlag #use global value of userFlag
		global iconPA

		img = "orange.jpeg" #input image to be analysed

		#pre-processing image: use PIL to convert image to usable format
		imgIcon = Image.open(img).resize((32, 32), Image.ANTIALIAS) #icon image for passing into ML algorithm
		imgIcon.save('userIcon.jpg','JPEG')

		iconPA = np.concatenate(np.array(imgIcon))

		tempArray = []
		for i in range(3):
			for j in range(len(iconPA)):
				tempArray.append(iconPA[j][i])

		iconPA = tempArray
		userFlag = 1 #image uploaded

		MainML.startModel(userFlag, iconPA)

	open()
