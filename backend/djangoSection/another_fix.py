def fix_sql_script(input_file_path, output_file_path):
    try:
        # Read the original SQL script
        with open(input_file_path, 'r', encoding='utf-8') as file:
            script = file.read()

        # Replace \' with ''
        # corrected_script = script.replace("'", "''")
        corrected_script = script.replace("'#NAME?'", "Placeholder")


        # Write the corrected script to a new file
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.write(corrected_script)

        print(f"Corrected script saved to {output_file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Replace these paths with the actual paths on your system
input_file_path = '/workspaces/fa23-cs411-team022-2teamsof2/backend/djangoSection/video.sql'
output_file_path = '/workspaces/fa23-cs411-team022-2teamsof2/backend/djangoSection/video1.sql'

# Run the function
def replace_descriptions_in_sql_file(file_path, output_file_path, new_description="temp"):
    """
    Replaces the 6th field (video description) in each SQL INSERT statement with a new description.
    
    Args:
    file_path (str): Path to the SQL file.
    output_file_path (str): Path to save the modified SQL file.
    new_description (str): The new description to replace the old ones.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        new_lines = []
        print(f"Replacing descriptions in {len(lines)} lines...")
        for line in lines:
            # Split the line into individual records
            records = line.split('),(')
            new_records = []
            for record in records:
                # Split each record into its fields
                fields = record.split(',')

                # Check if there are enough fields (assuming more than 6 fields)
                if len(fields) > 6:
                    # Replace the 6th field
                    fields[5] = f"'{new_description}'"
                    new_record = ','.join(fields)
                    new_records.append(new_record)
                else:
                    new_records.append(record)
            
            # Join the modified records back into a line
            new_line = '),('.join(new_records)
            new_lines.append(new_line)

        # Join all lines into a single string
        corrected_script = '\n'.join(new_lines)
        
        # Write the corrected script to a new file
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.write(corrected_script)
        print(f"Corrected script saved to {output_file_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
# fix_sql_script(input_file_path, output_file_path)
replace_descriptions_in_sql_file(input_file_path, output_file_path, new_description="temp")
