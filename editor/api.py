from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

from .models import Item, Panoplie, Template
from .serializers import ItemSerializer, PanoplieSerializer, TemplateSerializer


class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class PanoplieList(generics.ListCreateAPIView):
    queryset = Panoplie.objects.all()
    serializer_class = PanoplieSerializer


class PanoplieDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Panoplie.objects.all()
    serializer_class = PanoplieSerializer


class TemplateList(generics.ListCreateAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


class TemplateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


@csrf_exempt
def create_item_from_yaml(request):
    if request.method == 'POST':
        # Get the YAML string from the request body
        yamlString = request.body.decode('utf-8')

        # Create a new Item object
        item = Item.createItem(yamlString)

        # Return a JSON response with the new object's ID
        return JsonResponse(ItemSerializer(item).data)

    # Return a 405 error if the request method is not POST
    return JsonResponse({'error': 'Method not allowed'}, status=405)
