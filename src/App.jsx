import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp, DollarSign, Zap, Sparkles, Wrench, Search } from 'lucide-react'

// 실제 검증된 데이터 (기획서 제공)
const CHEAT_CODES = [
  {
    id: 1,
    category: "MONEY_SAVER",
    title: "Pro 없이 '자동 자막' 무료로 달기",
    desc: "캡컷 PC 유료 자막 대신 사용하는 100% 무료 우회법입니다. 인식률이 더 좋습니다.",
    steps: [
      "1. 무료 툴 'Vrew' 설치 및 영상 불러오기",
      "2. [자막 생성] 후 [다른 형식으로 내보내기] > [SRT]",
      "3. 캡컷 [텍스트] > [로컬 자막]에서 SRT 파일 불러오기"
    ],
    valueToCopy: "Vrew에서 SRT 내보내기",
    tags: ["자막", "무료", "Vrew"]
  },
  {
    id: 2,
    category: "QUALITY_UP",
    title: "아이폰 영상을 영화처럼 (보정값)",
    desc: "유료 필터 필요 없는 30년차 에디터의 시네마틱 보정 국룰값입니다. 조정(Adjust) 탭에 입력하세요.",
    steps: [
      "선명도(Sharpen): +25",
      "대비(Contrast): +10",
      "하이라이트: -10, 그림자: -5",
      "채도: +5"
    ],
    valueToCopy: "선명도+25, 대비+10, 하이라이트-10, 그림자-5, 채도+5",
    tags: ["색보정", "화질", "시네마틱"]
  },
  {
    id: 3,
    category: "WORKAROUND",
    title: "유료 '모션 블러' 수동 구현",
    desc: "댄스, 스포츠 영상 필수! Pro 결제 없이 레이어 복사로 잔상 효과를 만듭니다.",
    steps: [
      "1. 원본 클립 복사 후 위 트랙에 배치",
      "2. 불투명도(Opacity) 40% 설정",
      "3. 위 트랙을 2~3 프레임 뒤로 밀기"
    ],
    valueToCopy: "불투명도 40%, 3프레임 딜레이",
    tags: ["이펙트", "블러", "수동설정"]
  },
  {
    id: 4,
    category: "EFFICIENCY",
    title: "편집 속도 3배 'Q/W' 신공",
    desc: "마우스로 자르지 마세요. 왼손으로 쳐내야 퇴근이 빨라집니다.",
    steps: [
      "Ctrl+B: 자르기",
      "Q: 앞부분 삭제 (Ripple Trim Left)",
      "W: 뒷부분 삭제 (Ripple Trim Right)"
    ],
    valueToCopy: "Q(앞삭제), W(뒤삭제), Ctrl+B(컷)",
    tags: ["단축키", "속도", "필수"]
  },
  {
    id: 5,
    category: "EFFICIENCY",
    title: "음악 박자 자동 맞춤 (Beat Sync)",
    desc: "음악의 쿵짝 비트를 자동으로 찍어주고 자석처럼 붙입니다.",
    steps: [
      "1. 오디오 트랙 선택",
      "2. 단축키 Ctrl + Shift + M (비트 자동 생성)",
      "3. 자석(Magnet) 기능 켜고 영상 배치"
    ],
    valueToCopy: "Ctrl+Shift+M",
    tags: ["오디오", "박자", "싱크"]
  }
];

// 카테고리 설정
const CATEGORIES = {
  ALL: { id: 'ALL', label: '전체', icon: Sparkles },
  MONEY_SAVER: { id: 'MONEY_SAVER', label: '돈 아끼기', icon: DollarSign },
  EFFICIENCY: { id: 'EFFICIENCY', label: '시간 단축', icon: Zap },
  QUALITY_UP: { id: 'QUALITY_UP', label: '퀄리티', icon: Sparkles },
  WORKAROUND: { id: 'WORKAROUND', label: '우회법', icon: Wrench }
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

// 치트키 카드 컴포넌트
function CheatCard({ cheat, onCopy }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-accent/30">
      {/* 카테고리 배지 */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(cheat.category)}`}>
          {CATEGORIES[cheat.category]?.label || cheat.category}
        </span>
      </div>

      {/* 제목 */}
      <h3 className="text-xl font-bold text-white mb-2">
        {cheat.title}
      </h3>

      {/* 설명 */}
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {cheat.desc}
      </p>

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
        {/* 단계 보기 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span className="text-sm font-medium">{isExpanded ? '접기' : '단계 보기'}</span>
        </button>

        {/* 복사 버튼 */}
        <button
          onClick={() => onCopy(cheat.valueToCopy, cheat.id)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-dark-bg rounded-lg transition-colors duration-200 font-semibold"
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
              <li key={idx} className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-accent/50">
                {step}
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-accent/20">
            <p className="text-xs text-gray-400 mb-1">복사될 값:</p>
            <code className="text-sm text-accent font-mono">{cheat.valueToCopy}</code>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // 필터링 로직
  const filteredCheats = CHEAT_CODES.filter(cheat => {
    const matchesCategory = selectedCategory === 'ALL' || cheat.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      cheat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheat.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cheat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
              CapCut <span className="text-accent">Cheat Key</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              30년차 에디터의 시크릿 아카이브
            </p>
          </div>

          {/* 검색바 */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="검색 (예: 자막, 블러, 단축키...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card-bg border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* 필터 버튼 */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {Object.values(CATEGORIES).map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-accent text-dark-bg shadow-lg scale-105'
                      : 'bg-card-bg text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{cat.label}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCheats.map((cheat) => (
              <CheatCard key={cheat.id} cheat={cheat} onCopy={handleCopy} />
            ))}
          </div>
        )}
      </main>

      {/* 토스트 알림 */}
      {copiedId && (
        <div className="fixed bottom-8 right-8 bg-accent text-dark-bg px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-slideUp font-semibold">
          <Check size={20} />
          <span>클립보드에 복사되었습니다!</span>
        </div>
      )}

      {/* 푸터 */}
      <footer className="bg-card-bg border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 text-sm">
            Made with ❤️ for CapCut Creators | 검증된 실전 노하우만 담았습니다
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
