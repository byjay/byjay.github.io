// 강좌 데이터 및 관리

// 강좌 데이터
const tutorialsData = {
    latest: [
        {
            id: 1,
            title: "오토캐드 2025 새로운 기능",
            description: "오토캐드 2025에서 새롭게 추가된 기능들을 살펴보고 활용 방법을 알아봅니다.",
            difficulty: "intermediate",
            duration: "15분",
            date: "2025-06-15",
            icon: "fas fa-star",
            category: "새로운 기능"
        },
        {
            id: 2,
            title: "3D 모델링 기초",
            description: "오토캐드에서 3D 객체를 생성하고 편집하는 기본적인 방법을 학습합니다.",
            difficulty: "intermediate",
            duration: "25분",
            date: "2025-06-10",
            icon: "fas fa-cube",
            category: "3D 모델링"
        },
        {
            id: 3,
            title: "레이어 관리 마스터하기",
            description: "효율적인 레이어 관리 방법과 레이어 상태, 필터 활용법을 배웁니다.",
            difficulty: "beginner",
            duration: "20분",
            date: "2025-06-05",
            icon: "fas fa-layer-group",
            category: "기초"
        }
    ],
    basic: [
        {
            id: 4,
            title: "오토캐드 인터페이스 이해하기",
            description: "오토캐드의 기본 인터페이스와 작업 환경을 이해하고 설정하는 방법을 학습합니다.",
            difficulty: "beginner",
            duration: "15분",
            date: "2025-06-01",
            icon: "fas fa-desktop",
            category: "기초"
        },
        {
            id: 5,
            title: "기본 도형 그리기",
            description: "선, 원, 사각형 등 기본 도형을 그리는 방법과 좌표 입력 방식을 배웁니다.",
            difficulty: "beginner",
            duration: "20분",
            date: "2025-05-28",
            icon: "fas fa-shapes",
            category: "기초"
        },
        {
            id: 6,
            title: "객체 선택 및 수정",
            description: "객체를 선택하고 이동, 복사, 회전, 크기 조정하는 방법을 학습합니다.",
            difficulty: "beginner",
            duration: "18분",
            date: "2025-05-25",
            icon: "fas fa-mouse-pointer",
            category: "기초"
        },
        {
            id: 7,
            title: "치수 및 주석 작성",
            description: "도면에 치수를 기입하고 텍스트, 지시선 등의 주석을 추가하는 방법을 배웁니다.",
            difficulty: "beginner",
            duration: "22분",
            date: "2025-05-22",
            icon: "fas fa-ruler",
            category: "기초"
        },
        {
            id: 8,
            title: "블록 정의 및 활용",
            description: "반복적으로 사용되는 객체를 블록으로 정의하고 효율적으로 활용하는 방법을 학습합니다.",
            difficulty: "intermediate",
            duration: "25분",
            date: "2025-05-20",
            icon: "fas fa-th-large",
            category: "중급"
        },
        {
            id: 9,
            title: "플롯 및 출력 설정",
            description: "도면을 인쇄하거나 PDF로 출력하기 위한 플롯 설정 방법을 배웁니다.",
            difficulty: "intermediate",
            duration: "20분",
            date: "2025-05-18",
            icon: "fas fa-print",
            category: "중급"
        }
    ]
};

