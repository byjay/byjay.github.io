import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
import sys

def main():
    base_dir = Path(__file__).resolve().parents[1]
    html_path = base_dir / 'cad단축키.html'
    json_path = base_dir / 'data' / 'deep_features.json'

    print("Verifying data integrity...")

    # Load HTML
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Load JSON
    with open(json_path, 'r', encoding='utf-8') as f:
        features = json.load(f)
    
    # Create a map of JSON features for fast lookup
    # Normalize keys for comparison
    json_map = {}
    for f in features:
        if f.get('software') == 'CADian':
            # Key by alias, value is LIST of features
            name = f['name']
            if name not in json_map:
                json_map[name] = []
            json_map[name].append(f)

    # Iterate HTML and verify
    sections = soup.find_all('div', class_='category-section')
    
    missing_count = 0
    mismatch_count = 0
    total_checked = 0

    for section in sections:
        items = section.find_all('div', class_='command-item')
        for item in items:
            alias = item.find('span', class_='command-alias').get_text(strip=True)
            full_desc = item.find('span', class_='command-full').get_text(strip=True)
            
            total_checked += 1
            
            if alias not in json_map:
                print(f"MISSING: {alias}")
                missing_count += 1
            else:
                # Check if ANY of the features with this alias match the description
                json_items = json_map[alias]
                match_found = False
                for item in json_items:
                    if item['description'] == full_desc:
                        match_found = True
                        break
                
                if not match_found:
                    # If no exact match, print the first mismatch or all of them
                    print(f"MISMATCH: {alias}")
                    print(f"  HTML: '{full_desc}'")
                    print(f"  JSON Candidates: {[i['description'] for i in json_items]}")
                    mismatch_count += 1

    print(f"Total Checked: {total_checked}")
    print(f"Missing: {missing_count}")
    print(f"Mismatch: {mismatch_count}")

    if missing_count == 0 and mismatch_count == 0:
        print("SUCCESS: Data integrity verified.")
        sys.exit(0)
    else:
        print("FAILURE: Data integrity issues found.")
        sys.exit(1)

if __name__ == '__main__':
    main()
