import json
import re
from bs4 import BeautifulSoup
import os

HTML_FILE = 'cad단축키.html'
DATA_FILE = 'data/deep_features.json'

def parse_shortcuts():
    if not os.path.exists(HTML_FILE):
        print(f"Error: {HTML_FILE} not found.")
        return

    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    new_features = []
    
    # Find all command items
    command_items = soup.find_all('div', class_='command-item')
    
    print(f"Found {len(command_items)} commands in HTML.")

    for item in command_items:
        alias_span = item.find('span', class_='command-alias')
        full_span = item.find('span', class_='command-full')
        
        if not alias_span or not full_span:
            continue
            
        alias = alias_span.text.strip()
        full_text = full_span.text.strip()
        
        # Determine Name and Description
        # Format might be "COMMAND (Description)" or just "Description"
        # The alias is usually the shortcut.
        
        # Let's use the Alias as the primary ID/Name if it looks like a command, 
        # or the English part of full_text if available.
        
        # Heuristic: If full_text contains English chars, extract them.
        # But many are like "거리 측정", "스마트 옵셋".
        # Let's use the Alias as the feature name for consistency, 
        # and full_text as the description.
        
        feature_name = alias.split(',')[0].strip() # Take first alias if multiple
        description = full_text
        
        # Categorize based on the section they are in (parent div with class category-section?)
        # The HTML structure shows buttons with onclick="toggleDropdown(this, 'util1')".
        # We can find the parent dropdown-content id.
        
        parent_dropdown = item.find_parent('div', class_='dropdown-content')
        category = "General"
        if parent_dropdown:
            dropdown_id = parent_dropdown.get('id', '')
            if 'util' in dropdown_id:
                category = "Utility"
            elif 'drawing' in dropdown_id:
                category = "Drawing"
            elif 'electric' in dropdown_id:
                category = "Electrical"
        
        # Create feature object
        feature = {
            "id": f"autocad-{feature_name.lower()}",
            "name": feature_name,
            "software": "AutoCAD", # Assuming compatible
            "category": category,
            "difficulty": "Intermediate", # Default
            "description": description,
            "steps": ["명령어를 입력합니다.", "프롬프트의 지시를 따릅니다."], # Placeholder
            "videos": []
        }
        
        new_features.append(feature)

    # Load existing data
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    else:
        existing_data = []
        
    # Merge (avoid duplicates by ID)
    existing_ids = {f['id'] for f in existing_data}
    added_count = 0
    
    for nf in new_features:
        if nf['id'] not in existing_ids:
            existing_data.append(nf)
            existing_ids.add(nf['id'])
            added_count += 1
            
    # Save back
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, indent=4, ensure_ascii=False)
        
    print(f"Successfully imported {added_count} new features from {HTML_FILE}.")

if __name__ == "__main__":
    parse_shortcuts()