// 강좌 카드 생성 함수
function createTutorialCard(tutorial) {
    const difficultyText = {
        'beginner': '초급',
        'intermediate': '중급',
        'advanced': '고급'
    };

    return `
        <div class="tutorial-card" data-tutorial-id="${tutorial.id}">
            <div class="tutorial-image">
                <i class="${tutorial.icon}"></i>
            </div>
            <div class="tutorial-content">
                <div class="tutorial-meta">
                    <span class="difficulty ${tutorial.difficulty}">${difficultyText[tutorial.difficulty]}</span>
                    <span><i class="fas fa-clock"></i> ${tutorial.duration}</span>
                    <span><i class="fas fa-calendar"></i> ${tutorial.date}</span>
                </div>
                <h3 class="tutorial-title">${tutorial.title}</h3>
                <p class="tutorial-description">${tutorial.description}</p>
                <a href="#" class="tutorial-link" onclick="openTutorial(${tutorial.id})">
                    강좌 보기 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

// 최신 강좌 로드
function loadLatestTutorials() {
    const container = document.getElementById('latestTutorials');
    if (container) {
        container.innerHTML = tutorialsData.latest
            .map(tutorial => createTutorialCard(tutorial))
            .join('');
    }
}

// 기초 강좌 로드
function loadBasicTutorials() {
    const container = document.getElementById('basicTutorials');
    if (container) {
        container.innerHTML = tutorialsData.basic
            .map(tutorial => createTutorialCard(tutorial))
            .join('');
    }
}

// 모든 강좌 로드
function loadTutorials() {
    loadLatestTutorials();
    loadBasicTutorials();
}

// 강좌 열기 함수
function openTutorial(tutorialId) {
    // 실제 구현에서는 강좌 상세 페이지로 이동하거나 모달을 열 수 있습니다
    const tutorial = findTutorialById(tutorialId);
    if (tutorial) {
        // 강좌 상세 모달 열기 또는 페이지 이동
        showTutorialModal(tutorial);
    }
}

// ID로 강좌 찾기
function findTutorialById(id) {
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    return allTutorials.find(tutorial => tutorial.id === id);
}

// 강좌 상세 모달 표시
function showTutorialModal(tutorial) {
    // 모달 HTML 생성
    const modalHTML = `
        <div class="tutorial-modal" id="tutorialModal">
            <div class="modal-overlay" onclick="closeTutorialModal()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${tutorial.title}</h2>
                    <button class="modal-close" onclick="closeTutorialModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tutorial-meta">
                        <span class="difficulty ${tutorial.difficulty}">
                            ${tutorial.difficulty === 'beginner' ? '초급' : 
                              tutorial.difficulty === 'intermediate' ? '중급' : '고급'}
                        </span>
                        <span><i class="fas fa-clock"></i> ${tutorial.duration}</span>
                        <span><i class="fas fa-tag"></i> ${tutorial.category}</span>
                    </div>
                    <p class="tutorial-description">${tutorial.description}</p>
                    <div class="tutorial-content-placeholder">
                        <p>강좌 내용이 여기에 표시됩니다. 실제 구현에서는 Markdown 콘텐츠를 렌더링하거나 별도의 강좌 페이지로 이동할 수 있습니다.</p>
                        <div class="tutorial-actions">
                            <button class="btn btn-primary" onclick="startTutorial(${tutorial.id})">
                                강좌 시작하기
                            </button>
                            <button class="btn btn-secondary" onclick="bookmarkTutorial(${tutorial.id})">
                                북마크 추가
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 모달을 body에 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 모달 스타일 추가 (CSS에 없는 경우)
    if (!document.querySelector('#tutorialModalStyles')) {
        const styles = `
            <style id="tutorialModalStyles">
                .tutorial-modal {
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
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    position: relative;
                    background: var(--white);
                    border-radius: var(--border-radius);
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .modal-header h2 {
                    margin: 0;
                    color: var(--text-color);
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-light);
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: var(--transition);
                }
                
                .modal-close:hover {
                    background: var(--background-color);
                    color: var(--text-color);
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
                
                .tutorial-content-placeholder {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--background-color);
                    border-radius: var(--border-radius);
                }
                
                .tutorial-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
}

// 강좌 모달 닫기
function closeTutorialModal() {
    const modal = document.getElementById('tutorialModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 강좌 시작하기
function startTutorial(tutorialId) {
    // 실제 구현에서는 강좌 페이지로 이동
    alert(`강좌 ${tutorialId}를 시작합니다. 실제 구현에서는 강좌 페이지로 이동합니다.`);
    closeTutorialModal();
}

// 강좌 북마크
function bookmarkTutorial(tutorialId) {
    const bookmarks = utils.storage.get('bookmarkedTutorials') || [];
    
    if (!bookmarks.includes(tutorialId)) {
        bookmarks.push(tutorialId);
        utils.storage.set('bookmarkedTutorials', bookmarks);
        alert('북마크에 추가되었습니다.');
    } else {
        alert('이미 북마크에 추가된 강좌입니다.');
    }
}

// 강좌 검색 함수
function searchTutorials(query) {
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    return allTutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(query.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(query.toLowerCase())
    );
}

// 난이도별 필터링
function filterTutorialsByDifficulty(difficulty) {
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    return allTutorials.filter(tutorial => tutorial.difficulty === difficulty);
}

// 카테고리별 필터링
function filterTutorialsByCategory(category) {
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    return allTutorials.filter(tutorial => tutorial.category === category);
}

// 강좌 통계
function getTutorialStats() {
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    
    return {
        total: allTutorials.length,
        beginner: allTutorials.filter(t => t.difficulty === 'beginner').length,
        intermediate: allTutorials.filter(t => t.difficulty === 'intermediate').length,
        advanced: allTutorials.filter(t => t.difficulty === 'advanced').length,
        categories: [...new Set(allTutorials.map(t => t.category))]
    };
}

// 전역 함수로 내보내기
window.TutorialManager = {
    loadTutorials,
    openTutorial,
    searchTutorials,
    filterTutorialsByDifficulty,
    filterTutorialsByCategory,
    getTutorialStats,
    bookmarkTutorial
};

