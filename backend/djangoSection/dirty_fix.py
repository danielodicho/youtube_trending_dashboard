import json

def clean_json(input_file, output_file):
    # Read the original JSON data
    with open(input_file, 'r') as file:
        data = json.load(file)

    # Iterate through the data and remove single quotes
    for entry in data:
        if 'channel_id' in entry:
            entry['channel_id'] = entry['channel_id'].strip("'")

    # Write the cleaned data to a new JSON file
    with open(output_file, 'w') as file:
        json.dump(data, file, indent=4)

# Replace 'your_input_file.json' with the path to your original JSON file
# and 'cleaned_output_file.json' with the path where you want to save the cleaned file
clean_json('backend/djangoSection/youtube_fixture.json', 'youtube_fixture1.json')
