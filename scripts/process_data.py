import json
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "deep_features.json"

# Keyword-based categorization (Korean & English)
CATEGORIES = {
    "Start": ["install", "setup", "interface", "open", "save", "new", "설치", "시작", "화면"],
    "Beginner": ["line", "circle", "rect", "erase", "move", "copy", "layer", "text", "그리기", "수정", "초급"],
    "Intermediate": ["block", "hatch", "dimension", "xref", "plot", "print", "array", "주석", "블록", "출력", "중급"],
    "Advanced": ["3d", "render", "script", "lisp", "api", "custom", "express", "관리", "고급", "스마트"]
}

def determine_difficulty(feature):
    # If difficulty is already set (e.g. from deep_crawl.py), use it but map to English keys if needed
    # But our deep_crawl.py sets Korean difficulty strings like "초급", "중급"
    # We should normalize these to English keys for directory structure
    
    raw_diff = feature.get("difficulty", "")
    if raw_diff == "초급": return "Beginner"
    if raw_diff == "중급": return "Intermediate"
    if raw_diff == "고급": return "Advanced"
    if raw_diff == "시작": return "Start"

    name = feature.get("name", "").lower()
    
    # Check keywords
    for level, keywords in CATEGORIES.items():
        if any(k in name for k in keywords):
            return level
            
    return "Intermediate"

def main():
    if not DATA_FILE.exists():
        print(f"{DATA_FILE} not found.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        features = json.load(f)

    processed_features = []

    for feature in features:
        # Update difficulty to standardized English keys for folder structure
        feature["difficulty"] = determine_difficulty(feature)
        processed_features.append(feature)

    # Save back
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(processed_features, f, ensure_ascii=False, indent=2)
        
    print(f"Processed {len(processed_features)} features. Categorization applied.")

if __name__ == "__main__":
    main()
