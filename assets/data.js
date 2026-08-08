/* ============================================================
   프로젝트 데이터
   새 프로젝트가 생기면 아래 배열에 객체 하나만 추가하면 됩니다.

   type   : 'web'(웹 도구) | 'ext'(확장) | 'theme'(테마)
   color  : yellow | lime | cyan | pink | purple | orange | red | blue
   site   : 바로 열 수 있는 주소 (없으면 null)
   repo   : GitHub 저장소 주소
   git    : 확장 설치용 Git URL (확장만, 없으면 null)
   ============================================================ */

const PROJECTS = [
  {
    id: 'preset-viewer',
    name: 'Preset Viewer',
    sub: '프리셋 뷰어',
    type: 'web',
    emoji: '📄',
    color: 'yellow',
    desc: '프리셋 JSON을 올려서 프롬프트 목록과 내용을 한눈에 보는 도구. 프리셋끼리 프롬프트를 옮기거나 두 프리셋의 차이를 비교할 수도 있습니다.',
    features: ['프리셋 보기', '프롬프트 옮기기', '프리셋 비교', '프리셋 시뮬레이터', '매크로 확인'],
    site: 'https://keepsanity.github.io/preset-viewer/',
    repo: 'https://github.com/keepsanity/preset-viewer',
    git: null,
  },
  {
    id: 'lorebook-viewer',
    name: 'Lorebook Viewer',
    sub: '로어북 뷰어',
    type: 'web',
    emoji: '📚',
    color: 'lime',
    desc: '실리태번 로어북(worlds 폴더의 JSON)을 보기 좋게 펼쳐놓고 그 자리에서 편집합니다. 상시·선택·벡터 상태와 위치, depth, order, 확률까지 그대로 다룰 수 있어요.',
    features: ['항목 편집', '상태별 필터', '키워드 관리', '위치 · Depth · Order', '새 로어북으로 저장'],
    site: 'https://keepsanity.github.io/lorebook-viewer/',
    repo: 'https://github.com/keepsanity/lorebook-viewer',
    git: null,
  },
  {
    id: 'simulation-viewer',
    name: '시뮬레이션 뷰어',
    sub: 'Simulation Viewer',
    type: 'web',
    emoji: '🧪',
    color: 'cyan',
    desc: 'Simulation Manager 확장에서 내보낸 백업 JSON을 열어 채팅방별 시뮬레이션을 깔끔하게 읽어보는 뷰어입니다.',
    features: ['백업 JSON 열기', '채팅방별 정리', '검색', '다크 모드'],
    site: 'https://keepsanity.github.io/simulation-viewer/',
    repo: 'https://github.com/keepsanity/simulation-viewer',
    git: null,
    related: { label: 'Simulation Manager 확장용', href: '#simulationmanager' },
  },
  {
    id: 'toolbox',
    name: '도구모음',
    sub: 'Toolbox',
    type: 'web',
    emoji: '🧰',
    color: 'orange',
    desc: '자잘하지만 자주 쓰는 작업용 유틸리티 모음. 여러 단어를 한 번에 바꾸는 치환기와 자주 쓰는 텍스트 클립보드가 들어 있고, 계속 추가할 예정입니다.',
    features: ['단어 치환기', '클립보드', '계속 추가 중'],
    site: 'https://keepsanity.github.io/toolbox/',
    repo: 'https://github.com/keepsanity/toolbox',
    git: null,
  },
  {
    id: 'custompreset',
    name: 'Custom Preset Manager',
    sub: '커스텀 프리셋 매니저',
    type: 'ext',
    emoji: '🎛️',
    color: 'pink',
    desc: '프리셋 안의 프롬프트를 목록으로 펼쳐보고, 자주 쓰는 프롬프트에 토글 버튼을 달아 입력창 위에서 바로 켜고 끕니다. 여러 프롬프트를 묶는 토글 그룹, 채팅방별 프리셋 자동 적용, 채팅 내용에서 프롬프트로 캡처하기까지 지원합니다.',
    features: ['프롬프트 목록 · 검색', '퀵 토글 버튼', '토글 그룹', '토글 프리셋', '채팅방별 프리셋 연결', '채팅에서 캡처'],
    site: null,
    repo: 'https://github.com/keepsanity/SillyTavern-CustomPreset',
    git: 'https://github.com/keepsanity/SillyTavern-CustomPreset',
  },
  {
    id: 'simulationmanager',
    name: 'Simulation Manager',
    sub: '시뮬레이션 매니저',
    type: 'ext',
    emoji: '🎬',
    color: 'purple',
    desc: '메인 롤플레이에 영향을 주지 않고 시뮬레이션(OOC 요청)을 관리하는 확장. 채팅방별로 시뮬 목록을 관리하고, 답변을 여러 개 뽑아 화살표로 넘겨보며 고를 수 있습니다. 전부 로컬에 저장됩니다.',
    features: ['채팅방별 시뮬 목록', '시뮬 프롬프트 저장 · 재사용', '답변 여러 개 생성', '전체 시뮬 모아보기', '백업 내보내기'],
    site: null,
    repo: 'https://github.com/keepsanity/SillyTavern-SimulationManager',
    git: 'https://github.com/keepsanity/SillyTavern-SimulationManager',
    related: { label: '시뮬레이션 뷰어로 백업 열기', href: '#simulation-viewer' },
  },
  {
    id: 'tmigenerator',
    name: 'TMI Generator',
    sub: 'TMI 생성기',
    type: 'ext',
    emoji: '💡',
    color: 'blue',
    desc: '답장을 받을 때마다 캐릭터의 습관이나 숨은 생각, 세계관 뒷설정 같은 TMI를 자동으로 만들어 메시지 아래에 붙여줍니다. 프롬프트·HTML·CSS를 직접 고쳐서 원하는 모양으로 바꿀 수 있어요.',
    features: ['답장마다 자동 생성', '접었다 펼치는 박스', '프롬프트 직접 수정', 'HTML · CSS 커스터마이즈'],
    site: null,
    repo: 'https://github.com/keepsanity/SillyTavern-TMIGenerator',
    git: 'https://github.com/keepsanity/SillyTavern-TMIGenerator',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    sub: '아틀리에 · 이미지 스튜디오',
    type: 'ext',
    emoji: '🖼️',
    color: 'orange',
    desc: 'ComfyUI를 붙여 채팅 안에서 바로 그림을 뽑는 이미지 스튜디오. 최근 대화를 읽어 그 장면을 그리는 Scene, 캐릭터나 페르소나를 원하는 상황에 넣는 Character, 한 줄 아이디어를 부풀리는 Freeform — 프롬프트는 전부 알아서 써줍니다. 프롬프트를 쓰는 모델은 연결 프로필로 채팅 모델과 따로 지정할 수 있어요.',
    features: ['Scene · Character · Freeform', '프롬프트 자동 작성', '연결 프로필 분리', 'Identity · img2img 레퍼런스', '모델 · LoRA · 스타일 설정', 'ComfyUI 필요'],
    site: null,
    repo: 'https://github.com/keepsanity/SillyTavern-Atelier',
    git: 'https://github.com/keepsanity/SillyTavern-Atelier',
  },
  {
    id: 'sillytheme',
    name: 'SillyTheme',
    sub: '실리태번 채팅 테마',
    type: 'theme',
    emoji: '🎨',
    color: 'red',
    desc: 'c.ai 스타일, iMessage 스타일, 그리고 모노 계열(화이트 · 블랙 · 파스텔)까지. 마음에 드는 JSON을 받아 실리태번에서 불러오기만 하면 됩니다.',
    features: ['Cai Dark', 'iMessage', 'Mono White / Dark', 'Mint · Chocolate · Pistachio · StrawberryMilk'],
    site: null,
    repo: 'https://github.com/keepsanity/SillyTheme',
    git: null,
    related: { label: '테마 목록 보기', href: '#themes' },
  },
];

