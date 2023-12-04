from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'regions', views.RegionViewSet, basename='regions')
router.register(r'categories', views.CategoryViewSet, basename='categories')
router.register(r'statistics', views.StatisticsViewSet, basename='statistics')
router.register(r'videos', views.VideoViewSet, basename='videos')
router.register(r'youtubers', views.YouTuberViewSet, basename='youtuber')

urlpatterns = [
    path('', include(router.urls)),
]
