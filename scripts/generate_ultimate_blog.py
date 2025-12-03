import json
import os
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "deep_features.json"
BASE_DIR = Path(__file__).resolve().parents[1]
TEMPLATE_DIR = BASE_DIR / "templates"
CONTENT_DIR = BASE_DIR / "content" / "features"

def main():
    if not DATA_FILE.exists():
        print(f"{DATA_FILE} not found. Creating dummy data for testing.")
        # Create dummy data if not exists
        dummy_data = [
            {
                "id": "line_cmd",
                "name": "LINE",
                "software": "AutoCAD",
                "description": "Creates straight line segments.",
                "steps": ["Specify first point.", "Specify next point."],
                "images": ["https://help.autodesk.com/cloudhelp/2024/ENU/AutoCAD-Core/images/GUID-2AA12FC5-FBB2-4ABE-9024-90D41FEB1AC3.png"],
                "videos": ["dQw4w9WgXcQ"],
                "difficulty": "Beginner",
                "category": "Draw",
                "source_url": "https://help.autodesk.com/view/ACD/2024/ENU/"
            },
            {
                "id": "zw_circle",
                "name": "CIRCLE",
                "software": "ZWCAD",
                "description": "Creates a circle.",
                "steps": ["Specify center point.", "Specify radius."],
                "images": [],
                "videos": [],
                "difficulty": "Beginner",
                "category": "Draw",
                "source_url": "https://www.zwsoft.com"
            }
        ]
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(dummy_data, f, ensure_ascii=False, indent=2)

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        features = json.load(f)

    env = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR)))
    template = env.get_template('ultimate_feature.md')

    for feature in features:
        difficulty = feature.get("difficulty", "Intermediate").lower()
        software = feature.get("software", "AutoCAD").lower()
        
        # Create directory structure: content/features/{difficulty}/{software}/
        output_dir = CONTENT_DIR / difficulty / software
        output_dir.mkdir(parents=True, exist_ok=True)
        
        slug = feature.get("name", "unnamed").lower().replace(" ", "-")
        md_path = output_dir / f"{slug}.md"
        
        md_content = template.render(
            name=feature.get("name"),
            software=feature.get("software"),
            description=feature.get("description"),
            steps=feature.get("steps"),
            images=feature.get("images"),
            videos=feature.get("videos"),
            difficulty=feature.get("difficulty"),
            category=feature.get("category"),
            date="2025-12-03"
        )
        
        md_path.write_text(md_content, encoding='utf-8')
        print(f"Generated {md_path}")

    print(f"Successfully generated blog pages for {len(features)} features.")

if __name__ == "__main__":
    main()
