from django.db import models

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=256, blank=True, null=True)


class Region(models.Model):
    region_id = models.AutoField(primary_key=True)
    region_name = models.CharField(max_length=255, blank=True, null=True)



class Statistics(models.Model):
    statistic_id = models.CharField(max_length=255, primary_key=True)
    publishedAt = models.CharField(max_length=255, blank=True, null=True)
    trending_date = models.CharField(max_length=255, blank=True, null=True)
    view_count = models.IntegerField(blank=True, null=True)
    comment_count = models.IntegerField(blank=True, null=True)
    likes = models.IntegerField(blank=True, null=True)
    dislikes = models.IntegerField(blank=True, null=True)
    video = models.ForeignKey('Video', on_delete=models.CASCADE, blank=True, null=True)



class Video(models.Model):
    video_id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    thumbnail_link = models.CharField(max_length=255, blank=True, null=True)
    comments_disabled = models.BooleanField(blank=True, null=True)
    ratings_disabled = models.BooleanField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    channel = models.ForeignKey('YouTuber', on_delete=models.CASCADE, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)

class YouTuber(models.Model):
    channel_id = models.CharField(max_length=256, primary_key=True)
    channel_title = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.channel_title
