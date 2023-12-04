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

class StatisticsRawSerializer(serializers.Serializer):
    statistic_id = serializers.CharField()
    publishedAt = serializers.CharField()
    trending_date = serializers.CharField()
    view_count = serializers.IntegerField()
    comment_count = serializers.IntegerField()
    likes = serializers.IntegerField()
    dislikes = serializers.IntegerField()
    video_id = serializers.CharField()

class VideoRawSerializer(serializers.Serializer):
    video_id = serializers.CharField()
    title = serializers.CharField()
    thumbnail_link = serializers.CharField()
    comments_disabled = serializers.BooleanField()
    ratings_disabled = serializers.BooleanField()
    channel_id = serializers.CharField()
    region_id = serializers.IntegerField()
    category_id = serializers.IntegerField()


        
class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        # fields = ['statistic_id', 'publishedAt', 'trending_date', 'view_count', 'comment_count', 'likes', 'dislikes', 'video']
        fields = "__all__"
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"
        # fields = ['video_id', 'title', 'thumbnail_link', 'comments_disabled', 'ratings_disabled', 'channel', 'region', 'category']

class YouTuberSerializer(serializers.ModelSerializer):
    class Meta:
        model = YouTuber
        fields = ['channel_id', 'channel_title']

