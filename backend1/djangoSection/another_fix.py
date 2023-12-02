import pandas as pd
import json
import hashlib

def generate_statistic_id(row):
    # Concatenate fields to create a unique identifier
    raw_id = f"{row['video_id']}_{row['publishedAt']}_{row['trending_date']}"
    # Use a hash function to ensure the ID is of a manageable size
    return hashlib.md5(raw_id.encode()).hexdigest()

df = pd.read_excel('/workspaces/fa23-cs411-team022-2teamsof2/backend/djangoSection/tester.xlsx')

def row_to_json(row):
    return {
        "model": "youtube.statistics",
        "pk": generate_statistic_id(row),
        "fields": {
            "publishedAt": row['publishedAt'],
            "trending_date": row['trending_date'],
            "view_count": row['view_count'],
            "likes": row['likes'],
            "dislikes": row['dislikes'],
            "comment_count": row['comment_count'],
            "video": row['video_id']
        }
    }

json_data = df.apply(row_to_json, axis=1).tolist()

with open('statistics_output.json', 'w') as json_file:
    json.dump(json_data, json_file)
