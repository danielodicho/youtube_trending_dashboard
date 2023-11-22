from django.shortcuts import render
from rest_framework import generics
from .models import Region, Category, Statistics, Video, YouTuber
from .serializers import RegionSerializer, CategorySerializer, StatisticsSerializer, VideoSerializer, YouTuberSerializer
from rest_framework import viewsets


class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class StatisticsViewSet(viewsets.ModelViewSet):
    queryset = Statistics.objects.all()
    serializer_class = StatisticsSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class YouTuberViewSet(viewsets.ModelViewSet):
    queryset = YouTuber.objects.all()
    serializer_class = YouTuberSerializer


