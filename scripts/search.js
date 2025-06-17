// 검색 기능 관리

// 검색 관련 변수
let searchIndex = null;
let searchHistory = [];
let searchSuggestions = [];

// 검색 인덱스 초기화
function initializeSearchIndex() {
    searchIndex = {
        tutorials: [],
        tips: [],
        keywords: new Set()
    };
    
    // 강좌 데이터 인덱싱
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    allTutorials.forEach(tutorial => {
        const searchableContent = {
            id: tutorial.id,
            type: 'tutorial',
            title: tutorial.title,
            description: tutorial.description,
            category: tutorial.category,
            difficulty: tutorial.difficulty,
            keywords: extractKeywords(tutorial.title + ' ' + tutorial.description + ' ' + tutorial.category)
        };
        
        searchIndex.tutorials.push(searchableContent);
        searchableContent.keywords.forEach(keyword => searchIndex.keywords.add(keyword));
    });
    
    // 팁 데이터 인덱싱
    tipsData.forEach(tip => {
        const searchableContent = {
            id: tip.id,
            type: 'tip',
            title: tip.title,
            description: tip.description,
            category: tip.category,
            content: tip.content,
            keywords: extractKeywords(tip.title + ' ' + tip.description + ' ' + tip.category + ' ' + tip.content)
        };
        
        searchIndex.tips.push(searchableContent);
        searchableContent.keywords.forEach(keyword => searchIndex.keywords.add(keyword));
    });
    
    // 검색 제안 생성
    generateSearchSuggestions();
}

// 키워드 추출 함수
function extractKeywords(text) {
    // HTML 태그 제거
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // 한글, 영문, 숫자만 추출하고 소문자로 변환
    const words = cleanText
        .toLowerCase()
        .match(/[가-힣a-z0-9]+/g) || [];
    
    // 불용어 제거 (한글 조사, 영문 관사 등)
    const stopWords = ['의', '를', '을', '이', '가', '에', '와', '과', '로', '으로', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    return words.filter(word => 
        word.length > 1 && 
        !stopWords.includes(word)
    );
}

// 검색 제안 생성
function generateSearchSuggestions() {
    searchSuggestions = [
        // 인기 검색어
        '오토캐드 기초',
        '단축키',
        '레이어',
        '치수',
        '블록',
        '3D 모델링',
        '플롯',
        '객체 스냅',
        
        // 카테고리별 검색어
        ...getTutorialCategories(),
        ...getTipCategories(),
        
        // 난이도별 검색어
        '초급',
        '중급',
        '고급',
        
        // 기능별 검색어
        '그리기',
        '수정',
        '편집',
        '출력',
        '설정'
    ];
}

// 검색 실행
function performAdvancedSearch(query, filters = {}) {
    if (!query || query.trim().length < 2) {
        return { tutorials: [], tips: [], total: 0 };
    }
    
    const searchTerms = extractKeywords(query);
    const results = {
        tutorials: [],
        tips: [],
        total: 0
    };
    
    // 강좌 검색
    searchIndex.tutorials.forEach(tutorial => {
        const score = calculateRelevanceScore(tutorial, searchTerms, query);
        if (score > 0) {
            // 필터 적용
            if (filters.difficulty && tutorial.difficulty !== filters.difficulty) return;
            if (filters.category && tutorial.category !== filters.category) return;
            
            results.tutorials.push({
                ...tutorial,
                score: score,
                highlightedTitle: highlightSearchTerms(tutorial.title, searchTerms),
                highlightedDescription: highlightSearchTerms(tutorial.description, searchTerms)
            });
        }
    });
    
    // 팁 검색
    searchIndex.tips.forEach(tip => {
        const score = calculateRelevanceScore(tip, searchTerms, query);
        if (score > 0) {
            // 필터 적용
            if (filters.category && tip.category !== filters.category) return;
            
            results.tips.push({
                ...tip,
                score: score,
                highlightedTitle: highlightSearchTerms(tip.title, searchTerms),
                highlightedDescription: highlightSearchTerms(tip.description, searchTerms)
            });
        }
    });
    
    // 점수순으로 정렬
    results.tutorials.sort((a, b) => b.score - a.score);
    results.tips.sort((a, b) => b.score - a.score);
    
    results.total = results.tutorials.length + results.tips.length;
    
    // 검색 기록 저장
    saveSearchHistory(query);
    
    return results;
}

// 관련성 점수 계산
function calculateRelevanceScore(item, searchTerms, originalQuery) {
    let score = 0;
    
    // 제목에서 완전 일치
    if (item.title.toLowerCase().includes(originalQuery.toLowerCase())) {
        score += 100;
    }
    
    // 설명에서 완전 일치
    if (item.description.toLowerCase().includes(originalQuery.toLowerCase())) {
        score += 50;
    }
    
    // 키워드 일치
    searchTerms.forEach(term => {
        if (item.keywords.includes(term)) {
            score += 10;
        }
        
        // 제목에서 부분 일치
        if (item.title.toLowerCase().includes(term)) {
            score += 20;
        }
        
        // 설명에서 부분 일치
        if (item.description.toLowerCase().includes(term)) {
            score += 10;
        }
        
        // 카테고리 일치
        if (item.category.toLowerCase().includes(term)) {
            score += 15;
        }
    });
    
    return score;
}

// 검색어 하이라이트
function highlightSearchTerms(text, searchTerms) {
    let highlightedText = text;
    
    searchTerms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
}

// 검색 기록 저장
function saveSearchHistory(query) {
    searchHistory = utils.storage.get('searchHistory') || [];
    
    // 중복 제거
    searchHistory = searchHistory.filter(item => item !== query);
    
    // 최신 검색어를 맨 앞에 추가
    searchHistory.unshift(query);
    
    // 최대 10개까지만 저장
    if (searchHistory.length > 10) {
        searchHistory = searchHistory.slice(0, 10);
    }
    
    utils.storage.set('searchHistory', searchHistory);
}

// 검색 기록 가져오기
function getSearchHistory() {
    return utils.storage.get('searchHistory') || [];
}

// 검색 제안 가져오기
function getSearchSuggestions(query) {
    if (!query || query.length < 2) {
        return searchSuggestions.slice(0, 8);
    }
    
    const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );
    
    // 검색 기록도 포함
    const history = getSearchHistory().filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );
    
    return [...new Set([...history, ...filtered])].slice(0, 8);
}

