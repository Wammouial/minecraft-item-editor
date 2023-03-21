from django.db import models


class Attribute(models.Model):
    name = models.CharField(max_length=255)
    value = models.FloatField()


class Item(models.Model):
    name = models.CharField(max_length=255)
    attributes = models.ManyToManyField('Attribute')


class Panoplie(models.Model):
    name = models.CharField(max_length=255)
    attributes = models.ManyToManyField('Attribute')


class Template(models.Model):
    name = models.CharField(max_length=255)
    attributes = models.ManyToManyField('Attribute')

