from django.db import connections
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from .models import Region, Category, Statistics, Video, YouTuber
from .serializers import RegionSerializer, CategorySerializer, StatisticsSerializer, VideoSerializer, YouTuberSerializer
from rest_framework import viewsets


class RegionViewSet(viewsets.ModelViewSet):
    serializer_class = RegionSerializer

    def get_queryset(self):
        sql_query = "SELECT * FROM youtube_region;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = [{'region_id': item[0], 'region_name': item[1]} for item in result]
        return data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        sql_query = "SELECT * FROM youtube_category;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = [{'category_id': item[0], 'category_name': item[1]} for item in result]
        return data

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


# class StatisticsViewSet(viewsets.ModelViewSet):
#     queryset = Statistics.objects.all()
#     serializer_class = StatisticsSerializer

# class VideoViewSet(viewsets.ModelViewSet):
#     queryset = Video.objects.all()
#     serializer_class = VideoSerializer

# class StatisticsViewSet(viewsets.ModelViewSet):
#     serializer_class = StatisticsSerializer

#     def get_queryset(self):
#         sql_query = "SELECT * FROM youtube_statistics;"
#         with connections['default'].cursor() as cursor:
#             cursor.execute(sql_query)
#             result = cursor.fetchall()

#         data = [{'statistic_id': item[0], 'publishedAt': item[1], 'trending_date': item[2], 'view_count': item[3], 'comment_count': item[4],
#                  'likes': item[5], 'dislikes': item[6], 'video': item[7]} for item in result]
#         return data

#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data)

class StatisticsViewSet(viewsets.ModelViewSet):
    serializer_class = StatisticsSerializer

    def get_queryset(self):
        sql_query = """
            SELECT statistic_id, publishedAt, trending_date, view_count, comment_count, likes, dislikes, video_id
            FROM youtube_statistics;
        """
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = []
        for item in result:
            statistic_id, publishedAt, trending_date, view_count, comment_count, likes, dislikes, video_id = item

            # Fetch related models
            video = Video.objects.get(pk=video_id)

            statistics_data = {
                'statistic_id': statistic_id,
                'publishedAt': publishedAt,
                'trending_date': trending_date,
                'view_count': view_count,
                'comment_count': comment_count,
                'likes': likes,
                'dislikes': dislikes,
                'video': video,
            }

            data.append(statistics_data)

        return data


class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = VideoSerializer

    def get_queryset(self):
        sql_query = """
            SELECT video_id, title, thumbnail_link, comments_disabled, ratings_disabled, channel_id, region_id, category_id
            FROM youtube_video;
        """
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = []
        for item in result:
            video_id, title, thumbnail_link, comments_disabled, ratings_disabled, channel_id, region_id, category_id = item

            # Fetch related models
            channel = YouTuber.objects.get(pk=channel_id)
            region = Region.objects.get(pk=region_id)
            category = Category.objects.get(pk=category_id)

            video_data = {
                'video_id': video_id,
                'title': title,
                'thumbnail_link': thumbnail_link,
                'comments_disabled': bool(comments_disabled),
                'ratings_disabled': bool(ratings_disabled),
                'channel': channel,
                'region': region,
                'category': category,
            }

            data.append(video_data)

        return data



class YouTuberViewSet(viewsets.ModelViewSet):
    serializer_class = YouTuberSerializer

    def get_queryset(self):
        # Use raw SQL query to fetch data
        sql_query = "SELECT * FROM youtube_youtuber;"

        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        # Transform the list of tuples into a list of dictionaries
        data = [{'channel_id': item[0], 'channel_title': item[1]} for item in result]

        return data

    def list(self, request, *args, **kwargs):
        # Override list method to handle the raw queryset
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        # Your existing dependencies here
    ]

    operations = [
        migrations.RunSQL("""
            CREATE PROCEDURE GetPopularVideos(IN minLikes INT, IN limitRows INT)
            BEGIN
                DECLARE video_id_var VARCHAR(255);
                DECLARE video_title_var VARCHAR(255);
                DECLARE video_likes_var INT;
                DECLARE done BOOLEAN DEFAULT FALSE;  -- Declare 'done' variable
                DECLARE counter INT DEFAULT 0;  -- Counter to limit the number of rows

                -- Declare and define a cursor for selecting videos
                DECLARE video_cursor CURSOR FOR
                    SELECT v.video_id, v.title, s.likes
                    FROM Video v
                    JOIN (
                        SELECT video_id, MAX(likes) AS likes
                        FROM Statistics
                        GROUP BY video_id
                    ) s ON v.video_id = s.video_id
                    ORDER BY s.likes DESC;

                -- Declare continue handler for cursor
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

                -- Open the cursor
                OPEN video_cursor;

                -- Create a temporary table to store results
                CREATE TEMPORARY TABLE IF NOT EXISTS PopularVideos (
                    video_id VARCHAR(255),
                    video_title VARCHAR(255),
                    likes INT
                );

            -- Loop through the videos
            video_loop: LOOP
                -- Fetch data into variables
                FETCH video_cursor INTO video_id_var, video_title_var, video_likes_var;

                -- Exit the loop if no more rows or reached the limit
                IF done OR counter >= limitRows THEN
                    LEAVE video_loop;
                END IF;

                -- Check if the video has the required number of likes
                IF video_likes_var >= minLikes THEN
                    -- Insert the result into the temporary table
                    INSERT INTO PopularVideos (video_id, video_title, likes)
                    VALUES (video_id_var, video_title_var, video_likes_var);

                    -- Increment the counter
                    SET counter = counter + 1;
                END IF;
            END LOOP video_loop;

            -- Close the cursor
            CLOSE video_cursor;

            -- Select the results from the temporary table, ordered by likes in descending order
            SELECT *
            FROM PopularVideos
            ORDER BY likes DESC;

            -- Drop the temporary table
            DROP TEMPORARY TABLE IF EXISTS PopularVideos;
            END //
            """),
            migrations.RunSQL(
                """
                CREATE PROCEDURE SearchYouTuber(IN search_string VARCHAR(255))
                BEGIN
                    SELECT *
                    FROM YouTuber
                    WHERE channelTitle LIKE CONCAT(search_string, '%');
                END //
                """)
    ]