// 팁 & 노하우 데이터 및 관리

// 팁 데이터
const tipsData = [
    {
        id: 1,
        title: "필수 단축키 10가지",
        description: "작업 효율을 크게 높여주는 오토캐드 필수 단축키들을 소개합니다.",
        icon: "fas fa-keyboard",
        category: "단축키",
        content: `
            <h4>오토캐드 필수 단축키</h4>
            <ul>
                <li><strong>L</strong> - Line (선 그리기)</li>
                <li><strong>C</strong> - Circle (원 그리기)</li>
                <li><strong>REC</strong> - Rectangle (사각형 그리기)</li>
                <li><strong>TR</strong> - Trim (자르기)</li>
                <li><strong>EX</strong> - Extend (연장)</li>
                <li><strong>CO</strong> - Copy (복사)</li>
                <li><strong>MI</strong> - Mirror (대칭)</li>
                <li><strong>RO</strong> - Rotate (회전)</li>
                <li><strong>SC</strong> - Scale (크기 조정)</li>
                <li><strong>O</strong> - Offset (간격띄우기)</li>
            </ul>
        `
    },
    {
        id: 2,
        title: "레이어 색상 관리법",
        description: "레이어별로 색상을 체계적으로 관리하여 도면의 가독성을 높이는 방법입니다.",
        icon: "fas fa-palette",
        category: "레이어",
        content: `
            <h4>레이어 색상 관리 팁</h4>
            <p>효과적인 레이어 색상 관리를 위한 권장사항:</p>
            <ul>
                <li>외곽선: 검은색 또는 진한 색상</li>
                <li>치수선: 빨간색 또는 파란색</li>
                <li>중심선: 녹색 또는 회색</li>
                <li>숨은선: 회색 또는 점선</li>
                <li>텍스트: 검은색 또는 진한 파란색</li>
            </ul>
        `
    },
    {
        id: 3,
        title: "객체 스냅 활용법",
        description: "정확한 도면 작성을 위한 객체 스냅(Object Snap) 설정과 활용 방법을 알아봅니다.",
        icon: "fas fa-crosshairs",
        category: "정밀도",
        content: `
            <h4>객체 스냅 설정</h4>
            <p>F3 키로 객체 스냅을 켜고 끌 수 있으며, 다음과 같은 스냅 모드를 활용하세요:</p>
            <ul>
                <li><strong>끝점(Endpoint)</strong>: 선분의 끝점에 스냅</li>
                <li><strong>중점(Midpoint)</strong>: 선분의 중점에 스냅</li>
                <li><strong>중심(Center)</strong>: 원이나 호의 중심에 스냅</li>
                <li><strong>교점(Intersection)</strong>: 두 객체의 교점에 스냅</li>
                <li><strong>수직(Perpendicular)</strong>: 수직 위치에 스냅</li>
            </ul>
        `
    },
    {
        id: 4,
        title: "블록 라이브러리 구축",
        description: "자주 사용하는 도면 요소를 블록으로 만들어 라이브러리를 구축하는 방법입니다.",
        icon: "fas fa-th-large",
        category: "블록",
        content: `
            <h4>블록 라이브러리 구축 방법</h4>
            <ol>
                <li>자주 사용하는 심볼이나 부품을 블록으로 정의</li>
                <li>블록에 속성(Attribute) 추가로 정보 관리</li>
                <li>별도 도면 파일에 블록 모음 저장</li>
                <li>Design Center를 통해 블록 삽입</li>
                <li>Tool Palette에 자주 사용하는 블록 등록</li>
            </ol>
        `
    },
    {
        id: 5,
        title: "치수 스타일 설정",
        description: "일관된 치수 표기를 위한 치수 스타일 설정과 관리 방법을 설명합니다.",
        icon: "fas fa-ruler",
        category: "치수",
        content: `
            <h4>치수 스타일 설정 팁</h4>
            <p>DIMSTYLE 명령으로 치수 스타일을 설정할 때 고려사항:</p>
            <ul>
                <li>텍스트 높이: 도면 축척에 맞는 적절한 크기</li>
                <li>화살표 크기: 텍스트 높이의 1/3 정도</li>
                <li>치수선 간격: 텍스트 높이의 1.5배</li>
                <li>소수점 자릿수: 도면 정밀도에 맞게 설정</li>
                <li>단위 표시: 필요에 따라 mm, m 등 단위 추가</li>
            </ul>
        `
    },
    {
        id: 6,
        title: "작업 공간 최적화",
        description: "개인의 작업 스타일에 맞는 오토캐드 작업 공간을 설정하는 방법입니다.",
        icon: "fas fa-desktop",
        category: "환경설정",
        content: `
            <h4>작업 공간 최적화 방법</h4>
            <ul>
                <li>자주 사용하는 명령을 Quick Access Toolbar에 추가</li>
                <li>리본 메뉴 탭 순서를 작업 흐름에 맞게 조정</li>
                <li>Tool Palette에 자주 사용하는 블록과 해치 등록</li>
                <li>Properties Palette 위치를 편리한 곳에 고정</li>
                <li>명령창 크기를 적절히 조정하여 명령 히스토리 확인</li>
            </ul>
        `
    },
    {
        id: 7,
        title: "파일 관리 전략",
        description: "프로젝트별 파일 구조와 백업 전략으로 효율적인 파일 관리 방법을 제시합니다.",
        icon: "fas fa-folder-open",
        category: "파일관리",
        content: `
            <h4>효율적인 파일 관리</h4>
            <ol>
                <li>프로젝트별 폴더 구조 표준화</li>
                <li>파일명 규칙 설정 (날짜, 버전 포함)</li>
                <li>템플릿 파일(.dwt) 활용</li>
                <li>정기적인 백업 및 버전 관리</li>
                <li>외부 참조(Xref) 파일 경로 관리</li>
                <li>도면 정리(PURGE) 명령으로 불필요한 요소 제거</li>
            </ol>
        `
    },
    {
        id: 8,
        title: "성능 최적화 팁",
        description: "대용량 도면에서도 빠른 작업을 위한 오토캐드 성능 최적화 방법입니다.",
        icon: "fas fa-tachometer-alt",
        category: "성능",
        content: `
            <h4>성능 최적화 방법</h4>
            <ul>
                <li>불필요한 레이어 동결(Freeze) 또는 끄기(Off)</li>
                <li>복잡한 블록은 간단한 형태로 대체</li>
                <li>REGEN 명령 사용을 최소화</li>
                <li>하드웨어 가속 활성화</li>
                <li>정기적으로 AUDIT 명령으로 도면 검사</li>
                <li>큰 래스터 이미지는 압축하여 사용</li>
            </ul>
        `
    }
];

