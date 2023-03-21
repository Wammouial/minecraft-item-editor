from rest_framework import serializers
from .models import Item, Attribute, Panoplie, Template


class AttributeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Attribute
		fields = ['id', 'name', 'value']


def commonCreate(validated_data, TypeOf):
	attributes_data = validated_data.pop('attributes')
	item = TypeOf.objects.create(**validated_data)
	for attribute_data in attributes_data:
		Attribute.objects.create(item=item, **attribute_data)
	return item


def commonUpdate(instance, validated_data):
	attributes_data = validated_data.pop('attributes')
	instance.name = validated_data.get('name', instance.name)
	instance.save()
	keep_attributes = []
	for attribute_data in attributes_data:
		if 'id' in attribute_data:
			if Attribute.objects.filter(id=attribute_data['id'], panoplie=instance).exists():
				attribute = Attribute.objects.get(id=attribute_data['id'], panoplie=instance)
				attribute.name = attribute_data.get('name', attribute.name)
				attribute.value = attribute_data.get('value', attribute.value)
				attribute.save()
				keep_attributes.append(attribute.id)
			else:
				continue
		else:
			attribute = Attribute.objects.create(panoplie=instance, **attribute_data)
			keep_attributes.append(attribute.id)
	for attribute in instance.attributes.all():
		if attribute.id not in keep_attributes:
			attribute.delete()
	return instance


class ItemSerializer(serializers.ModelSerializer):
	attributes = AttributeSerializer(many=True)

	class Meta:
		model = Item
		fields = ['id', 'name', 'attributes']

	def create(self, validated_data):
		return commonCreate(validated_data, Item)

	def update(self, instance, validated_data):
		return commonUpdate(instance, validated_data)


class PanoplieSerializer(serializers.ModelSerializer):
	attributes = AttributeSerializer(many=True)

	class Meta:
		model = Panoplie
		fields = ['id', 'name', 'attributes']

	def create(self, validated_data):
		return commonCreate(validated_data, Panoplie)

	def update(self, instance, validated_data):
		return commonUpdate(instance, validated_data)


class TemplateSerializer(serializers.ModelSerializer):
	attributes = AttributeSerializer(many=True)

	class Meta:
		model = Template
		fields = ['id', 'name', 'attributes']

	def create(self, validated_data):
		return commonCreate(validated_data, Template)

	def update(self, instance, validated_data):
		return commonUpdate(instance, validated_data)
