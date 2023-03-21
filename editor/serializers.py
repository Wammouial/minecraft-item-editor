import json

from rest_framework import serializers
from .models import Item, Panoplie, Template


from rest_framework import serializers
from .models import Item, Panoplie, Template


import json
import jsonpickle


class ItemSerializer(serializers.ModelSerializer):
    options = serializers.JSONField()
    base = serializers.JSONField()

    class Meta:
        model = Item
        fields = ('id', 'name', 'image', 'options', 'base')



class PanoplieSerializer(serializers.ModelSerializer):
    options = serializers.JSONField()
    base = serializers.JSONField()

    class Meta:
        model = Panoplie
        fields = ('id', 'name', 'image', 'options', 'base')


class TemplateSerializer(serializers.ModelSerializer):
    options = serializers.JSONField()
    base = serializers.JSONField()

    class Meta:
        model = Template
        fields = ('id', 'name', 'image', 'options', 'base')
