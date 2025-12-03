import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

def main():
    base_dir = Path(__file__).resolve().parents[1]
    html_path = base_dir / 'cad단축키.html'
    json_path = base_dir / 'data' / 'deep_features.json'

    print(f"Reading HTML from {html_path}...")
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Load existing JSON
    if json_path.exists():
        with open(json_path, 'r', encoding='utf-8') as f:
            features = json.load(f)
    else:
        features = []

    # Create a map of existing IDs to avoid duplicates (or to update them)
    existing_map = {f['id']: f for f in features}
    
    # Find all category sections
    sections = soup.find_all('div', class_='category-section')
    
    count_added = 0
    count_updated = 0

    for section in sections:
        # Extract category name
        button = section.find('button', class_='category-button')
        if not button:
            continue
        
        # Clean category name (remove emoji and count)
        raw_cat = button.get_text(strip=True)
        # Example: "⚙️ 캐디안 유틸-1 (14개)" -> "캐디안 유틸-1"
        # Regex to remove emoji and (..개)
        category_match = re.search(r'[^\w\s]*\s*(.*?)\s*\(\d+개\)', raw_cat)
        if category_match:
            category = category_match.group(1).strip()
        else:
            category = raw_cat # Fallback

        # Find all command items in this section
        items = section.find_all('div', class_='command-item')
        
        for item in items:
            alias = item.find('span', class_='command-alias').get_text(strip=True)
            full_desc = item.find('span', class_='command-full').get_text(strip=True)
            
            # Create a unique ID
            # Sanitize alias for ID
            safe_alias = re.sub(r'[^a-zA-Z0-9]', '_', alias.lower())
            # Sanitize category for ID
            safe_category = re.sub(r'[^a-zA-Z0-9]', '_', category.lower()) # Simple sanitization
            # Use English mapping for categories if possible, or just hash/sanitize
            # Since category is Korean, let's just use a simple hash or transliteration if needed.
            # But for now, let's just append a counter if we detect a collision?
            # Or better, just use the safe_category (which might be empty if all Korean).
            # Let's use a counter for duplicates within the script run.
            
            # Actually, let's just use the original logic but handle duplicates by appending a suffix if needed.
            # But we need to know if it's a duplicate across the whole set.
            # Let's use category in ID, but we need a robust way to make category safe.
            # Let's just use a counter for now.
            
            base_id = f"cadian_{safe_alias}"
            feature_id = base_id
            
            # Check if this ID is already used IN THIS RUN (to handle duplicates in HTML)
            # We need to track IDs generated in this run.
            # But we also need to match against existing JSON.
            # If we change ID format, we might duplicate entries in JSON if we don't clean up old ones.
            # For now, let's just append category index or something?
            # Or just append a number if it exists in the *current* map we are building.
            
            # Let's try to make a unique ID based on Alias + Description hash?
            # Or just Alias + Category (if we can sanitize it).
            # Let's just use a counter.
            
            counter = 1
            while feature_id in existing_map and existing_map[feature_id]['description'] != full_desc:
                 # If ID exists but description is different, it's a collision (or an update).
                 # But how do we distinguish update vs collision?
                 # If we assume the HTML is the source of truth, we should probably treat it as a new entry if description differs significantly?
                 # But "QD" -> "Desc1" and "QD" -> "Desc2" are distinct commands.
                 feature_id = f"{base_id}_{counter}"
                 counter += 1
            
            # Construct feature object
            new_feature = {
                "id": feature_id,
                "name": alias, # Display Alias as Name
                "software": "CADian", # Explicitly mark as CADian as per source
                "description": full_desc,
                "steps": [
                    f"명령창에 '{alias}'를 입력합니다.",
                    "프롬프트의 지시를 따릅니다."
                ],
                "images": [],
                "videos": [],
                "difficulty": "Intermediate", # Default
                "category": category,
                "source_url": "local:cad단축키.html"
            }
            
            if feature_id in existing_map:
                # Update existing
                existing_map[feature_id].update(new_feature)
                count_updated += 1
            else:
                # Add new
                features.append(new_feature)
                existing_map[feature_id] = new_feature # Update map just in case
                count_added += 1

    print(f"Processed {len(sections)} sections.")
    print(f"Added {count_added} new features.")
    print(f"Updated {count_updated} existing features.")

    # Save back to JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(features, f, indent=2, ensure_ascii=False)
    print(f"Saved to {json_path}")

if __name__ == '__main__':
    main()
