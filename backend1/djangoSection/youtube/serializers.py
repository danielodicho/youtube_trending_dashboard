from rest_framework import serializers
from .models import Region, Category, Statistics, Video, YouTuber

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['region_id', 'region_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'category_name']






class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        # fields = ['statistic_id', 'publishedAt', 'trending_date', 'view_count', 'comment_count', 'likes', 'dislikes', 'video']
        fields = "__all__"
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['video_id', 'title', 'thumbnail_link', 'comments_disabled', 'ratings_disabled', 'description', 'channel', 'region', 'category']

class YouTuberSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTuber
        fields = ['channel_id', 'channel_title']

