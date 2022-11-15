import numpy as np
import tensorflow as tf
import time
import DataHandler

def startModel(flag, PA):
	beginTime = time.time() #start timer to find time elapsed in identifying image

	# Hyperparameter definitions
	batch_size = 100 #number of training samples used for a training pass. Large batch = less cost due to lower number of updates needed, increasing batch is akin to decreasing learning rate. Small batch = more generalized (perform better on new/unseen data)
	learning_rate = 0.005 #between 0 and 1, how quickly the model is trained. Smaller = smaller changes to weights, longer but more accurate. Larger = larger changes to weights, fast but less accurate 
	max_steps = 1000 #number of forward and backward passed on a batch. Larger max steps = overfitting, smaller max steps = uderfitting

	# Prepare data
	data_sets = DataHandler.load_data(flag, PA)

	# -----------------------------------------------------------------------------
	# Prepare the TensorFlow graph
	# -----------------------------------------------------------------------------

	# Define input placeholders
	tf.compat.v1.disable_eager_execution()
	images_placeholder = tf.compat.v1.placeholder(tf.float32, shape=[None, 3072])
	labels_placeholder = tf.compat.v1.placeholder(tf.int64, shape=[None])

	# Define variables (these are the values we want to optimize)
	weights = tf.Variable(tf.zeros([3072, 100]))
	biases = tf.Variable(tf.zeros([100]))

	# Define the classifier's result
	logits = tf.matmul(images_placeholder, weights) + biases

	# Define the loss function
	loss = tf.reduce_mean(tf.nn.sparse_softmax_cross_entropy_with_logits(logits=logits,
	  labels=labels_placeholder))

	# Define the training operation
	train_step = tf.compat.v1.train.GradientDescentOptimizer(learning_rate).minimize(loss)

	# Operation comparing prediction with true label
	correct_prediction = tf.equal(tf.argmax(logits, 1), labels_placeholder)

	# Operation calculating the accuracy of our predictions
	accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

	# -----------------------------------------------------------------------------
	# Run the TensorFlow graph
	# -----------------------------------------------------------------------------
	
	with tf.compat.v1.Session() as sess:
		# Initialize variables
		sess.run(tf.compat.v1.global_variables_initializer())
		print('\n')
		# Repeat max_steps times
		for i in range(max_steps):
			# Generate input data batch
			indices = np.random.choice(data_sets['images_train'].shape[0], batch_size)
			images_batch = data_sets['images_train'][indices]
			labels_batch = data_sets['labels_train'][indices]
			# Periodically print out the model's current accuracy
			if i % 100 == 0:
				train_accuracy = sess.run(accuracy, feed_dict={images_placeholder: images_batch, labels_placeholder: labels_batch})
				print('Step {:5d}: training accuracy {:g}'.format(i, train_accuracy))

			# Perform a single training step
			sess.run(train_step, feed_dict={images_placeholder: images_batch, labels_placeholder: labels_batch})

		# After finishing the training, evaluate on the test set
		for i in range(len(data_sets['images_test'])): #for each test image, display the accuracy at which the model correctly predicts the images label
			test_accuracy = sess.run(accuracy, feed_dict={images_placeholder: data_sets['images_test'][[i]], labels_placeholder: data_sets['labels_test'][[i]]})
			if(test_accuracy>0): #if match accuracy > 0, display the class of identified object (this should only be true once per image)
				print("-"*30)
				print("Image classified as:", data_sets['classes'][i]) #display label
				print("-"*30)

	
	endTime = time.time() #stop timer
	print('Total time: {:5.2f}s'.format(endTime - beginTime))