// 팁 카드 생성 함수
function createTipCard(tip) {
    return `
        <div class="tip-card" data-tip-id="${tip.id}">
            <div class="tip-icon">
                <i class="${tip.icon}"></i>
            </div>
            <h3 class="tip-title">${tip.title}</h3>
            <p class="tip-description">${tip.description}</p>
            <div class="tip-category">
                <span class="category-tag">${tip.category}</span>
            </div>
            <button class="tip-read-more" onclick="showTipDetail(${tip.id})">
                자세히 보기 <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

// 팁 로드
function loadTips() {
    const container = document.getElementById('tipsGrid');
    if (container) {
        container.innerHTML = tipsData
            .map(tip => createTipCard(tip))
            .join('');
    }
}

// 팁 상세 보기
function showTipDetail(tipId) {
    const tip = tipsData.find(t => t.id === tipId);
    if (!tip) return;

    const modalHTML = `
        <div class="tip-modal" id="tipModal">
            <div class="modal-overlay" onclick="closeTipModal()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="tip-header-info">
                        <div class="tip-icon-large">
                            <i class="${tip.icon}"></i>
                        </div>
                        <div>
                            <h2>${tip.title}</h2>
                            <span class="category-tag">${tip.category}</span>
                        </div>
                    </div>
                    <button class="modal-close" onclick="closeTipModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tip-content">
                        ${tip.content}
                    </div>
                    <div class="tip-actions">
                        <button class="btn btn-primary" onclick="bookmarkTip(${tip.id})">
                            <i class="fas fa-bookmark"></i> 북마크 추가
                        </button>
                        <button class="btn btn-secondary" onclick="shareTip(${tip.id})">
                            <i class="fas fa-share"></i> 공유하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 팁 모달 스타일 추가
    if (!document.querySelector('#tipModalStyles')) {
        const styles = `
            <style id="tipModalStyles">
                .tip-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .tip-header-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .tip-icon-large {
                    width: 60px;
                    height: 60px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--white);
                    font-size: 1.5rem;
                }
                
                .category-tag {
                    background: var(--accent-color);
                    color: var(--white);
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .tip-content {
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                
                .tip-content h4 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                }
                
                .tip-content ul, .tip-content ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .tip-content li {
                    margin-bottom: 0.5rem;
                }
                
                .tip-content strong {
                    color: var(--primary-color);
                    font-weight: 600;
                }
                
                .tip-actions {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .tip-read-more {
                    background: none;
                    border: none;
                    color: var(--primary-color);
                    font-weight: 500;
                    cursor: pointer;
                    padding: 0.5rem 0;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: var(--transition);
                }
                
                .tip-read-more:hover {
                    gap: 0.75rem;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    document.body.style.overflow = 'hidden';
}

// 팁 모달 닫기
function closeTipModal() {
    const modal = document.getElementById('tipModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 팁 북마크
function bookmarkTip(tipId) {
    const bookmarks = utils.storage.get('bookmarkedTips') || [];
    
    if (!bookmarks.includes(tipId)) {
        bookmarks.push(tipId);
        utils.storage.set('bookmarkedTips', bookmarks);
        alert('팁이 북마크에 추가되었습니다.');
    } else {
        alert('이미 북마크에 추가된 팁입니다.');
    }
}

// 팁 공유
function shareTip(tipId) {
    const tip = tipsData.find(t => t.id === tipId);
    if (!tip) return;
    
    if (navigator.share) {
        navigator.share({
            title: tip.title,
            text: tip.description,
            url: window.location.href + '#tip-' + tipId
        });
    } else {
        // 폴백: 클립보드에 복사
        const shareText = `${tip.title}\n${tip.description}\n${window.location.href}#tip-${tipId}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('팁 링크가 클립보드에 복사되었습니다.');
        });
    }
}