/* ============================================================
   테마 목록 (SillyTheme 저장소의 파일들)
   file   : 저장소 안의 경로
   swatch : [배경, 내 말풍선, 상대 말풍선/강조] — 테마 JSON의 실제 색값
   ============================================================ */

const THEMES = [
  {
    name: 'Chat Cai Dark',
    tag: 'c.ai 스타일',
    file: 'Chat Cai Dark.json',
    swatch: ['#1a1a1d', '#383a3d', '#e8e6e3'],
    dark: true,
  },
  {
    name: 'Chat iMessage',
    tag: 'iMessage 스타일',
    file: 'Chat iMessage.json',
    swatch: ['#ffffff', '#0b84fe', '#e9e9eb'],
    dark: false,
  },
  {
    name: 'Chat white',
    tag: 'Mono V2',
    file: 'Chat Mono V2/Chat white.json',
    swatch: ['#ffffff', '#f7f7f7', '#0f0f0f'],
    dark: false,
  },
  {
    name: 'Chat dark',
    tag: 'Mono V2',
    file: 'Chat Mono V2/Chat dark.json',
    swatch: ['#000000', '#272727', '#ffffff'],
    dark: true,
  },
  {
    name: 'Chat Mono',
    tag: 'Mono V1',
    file: 'Chat Mono V1/Chat Mono.json',
    swatch: ['#ffffff', '#f7f7f7', '#0f0f0f'],
    dark: false,
  },
  {
    name: 'Chat Mint',
    tag: 'Mono V1',
    file: 'Chat Mono V1/Chat Mint.json',
    swatch: ['#f2fffa', '#e5fbf4', '#32a082'],
    dark: false,
  },
  {
    name: 'Chat Chocolate',
    tag: 'Mono V1',
    file: 'Chat Mono V1/Chat Chocolate.json',
    swatch: ['#fcf5ee', '#f9ecdf', '#a55f32'],
    dark: false,
  },
  {
    name: 'Chat Pistachio',
    tag: 'Mono V1',
    file: 'Chat Mono V1/Chat Pistachio.json',
    swatch: ['#f8fcf0', '#f0f9e8', '#789b3c'],
    dark: false,
  },
  {
    name: 'Chat StrawberryMilk',
    tag: 'Mono V1',
    file: 'Chat Mono V1/Chat StrawberryMilk.json',
    swatch: ['#fff5f8', '#fff0f4', '#cd5573'],
    dark: false,
  },
];

const THEME_REPO = 'https://github.com/keepsanity/SillyTheme';
const THEME_RAW = 'https://raw.githubusercontent.com/keepsanity/SillyTheme/main/';
