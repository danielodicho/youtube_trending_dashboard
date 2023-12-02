from django.contrib import admin

# Register your models here.
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Video

from import_export import resources, fields
from import_export.widgets import ForeignKeyWidget, BooleanWidget
from .models import Video, YouTuber, Category

class VideoResource(resources.ModelResource):
    channel = fields.Field(
        column_name='channelId',
        attribute='channel',
        widget=ForeignKeyWidget(YouTuber, 'channel_id'))
    
    category = fields.Field(
        column_name='categoryId',
        attribute='category',
        widget=ForeignKeyWidget(Category, 'id'))

    comments_disabled = fields.Field(
        column_name='comments_disabled',
        attribute='comments_disabled',
        widget=BooleanWidget())

    ratings_disabled = fields.Field(
        column_name='ratings_disabled',
        attribute='ratings_disabled',
        widget=BooleanWidget())

    class Meta:
        model = Video
        fields = ('video_id', 'title', 'comments_disabled', 'ratings_disabled', 'channel', 'category')
        import_id_fields = ['video_id']


@admin.register(Video)
class VideoAdmin(ImportExportModelAdmin):
    resource_class = VideoResource
