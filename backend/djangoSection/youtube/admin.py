from django.contrib import admin
from .models import Video, YouTuber, Category, Region, Statistics

admin.site.register(Video)
admin.site.register(YouTuber)
admin.site.register(Category)
admin.site.register(Region)
admin.site.register(Statistics)