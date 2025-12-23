// =========================================
// CAD MASTER - 프리미엄 콘텐츠 허브 관리자
// SEO 최적화 + 해시태그 + 롱테일 키워드
// =========================================

(function () {
    'use strict';

    // 상태 관리
    const state = {
        allContent: [],
        filteredContent: [],
        currentFilter: {
            type: 'all',
            difficulty: 'all',
            software: 'all',
            search: ''
        },
        itemsPerPage: 24,
        currentPage: 1,
        isLoading: false
    };

    // 콘텐츠 타입 설정
    const contentTypes = {
        tutorial: {
            label: '강좌',
            icon: 'fas fa-graduation-cap',
            color: '#6366f1',
            seoKeywords: ['오토캐드 강좌', 'CAD 배우기', 'AutoCAD 튜토리얼', 'CAD 기초']
        },
        tip: {
            label: '팁',
            icon: 'fas fa-lightbulb',
            color: '#f59e0b',
            seoKeywords: ['CAD 팁', '오토캐드 노하우', 'AutoCAD 단축키', 'CAD 실무 팁']
        },
        feature: {
            label: '명령어',
            icon: 'fas fa-terminal',
            color: '#10b981',
            seoKeywords: ['CAD 명령어', 'AutoCAD 명령', 'ZWCAD 기능', 'CAD 커맨드']
        }
    };

    // 난이도 설정
    const difficultyLevels = {
        start: { label: '시작', color: '#8b5cf6', keywords: ['입문', '초보', '처음'] },
        beginner: { label: '기초', color: '#22c55e', keywords: ['기초', '기본', '쉬운'] },
        intermediate: { label: '중급', color: '#f59e0b', keywords: ['중급', '실무', '응용'] },
        advanced: { label: '고급', color: '#ef4444', keywords: ['고급', '전문가', '심화'] }
    };

    // 소프트웨어별 키워드
    const softwareKeywords = {
        AutoCAD: ['오토캐드', 'Autodesk', '2D CAD', '3D CAD', 'DWG'],
        ZWCAD: ['지더블유캐드', '중망캐드', 'DWG 호환', '저렴한 CAD'],
        CADian: ['캐디안', '국산 CAD', '한국 CAD', 'DWG 호환']
    };

    // 카테고리별 해시태그 생성
    function generateHashtags(item) {
        const hashtags = [];

        // 타입 기반
        if (item.type === 'feature') {
            hashtags.push(`#${item.name}`);
            hashtags.push(`#${item.software}`);
            hashtags.push('#CAD명령어');
        } else if (item.type === 'tutorial') {
            hashtags.push('#CAD강좌');
            hashtags.push('#오토캐드배우기');
        } else if (item.type === 'tip') {
            hashtags.push('#CAD팁');
            hashtags.push('#실무노하우');
        }

        // 카테고리 기반
        if (item.category) {
            const categoryTag = item.category.replace(/\s+/g, '');
            hashtags.push(`#${categoryTag}`);
        }

        // 난이도 기반
        const diffLevel = difficultyLevels[item.difficulty];
        if (diffLevel) {
            hashtags.push(`#${diffLevel.label}과정`);
        }

        return hashtags.slice(0, 5); // 최대 5개
    }

    // 롱테일 키워드 생성
    function generateLongTailKeywords(item) {
        const keywords = [];
        const name = item.title || item.name || '';
        const software = item.software || 'AutoCAD';
        const category = item.category || '';

        // 기본 키워드
        keywords.push(`${name} 사용법`);
        keywords.push(`${software} ${name}`);
        keywords.push(`${name} 명령어 설명`);

        if (category) {
            keywords.push(`${software} ${category} 기능`);
        }

        // 검색 의도 기반 키워드
        keywords.push(`${name} 어떻게 쓰나요`);
        keywords.push(`${name} 단축키`);
        keywords.push(`${software} ${name} 예제`);

        return keywords;
    }

    // SEO 메타 데이터 생성
    function generateSEOMetadata(items) {
        // 페이지 메타 태그 업데이트
        const totalCount = items.length;
        const tutorialCount = items.filter(i => i.type === 'tutorial').length;
        const tipCount = items.filter(i => i.type === 'tip').length;
        const featureCount = items.filter(i => i.type === 'feature').length;

        // 메타 description 업데이트
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = `AutoCAD, ZWCAD, CADian ${featureCount}개 명령어 완벽 가이드. ${tutorialCount}개 단계별 강좌와 ${tipCount}개 실무 팁 제공. 초보자부터 전문가까지 CAD 학습 종합 플랫폼.`;
        }

        // 메타 keywords 업데이트 (SEO 효과는 제한적이나 참조용)
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = 'AutoCAD, ZWCAD, CADian, CAD 명령어, 오토캐드 강좌, CAD 배우기, CAD 단축키, LINE 명령어, CIRCLE 사용법, CAD 튜토리얼, 도면 작성, 2D CAD, 3D CAD';

        // JSON-LD 구조화 데이터 추가
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CAD MASTER - 오토캐드 종합 학습 플랫폼",
            "description": `AutoCAD, ZWCAD, CADian ${featureCount}개 명령어 가이드와 강좌 제공`,
            "url": window.location.origin,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${window.location.origin}?search={search_term_string}`,
                "query-input": "required name=search_term_string"
            },
            "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": totalCount,
                "itemListElement": items.slice(0, 10).map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "HowTo",
                        "name": item.title || item.name,
                        "description": item.description
                    }
                }))
            }
        };

        // 기존 JSON-LD 제거 후 새로 추가
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // 초기화
    async function init() {
        console.log('CAD MASTER Premium Hub 초기화...');

        try {
            await loadAllContent();
            renderFilters();
            renderContent();
            setupEventListeners();
            updateStats();
            generateSEOMetadata(state.allContent);
            console.log(`✓ 초기화 완료: ${state.allContent.length}개 콘텐츠 로드`);
        } catch (error) {
            console.error('초기화 실패:', error);
        }
    }

    // 모든 콘텐츠 로드
    async function loadAllContent() {
        state.isLoading = true;
        state.allContent = [];

        // 1. 튜토리얼 데이터
        if (typeof tutorialsData !== 'undefined') {
            const tutorials = [
                ...(tutorialsData.start || []),
                ...(tutorialsData.beginner || []),
                ...(tutorialsData.intermediate || []),
                ...(tutorialsData.advanced || [])
            ].map(t => ({
                ...t,
                type: 'tutorial',
                software: 'AutoCAD',
                hashtags: generateHashtags({ ...t, type: 'tutorial' }),
                longTailKeywords: generateLongTailKeywords({ ...t, software: 'AutoCAD' })
            }));
            state.allContent.push(...tutorials);
        }

        // 2. 팁 데이터
        if (typeof tipsData !== 'undefined') {
            const tips = tipsData.map(t => ({
                ...t,
                type: 'tip',
                difficulty: 'intermediate',
                software: 'AutoCAD',
                hashtags: generateHashtags({ ...t, type: 'tip' }),
                longTailKeywords: generateLongTailKeywords({ ...t, software: 'AutoCAD' })
            }));
            state.allContent.push(...tips);
        }

        // 3. CAD 명령어 데이터
        try {
            const response = await fetch('/data/deep_features.json');
            if (response.ok) {
                const features = await response.json();
                const mappedFeatures = features.map(f => {
                    const item = {
                        id: f.id,
                        title: f.name,
                        name: f.name,
                        description: f.description || `${f.name} 명령어 - CAD 도면 작성에 사용`,
                        type: 'feature',
                        category: f.category || '일반',
                        difficulty: (f.difficulty || 'intermediate').toLowerCase(),
                        software: f.software || 'AutoCAD',
                        icon: 'fas fa-terminal',
                        videos: f.videos || [],
                        steps: f.steps || []
                    };
                    item.hashtags = generateHashtags(item);
                    item.longTailKeywords = generateLongTailKeywords(item);
                    return item;
                });
                state.allContent.push(...mappedFeatures);
            }
        } catch (error) {
            console.warn('명령어 데이터 로드 실패:', error);
        }

        state.filteredContent = [...state.allContent];
        state.isLoading = false;
    }

    // 필터 렌더링
    function renderFilters() {
        const filterContainer = document.getElementById('contentFilters');
        if (!filterContainer) return;

        filterContainer.innerHTML = `
            <div class="filter-row" style="margin-bottom: 1rem;">
                <span class="filter-label">타입</span>
                <div class="filter-chips" data-filter="type">
                    <button class="filter-chip active" data-value="all">
                        <i class="fas fa-th-large"></i> 전체
                    </button>
                    <button class="filter-chip" data-value="tutorial">
                        <i class="fas fa-graduation-cap"></i> 강좌
                    </button>
                    <button class="filter-chip" data-value="tip">
                        <i class="fas fa-lightbulb"></i> 팁
                    </button>
                    <button class="filter-chip" data-value="feature">
                        <i class="fas fa-terminal"></i> 명령어
                    </button>
                </div>
            </div>
            
            <div class="filter-row" style="margin-bottom: 1rem;">
                <span class="filter-label">난이도</span>
                <div class="filter-chips" data-filter="difficulty">
                    <button class="filter-chip active" data-value="all">전체</button>
                    <button class="filter-chip" data-value="beginner">기초</button>
                    <button class="filter-chip" data-value="intermediate">중급</button>
                    <button class="filter-chip" data-value="advanced">고급</button>
                </div>
            </div>
            
            <div class="filter-row">
                <span class="filter-label">소프트웨어</span>
                <div class="filter-chips" data-filter="software">
                    <button class="filter-chip active" data-value="all">전체</button>
                    <button class="filter-chip" data-value="AutoCAD">AutoCAD</button>
                    <button class="filter-chip" data-value="ZWCAD">ZWCAD</button>
                    <button class="filter-chip" data-value="CADian">CADian</button>
                </div>
            </div>
        `;
    }

    // 콘텐츠 렌더링
    function renderContent() {
        const contentGrid = document.getElementById('contentGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        if (!contentGrid) return;

        applyFilters();

        const visibleContent = state.filteredContent.slice(0, state.currentPage * state.itemsPerPage);

        if (visibleContent.length === 0) {
            contentGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 5rem 2rem;">
                    <i class="fas fa-search" style="font-size: 4rem; color: var(--neutral-300); margin-bottom: 1.5rem;"></i>
                    <h3 style="font-size: 1.5rem; color: var(--neutral-600); margin-bottom: 0.5rem;">검색 결과가 없습니다</h3>
                    <p style="color: var(--neutral-500);">다른 검색어나 필터를 시도해보세요.</p>
                </div>
            `;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        contentGrid.innerHTML = visibleContent.map(item => createPremiumCard(item)).join('');

        if (loadMoreBtn) {
            loadMoreBtn.style.display =
                (state.currentPage * state.itemsPerPage < state.filteredContent.length) ? 'inline-flex' : 'none';
        }

        updateStats();
        animateCards();
    }

    // 프리미엄 카드 생성
    function createPremiumCard(item) {
        const typeConfig = contentTypes[item.type] || contentTypes.feature;
        const diffConfig = difficultyLevels[item.difficulty] || difficultyLevels.intermediate;

        const cardTitle = item.title || item.name || '제목 없음';
        const cardDesc = item.description || '';
        const hashtags = item.hashtags || generateHashtags(item);

        // 링크 생성
        let cardLink = '#';
        if (item.type === 'tutorial') {
            cardLink = `course_view.html?id=${item.id}`;
        } else if (item.type === 'feature') {
            const diffFolder = (item.difficulty || 'intermediate').toLowerCase();
            const softwareFolder = (item.software || 'autocad').toLowerCase();
            const nameSlug = (item.name || '').toLowerCase().replace(/\s+/g, '-');
            cardLink = `/features/${diffFolder}/${softwareFolder}/${nameSlug}/`;
        }

        // data 속성에 SEO 키워드 포함
        const keywords = (item.longTailKeywords || []).join(', ');

        return `
            <article class="card-premium" 
                     data-type="${item.type}" 
                     data-id="${item.id}"
                     data-keywords="${keywords}"
                     itemscope 
                     itemtype="https://schema.org/HowTo">
                <div class="card-header-premium ${item.type}">
                    <i class="${item.icon || typeConfig.icon}"></i>
                    <span class="card-type-label">${typeConfig.label}</span>
                </div>
                <div class="card-body-premium">
                    <div class="card-tags">
                        <span class="card-tag difficulty ${item.difficulty}">${diffConfig.label}</span>
                        ${item.software ? `<span class="card-tag software">${item.software}</span>` : ''}
                        ${item.category ? `<span class="card-tag category">${item.category}</span>` : ''}
                    </div>
                    <h3 class="card-title-premium" itemprop="name">${cardTitle}</h3>
                    <p class="card-description-premium" itemprop="description">
                        ${cardDesc.slice(0, 100)}${cardDesc.length > 100 ? '...' : ''}
                    </p>
                    <div class="card-hashtags">
                        ${hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join(' ')}
                    </div>
                    <div class="card-footer-premium">
                        <a href="${cardLink}" class="card-link-premium" itemprop="url">
                            자세히 보기 <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <meta itemprop="keywords" content="${keywords}">
            </article>
        `;
    }

    // 필터 적용
    function applyFilters() {
        state.filteredContent = state.allContent.filter(item => {
            if (state.currentFilter.type !== 'all' && item.type !== state.currentFilter.type) {
                return false;
            }

            if (state.currentFilter.difficulty !== 'all') {
                const itemDiff = (item.difficulty || '').toLowerCase();
                if (itemDiff !== state.currentFilter.difficulty) {
                    return false;
                }
            }

            if (state.currentFilter.software !== 'all') {
                const itemSoftware = (item.software || '').toLowerCase();
                if (itemSoftware !== state.currentFilter.software.toLowerCase()) {
                    return false;
                }
            }

            if (state.currentFilter.search) {
                const searchLower = state.currentFilter.search.toLowerCase();
                const title = (item.title || item.name || '').toLowerCase();
                const desc = (item.description || '').toLowerCase();
                const category = (item.category || '').toLowerCase();
                const keywords = (item.longTailKeywords || []).join(' ').toLowerCase();

                if (!title.includes(searchLower) &&
                    !desc.includes(searchLower) &&
                    !category.includes(searchLower) &&
                    !keywords.includes(searchLower)) {
                    return false;
                }
            }

            return true;
        });
    }

    // 이벤트 리스너
    function setupEventListeners() {
        // 필터 클릭
        document.addEventListener('click', (e) => {
            const filterChip = e.target.closest('.filter-chip');
            if (filterChip) {
                const filterGroup = filterChip.closest('[data-filter]');
                if (filterGroup) {
                    const filterType = filterGroup.dataset.filter;
                    const filterValue = filterChip.dataset.value;

                    filterGroup.querySelectorAll('.filter-chip').forEach(chip =>
                        chip.classList.remove('active')
                    );
                    filterChip.classList.add('active');

                    state.currentFilter[filterType] = filterValue;
                    state.currentPage = 1;
                    renderContent();
                }
            }
        });

        // 검색
        const searchInput = document.getElementById('hubSearchInput');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    state.currentFilter.search = e.target.value;
                    state.currentPage = 1;
                    renderContent();
                }, 300);
            });
        }

        // 더보기
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                state.currentPage++;
                renderContent();
            });
        }
    }

    // 통계 업데이트
    function updateStats() {
        const elements = {
            total: document.getElementById('statTotalCount'),
            tutorial: document.getElementById('statTutorialCount'),
            tip: document.getElementById('statTipCount'),
            feature: document.getElementById('statFeatureCount'),
            filtered: document.getElementById('statFilteredCount'),
            heroFeature: document.getElementById('heroFeatureCount'),
            heroTutorial: document.getElementById('heroTutorialCount'),
            heroTip: document.getElementById('heroTipCount')
        };

        const counts = {
            total: state.allContent.length,
            tutorial: state.allContent.filter(c => c.type === 'tutorial').length,
            tip: state.allContent.filter(c => c.type === 'tip').length,
            feature: state.allContent.filter(c => c.type === 'feature').length,
            filtered: state.filteredContent.length
        };

        if (elements.total) elements.total.textContent = counts.total.toLocaleString();
        if (elements.tutorial) elements.tutorial.textContent = counts.tutorial;
        if (elements.tip) elements.tip.textContent = counts.tip;
        if (elements.feature) elements.feature.textContent = counts.feature.toLocaleString();
        if (elements.filtered) elements.filtered.textContent = counts.filtered.toLocaleString();
        if (elements.heroFeature) elements.heroFeature.textContent = counts.feature.toLocaleString();
        if (elements.heroTutorial) elements.heroTutorial.textContent = counts.tutorial;
        if (elements.heroTip) elements.heroTip.textContent = counts.tip;
    }

    // 카드 애니메이션
    function animateCards() {
        const cards = document.querySelectorAll('.card-premium');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 40);
        });
    }

    // 전역 노출
    window.ContentHub = {
        init,
        state,
        renderContent,
        applyFilters,
        generateSEOMetadata
    };

    // DOM 로드 시 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
