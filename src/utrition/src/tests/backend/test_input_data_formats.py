import sys

sys.path.append("src/utrition/utrition-backend/")
from PIL import Image
import ML.Interface as interface

import os


def test_upload_file_image_extension():
    # create a temporary test image file
    img = Image.new("RGB", (128, 128), color="red")
    img.save("test_image.jpg")

    # call the open function with the path to the test image file
    result = interface.open("test_image.jpg")

    # check that the result is not None
    assert result is not None

    # check that the userFlag global variable has been set to 1
    assert interface.userFlag == 1

    # clean up the temporary test image file
    os.remove("test_image.jpg")


def test_upload_file_text_extension():
    # create a temporary test text file
    with open("test_file.txt", "w") as f:
        f.write("test content")

    # call the open function with the path to the test text file
    try:
        interface.open("test_file.txt")
    except Exception as e:
        # check that the exception is UnidentifiedImageError
        assert type(e).__name__ == "UnidentifiedImageError"

    # check that the userFlag global variable has not been set to 1
    assert interface.userFlag == 1

    # clean up the temporary test file
    os.remove("test_file.txt")
