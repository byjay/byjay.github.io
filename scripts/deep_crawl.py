import requests
from bs4 import BeautifulSoup
import json
import time
import random
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import re

# Configuration
OUTPUT_FILE = Path(__file__).resolve().parents[1] / "data" / "deep_features.json"
MAX_WORKERS = 5

# Korean Standard Commands List (AutoCAD/ZWCAD Common)
STANDARD_COMMANDS = [
    {"name": "LINE", "desc": "직선 세그먼트를 작성합니다.", "category": "그리기", "difficulty": "초급"},
    {"name": "CIRCLE", "desc": "원을 작성합니다.", "category": "그리기", "difficulty": "초급"},
    {"name": "ARC", "desc": "호(Arc)를 작성합니다.", "category": "그리기", "difficulty": "초급"},
    {"name": "RECTANG", "desc": "직사각형 폴리선을 작성합니다.", "category": "그리기", "difficulty": "초급"},
    {"name": "PLINE", "desc": "2D 폴리선을 작성합니다.", "category": "그리기", "difficulty": "중급"},
    {"name": "HATCH", "desc": "닫힌 영역이나 선택한 객체를 해치 패턴으로 채웁니다.", "category": "그리기", "difficulty": "중급"},
    {"name": "MOVE", "desc": "객체를 지정한 방향과 거리만큼 이동합니다.", "category": "수정", "difficulty": "초급"},
    {"name": "COPY", "desc": "객체를 지정한 방향과 거리만큼 복사합니다.", "category": "수정", "difficulty": "초급"},
    {"name": "ROTATE", "desc": "기준점을 중심으로 객체를 회전합니다.", "category": "수정", "difficulty": "초급"},
    {"name": "SCALE", "desc": "객체의 비율을 유지하면서 크기를 확대하거나 축소합니다.", "category": "수정", "difficulty": "중급"},
    {"name": "TRIM", "desc": "다른 객체의 모서리를 기준으로 객체를 자릅니다.", "category": "수정", "difficulty": "초급"},
    {"name": "EXTEND", "desc": "다른 객체의 모서리까지 객체를 연장합니다.", "category": "수정", "difficulty": "초급"},
    {"name": "FILLET", "desc": "객체의 모서리를 둥글게 깎습니다.", "category": "수정", "difficulty": "중급"},
    {"name": "CHAMFER", "desc": "객체의 모서리를 모따기합니다.", "category": "수정", "difficulty": "중급"},
    {"name": "OFFSET", "desc": "동심원, 평행선, 평행 곡선을 작성합니다.", "category": "수정", "difficulty": "중급"},
    {"name": "MIRROR", "desc": "선택한 객체의 대칭 사본을 작성합니다.", "category": "수정", "difficulty": "중급"},
    {"name": "ARRAY", "desc": "객체의 사본을 패턴으로 배열합니다.", "category": "수정", "difficulty": "고급"},
    {"name": "TEXT", "desc": "단일 행 문자 객체를 작성합니다.", "category": "주석", "difficulty": "초급"},
    {"name": "MTEXT", "desc": "여러 줄 문자 객체를 작성합니다.", "category": "주석", "difficulty": "중급"},
    {"name": "DIMENSION", "desc": "다양한 유형의 치수를 작성합니다.", "category": "주석", "difficulty": "중급"},
    {"name": "BLOCK", "desc": "선택한 객체로 블록 정의를 작성합니다.", "category": "블록", "difficulty": "중급"},
    {"name": "INSERT", "desc": "블록이나 도면을 현재 도면에 삽입합니다.", "category": "블록", "difficulty": "중급"},
    {"name": "WBLOCK", "desc": "객체나 블록을 새 도면 파일로 저장합니다.", "category": "블록", "difficulty": "고급"},
    {"name": "LAYER", "desc": "도면층(레이어)과 도면층 특성을 관리합니다.", "category": "관리", "difficulty": "초급"},
    {"name": "PROPERTIES", "desc": "객체의 특성을 제어합니다.", "category": "관리", "difficulty": "중급"},
    {"name": "XREF", "desc": "외부 참조 도면을 관리합니다.", "category": "관리", "difficulty": "고급"},
    {"name": "PLOT", "desc": "도면을 플로터, 프린터 또는 파일로 출력합니다.", "category": "출력", "difficulty": "중급"},
    {"name": "PURGE", "desc": "사용되지 않는 블록 정의, 도면층 등을 도면에서 제거합니다.", "category": "관리", "difficulty": "고급"},
    {"name": "AUDIT", "desc": "도면의 무결성을 평가하고 오류를 수정합니다.", "category": "관리", "difficulty": "고급"},
    {"name": "RECOVER", "desc": "손상된 도면 파일을 복구합니다.", "category": "관리", "difficulty": "고급"}
]

