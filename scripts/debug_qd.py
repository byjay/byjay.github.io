import json
from pathlib import Path

def main():
    base_dir = Path(__file__).resolve().parents[1]
    json_path = base_dir / 'data' / 'deep_features.json'

    with open(json_path, 'r', encoding='utf-8') as f:
        features = json.load(f)

    print(f"Total features: {len(features)}")
    
    qd_entries = [f for f in features if f.get('name') == 'QD']
    print(f"Found {len(qd_entries)} entries for 'QD':")
    for f in qd_entries:
        print(f"ID: {f.get('id')}, Software: {f.get('software')}, Desc: {f.get('description')}")

if __name__ == '__main__':
    main()
