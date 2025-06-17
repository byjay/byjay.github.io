// 메인 JavaScript 파일

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupSearchFunctionality();
    setupAnimations();
    loadTutorials();
    loadTips();
}

// 모바일 메뉴 설정
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 아이콘 변경
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // 메뉴 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// 부드러운 스크롤 설정
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 검색 기능 설정
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        // 검색 버튼 클릭
        searchBtn.addEventListener('click', performSearch);
        
        // Enter 키 입력
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// 검색 실행
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        // 실제 검색 로직 구현
        console.log('검색어:', query);
        
        // 강좌 카드들을 검색
        const tutorialCards = document.querySelectorAll('.tutorial-card');
        const tipCards = document.querySelectorAll('.tip-card');
        
        let foundResults = false;
        
        // 강좌 검색
        tutorialCards.forEach(card => {
            const title = card.querySelector('.tutorial-title').textContent.toLowerCase();
            const description = card.querySelector('.tutorial-description').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                foundResults = true;
            }
        });
        
        // 팁 검색
        tipCards.forEach(card => {
            const title = card.querySelector('.tip-title').textContent.toLowerCase();
            const description = card.querySelector('.tip-description').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                foundResults = true;
            }
        });
        
        if (!foundResults) {
            alert('검색 결과가 없습니다.');
        }
    }
}

// 애니메이션 설정
function setupAnimations() {
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.tutorial-card, .tip-card, .resource-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 네비게이션 활성 상태 업데이트
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 스크롤 시 헤더 스타일 변경
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });
}

// 페이지 로드 시 실행
window.addEventListener('load', function() {
    updateActiveNavigation();
    setupHeaderScrollEffect();
});

// 유틸리티 함수들
const utils = {
    // 디바운스 함수
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 요소가 뷰포트에 있는지 확인
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 로컬 스토리지 헬퍼
    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error('로컬 스토리지 저장 실패:', e);
            }
        },
        
        get: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('로컬 스토리지 읽기 실패:', e);
                return null;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.error('로컬 스토리지 삭제 실패:', e);
            }
        }
    }
};

// 전역 객체로 내보내기
window.AutoCADBlog = {
    utils: utils,
    performSearch: performSearch
};

