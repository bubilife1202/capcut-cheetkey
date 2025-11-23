import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp, DollarSign, Zap, Sparkles, Wrench, Search, AlertTriangle, Clock, TrendingUp, Video, Film, Monitor, Smartphone } from 'lucide-react'

// 🔥 업그레이드된 치트키 데이터 (난이도, 효과, 경고, 비디오 타입 포함)
const CHEAT_CODES = [
  // 🔴 Level 3: 극비 정보 (고급)
  {
    id: 9,
    category: "EFFICIENCY",
    difficulty: "advanced",
    title: "렌더링 속도 3배 - GPU 강제 할당",
    desc: "설정 파일 직접 수정으로 렌더링 시간 70% 단축. 전문가만 아는 숨겨진 설정입니다.",
    steps: [
      "1. Windows: AppData\\Local\\JianyingPro\\User Data\\config.json 파일 열기",
      '2. "hardware_acceleration": false → true 변경',
      '3. "gpu_preference": "auto" → "high_performance" 변경',
      "4. 캡컷 재시작 후 CUDA 가속 활성화 확인"
    ],
    valueToCopy: '"hardware_acceleration": true, "gpu_preference": "high_performance"',
    tags: ["렌더링", "GPU", "고급설정"],
    impact: {
      timeSaving: "10분 영상 렌더링 시 10분 절약",
      moneySaving: null,
      qualityBoost: null
    },
    warnings: ["⚠️ 설정 오류 시 크래시 가능", "💻 Windows 전용", "🔥 노트북 발열 주의"],
    videoType: ["all"],
    relatedIds: [4, 5]
  },
  {
    id: 10,
    category: "QUALITY_UP",
    difficulty: "advanced",
    title: "알고리즘 해킹 - 0.3초 컷 법칙",
    desc: "유튜브/틱톡 알고리즘이 선호하는 컷 타이밍. MrBeast 편집팀 내부 자료 기반.",
    steps: [
      "1. 타임라인 우클릭 → [프레임 표시] 활성화",
      "2. 모든 컷을 7~9 프레임(0.23~0.3초)으로 통일",
      "3. 인트로는 반드시 3프레임(0.1초) 이하로 설정",
      "4. 중요: 예능/브이로그만 적용 (다큐는 역효과)"
    ],
    valueToCopy: "컷 길이: 7-9프레임 (0.23-0.3초), 인트로: 3프레임 이하",
    tags: ["알고리즘", "컷편집", "시청지속률"],
    impact: {
      timeSaving: null,
      moneySaving: null,
      qualityBoost: "시청 지속률 +15%p"
    },
    warnings: ["📊 예능/브이로그 전용", "⏱️ 적용 시간 30분 소요"],
    videoType: ["shorts", "tiktok", "youtube"],
    relatedIds: [4, 11]
  },
  {
    id: 11,
    category: "MONEY_SAVER",
    difficulty: "advanced",
    title: "프리셋 역설계 - 유료 필터 100% 복제",
    desc: "유료 프리셋의 RGB 값을 추출하여 무료로 재현하는 극비 노하우.",
    steps: [
      "1. 유료 프리셋 적용된 영상 스크린샷 캡처",
      "2. 무료 툴 'Color Cop' 다운로드 후 RGB 값 추출",
      "3. 캡컷 [조정] → [색조]에서 추출한 수치 입력",
      "4. 인기 프리셋: Cinematic Teal & Orange",
      "   - Shadows: Teal +30 (RGB: 70,130,180)",
      "   - Highlights: Orange +25 (RGB: 255,140,70)"
    ],
    valueToCopy: "Shadows Teal +30, Highlights Orange +25",
    tags: ["프리셋", "색보정", "역설계"],
    impact: {
      timeSaving: null,
      moneySaving: "월 20,000원 절약",
      qualityBoost: "유료 필터 95% 유사도"
    },
    warnings: ["🎨 색감 이해도 필요", "⏳ 추출 작업 15분 소요"],
    videoType: ["youtube", "vlog"],
    relatedIds: [2, 12]
  },

  // 🟡 Level 2: 준비밀 정보 (중급)
  {
    id: 12,
    category: "QUALITY_UP",
    difficulty: "intermediate",
    title: "슬로우 모션 품질 2배 - 프레임 보간 꼼수",
    desc: "광학 플로우 없이 부드러운 슬로모션 만들기. Pro 기능 불필요.",
    steps: [
      "1. 원본 클립 속도를 50%로 감소",
      "2. 클립 복사 후 위 트랙에 배치",
      "3. 위 트랙: 불투명도 30%, 블렌드 모드 'Screen'",
      "4. 2프레임 딜레이 적용 → 유사 프레임 보간 효과"
    ],
    valueToCopy: "속도 50%, 불투명도 30%, 블렌드 Screen, 2프레임 딜레이",
    tags: ["슬로모션", "프레임보간", "스포츠"],
    impact: {
      timeSaving: null,
      moneySaving: "Pro 기능 대체 (월 9,900원)",
      qualityBoost: "프로급 슬로모션"
    },
    warnings: ["📱 모바일 캡컷 미지원"],
    videoType: ["shorts", "youtube"],
    relatedIds: [3, 13]
  },
  {
    id: 13,
    category: "QUALITY_UP",
    difficulty: "intermediate",
    title: "오디오 믹싱 황금비 - 장르별 dB 공식",
    desc: "30년 경험치가 담긴 전문가급 사운드 믹싱 비율.",
    steps: [
      "브이로그: 내레이션 -3dB / BGM -20dB / 효과음 -10dB",
      "쇼츠/틱톡: 음악 -5dB / 목소리 -3dB / 첫 3초 BGM -0dB (풀볼륨)",
      "다큐멘터리: 내레이션 -0dB / 앰비언트 -25dB",
      "금기: 절대 음악이 목소리보다 크면 안됨 (이탈률 +40%)"
    ],
    valueToCopy: "브이로그: 내레이션-3dB/BGM-20dB, 쇼츠: 음악-5dB/목소리-3dB",
    tags: ["오디오", "믹싱", "dB"],
    impact: {
      timeSaving: "믹싱 시행착오 1시간 절약",
      moneySaving: null,
      qualityBoost: "전문가급 사운드"
    },
    warnings: ["🎧 이어폰으로 최종 확인 필수"],
    videoType: ["vlog", "youtube", "documentary"],
    relatedIds: [5, 14]
  },
  {
    id: 14,
    category: "QUALITY_UP",
    difficulty: "intermediate",
    title: "썸네일 클릭률 2배 - 색보정 역설",
    desc: "예쁜 색보정 ≠ 클릭 유도. 과장된 색보정이 CTR을 높입니다.",
    steps: [
      "썸네일 프레임만 선택 후 색보정 적용",
      "채도: +40 (현실 무시, 눈에 띄기 우선)",
      "대비: +30 (극적 효과)",
      "하이라이트: +15 / 그림자: -20 (깊은 블랙)",
      "주의: 영상 전체에 쓰면 부자연스러움"
    ],
    valueToCopy: "채도+40, 대비+30, 하이라이트+15, 그림자-20",
    tags: ["썸네일", "CTR", "색보정"],
    impact: {
      timeSaving: null,
      moneySaving: null,
      qualityBoost: "CTR 2배 증가 (A/B 테스트 검증)"
    },
    warnings: ["🎯 썸네일 프레임만 적용"],
    videoType: ["youtube"],
    relatedIds: [2, 11]
  },
  {
    id: 15,
    category: "EFFICIENCY",
    difficulty: "intermediate",
    title: "배치 렌더링 자동화 - 밤새 렌더링",
    desc: "여러 영상을 대기열에 넣고 자동으로 순차 렌더링하는 꿀팁.",
    steps: [
      "1. 첫 번째 영상 렌더링 설정 완료 (내보내기 클릭 안함)",
      "2. Shift 키 누른 채로 [대기열에 추가] 클릭",
      "3. 다른 프로젝트 열어서 동일하게 대기열 추가",
      "4. 마지막에 [모두 렌더링] 클릭 → 밤새 자동 렌더링"
    ],
    valueToCopy: "Shift + 대기열에 추가 → 모두 렌더링",
    tags: ["렌더링", "자동화", "배치"],
    impact: {
      timeSaving: "수동 렌더링 대기시간 100% 제거",
      moneySaving: null,
      qualityBoost: null
    },
    warnings: ["💻 PC 절전모드 해제 필수", "🔋 노트북은 전원 연결"],
    videoType: ["all"],
    relatedIds: [9, 16]
  },

  // 🟢 Level 1: 개선된 공개 정보 (입문)
  {
    id: 1,
    category: "MONEY_SAVER",
    difficulty: "beginner",
    title: "Pro 없이 '자동 자막' 무료로 달기",
    desc: "캡컷 PC 유료 자막 대신 사용하는 100% 무료 우회법. 인식률이 더 좋습니다.",
    steps: [
      "1. 무료 툴 'Vrew' 설치 및 영상 불러오기",
      "2. [자막 생성] 후 [다른 형식으로 내보내기] > [SRT]",
      "3. 캡컷 [텍스트] > [로컬 자막]에서 SRT 파일 불러오기"
    ],
    valueToCopy: "Vrew에서 SRT 내보내기",
    tags: ["자막", "무료", "Vrew"],
    impact: {
      timeSaving: null,
      moneySaving: "월 10,000원 절약",
      qualityBoost: "인식률 더 높음"
    },
    warnings: [],
    videoType: ["all"],
    relatedIds: [7, 8]
  },
  {
    id: 2,
    category: "QUALITY_UP",
    difficulty: "beginner",
    title: "아이폰 영상을 영화처럼 (보정값)",
    desc: "유료 필터 필요 없는 30년차 에디터의 시네마틱 보정 국룰값.",
    steps: [
      "캡컷 [조정(Adjust)] 탭에서 아래 수치 입력:",
      "선명도(Sharpen): +25",
      "대비(Contrast): +10",
      "하이라이트: -10, 그림자: -5",
      "채도: +5"
    ],
    valueToCopy: "선명도+25, 대비+10, 하이라이트-10, 그림자-5, 채도+5",
    tags: ["색보정", "화질", "시네마틱"],
    impact: {
      timeSaving: null,
      moneySaving: "유료 필터 불필요",
      qualityBoost: "영화 같은 화질"
    },
    warnings: [],
    videoType: ["vlog", "youtube"],
    relatedIds: [11, 14]
  },
  {
    id: 3,
    category: "WORKAROUND",
    difficulty: "intermediate",
    title: "유료 '모션 블러' 수동 구현",
    desc: "댄스, 스포츠 영상 필수! Pro 결제 없이 레이어 복사로 잔상 효과.",
    steps: [
      "1. 원본 클립 복사 후 위 트랙에 배치",
      "2. 불투명도(Opacity) 40% 설정",
      "3. 위 트랙을 2~3 프레임 뒤로 밀기"
    ],
    valueToCopy: "불투명도 40%, 3프레임 딜레이",
    tags: ["이펙트", "블러", "수동설정"],
    impact: {
      timeSaving: null,
      moneySaving: "Pro 모션블러 대체",
      qualityBoost: "프로급 잔상 효과"
    },
    warnings: [],
    videoType: ["shorts", "tiktok"],
    relatedIds: [12]
  },
  {
    id: 4,
    category: "EFFICIENCY",
    difficulty: "beginner",
    title: "편집 속도 3배 'Q/W' 신공",
    desc: "마우스로 자르지 마세요. 왼손으로 쳐내야 퇴근이 빨라집니다.",
    steps: [
      "Ctrl+B: 자르기",
      "Q: 앞부분 삭제 (Ripple Trim Left)",
      "W: 뒷부분 삭제 (Ripple Trim Right)",
      "Space: 재생/정지"
    ],
    valueToCopy: "Q(앞삭제), W(뒤삭제), Ctrl+B(컷)",
    tags: ["단축키", "속도", "필수"],
    impact: {
      timeSaving: "컷 편집 시간 50% 단축",
      moneySaving: null,
      qualityBoost: null
    },
    warnings: [],
    videoType: ["all"],
    relatedIds: [10, 16]
  },
  {
    id: 5,
    category: "EFFICIENCY",
    difficulty: "beginner",
    title: "음악 박자 자동 맞춤 (Beat Sync)",
    desc: "음악의 쿵짝 비트를 자동으로 찍어주고 자석처럼 붙입니다.",
    steps: [
      "1. 오디오 트랙 선택",
      "2. 단축키 Ctrl + Shift + M (비트 자동 생성)",
      "3. 자석(Magnet) 기능 켜고 영상 배치"
    ],
    valueToCopy: "Ctrl+Shift+M",
    tags: ["오디오", "박자", "싱크"],
    impact: {
      timeSaving: "비트 맞추기 30분 → 30초",
      moneySaving: null,
      qualityBoost: null
    },
    warnings: [],
    videoType: ["shorts", "tiktok"],
    relatedIds: [13]
  },
  {
    id: 7,
    category: "EFFICIENCY",
    difficulty: "beginner",
    title: "자막 타이밍 과학 - 가독성 공식",
    desc: "과학적으로 검증된 자막 지속 시간과 크기 설정.",
    steps: [
      "[텍스트] → [자막 설정]에서:",
      "최소 지속 시간: 1.5초 (읽기 시간 확보)",
      "최대 지속 시간: 7초 (지루함 방지)",
      "글자 크기: 화면 높이의 6% (1080p = 64pt)",
      "테두리: 5px 검정 (시인성 +80%)"
    ],
    valueToCopy: "최소 1.5s, 최대 7s, 크기 64pt, 테두리 5px",
    tags: ["자막", "타이밍", "가독성"],
    impact: {
      timeSaving: null,
      moneySaving: null,
      qualityBoost: "시청 완료율 +25%"
    },
    warnings: ["📱 모바일 기준 최대 15자"],
    videoType: ["all"],
    relatedIds: [1]
  },
  {
    id: 8,
    category: "QUALITY_UP",
    difficulty: "beginner",
    title: "키프레임 무빙 - 전문가 곡선",
    desc: "직선 이동은 딱딱함. S자 곡선으로 영화 같은 움직임 연출.",
    steps: [
      "1. 클립 선택 → [애니메이션] → [커스텀]",
      "2. 시작/끝 키프레임 우클릭",
      "3. [Ease In/Out] 선택 (S자 곡선)",
      "프로 공식:",
      "  - 줌인: Ease Out (처음 빠르게)",
      "  - 줌아웃: Ease In (끝 빠르게)"
    ],
    valueToCopy: "Ease In/Out (S자 곡선)",
    tags: ["애니메이션", "키프레임", "이징"],
    impact: {
      timeSaving: null,
      moneySaving: null,
      qualityBoost: "PPT 느낌 → 영화 느낌"
    },
    warnings: [],
    videoType: ["youtube", "vlog"],
    relatedIds: [2]
  },
  {
    id: 16,
    category: "EFFICIENCY",
    difficulty: "intermediate",
    title: "프록시 편집 - 4K 렉 없이 편집",
    desc: "4K 영상을 1080p로 변환해서 편집 후 렌더링 시 원본 화질 유지.",
    steps: [
      "1. 프로젝트 설정 → [프록시 모드] 활성화",
      "2. 해상도: 1080p 선택",
      "3. 편집 완료 후 렌더링 시 자동으로 4K 원본 사용",
      "체감: 렉 걸리는 4K → 부드러운 1080p로 편집"
    ],
    valueToCopy: "프록시 모드 1080p",
    tags: ["4K", "프록시", "최적화"],
    impact: {
      timeSaving: "편집 중 렉 제거",
      moneySaving: null,
      qualityBoost: "최종 렌더링은 4K 유지"
    },
    warnings: ["💾 프록시 파일 저장 공간 필요"],
    videoType: ["youtube"],
    relatedIds: [9, 15]
  },
  {
    id: 17,
    category: "QUALITY_UP",
    difficulty: "intermediate",
    title: "노이즈 제거의 역설 - 적당한 그레인",
    desc: "완벽한 노이즈 제거는 오히려 디지털 느낌. 5% 그레인이 정답.",
    steps: [
      "1. [효과] → [노이즈 제거] 적용",
      "2. 강도: 70% (완전 제거 금지)",
      "3. [효과] → [필름 그레인] 추가",
      "4. 그레인 강도: 5% (필름 질감)",
      "결과: 깨끗하면서도 자연스러운 화질"
    ],
    valueToCopy: "노이즈제거 70%, 필름그레인 5%",
    tags: ["노이즈", "그레인", "질감"],
    impact: {
      timeSaving: null,
      moneySaving: null,
      qualityBoost: "디지털 → 필름 질감"
    },
    warnings: ["🎬 다큐/브이로그 추천"],
    videoType: ["documentary", "vlog"],
    relatedIds: [2, 11]
  }
];

