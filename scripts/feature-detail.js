document.addEventListener('DOMContentLoaded', async () => {
    // 1. URL 파라미터 파싱
    const params = new URLSearchParams(window.location.search);
    const featureId = params.get('id');

    if (!featureId) {
        alert('명령어 ID가 없습니다.');
        window.location.href = '/';
        return;
    }

    // 2. 데이터 로드 (병렬)
    try {
        const [coreDataRes, logicDataRes, lispDataRes] = await Promise.all([
            fetch('data/deep_core_commands.json'),
            fetch('data/logic_groups.json'),
            fetch('data/lisp_library.json')
        ]);

        const coreCommands = await coreDataRes.json();
        const logicGroups = await logicDataRes.json();
        const lispLibrary = await lispDataRes.json();

        // 3. 현재 명령어 찾기
        const feature = coreCommands.find(f => f.id === featureId);

        if (!feature) {
            // 데이터가 없으면 기존 deep_features.json에서라도 찾아봐야 함 (fallback)
            // 일단은 에러 처리
            document.querySelector('.detail-title').innerText = '데이터 준비 중';
            document.querySelector('.detail-desc').innerText = '이 명령어에 대한 심층 분석 데이터는 아직 업데이트되지 않았습니다. (Core 20개 먼저 적용됨)';
            return;
        }

        renderFeatureDetail(feature);
        renderLogicSidebar(feature, logicGroups);
        renderRelatedLisp(feature, lispLibrary);

    } catch (error) {
        console.error('Data load failed:', error);
        alert('데이터를 불러오는 데 실패했습니다.');
    }
});

function renderFeatureDetail(feature) {
    // 기본 정보
    document.getElementById('softwareBadge').innerText = feature.software;
    document.getElementById('categoryBadge').innerText = feature.category;
    document.getElementById('featureName').innerText = feature.name;
    document.getElementById('featureDesc').innerText = feature.description;
    document.getElementById('featureShortcuts').innerText = feature.shortcuts.join(', ');

    document.title = `${feature.name} 완벽 가이드 | 30년차 엔지니어 노하우`;

    // 30년차 팁
    document.getElementById('proTipContent').innerText = feature.protip;

    // 단계별 가이드
    const stepList = document.getElementById('stepList');
    stepList.innerHTML = feature.steps.map(step => `
        <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--accent-primary);">
            <p style="margin: 0; color: var(--text-secondary);">${step}</p>
        </div>
    `).join('');

    // 옵션 그리드
    const optionGrid = document.getElementById('optionGrid');
    optionGrid.innerHTML = feature.options.map(opt => `
        <div class="option-card">
            <div class="option-key">${opt.key}</div>
            <div class="option-name">${opt.name}</div>
            <p class="option-desc">${opt.desc}</p>
        </div>
    `).join('');
}

function renderLogicSidebar(feature, logicGroups) {
    const sidebar = document.getElementById('sidebarContent');

    // 이 명령어가 포함된 로직 그룹 찾기
    // logic.commands 배열에 feature.name이 포함되어 있는지 확인
    const relatedGroup = logicGroups.find(g => g.commands.includes(feature.name));

    if (relatedGroup) {
        let flowHtml = relatedGroup.flow.map(step => {
            const isCurrent = step.includes(feature.name); // 단순 매칭
            return `
                <div class="logic-step ${isCurrent ? 'active' : ''}">
                    <i class="fas fa-check-circle"></i>
                    <span>${step}</span>
                </div>
            `;
        }).join('');

        sidebar.innerHTML = `
            <div class="logic-card">
                <div class="logic-title">
                    <i class="fas fa-project-diagram"></i>
                    연계 엔지니어링 로직
                </div>
                <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color:white;">${relatedGroup.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-tertiary); margin-bottom: 1.5rem;">
                    ${relatedGroup.description}
                </p>
                <div class="logic-flow">
                    ${flowHtml}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <span style="font-size: 0.8rem; color: #f59e0b;">💡 ${relatedGroup.tip}</span>
                </div>
            </div>
        `;
    } else {
        // 포함된 로직이 없으면? 기본 로직 배너라도 표시
        sidebar.innerHTML = `
            <div class="logic-card">
                <div class="logic-title">CAD 마스터의 조언</div>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    "명령어 하나만 알면 하수입니다. ${feature.name} 다음엔 보통 무엇을 할까요? 
                    전후 관계를 생각하며 작업하세요."
                </p>
            </div>
        `;
    }
}

function renderRelatedLisp(feature, lispLibrary) {
    const section = document.getElementById('lispSection');
    const list = document.getElementById('lispList');

    // 카테고리가 같거나, 설명에 키워드가 있는 리습 찾기
    const relatedLisps = lispLibrary.filter(lisp =>
        lisp.category === feature.category ||
        lisp.description.includes(feature.name)
    ).slice(0, 3); // 최대 3개

    if (relatedLisps.length > 0) {
        section.style.display = 'block';
        list.innerHTML = relatedLisps.map(lisp => `
            <div class="lisp-card">
                <div class="lisp-info">
                    <h4>${lisp.name} (${lisp.command})</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${lisp.description}</p>
                    <div style="background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 4px; font-family: monospace; font-size: 0.8rem; color: #a5b4fc;">
                        ${lisp.code.substring(0, 40)}...
                    </div>
                </div>
                <button class="btn-download" onclick="alert('LISP 복사 완료! (시뮬레이션)')">
                    <i class="fas fa-copy"></i> 복사
                </button>
            </div>
        `).join('');
    }
}
