
import { DetailedGuide } from './types';

/**
 * ZWCAD 공식 도움말 스타일의 가이드를 생성합니다.
 */
export function getGuideForEntry(id: string, name: string, description: string): DetailedGuide {
  
  // 기본 템플릿: 모든 데이터에 대해 고품질 가이드를 보장합니다.
  const guide: DetailedGuide = {
    usage: `### ${name} 개요 및 사용법\n\n**${name}** 명령어는 "${description}" 기능을 수행합니다.\n\n**상세 단계:**\n1. 명령창(Command Line)에 **${name}**을 입력하고 Enter를 누릅니다.\n2. 마우스로 객체를 선택하거나 특정 좌표값을 입력합니다.\n3. 명령행에 표시되는 옵션(하단 괄호 안의 대문자)을 통해 세부 설정을 변경할 수 있습니다.\n4. 작업이 완료되면 Enter 또는 Space를 눌러 종료합니다.`,
    examples: [
      `명령창에 '${name}' 입력 후 대상 객체 선택`,
      `단축키(Alias) 설정을 통한 신속한 호출`,
      `명령행 프롬프트 옵션을 활용한 결과값 조정`
    ],
    tips: [
      `명령 실행 중 잘못된 입력을 했을 경우 'ESC' 키를 눌러 즉시 취소하십시오.`,
      `해당 기능은 ZWCAD의 핵심 설계 도구 중 하나로 실무 빈도가 매우 높습니다.`,
      `시스템 변수와 연동하여 사용하면 자동화된 작업 환경을 구축할 수 있습니다.`
    ],
    related: ['UNDO', 'PROPERTIES', 'HELP', 'REDRAW'],
    visualDescription: `${name} 기능의 표준적인 작동 흐름을 보여주는 기술 도식. 작업 전(Original) 상태와 작업 후(Result) 상태의 기하학적 변화를 화살표와 레이블로 상세히 묘사함.`
  };

  // 특정 핵심 명령어에 대한 상세 오버라이드
  if (id === 'LINE') {
    guide.usage = `### LINE (선) 작도법\n1. **LINE** 입력 후 엔터.\n2. 시작점을 지정합니다 (클릭 또는 좌표입력).\n3. 다음 점을 계속 지정하여 연속된 선을 그립니다.\n4. **C(닫기)**를 입력하면 처음 지점과 연결되며 종료됩니다.`;
    guide.tips.push('F8(직교모드)을 사용하면 수평/수직선을 정확하게 그릴 수 있습니다.');
    guide.related = ['PLINE', 'RECTANG', 'CIRCLE'];
  } else if (id === 'TRIM') {
    guide.usage = `### TRIM (자르기) 활용법\n1. **TRIM** 입력 후 엔터.\n2. 경계가 될 객체를 선택하거나 바로 엔터를 눌러 전체를 경계로 지정합니다.\n3. 잘라낼 부분을 마우스로 클릭합니다.\n4. **Shift** 키를 누른 채 클릭하면 반대로 연장(EXTEND) 기능이 실행됩니다.`;
  } else if (id === 'LAYER') {
    guide.usage = `### LAYER (도면층) 관리 가이드\n1. **LAYER** 또는 **LA** 입력.\n2. 도면층 특성 관리자에서 새 레이어를 생성하거나 색상, 선종류를 변경합니다.\n3. 객체를 선택한 뒤 레이어 리스트에서 선택하면 해당 레이어로 이동됩니다.`;
    guide.tips.push('ByLayer 설정을 유지하는 것이 도면 관리 표준입니다.');
  } else if (id.startsWith('OSMODE') || id === 'OSMODE') {
    guide.usage = `### OSMODE (객체 스냅 모드) 비트코드 설정\n- 1: 끝점 (Endpoint)\n- 2: 중간점 (Midpoint)\n- 4: 중심 (Center)\n- 8: 노드 (Node)\n- 32: 교차점 (Intersection)\n\n원하는 모드들의 숫자를 모두 합산하여 값을 입력하십시오. (예: 1+2+4=7)`;
  }

  return guide;
}