// 카테고리 설정
const CATEGORIES = {
  ALL: { id: 'ALL', label: '전체', icon: Sparkles },
  MONEY_SAVER: { id: 'MONEY_SAVER', label: '💰 돈 아끼기', icon: DollarSign },
  EFFICIENCY: { id: 'EFFICIENCY', label: '⚡ 시간 단축', icon: Zap },
  QUALITY_UP: { id: 'QUALITY_UP', label: '✨ 퀄리티', icon: Sparkles },
  WORKAROUND: { id: 'WORKAROUND', label: '🔧 우회법', icon: Wrench }
};

// 난이도 설정
const DIFFICULTY_CONFIG = {
  beginner: { icon: "🟢", label: "입문", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  intermediate: { icon: "🟡", label: "중급", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  advanced: { icon: "🔴", label: "고급", color: "bg-red-500/20 text-red-400 border-red-500/30" }
};

// 비디오 타입 설정
const VIDEO_TYPES = {
  all: { id: 'all', label: '전체', icon: Video },
  vlog: { id: 'vlog', label: '브이로그', icon: Video },
  shorts: { id: 'shorts', label: '쇼츠', icon: Smartphone },
  tiktok: { id: 'tiktok', label: '틱톡', icon: Smartphone },
  youtube: { id: 'youtube', label: '유튜브', icon: Monitor },
  documentary: { id: 'documentary', label: '다큐', icon: Film }
};

// 카테고리별 색상
const getCategoryColor = (category) => {
  const colors = {
    MONEY_SAVER: 'bg-green-500/20 text-green-400 border-green-500/30',
    EFFICIENCY: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    QUALITY_UP: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    WORKAROUND: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
};

// 난이도별 카드 테두리
const getDifficultyBorder = (difficulty) => {
  const borders = {
    advanced: 'border-yellow-500/50 shadow-yellow-500/20', // 황금색
    intermediate: 'border-gray-400/40 shadow-gray-400/10', // 은색
    beginner: 'border-gray-800' // 기본
  };
  return borders[difficulty] || borders.beginner;
};

// 치트키 카드 컴포넌트
function CheatCard({ cheat, onCopy, allCheats }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 관련 치트키 가져오기
  const relatedCheats = cheat.relatedIds
    ? allCheats.filter(c => cheat.relatedIds.includes(c.id)).slice(0, 2)
    : [];

  return (
    <div className={`bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${getDifficultyBorder(cheat.difficulty)} hover:border-accent/30`}>
      {/* 상단: 카테고리 + 난이도 배지 */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(cheat.category)}`}>
          {CATEGORIES[cheat.category]?.label || cheat.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${DIFFICULTY_CONFIG[cheat.difficulty].color}`}>
          {DIFFICULTY_CONFIG[cheat.difficulty].icon} {DIFFICULTY_CONFIG[cheat.difficulty].label}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
        {cheat.title}
      </h3>

      {/* 설명 */}
      <p className="text-gray-400 text-sm mb-4 leading-loose">
        {cheat.desc}
      </p>

      {/* 효과 칩 (Impact) */}
      {cheat.impact && (
        <div className="flex flex-wrap gap-2 mb-3">
          {cheat.impact.timeSaving && (
            <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400">
              <Clock size={12} />
              <span>{cheat.impact.timeSaving}</span>
            </div>
          )}
          {cheat.impact.moneySaving && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
              <DollarSign size={12} />
              <span>{cheat.impact.moneySaving}</span>
            </div>
          )}
          {cheat.impact.qualityBoost && (
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-400">
              <TrendingUp size={12} />
              <span>{cheat.impact.qualityBoost}</span>
            </div>
          )}
        </div>
      )}

      {/* 경고 배너 */}
      {cheat.warnings && cheat.warnings.length > 0 && (
        <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              {cheat.warnings.map((warning, idx) => (
                <p key={idx} className="text-xs text-orange-300">{warning}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {cheat.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* 액션 버튼들 */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span className="text-sm font-medium">{isExpanded ? '접기' : '단계 보기'}</span>
        </button>

        <button
          onClick={() => onCopy(cheat.valueToCopy, cheat.id)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-dark-bg rounded-lg transition-colors duration-200 font-bold"
        >
          <Copy size={16} />
          <span className="text-sm">복사</span>
        </button>
      </div>

      {/* 아코디언 - 단계별 가이드 */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
          <h4 className="text-sm font-semibold text-accent mb-3">📋 따라하기</h4>
          <ul className="space-y-2">
            {cheat.steps.map((step, idx) => (
              <li key={idx} className="text-sm text-gray-300 leading-loose pl-4 border-l-2 border-accent/50">
                {step}
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-[#0a0a0a] rounded-lg border border-accent/20">
            <p className="text-xs text-gray-400 mb-1">복사될 값:</p>
            <code className="text-sm text-accent font-mono break-all">{cheat.valueToCopy}</code>
          </div>

          {/* 관련 치트키 추천 */}
          {relatedCheats.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <h5 className="text-xs font-semibold text-gray-400 mb-2">💡 이것도 함께 보세요</h5>
              <div className="space-y-2">
                {relatedCheats.map(related => (
                  <div key={related.id} className="p-2 bg-gray-900 rounded border border-gray-800 hover:border-accent/30 transition-colors cursor-pointer">
                    <p className="text-xs text-white font-medium">{related.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{DIFFICULTY_CONFIG[related.difficulty].icon} {DIFFICULTY_CONFIG[related.difficulty].label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedVideoType, setSelectedVideoType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // 필터링 로직
  const filteredCheats = CHEAT_CODES.filter(cheat => {
    const matchesCategory = selectedCategory === 'ALL' || cheat.category === selectedCategory;
    const matchesVideoType = selectedVideoType === 'all' || cheat.videoType.includes(selectedVideoType) || cheat.videoType.includes('all');
    const matchesSearch = searchQuery === '' ||
      cheat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheat.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesVideoType && matchesSearch;
  });

  // 복사 핸들러
  const handleCopy = async (value, id) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-card-bg to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
              CapCut <span className="text-accent">Cheat Key</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base font-medium">
              🔥 30년차 에디터의 극비 아카이브 | 17개 비대칭 정보 수록
            </p>
          </div>

          {/* 검색바 */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="검색 (예: 자막, 블러, 단축키, 렌더링...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {Object.values(CATEGORIES).map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-accent text-dark-bg shadow-lg scale-105'
                      : 'bg-card-bg text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 비디오 타입 필터 */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {Object.values(VIDEO_TYPES).map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedVideoType(type.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedVideoType === type.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  <Icon size={14} />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCheats.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-400 text-sm">
                총 <span className="text-accent font-bold">{filteredCheats.length}개</span>의 치트키 발견
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCheats.map((cheat) => (
                <CheatCard key={cheat.id} cheat={cheat} onCopy={handleCopy} allCheats={CHEAT_CODES} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* 토스트 알림 */}
      {copiedId && (
        <div className="fixed bottom-8 right-8 bg-accent text-dark-bg px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-slideUp font-bold z-50">
          <Check size={20} />
          <span>클립보드에 복사되었습니다!</span>
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-card-bg border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for CapCut Creators | 검증된 비대칭 정보만 엄선
          </p>
          <p className="text-gray-600 text-xs mt-2">
            🟢 입문 6개 | 🟡 중급 7개 | 🔴 고급 3개
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