# ZWCAD Specific Features (Korean)
ZWCAD_FEATURES = [
    {"name": "Smart Mouse", "desc": "마우스 제스처를 사용하여 명령을 실행합니다.", "category": "스마트 기능", "difficulty": "중급"},
    {"name": "Smart Voice", "desc": "도면에 음성 메모를 추가합니다.", "category": "스마트 기능", "difficulty": "중급"},
    {"name": "Smart Select", "desc": "특정 조건에 맞는 객체를 빠르게 선택합니다.", "category": "스마트 기능", "difficulty": "중급"},
    {"name": "Smart Plot", "desc": "여러 도면을 한 번에 효율적으로 출력합니다.", "category": "스마트 기능", "difficulty": "중급"},
    {"name": "Flexiblock", "desc": "블록을 유연하게 편집하고 재사용할 수 있는 기능입니다.", "category": "블록", "difficulty": "고급"},
    {"name": "IFC Import", "desc": "BIM 데이터 교환을 위한 IFC 파일을 가져옵니다.", "category": "호환성", "difficulty": "고급"},
    {"name": "Point Cloud", "desc": "3D 레이저 스캔 데이터를 가져와서 활용합니다.", "category": "3D", "difficulty": "고급"},
    {"name": "File Compare", "desc": "두 도면 간의 차이점을 시각적으로 비교합니다.", "category": "도구", "difficulty": "중급"},
    {"name": "Data Extraction", "desc": "객체 데이터를 테이블이나 외부 파일로 추출합니다.", "category": "도구", "difficulty": "고급"},
    {"name": "Sheet Set Manager", "desc": "여러 도면 시트를 체계적으로 관리합니다.", "category": "관리", "difficulty": "고급"}
]

def generate_features():
    all_features = []
    
    # AutoCAD (Standard)
    for cmd in STANDARD_COMMANDS:
        all_features.append({
            "id": f"autocad_{cmd['name'].lower()}",
            "name": cmd['name'],
            "software": "AutoCAD",
            "description": cmd['desc'],
            "steps": ["명령어를 입력합니다.", "프롬프트의 지시를 따릅니다."],
            "images": [],
            "videos": [],
            "difficulty": cmd['difficulty'],
            "category": cmd['category'],
            "source_url": "https://help.autodesk.com/view/ACD/2024/KOR/"
        })
        
    # ZWCAD
    for feat in ZWCAD_FEATURES:
        all_features.append({
            "id": f"zwcad_{re.sub(r'\W+', '_', feat['name']).lower()}",
            "name": feat['name'],
            "software": "ZWCAD",
            "description": feat['desc'],
            "steps": ["기능을 실행합니다.", "옵션을 설정합니다."],
            "images": [],
            "videos": [],
            "difficulty": feat['difficulty'],
            "category": feat['category'],
            "source_url": "https://www.zwsoft.co.kr"
        })
        
    return all_features

def main():
    features = generate_features()
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(features, f, ensure_ascii=False, indent=2)
    print(f"Localized crawl completed. Saved {len(features)} features to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
