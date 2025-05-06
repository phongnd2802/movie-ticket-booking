import json


def escape_sql_string(value):
    return value.replace("'", "''")


def read_and_format_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        with open("provinces.sql", 'w', encoding='utf-8') as sql_file:
            for province in data:
                province_name = escape_sql_string(province['name'])
                for district in province['districts']:
                    district_name = escape_sql_string(district['name'])
                    for ward in district['wards']:
                        ward_name = escape_sql_string(ward['name'])
                        sql_file.write(
                            f"INSERT INTO address_entity (province, district, ward) VALUES ('{province_name}', '{district_name}', '{ward_name}');\n"
                        )
        print("Successfully formatted and saved to provinces.sql")

    except Exception as e:
        print(f"An error occurred: {e}")


read_and_format_json("provinces.json")
