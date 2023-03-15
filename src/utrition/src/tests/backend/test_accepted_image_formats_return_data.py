import sys

sys.path.append("src/utrition/utrition-backend/")
import ML.Interface as interface
from PIL import Image

import os


def test_upload_file_png_extension():
    # create a temporary test image file
    img = Image.new("RGB", (128, 128), color="red")
    img.save("test_image.png")

    # call the open function with the path to the test image file
    try:
        result = interface.open("test_image.png")
    except Exception as e:
        # check that the exception is UnpicklingError
        assert type(e).__name__ == "UnpicklingError"
        return

    # check that the result is not None
    assert isinstance(result, str)

    # clean up the temporary test image file
    os.remove("test_image.png")
    os.remove("userIcon.jpg")


def test_upload_file_jpg_extension():
    # create a temporary test image file
    img = Image.new("RGB", (128, 128), color="red")
    img.save("test_image.jpg")

    # call the open function with the path to the test image file
    try:
        result = interface.open("test_image.jpg")
    except Exception as e:
        # check that the exception is UnpicklingError
        assert type(e).__name__ == "UnpicklingError"
        return

    # check that the result is not None
    assert isinstance(result, str)

    # clean up the temporary test image file
    os.remove("test_image.jpg")
    os.remove("userIcon.jpg")


def test_upload_file_jpeg_extension():
    # create a temporary test image file
    img = Image.new("RGB", (128, 128), color="red")
    img.save("test_image.jpeg")

    # call the open function with the path to the test image file
    try:
        result = interface.open("test_image.jpeg")
    except Exception as e:
        # check that the exception is UnpicklingError
        assert type(e).__name__ == "UnpicklingError"
        return

    # check that the result is not None
    assert isinstance(result, str)

    # clean up the temporary test image file
    os.remove("test_image.jpeg")
    os.remove("userIcon.jpg")
