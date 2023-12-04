from django.db import connections
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from .models import Region, Category, Statistics, Video, YouTuber
from .serializers import RegionSerializer, CategorySerializer, StatisticsSerializer, VideoSerializer, YouTuberSerializer, StatisticsRawSerializer, VideoRawSerializer
from rest_framework import viewsets
from rest_framework import status


class RegionViewSet(viewsets.ModelViewSet):
    serializer_class = RegionSerializer

    def get_queryset(self):
        sql_query = "SELECT * FROM youtube_region;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = [{'region_id': item[0], 'region_name': item[1]} for item in result]
        return data
    

    def retrieve(self, request, pk=None):
        sql_query = "SELECT * FROM youtube_region WHERE region_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            result = cursor.fetchone()

        if result is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {'region_id': result[0], 'region_name': result[1]}
        serializer = self.serializer_class(data)
        return Response(serializer.data)

    def update(self, request, pk=None):
        region_name = request.data.get('region_name')

        if not region_name:
            return Response({'error': 'Region name is required'}, status=status.HTTP_400_BAD_REQUEST)

        sql_query = "UPDATE youtube_region SET region_name = %s WHERE region_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [region_name, pk])
            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Region updated'})
    
    def destroy(self, request, pk=None):
        sql_query = "DELETE FROM youtube_region WHERE region_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)



class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        sql_query = "SELECT * FROM youtube_category;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = [{'category_id': item[0], 'category_name': item[1]} for item in result]
        return data

    def retrieve(self, request, pk=None):
        sql_query = "SELECT * FROM youtube_category WHERE category_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            result = cursor.fetchone()

        if result is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {'category_id': result[0], 'category_name': result[1]}
        serializer = self.serializer_class(data)
        return Response(serializer.data)

    def update(self, request, pk=None):
        category_name = request.data.get('category_name')

        if not category_name:
            return Response({'error': 'Category name is required'}, status=status.HTTP_400_BAD_REQUEST)

        sql_query = "UPDATE youtube_category SET category_name = %s WHERE category_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [category_name, pk])
            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Category updated'})
    
    def destroy(self, request, pk=None):
        sql_query = "DELETE FROM youtube_category WHERE category_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)


class StatisticsViewSet(viewsets.ModelViewSet):
    serializer_class = StatisticsSerializer
    # serializer_class = StatisticsRawSerializer

    def create(self, request):
        # Extract the fields from the request
        statistic_id = request.data.get('statistic_id')
        publishedAt = request.data.get('publishedAt')
        trending_date = request.data.get('trending_date')
        view_count = request.data.get('view_count')
        comment_count = request.data.get('comment_count')
        likes = request.data.get('likes')
        dislikes = request.data.get('dislikes')
        video_id = request.data.get('video_id')

        # Simple validation: Check if all necessary fields are provided
        if not all([statistic_id, publishedAt, trending_date, view_count, comment_count, likes, dislikes, video_id]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        # SQL Query to insert a new statistics record
        sql_query = """
            INSERT INTO youtube_statistics (statistic_id, publishedAt, trending_date, view_count, 
                                            comment_count, likes, dislikes, video_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """
        with connections['default'].cursor() as cursor:
            try:
                cursor.execute(sql_query, [statistic_id, publishedAt, trending_date, view_count, comment_count, likes, dislikes, video_id])
            except Exception as e:
                # Handle specific exceptions if needed and return a corresponding response
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'Statistics created'}, status=status.HTTP_201_CREATED)

        




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

    def retrieve(self, request, pk=None):
        sql_query = "SELECT * FROM youtube_statistics WHERE statistic_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            result = cursor.fetchone()

        if result is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {
            'statistic_id': result[0], 
            'publishedAt': result[1],
            'trending_date': result[2],
            'view_count': result[3],
            'comment_count': result[4],
            'likes': result[5],
            'dislikes': result[6],
            'video_id': result[7]
        }

        # serializer = self.serializer_class(data)
        serializer = StatisticsRawSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        # Extract the fields from the request
        publishedAt = request.data.get('publishedAt')
        trending_date = request.data.get('trending_date')
        view_count = request.data.get('view_count')
        comment_count = request.data.get('comment_count')
        likes = request.data.get('likes')
        dislikes = request.data.get('dislikes')
        video = request.data.get('video_id')

        # Simple validation: Check if all necessary fields are provided
        if not all([publishedAt, trending_date, view_count, comment_count, likes, dislikes, video]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        # SQL Query to update the statistics record
        sql_query = """
            UPDATE youtube_statistics
            SET publishedAt = %s, trending_date = %s, view_count = %s, 
                comment_count = %s, likes = %s, dislikes = %s, video_id = %s
            WHERE statistic_id = %s;
        """
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [publishedAt, trending_date, view_count, comment_count, likes, dislikes, video, pk])
            if cursor.rowcount == 0:
                return Response({'error': 'Statistics not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Statistics updated'})

    
    
    def destroy(self, request, pk=None):
        # SQL Query to delete the statistics record
        sql_query = "DELETE FROM youtube_statistics WHERE statistic_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            if cursor.rowcount == 0:
                return Response({'error': 'Statistics not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Statistics deleted'}, status=status.HTTP_204_NO_CONTENT)

    
    
    

    



