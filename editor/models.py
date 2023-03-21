from django.db import models
import json

from editor.yamlParser import parseYAML


class Item(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField()
    optionsJSON = models.TextField()
    baseJSON = models.TextField()

    def getOptionsJSON(self):
        return json.loads(self.optionsJSON)

    def setOptionsJSON(self, data):
        self.optionsJSON = json.dumps(data)

    options = property(getOptionsJSON, setOptionsJSON)

    def getBaseJSON(self):
        return json.loads(self.baseJSON)

    def setBaseJSON(self, data):
        self.baseJSON = json.dumps(data)

    base = property(getBaseJSON, setBaseJSON)

    @staticmethod
    def createItem(yamlString):
        name, base, options = parseYAML(yamlString)

        # Create a new Item object
        item = Item()

        item.name = name

        # Set the base JSON
        item.base = base

        # Set the options JSON
        item.options = options

        # Save the object to the database
        item.save()

        # Return the new object
        return item


class Panoplie(Item):
    pass


class Template(Item):
    pass

