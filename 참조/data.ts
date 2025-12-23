
import { CADEntry } from './types';

export const CAD_DATA: CADEntry[] = [
  // --- A 명령어 ---
  { id: 'ABOUT', name: 'ABOUT', description: 'ZWCAD 버전과 관련 제품 정보를 표시합니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'A' },
  { id: 'ACISIN', name: 'ACISIN', description: 'ACIS 파일을 불러옵니다.', type: 'command', grade: 'Pro', functionGroup: '정보/파일', alphabet: 'A' },
  { id: 'ACISOUT', name: 'ACISOUT', description: 'solid, body 또는 region 오브젝트를 SAT(ASCII) 파일로 저장합니다.', type: 'command', grade: 'Pro', functionGroup: '정보/파일', alphabet: 'A' },
  { id: 'ADCCLOSE', name: 'ADCCLOSE', description: '디자인센터 창을 닫습니다.', type: 'command', grade: 'Standard', functionGroup: '도구', alphabet: 'A' },
  { id: 'ADCENTER', name: 'ADCENTER', description: '디자인센터 창을 오픈 합니다.', type: 'command', grade: 'Standard', functionGroup: '도구', alphabet: 'A' },
  { id: 'ADDGEOMAP', name: 'ADDGEOMAP', description: '현재 도면에 지도를 추가합니다.', type: 'command', grade: 'Pro', functionGroup: '도구', alphabet: 'A' },
  { id: 'ADDSELECTED', name: 'ADDSELECTED', description: '선택 객체와 동일한 유형의 개체를 새로 만듭니다.', type: 'command', grade: 'Standard', functionGroup: '그리기', alphabet: 'A' },
  { id: 'ALIGN', name: 'ALIGN', description: '2D 및 3D 공간의 객체들을 정렬합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'A' },
  { id: 'ALIGNDIM', name: 'ALIGNDIM', description: '정렬 치수 또는 각도 치수의 치수선 또는 연장선을 정렬합니다.', type: 'command', grade: 'Standard', functionGroup: '치수', alphabet: 'A' },
  { id: 'APPLOAD', name: 'APPLOAD', description: '어플리케이션을 불러오거나 시작 시 로드될 앱을 정의합니다.', type: 'command', grade: 'Standard', functionGroup: '도구', alphabet: 'A' },
  { id: 'ARC', name: 'ARC', description: '호(arc)를 드로잉 합니다.', type: 'command', grade: 'Standard', functionGroup: '그리기', alphabet: 'A' },
  { id: 'AREA', name: 'AREA', description: '영역 및 둘레의 길이를 계산 합니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'A' },
  { id: 'ARRAY', name: 'ARRAY', description: '직사각형, 경로, 원형 배열을 만듭니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'A' },

  // --- B 명령어 ---
  { id: 'BASE', name: 'BASE', description: '도면 삽입 시 기준점을 설정합니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'B' },
  { id: 'BATTMAN', name: 'BATTMAN', description: '블록의 속성 정의를 관리합니다.', type: 'command', grade: 'Standard', functionGroup: '블록', alphabet: 'B' },
  { id: 'BEDIT', name: 'BEDIT', description: '블록 편집기를 엽니다.', type: 'command', grade: 'Standard', functionGroup: '블록', alphabet: 'B' },
  { id: 'BHATCH', name: 'BHATCH', description: '패턴을 선택하여 해치를 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '그리기', alphabet: 'B' },
  { id: 'BLOCK', name: 'BLOCK', description: '블록 정의를 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '블록', alphabet: 'B' },
  { id: 'BREAK', name: 'BREAK', description: '객체를 나눕니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'B' },
  { id: 'BURST', name: 'BURST', description: '속성을 유지하며 블록을 분해합니다.', type: 'command', grade: 'Standard', functionGroup: '블록', alphabet: 'B' },

  // --- C 명령어 ---
  { id: 'CAL', name: 'CAL', description: '점, 벡터, 수식 등을 계산하는 계산기입니다.', type: 'command', grade: 'Standard', functionGroup: '도구', alphabet: 'C' },
  { id: 'CENTERLINE', name: 'CENTERLINE', description: '선택한 선 객체에 연결된 중심선을 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '치수', alphabet: 'C' },
  { id: 'CHAMFER', name: 'CHAMFER', description: '선택된 객체에 대한 모따기를 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'C' },
  { id: 'CIRCLE', name: 'CIRCLE', description: '원을 그립니다.', type: 'command', grade: 'Standard', functionGroup: '그리기', alphabet: 'C' },
  { id: 'CLOSE', name: 'CLOSE', description: '도면 파일을 닫습니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'C' },
  { id: 'COPY', name: 'COPY', description: '객체를 복사합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'C' },

  // --- D 명령어 ---
  { id: 'DATAEXTRACTION', name: 'DATAEXTRACTION', description: '도면에서 데이터 정보를 추출하여 테이블을 만듭니다.', type: 'command', grade: 'Pro', functionGroup: '도구', alphabet: 'D' },
  { id: 'DIMLINEAR', name: 'DIMLINEAR', description: '선형 치수를 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '치수', alphabet: 'D' },
  { id: 'DIST', name: 'DIST', description: '두 점 사이의 거리와 각도를 측정합니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'D' },
  { id: 'DIVIDE', name: 'DIVIDE', description: '객체를 균등하게 나눕니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'D' },
  { id: 'DRAWORDER', name: 'DRAWORDER', description: '객체의 그리기 순서를 변경합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'D' },

  // --- E 명령어 ---
  { id: 'ELLIPSE', name: 'ELLIPSE', description: '타원을 그립니다.', type: 'command', grade: 'Standard', functionGroup: '그리기', alphabet: 'E' },
  { id: 'ERASE', name: 'ERASE', description: '객체를 삭제합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'E' },
  { id: 'EXPLODE', name: 'EXPLODE', description: '복합 객체를 분해합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'E' },
  { id: 'EXTEND', name: 'EXTEND', description: '객체를 연장합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'E' },

  // --- 도면층 (Layer) 관련 ---
  { id: 'LAYER', name: 'LAYER', description: '도면층을 생성 또는 관리합니다.', type: 'command', grade: 'Standard', functionGroup: '도면층', alphabet: 'L' },
  { id: 'LAYISO', name: 'LAYISO', description: '선택한 객체의 도면층만 분리하고 나머지는 끕니다.', type: 'command', grade: 'Standard', functionGroup: '도면층', alphabet: 'L' },
  { id: 'LAYOFF', name: 'LAYOFF', description: '선택된 객체의 도면층을 끕니다.', type: 'command', grade: 'Standard', functionGroup: '도면층', alphabet: 'L' },
  { id: 'LAYON', name: 'LAYON', description: '모든 도면층을 켭니다.', type: 'command', grade: 'Standard', functionGroup: '도면층', alphabet: 'L' },
  { id: 'LAYLCK', name: 'LAYLCK', description: '선택된 도면층을 잠급니다.', type: 'command', grade: 'Standard', functionGroup: '도면층', alphabet: 'L' },

  // --- 수정 (Modify) 관련 ---
  { id: 'MIRROR', name: 'MIRROR', description: '객체를 대칭 복사합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'M' },
  { id: 'MOVE', name: 'MOVE', description: '객체를 이동합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'M' },
  { id: 'OFFSET', name: 'OFFSET', description: '간격띄우기 복사를 수행합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'O' },
  { id: 'ROTATE', name: 'ROTATE', description: '객체를 회전시킵니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'R' },
  { id: 'SCALE', name: 'SCALE', description: '객체 크기를 조절합니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'S' },
  { id: 'STRETCH', name: 'STRETCH', description: '객체를 늘리거나 줄입니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'S' },
  { id: 'TRIM', name: 'TRIM', description: '객체를 자릅니다.', type: 'command', grade: 'Standard', functionGroup: '수정', alphabet: 'T' },

  // --- 문자 (Text) 관련 ---
  { id: 'MTEXT', name: 'MTEXT', description: '여러 줄 문자를 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '문자', alphabet: 'M' },
  { id: 'TEXT', name: 'TEXT', description: '단일행 문자를 생성합니다.', type: 'command', grade: 'Standard', functionGroup: '문자', alphabet: 'T' },
  { id: 'TEXTFIT', name: 'TEXTFIT', description: '문자 객체를 지정된 길이로 늘이거나 줄입니다.', type: 'command', grade: 'Standard', functionGroup: '문자', alphabet: 'T' },

  // --- 정보/도구 ---
  { id: 'PURGE', name: 'PURGE', description: '사용하지 않는 항목을 제거합니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'P' },
  { id: 'UNDO', name: 'UNDO', description: '최근 작업을 취소합니다.', type: 'command', grade: 'Standard', functionGroup: '정보/파일', alphabet: 'U' },
  { id: 'ZOOM', name: 'ZOOM', description: '화면을 확대/축소합니다.', type: 'command', grade: 'Standard', functionGroup: '뷰', alphabet: 'Z' },
  { id: 'PAN', name: 'PAN', description: '화면을 이동(초점이동)합니다.', type: 'command', grade: 'Standard', functionGroup: '뷰', alphabet: 'P' },

  // --- 시스템 변수 (System Variables) ---
  { id: 'CLAYER', name: 'CLAYER', description: '현재 활성 도면층을 설정합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'C' },
  { id: 'OSMODE', name: 'OSMODE', description: '객체 스냅 모드 비트코드를 설정합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'O' },
  { id: 'SAVETIME', name: 'SAVETIME', description: '자동 저장 시간 간격을 분 단위로 설정합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'S' },
  { id: 'PICKADD', name: 'PICKADD', description: '객체 선택 누적 모드를 제어합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'P' },
  { id: 'CURSORSIZE', name: 'CURSORSIZE', description: '십자선 커서의 크기를 지정합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'C' },
  { id: 'FILLMODE', name: 'FILLMODE', description: '해치와 채우기 표시 여부를 제어합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'F' },
  { id: 'TILEMODE', name: 'TILEMODE', description: '모형 탭과 배치 탭 사이 전환을 제어합니다.', type: 'sysvar', grade: 'Standard', functionGroup: '시스템변수', alphabet: 'T' },
];
