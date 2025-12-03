import requests
import time
import json
from bs4 import BeautifulSoup
from pathlib import Path

BASE_URLS = {
    "autocad": "https://www.autodesk.com/products/autocad/overview",
    "zwcad": "https://www.zwsoft.com/zwcad"
}

OUTPUT_DIR = Path(__file__).resolve().parents[1] / "data"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def fetch_page(url):
    headers = {"User-Agent": "Mozilla/5.0 (compatible; FeatureCrawler/1.0)"}
    resp = requests.get(url, headers=headers, timeout=10)
    resp.raise_for_status()
    time.sleep(1)  # polite rate‑limit
    return resp.text

def parse_autocad(html):
    soup = BeautifulSoup(html, "html.parser")
    features = []
    # Example: look for sections with class "feature-item"
    for item in soup.select('.feature-item'):
        name = item.select_one('.feature-title')
        desc = item.select_one('.feature-description')
        img = item.select_one('img')
        features.append({
            "name": name.get_text(strip=True) if name else "",
            "description": desc.get_text(strip=True) if desc else "",
            "image_url": img['src'] if img else "",
            "source": "autocad"
        })
    return features

def parse_zwcad(html):
    soup = BeautifulSoup(html, "html.parser")
    features = []
    for item in soup.select('.feature'):
        name = item.select_one('h3')
        desc = item.select_one('p')
        img = item.select_one('img')
        features.append({
            "name": name.get_text(strip=True) if name else "",
            "description": desc.get_text(strip=True) if desc else "",
            "image_url": img['src'] if img else "",
            "source": "zwcad"
        })
    return features

def crawl():
    all_features = []
    for key, url in BASE_URLS.items():
        html = fetch_page(url)
        if key == "autocad":
            feats = parse_autocad(html)
        else:
            feats = parse_zwcad(html)
        all_features.extend(feats)
    # Save JSON files per source
    for src in ["autocad", "zwcad"]:
        src_feats = [f for f in all_features if f["source"] == src]
        out_path = OUTPUT_DIR / f"{src}_features.json"
        out_path.write_text(json.dumps(src_feats, ensure_ascii=False, indent=2))
    print(f"Saved {len(all_features)} features to {OUTPUT_DIR}")

if __name__ == "__main__":
    crawl()
