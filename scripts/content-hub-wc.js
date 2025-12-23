// =========================================
// CAD MASTER - WORLD-CLASS CONTENT HUB
// Stripe/Linear Level Quality
// =========================================

(function () {
    'use strict';

    const state = {
        allContent: [],
        filteredContent: [],
        currentFilter: { type: 'all', search: '' },
        itemsPerPage: 24,
        currentPage: 1,
        isLoading: false
    };

    const contentTypes = {
        tutorial: { label: '강좌', icon: 'fas fa-graduation-cap', color: '#6366f1' },
        tip: { label: '팁', icon: 'fas fa-lightbulb', color: '#f59e0b' },
        feature: { label: '명령어', icon: 'fas fa-terminal', color: '#10b981' }
    };

    const difficultyLevels = {
        start: { label: '시작', class: 'beginner' },
        beginner: { label: '기초', class: 'beginner' },
        intermediate: { label: '중급', class: 'intermediate' },
        advanced: { label: '고급', class: 'advanced' }
    };

    // Generate hashtags
    function generateHashtags(item) {
        const tags = [];
        if (item.type === 'feature' && item.name) {
            tags.push(`#${item.name}`);
        }
        if (item.software) tags.push(`#${item.software}`);
        if (item.category) tags.push(`#${item.category.replace(/\s+/g, '')}`);
        if (item.type === 'tutorial') tags.push('#CAD강좌');
        if (item.type === 'tip') tags.push('#실무팁');
        if (item.type === 'feature') tags.push('#명령어');
        return tags.slice(0, 4);
    }

    // Initialize
    async function init() {
        console.log('🚀 CAD MASTER World-Class Hub 초기화...');
        try {
            await loadAllContent();
            setupEventListeners();
            renderContent();
            updateCounts();
            console.log(`✅ 초기화 완료: ${state.allContent.length}개 콘텐츠`);
        } catch (error) {
            console.error('❌ 초기화 실패:', error);
        }
    }

    // Load all content
    async function loadAllContent() {
        state.allContent = [];

        // Tutorials
        if (typeof tutorialsData !== 'undefined') {
            ['start', 'beginner', 'intermediate', 'advanced'].forEach(level => {
                (tutorialsData[level] || []).forEach(t => {
                    state.allContent.push({
                        ...t,
                        type: 'tutorial',
                        software: 'AutoCAD',
                        hashtags: generateHashtags({ ...t, type: 'tutorial', software: 'AutoCAD' })
                    });
                });
            });
        }

        // Tips
        if (typeof tipsData !== 'undefined') {
            tipsData.forEach(t => {
                state.allContent.push({
                    ...t,
                    type: 'tip',
                    difficulty: 'intermediate',
                    software: 'AutoCAD',
                    hashtags: generateHashtags({ ...t, type: 'tip', software: 'AutoCAD' })
                });
            });
        }

        // Features
        try {
            const response = await fetch('/data/deep_features.json');
            if (response.ok) {
                const features = await response.json();
                features.forEach(f => {
                    const item = {
                        id: f.id,
                        title: f.name,
                        name: f.name,
                        description: f.description || `${f.name} - CAD 명령어`,
                        type: 'feature',
                        category: f.category || '일반',
                        difficulty: (f.difficulty || 'intermediate').toLowerCase(),
                        software: f.software || 'AutoCAD',
                        icon: 'fas fa-terminal'
                    };
                    item.hashtags = generateHashtags(item);
                    state.allContent.push(item);
                });
            }
        } catch (e) {
            console.warn('Features 로드 실패:', e);
        }

        state.filteredContent = [...state.allContent];
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                state.currentFilter.type = tab.dataset.value;
                state.currentPage = 1;
                renderContent();
            });
        });

        // Search
        const searchInput = document.getElementById('hubSearchInput');
        if (searchInput) {
            let timer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    state.currentFilter.search = e.target.value;
                    state.currentPage = 1;
                    renderContent();
                }, 250);
            });
        }

        // Load more
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                state.currentPage++;
                renderContent();
            });
        }
    }

    // Apply filters
    function applyFilters() {
        state.filteredContent = state.allContent.filter(item => {
            if (state.currentFilter.type !== 'all' && item.type !== state.currentFilter.type) {
                return false;
            }
            if (state.currentFilter.search) {
                const q = state.currentFilter.search.toLowerCase();
                const title = (item.title || item.name || '').toLowerCase();
                const desc = (item.description || '').toLowerCase();
                const cat = (item.category || '').toLowerCase();
                if (!title.includes(q) && !desc.includes(q) && !cat.includes(q)) {
                    return false;
                }
            }
            return true;
        });
    }

    // Render content
    function renderContent() {
        const grid = document.getElementById('contentGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!grid) return;

        applyFilters();
        const visible = state.filteredContent.slice(0, state.currentPage * state.itemsPerPage);

        if (visible.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-secondary); font-size: 1.25rem; margin-bottom: 0.5rem;">검색 결과가 없습니다</h3>
                    <p style="color: var(--text-tertiary);">다른 검색어를 시도해보세요</p>
                </div>
            `;
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        grid.innerHTML = visible.map(item => createCard(item)).join('');

        if (loadMoreBtn) {
            loadMoreBtn.style.display =
                (state.currentPage * state.itemsPerPage < state.filteredContent.length)
                    ? 'inline-flex' : 'none';
        }

        // Animate cards
        requestAnimationFrame(() => {
            grid.querySelectorAll('.card-wc').forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 30);
            });
        });
    }

    // Create card
    function createCard(item) {
        const typeConfig = contentTypes[item.type] || contentTypes.feature;
        const diffConfig = difficultyLevels[item.difficulty] || difficultyLevels.intermediate;
        const title = item.title || item.name || '제목 없음';
        const desc = (item.description || '').slice(0, 80);
        const hashtags = item.hashtags || [];

        let link = '#';
        if (item.type === 'tutorial') {
            link = `course_view.html?id=${item.id}`;
        } else if (item.type === 'feature') {
            link = `feature-view.html?id=${item.id}`;
        }

        return `
            <article class="card-wc" data-type="${item.type}">
                <div class="card-header-wc ${item.type}">
                    <i class="${item.icon || typeConfig.icon}"></i>
                    <span class="card-type-badge-wc">${typeConfig.label}</span>
                </div>
                <div class="card-body-wc">
                    <div class="card-tags-wc">
                        <span class="tag-wc difficulty ${diffConfig.class}">${diffConfig.label}</span>
                        ${item.software ? `<span class="tag-wc">${item.software}</span>` : ''}
                        ${item.category ? `<span class="tag-wc">${item.category}</span>` : ''}
                    </div>
                    <h3 class="card-title-wc">${title}</h3>
                    <p class="card-desc-wc">${desc}${desc.length >= 80 ? '...' : ''}</p>
                    <div class="card-hashtags-wc">
                        ${hashtags.map(tag => `<span class="hashtag-wc">${tag}</span>`).join(' ')}
                    </div>
                    <div class="card-footer-wc">
                        <a href="${link}" class="card-link-wc">
                            자세히 보기
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    // Update counts
    function updateCounts() {
        const counts = {
            all: state.allContent.length,
            tutorial: state.allContent.filter(c => c.type === 'tutorial').length,
            tip: state.allContent.filter(c => c.type === 'tip').length,
            feature: state.allContent.filter(c => c.type === 'feature').length
        };

        ['All', 'Tutorial', 'Tip', 'Feature'].forEach(type => {
            const el = document.getElementById(`count${type}`);
            if (el) el.textContent = counts[type.toLowerCase()];
        });

        // Hero stats
        const heroFeature = document.getElementById('heroFeatureCount');
        const heroTutorial = document.getElementById('heroTutorialCount');
        const heroTip = document.getElementById('heroTipCount');
        if (heroFeature) heroFeature.textContent = counts.feature;
        if (heroTutorial) heroTutorial.textContent = counts.tutorial;
        if (heroTip) heroTip.textContent = counts.tip;
    }

    // Expose globally
    window.ContentHub = { init, state };

    // Auto init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
