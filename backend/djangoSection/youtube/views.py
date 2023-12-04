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



from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        # Your existing dependencies here
    ]

    operations = [
        migrations.RunSQL("""
            DELIMITER //

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

            DELIMITER ;"""),
            migrations.RunSQL(
                """
                DELIMITER //
                CREATE PROCEDURE SearchYouTuber(IN search_string VARCHAR(255))
                BEGIN
                    SELECT *
                    FROM YouTuber
                    WHERE channelTitle LIKE CONCAT(search_string, '%');
                END //
                DELIMITER ;
                """)
    ]