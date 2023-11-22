from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'regions', views.RegionViewSet)
router.register(r'categories', views.CategoryViewSet)
# router.register(r'statistics', views.StatisticsViewSet)
# router.register(r'videos', views.VideoViewSet)
router.register(r'youtubers', views.YouTuberViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