class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = VideoSerializer

    def create(self, request):
        # Extract the fields from the request
        video_id = request.data.get('video_id')
        title = request.data.get('title')
        thumbnail_link = request.data.get('thumbnail_link')
        comments_disabled = request.data.get('comments_disabled')
        ratings_disabled = request.data.get('ratings_disabled')
        channel_id = request.data.get('channel_id')
        region_id = request.data.get('region_id')
        category_id = request.data.get('category_id')
        # Simple validation: Check if all necessary fields are provided
        # if not all([video_id, title, channel_id, region_id, category_id]):
        #     return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if not all([YouTuber.objects.filter(pk=channel_id).exists(), 
                Region.objects.filter(pk=region_id).exists(),
                Category.objects.filter(pk=category_id).exists()]):
            return Response({'error': 'Invalid channel_id, region_id, or category_id'}, status=status.HTTP_400_BAD_REQUEST)
        # SQL Query to insert a new video record
        sql_query = """
            INSERT INTO youtube_video (video_id, title, thumbnail_link, comments_disabled, 
                                    ratings_disabled, channel_id, region_id, category_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """
        with connections['default'].cursor() as cursor:
            try:
                cursor.execute(sql_query, [video_id, title, thumbnail_link, comments_disabled, ratings_disabled, channel_id, region_id, category_id])
            except Exception as e:
                # Handle specific exceptions if needed and return a corresponding response
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'Video created'}, status=status.HTTP_201_CREATED)


    def get_queryset(self):
        sql_query = """
            SELECT video_id, title, thumbnail_link, comments_disabled, ratings_disabled, 
                channel_id, region_id, category_id
            FROM youtube_video
        """
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()

        data = []
        for item in result:
            video_id, title, thumbnail_link, comments_disabled, ratings_disabled, channel_id, region_id, category_id = item

            # Fetch the actual model instances
            channel = YouTuber.objects.get(pk=channel_id) if channel_id else None
            region = Region.objects.get(pk=region_id) if region_id else None
            category = Category.objects.get(pk=category_id) if category_id else None

            video_data = {
                'video_id': video_id,
                'title': title,
                'thumbnail_link': thumbnail_link,
                'comments_disabled': bool(comments_disabled),
                'ratings_disabled': bool(ratings_disabled),
                'channel': channel,  # Model instance
                'region': region,    # Model instance
                'category': category, # Model instance
            }

            data.append(video_data)

        return data


    def retrieve(self, request, pk=None):
        sql_query = """
            SELECT video_id, title, thumbnail_link, comments_disabled, ratings_disabled, 
                   channel_id, region_id, category_id
            FROM youtube_video
            WHERE video_id = %s;
        """
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            result = cursor.fetchone()

        temp = "https://i.ytimg.com/vi/5qap5aO4i9A/default.jpg"
        if result is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if result[2]:
            temp = result[2]
        data = {
            'video_id': result[0], 
            'title': result[1],
            'thumbnail_link': temp,
            'comments_disabled': result[3],
            'ratings_disabled': result[4],
            'channel_id': result[5],  # Assuming the raw SQL provides the channel_id
            'region_id': result[6],   # Assuming the raw SQL provides the region_id
            'category_id': result[7]  # Assuming the raw SQL provides the category_id
        }


        serializer = VideoRawSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        # Extract the fields from the request
        title = request.data.get('title')
        thumbnail_link = request.data.get('thumbnail_link')
        comments_disabled = request.data.get('comments_disabled')
        ratings_disabled = request.data.get('ratings_disabled')
        channel_id = request.data.get('channel_id')
        region_id = request.data.get('region_id')
        category_id = request.data.get('category_id')

        # Simple validation: Check if all necessary fields are provided
        if not all([title, thumbnail_link, channel_id, region_id, category_id]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        # SQL Query to update the video record
        sql_query = """
            UPDATE youtube_video
            SET title = %s, thumbnail_link = %s, comments_disabled = %s, 
                ratings_disabled = %s, channel_id = %s, region_id = %s, category_id = %s
            WHERE video_id = %s;
        """
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [title, thumbnail_link, comments_disabled, ratings_disabled, channel_id, region_id, category_id, pk])
            if cursor.rowcount == 0:
                return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Video updated'})

    
    def destroy(self, request, pk=None):
        # SQL Query to delete the video record
        sql_query = "DELETE FROM youtube_video WHERE video_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            if cursor.rowcount == 0:
                return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Video deleted'}, status=status.HTTP_204_NO_CONTENT)




class YouTuberViewSet(viewsets.ModelViewSet):
    serializer_class = YouTuberSerializer

    def get_queryset(self):
        # Use raw SQL query to fetch data
        sql_query = "SELECT * FROM youtube_youtuber;"

        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query)
            result = cursor.fetchall()


        data = [{'channel_id': item[0], 'channel_title': item[1]} for item in result]

        return data

    def retrieve(self, request, pk=None):
        sql_query = "SELECT * FROM youtube_youtuber WHERE channel_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            result = cursor.fetchone()

        if result is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        data = {'channel_id': result[0], 'channel_title': result[1]}
        serializer = self.serializer_class(data)
        return Response(serializer.data)

    def update(self, request, pk=None):
        channel_title = request.data.get('channel_title')

        if not channel_title:
            return Response({'error': 'Channel name is required'}, status=status.HTTP_400_BAD_REQUEST)

        sql_query = "UPDATE youtube_youtuber SET channel_title = %s WHERE channel_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [channel_title, pk])
            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'status': 'Channel updated'})
    
    def destroy(self, request, pk=None):
        sql_query = "DELETE FROM youtube_youtuber WHERE channel_id = %s;"
        with connections['default'].cursor() as cursor:
            cursor.execute(sql_query, [pk])
            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)



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