from django.urls import path, include
from django.views.generic import RedirectView

from rest_framework.routers import DefaultRouter

from .api import ItemList, ItemDetail, PanoplieList, PanoplieDetail, TemplateList, TemplateDetail, \
    create_item_from_yaml, item_to_yaml, ItemViewSet, PanoplieViewSet, TemplateViewSet

router = DefaultRouter()

router.register(r'items', ItemViewSet)
router.register(r'panoplies', PanoplieViewSet)
router.register(r'templates', TemplateViewSet)


urlpatterns = [
    path('create_from_yaml/', create_item_from_yaml, name='create_item_from_yaml'),
    path('<int:item_id>/to_yaml/', item_to_yaml, name='item_to_yaml'),
    path('', include(router.urls)),


]