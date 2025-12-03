import json
import os
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

def load_features(json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def render_feature(feature, template):
    return template.render(
        name=feature.get('name'),
        description=feature.get('description'),
        image_url=feature.get('image_url'),
        source=feature.get('source'),
        date=feature.get('date')
    )

def main():
    base_dir = Path(__file__).resolve().parents[1]
    data_dir = base_dir / 'data'
    output_dir = base_dir / 'content' / 'features'
    template_dir = base_dir / 'templates'
    env = Environment(loader=FileSystemLoader(str(template_dir)))
    template = env.get_template('feature.md')

    for src in ['autocad', 'zwcad']:
        json_file = data_dir / f"{src}_features.json"
        if not json_file.exists():
            print(f"{json_file} not found, skipping.")
            continue
        features = load_features(json_file)
        src_output = output_dir / src
        src_output.mkdir(parents=True, exist_ok=True)
        for feature in features:
            slug = feature.get('name', 'unnamed').lower().replace(' ', '-')
            md_path = src_output / f"{slug}.md"
            md_content = render_feature(feature, template)
            md_path.write_text(md_content, encoding='utf-8')
        print(f"Generated {len(features)} pages for {src} in {src_output}")

if __name__ == '__main__':
    main()
