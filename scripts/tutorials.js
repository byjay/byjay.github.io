// 강좌 데이터 및 관리

// 강좌 데이터
const tutorialsData = {
    start: [
        {
            id: 101,
            title: "오토캐드 설치 및 실행",
            description: "오토캐드를 설치하고 처음 실행하는 방법을 알아봅니다.",
            difficulty: "start",
            duration: "10분",
            date: "2025-01-01",
            icon: "fas fa-download",
            category: "시작"
        },
        {
            id: 102,
            title: "인터페이스 둘러보기",
            description: "화면 구성요소와 기본 메뉴를 살펴봅니다.",
            difficulty: "start",
            duration: "15분",
            date: "2025-01-02",
            icon: "fas fa-desktop",
            category: "시작"
        }
    ],
    beginner: [
        {
            id: 201,
            title: "선(Line) 그리기 기초",
            description: "가장 기본적인 선 그리기 명령어를 마스터합니다.",
            difficulty: "beginner",
            duration: "20분",
            date: "2025-01-10",
            icon: "fas fa-pen",
            category: "기초"
        },
        {
            id: 202,
            title: "원(Circle)과 호(Arc)",
            description: "다양한 방법으로 원과 호를 그리는 법을 배웁니다.",
            difficulty: "beginner",
            duration: "25분",
            date: "2025-01-12",
            icon: "fas fa-circle-notch",
            category: "기초"
        }
    ],
    intermediate: [
        {
            id: 301,
            title: "레이어(Layer) 활용",
            description: "복잡한 도면을 체계적으로 관리하는 레이어 기법.",
            difficulty: "intermediate",
            duration: "30분",
            date: "2025-02-01",
            icon: "fas fa-layer-group",
            category: "중급"
        },
        {
            id: 302,
            title: "블록(Block) 만들기",
            description: "반복 요소를 블록으로 만들어 효율을 높입니다.",
            difficulty: "intermediate",
            duration: "35분",
            date: "2025-02-05",
            icon: "fas fa-th-large",
            category: "중급"
        }
    ],
    advanced: [
        {
            id: 401,
            title: "동적 블록(Dynamic Block)",
            description: "상황에 따라 변하는 똑똑한 블록을 만듭니다.",
            difficulty: "advanced",
            duration: "45분",
            date: "2025-03-01",
            icon: "fas fa-magic",
            category: "고급"
        },
        {
            id: 402,
            title: "3D 모델링 입문",
            description: "2D 도면을 3D 모델로 변환하는 과정을 배웁니다.",
            difficulty: "advanced",
            duration: "50분",
            date: "2025-03-10",
            icon: "fas fa-cube",
            category: "고급"
        }
    ]
};

// 강좌 카드 생성 함수
function createTutorialCard(tutorial) {
    const difficultyText = {
        'start': '시작반',
        'beginner': '기초반',
        'intermediate': '중급반',
        'advanced': '고급반'
    };

    const difficultyClass = {
        'start': 'difficulty-start',
        'beginner': 'difficulty-beginner',
        'intermediate': 'difficulty-intermediate',
        'advanced': 'difficulty-advanced'
    };

    return `
        <div class="tutorial-card" data-tutorial-id="${tutorial.id}">
            <div class="tutorial-image">
                <i class="${tutorial.icon}"></i>
            </div>
            <div class="tutorial-content">
                <div class="tutorial-meta">
                    <span class="difficulty ${difficultyClass[tutorial.difficulty] || ''}">${difficultyText[tutorial.difficulty]}</span>
                    <span><i class="fas fa-clock"></i> ${tutorial.duration}</span>
                </div>
                <h3 class="tutorial-title">${tutorial.title}</h3>
                <p class="tutorial-description">${tutorial.description}</p>
                <a href="course_view.html?id=${tutorial.id}" class="tutorial-link">
                    강좌 보기 <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

// 섹션별 강좌 로드 함수
function loadTutorialsBySection(sectionId, dataKey) {
    const container = document.getElementById(sectionId);
    if (container && tutorialsData[dataKey]) {
        container.innerHTML = tutorialsData[dataKey]
            .map(tutorial => createTutorialCard(tutorial))
            .join('');
    }
}

// 모든 강좌 로드
function loadTutorials() {
    loadTutorialsBySection('startTutorials', 'start');
    loadTutorialsBySection('basicTutorials', 'beginner'); // ID kept as basicTutorials for compatibility or updated in HTML
    loadTutorialsBySection('intermediateTutorials', 'intermediate');
    loadTutorialsBySection('advancedTutorials', 'advanced');
}

// ID로 강좌 찾기
function getTutorialById(id) {
    const allTutorials = [
        ...tutorialsData.start,
        ...tutorialsData.beginner,
        ...tutorialsData.intermediate,
        ...tutorialsData.advanced
    ];
    return allTutorials.find(tutorial => tutorial.id === id);
}

// 전역 함수로 내보내기
window.TutorialManager = {
    loadTutorials,
    getTutorialById
};


