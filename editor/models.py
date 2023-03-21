from django.db import models
import json


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


class Panoplie(Item):
    pass


class Template(Item):
    pass