// 검색 결과 표시
function displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('searchResults') || createSearchResultsContainer();
    
    if (results.total === 0) {
        resultsContainer.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <h3>"${query}"에 대한 검색 결과가 없습니다</h3>
                <p>다른 키워드로 검색해보세요.</p>
                <div class="search-suggestions">
                    <h4>추천 검색어:</h4>
                    ${getSearchSuggestions('').slice(0, 5).map(suggestion => 
                        `<button class="suggestion-btn" onclick="searchWithSuggestion('${suggestion}')">${suggestion}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="search-results-header">
            <h2>"${query}"에 대한 검색 결과 (${results.total}개)</h2>
        </div>
    `;
    
    // 강좌 결과
    if (results.tutorials.length > 0) {
        html += `
            <div class="search-section">
                <h3><i class="fas fa-graduation-cap"></i> 강좌 (${results.tutorials.length}개)</h3>
                <div class="search-results-grid">
                    ${results.tutorials.map(tutorial => `
                        <div class="search-result-card tutorial-result" onclick="openTutorial(${tutorial.id})">
                            <div class="result-icon">
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <div class="result-content">
                                <h4>${tutorial.highlightedTitle}</h4>
                                <p>${tutorial.highlightedDescription}</p>
                                <div class="result-meta">
                                    <span class="difficulty ${tutorial.difficulty}">
                                        ${tutorial.difficulty === 'beginner' ? '초급' : 
                                          tutorial.difficulty === 'intermediate' ? '중급' : '고급'}
                                    </span>
                                    <span class="category">${tutorial.category}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 팁 결과
    if (results.tips.length > 0) {
        html += `
            <div class="search-section">
                <h3><i class="fas fa-lightbulb"></i> 팁 & 노하우 (${results.tips.length}개)</h3>
                <div class="search-results-grid">
                    ${results.tips.map(tip => `
                        <div class="search-result-card tip-result" onclick="showTipDetail(${tip.id})">
                            <div class="result-icon">
                                <i class="fas fa-lightbulb"></i>
                            </div>
                            <div class="result-content">
                                <h4>${tip.highlightedTitle}</h4>
                                <p>${tip.highlightedDescription}</p>
                                <div class="result-meta">
                                    <span class="category">${tip.category}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
    
    // 검색 결과로 스크롤
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// 검색 결과 컨테이너 생성
function createSearchResultsContainer() {
    const container = document.createElement('div');
    container.id = 'searchResults';
    container.className = 'search-results-container';
    
    // 메인 콘텐츠 다음에 삽입
    const main = document.querySelector('.main');
    main.appendChild(container);
    
    // 검색 결과 스타일 추가
    if (!document.querySelector('#searchResultsStyles')) {
        const styles = `
            <style id="searchResultsStyles">
                .search-results-container {
                    padding: 2rem 0;
                    background: var(--white);
                    display: none;
                }
                
                .search-results-header h2 {
                    color: var(--text-color);
                    margin-bottom: 2rem;
                    text-align: center;
                }
                
                .search-section {
                    margin-bottom: 3rem;
                }
                
                .search-section h3 {
                    color: var(--primary-color);
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .search-results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                
                .search-result-card {
                    background: var(--background-color);
                    border-radius: var(--border-radius);
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: var(--transition);
                    border-left: 4px solid var(--primary-color);
                    display: flex;
                    gap: 1rem;
                }
                
                .search-result-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow);
                }
                
                .result-icon {
                    width: 50px;
                    height: 50px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--white);
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }
                
                .result-content {
                    flex: 1;
                }
                
                .result-content h4 {
                    margin-bottom: 0.5rem;
                    color: var(--text-color);
                }
                
                .result-content p {
                    color: var(--text-light);
                    line-height: 1.5;
                    margin-bottom: 1rem;
                }
                
                .result-meta {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                
                .result-meta span {
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
                
                .category {
                    background: var(--accent-color);
                    color: var(--white);
                }
                
                mark {
                    background: var(--accent-color);
                    color: var(--white);
                    padding: 0.1rem 0.2rem;
                    border-radius: 2px;
                }
                
                .search-no-results {
                    text-align: center;
                    padding: 3rem;
                    color: var(--text-light);
                }
                
                .search-no-results i {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    color: var(--text-light);
                }
                
                .search-suggestions {
                    margin-top: 2rem;
                }
                
                .suggestion-btn {
                    background: var(--background-color);
                    border: 1px solid var(--border-color);
                    padding: 0.5rem 1rem;
                    margin: 0.25rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: var(--transition);
                }
                
                .suggestion-btn:hover {
                    background: var(--primary-color);
                    color: var(--white);
                    border-color: var(--primary-color);
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    return container;
}

// 제안 검색어로 검색
function searchWithSuggestion(suggestion) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = suggestion;
        performSearch();
    }
}

// 카테고리 목록 가져오기
function getTutorialCategories() {
    const allTutorials = [...tutorialsData.latest, ...tutorialsData.basic];
    return [...new Set(allTutorials.map(t => t.category))];
}

// 검색 기능 개선된 버전
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    const results = performAdvancedSearch(query);
    displaySearchResults(results, query);
}

// 검색 결과 숨기기
function hideSearchResults() {
    const resultsContainer = document.getElementById('searchResults');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchIndex();
});

// 전역 함수로 내보내기
window.SearchManager = {
    performAdvancedSearch,
    displaySearchResults,
    getSearchSuggestions,
    getSearchHistory,
    searchWithSuggestion,
    hideSearchResults
};

