import requests
import json


def fetch_provinces(api_url, output_file):
    try:
        response = requests.get(api_url)
        response.raise_for_status() 

        data = response.json()
        
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)

        print(f"Data successfully fetched from {api_url} and saved to {output_file}")
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
    except:
        print(f"Error fetching data from {api_url}")

if __name__ == "__main__":
    api_url = "https://provinces.open-api.vn/api/?depth=3"
    output_file = "provinces.json"
    fetch_provinces(api_url, output_file)