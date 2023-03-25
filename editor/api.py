from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Item, Panoplie, Template
from .serializers import ItemSerializer, PanoplieSerializer, TemplateSerializer
from .yamlParser import toYAML


class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]


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


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    authentication_classes = [SessionAuthentication]
    permission_classes = [AllowAny]


class PanoplieViewSet(viewsets.ModelViewSet):
    queryset = Panoplie.objects.all()
    serializer_class = PanoplieSerializer


class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


@api_view(['POST'])
@permission_classes([])
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


def item_to_yaml(request, item_id):
    try:
        item = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item not found'}, status=404)

    yaml_str = toYAML(item)

    return HttpResponse(yaml_str, content_type='text/yaml')
