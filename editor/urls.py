from django.urls import path
from django.views.generic import RedirectView

from .api import ItemList, ItemDetail, PanoplieList, PanoplieDetail, TemplateList, TemplateDetail, create_item_from_yaml

urlpatterns = [
    path('', RedirectView.as_view(url='items/', permanent=True)),
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
    path('items/create_from_yaml/', create_item_from_yaml, name='create_item_from_yaml'),
    path('panoplies/', PanoplieList.as_view(), name='panoplie-list'),
    path('panoplies/<int:pk>/', PanoplieDetail.as_view(), name='panoplie-detail'),
    path('templates/', TemplateList.as_view(), name='template-list'),
    path('templates/<int:pk>/', TemplateDetail.as_view(), name='template-detail'),
]