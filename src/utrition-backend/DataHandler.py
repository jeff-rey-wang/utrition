import numpy as np
import pickle

#convert from bytestream to object
def unpickle(file):
	with open(file, 'rb') as f: #files are in byte stream
		dict = pickle.load(f, encoding='latin1') #convert from byte stream to object
		if (file == 'cifar-100-python/meta'):
			x = (dict['fine_label_names'])
			return x
		else:
			x = dict['data'] #image data
			y = (dict['fine_labels']) #each image contains a fine label (class that it belongs to, e.g. apple) and a coarse label (superclass it belongs to, e.g. fruits and vegetables)
			return x, y

def load_data(flag, PA):

	trainFile = 'cifar-100-python/train'
	testFile = 'cifar-100-python/test'
	metaFile = 'cifar-100-python/meta'

	data_train, fine_train = unpickle(trainFile)
	data_test, fine_test = unpickle(testFile)
	meta = unpickle(metaFile)
	nameIndex = ['apple', 'mushroom', 'orange', 'pear', 'sweet_pepper'] #train model on only these fine labels
	targetIndex = [meta.index('apple'), meta.index('mushroom'), meta.index('orange'), meta.index('pear'), meta.index('sweet_pepper')]

	data_train_f = [] #data
	fine_train_f = [] #int labels
	data_test_f = [] #data
	fine_test_f = [] #int labels
	meta_f = [] #name labels
	fine_train_index = [] #index of labels of interest
	fine_test_index = [] #index of labels of interest

	for i in targetIndex:
		temp=[]
		for j in range(len(fine_train)):
			if fine_train[j] == i:
				temp.append(j)
				meta_f.append(nameIndex[targetIndex.index(i)]) #list of what images are
		fine_train_index.append(temp) #list of the indicies of the images of interest
		
		temp=[]
		for j in range(len(fine_test)):
			if fine_test[j] == i:
				temp.append(j)
		fine_test_index.append(temp)

	for i in range(len(fine_train_index)):
		for j in fine_train_index[i]:
			data_train_f.append(data_train[j]) #list of pixel arrays of the images of interest 
			fine_train_f.append(fine_train[j])
	
	#Sample test data with CIFAR-100 fruit/vegetable pictures
	for i in range(len(fine_test_index)):
		for j in fine_test_index[i]:
			data_test_f.append(data_test[j])
			fine_test_f.append(fine_test[j])

	if flag:
		data_test_f = []
		fine_test_f = []

		for i in targetIndex:
			data_test_f.append(np.array(PA))
			fine_test_f.append(i)

	print('\n')

	#standardize data by subtracting the pixel RGB values of the mean training image from all training and test images   
	mean_image = np.mean(data_train_f, axis=0)
	data_train_f -= mean_image
	data_test_f -= mean_image
	
	fine_train_f = np.array(fine_train_f)
	fine_test_f = np.array(fine_test_f)

	data_dict = {
		'images_train': data_train_f,
		'labels_train': fine_train_f,
		'images_test': data_test_f,
		'labels_test': fine_test_f,
		'classes': nameIndex
	}

	return data_dict

def main():
	#used for debugging single file
	data_sets = load_data(None, None)
	print(data_sets['images_train'].shape)
	print(data_sets['labels_train'].shape)
	print(data_sets['images_test'].shape)
	print(data_sets['labels_test'].shape)

if __name__ == '__main__':
	main()