// 팁 검색
function searchTips(query) {
    return tipsData.filter(tip => 
        tip.title.toLowerCase().includes(query.toLowerCase()) ||
        tip.description.toLowerCase().includes(query.toLowerCase()) ||
        tip.category.toLowerCase().includes(query.toLowerCase()) ||
        tip.content.toLowerCase().includes(query.toLowerCase())
    );
}

// 카테고리별 팁 필터링
function filterTipsByCategory(category) {
    return tipsData.filter(tip => tip.category === category);
}

// 팁 카테고리 목록 가져오기
function getTipCategories() {
    return [...new Set(tipsData.map(tip => tip.category))];
}

// 인기 팁 가져오기 (예시: 북마크 수 기준)
function getPopularTips() {
    const bookmarks = utils.storage.get('bookmarkedTips') || [];
    return tipsData
        .map(tip => ({
            ...tip,
            bookmarkCount: bookmarks.filter(id => id === tip.id).length
        }))
        .sort((a, b) => b.bookmarkCount - a.bookmarkCount)
        .slice(0, 5);
}

// 랜덤 팁 가져오기
function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * tipsData.length);
    return tipsData[randomIndex];
}

// 오늘의 팁 표시 (페이지 로드 시)
function showTipOfTheDay() {
    const today = new Date().toDateString();
    const lastTipDate = utils.storage.get('lastTipDate');
    
    if (lastTipDate !== today) {
        const randomTip = getRandomTip();
        utils.storage.set('lastTipDate', today);
        utils.storage.set('tipOfTheDay', randomTip);
        
        // 오늘의 팁 알림 표시 (선택사항)
        setTimeout(() => {
            if (confirm(`오늘의 팁: ${randomTip.title}\n\n자세히 보시겠습니까?`)) {
                showTipDetail(randomTip.id);
            }
        }, 2000);
    }
}

// 전역 함수로 내보내기
window.TipManager = {
    loadTips,
    showTipDetail,
    searchTips,
    filterTipsByCategory,
    getTipCategories,
    getPopularTips,
    getRandomTip,
    showTipOfTheDay,
    bookmarkTip,
    shareTip
};

