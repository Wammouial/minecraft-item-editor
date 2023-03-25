from editor.models import Item

import json


def setMockData():
	with open(r"editor\data\mockdata.json", "r", encoding="utf-8") as _mock:
		mockdata = json.load(_mock).get("mockdata")

	for _item in mockdata:
		# Create a new Item object
		item = Item()

		item.name = _item["name"]

		# Set the base JSON
		item.base = _item["base"]

		# Set the options JSON
		item.options = _item["options"]

		# Save the object to the database
		item.save()

