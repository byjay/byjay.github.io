import json
import subprocess
import shutil
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "deep_features.json"
MAX_WORKERS = 3

def get_video_id(query):
    """Searches YouTube for the query and returns the first video ID."""
    if not shutil.which("yt-dlp"):
        print("yt-dlp not found. Please install it to fetch videos.")
        return None

    try:
        # Search for 1 result, print only the ID
        cmd = [
            "yt-dlp",
            f"ytsearch1:{query}",
            "--print", "id",
            "--no-playlist",
            "--no-warnings",
            "--ignore-config"
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=20)
        video_id = result.stdout.strip()
        if video_id:
            return video_id
        return None
    except Exception as e:
        print(f"Error searching for {query}: {e}")
        return None

def process_feature(feature):
    """Worker to process a single feature."""
    if feature.get("videos"): # Skip if already has videos
        return feature
    
    query = f"{feature['software']} {feature['name']} 강좌"
    print(f"Searching YouTube for: {query}")
    vid_id = get_video_id(query)
    
    if vid_id:
        feature["videos"] = [vid_id]
        print(f"Found video {vid_id} for {feature['name']}")
    else:
        print(f"No video found for {feature['name']}")
        
    return feature

def main():
    if not DATA_FILE.exists():
        print(f"{DATA_FILE} not found. Run deep_crawl.py first.")
        return

    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        features = json.load(f)

    updated_features = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {executor.submit(process_feature, f): f for f in features}
        
        for future in as_completed(futures):
            updated_features.append(future.result())

    # Save back to JSON
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(updated_features, f, ensure_ascii=False, indent=2)
    
    print(f"Video collection completed. Updated {len(updated_features)} features.")

if __name__ == "__main__":
    main()
