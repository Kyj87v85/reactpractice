import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import "./App.css";

const steps = [
  "염기서열 분석 중",
  "rDNA 돌연변이 감지",
  "고대 직업군 매칭 중",
  "GPT-사후환생 모델 동기화",
  "윤회 알고리즘 시뮬레이션 완료",
];

const jobs = [
  {
    name: "기원전 2200년경 수메르 점토판 교정자",
    title: "쐐기문자 점토판의 오류 수정 및 보존 담당자",
    era: "기원전 2200년경, 수메르",
    description: "초기 문명 수메르에서 행정과 기록을 위해 제작된 점토판에 새긴 쐐기문자 중 훼손되거나 오류가 있는 부분을 수정하여 기록의 정확성을 유지했다.",
    avatarUrl: "https://picsum.photos/200?random=101",
  },
  {
    name: "서기 1350년경 잉글랜드 마을 전령 배달부",
    title: "왕실과 지방 간 문서 전달 담당자",
    era: "1350년경, 잉글랜드",
    description: "중세 영국에서 공식 문서와 왕명서를 마을과 지방에 전달하는 역할을 수행했으며, 당시 열악한 교통환경으로 인해 종종 길을 잃거나 지연되기도 했다.",
    avatarUrl: "https://picsum.photos/200?random=102",
  },
  {
    name: "서기 1425년 조선 잔디 깎는 사내",
    title: "왕궁 정원 유지 관리인",
    era: "1425년, 조선",
    description: "조선 왕궁 내 정원의 잔디와 식생을 정기적으로 손질하며 궁궐 환경을 쾌적하게 유지했으나, 당시 사회적 신분과 직업 위상은 낮았다.",
    avatarUrl: "https://picsum.photos/200?random=103",
  },
  {
    name: "1780년대 프랑스 귀족용 냉장고 얼음 운반원",
    title: "귀족 가문의 음식 보존용 얼음 공급 노동자",
    era: "1780년대, 프랑스",
    description: "냉장 기술이 발달하지 않았던 시대에 얼음을 채취해 귀족 가문의 식탁과 저장소로 운반하여 식품 신선도 유지에 기여했다.",
    avatarUrl: "https://picsum.photos/200?random=104",
  },
  {
    name: "1905년 러시아 차르 궁전 별거왕 감시원",
    title: "황제의 사생활 보호 및 감시 담당자",
    era: "1905년, 러시아",
    description: "러시아 차르의 사생활과 보안을 관리하는 임무를 수행했으나, 정치적 긴장 속에서 고립과 스트레스를 경험했다.",
    avatarUrl: "https://picsum.photos/200?random=105",
  },
  {
    name: "1920년대 미국 금주법 시대 불법 주류 배달원",
    title: "금주법 시대 불법 주류 밀수 및 배달자",
    era: "1920년대, 미국",
    description: "금주법이 시행되던 시기, 불법 주류를 은밀히 배달하며 경찰 단속을 피해 다녔으며 범죄 조직과 밀접하게 연관되었다.",
    avatarUrl: "https://picsum.photos/200?random=106",
  },
  {
    name: "1969년 아폴로 11호 우주선 물품 정리 담당",
    title: "우주선 내 물품 배치 및 재고 관리 책임자",
    era: "1969년, 미국",
    description: "인류 최초 달 착륙 임무 아폴로 11호 내에서 장비와 물품의 배치와 관리를 맡아 임무 수행의 효율성을 높였다.",
    avatarUrl: "https://picsum.photos/200?random=107",
  },
  {
    name: "1990년대 한국 PC방 음악 볼륨 조절사",
    title: "PC방 내 음악 환경 조절 담당자",
    era: "1990년대, 대한민국",
    description: "PC방에서 음악 볼륨을 적절하게 조절해 이용자들의 쾌적한 환경 조성에 힘썼으나, 각자의 취향 차이로 갈등이 발생하기도 했다.",
    avatarUrl: "https://picsum.photos/200?random=108",
  },
  {
    name: "2005년 아프리카 오지 지역 초고속 인터넷 개통 담당",
    title: "정보통신 인프라 설치 현장 기술자",
    era: "2005년, 케냐",
    description: "열악한 자연환경과 사회적 여건 속에서 광케이블과 통신 장비를 설치하며 아프리카 오지 지역의 인터넷 보급에 기여했다.",
    avatarUrl: "https://picsum.photos/200?random=109",
  },
  {
    name: "2100년 미래 화성 기지 먼지 청소 로봇 조종사",
    title: "화성 기지 자동 청소 로봇 운영 전문가",
    era: "2100년, 화성",
    description: "화성 탐사 기지에서 먼지와 이물질 제거를 위해 원격 조종 로봇을 운용하며 환경 유지에 핵심 역할을 수행했다.",
    avatarUrl: "https://picsum.photos/200?random=110",
  },
  {
    name: "게슈타포 감시원 (독일, 1939년)",
    title: "전체주의 정권의 정치적 감시 요원",
    era: "1939년, 나치 독일",
    description: "나치 독일에서 국민과 정치 반대자들을 감시하며 정권 유지를 위한 공포 통치에 가담했다.",
    avatarUrl: "https://picsum.photos/200?random=201",
  },
  {
    name: "슈츠슈타펠(Schutzstaffel) 경비병",
    title: "나치 친위대의 경비 및 강제 수용소 운영 병력",
    era: "1940년대, 나치 독일",
    description: "히틀러 친위대로서 강제 수용소 관리와 정치적 탄압을 수행하며 나치 정권의 폭력을 집행했다.",
    avatarUrl: "https://picsum.photos/200?random=202",
  },
  {
    name: "KKK 깃발 퍼레이드 담당자",
    title: "인종차별 조직의 상징 행사 참여자",
    era: "1920년대, 미국 남부",
    description: "쿠 클럭스 클랜의 퍼레이드에서 깃발을 들고 행진하며 조직의 위협적 이미지를 대중에게 과시했다.",
    avatarUrl: "https://picsum.photos/200?random=203",
  },
  {
    name: "러시아 혁명 관료",
    title: "혁명기 행정 업무 담당 공무원",
    era: "1917년, 러시아 제국 붕괴기",
    description: "혁명과 내전 시기 복잡한 행정과 서류 작업에 몰두하며 혼란 속 새 체제 구축에 참여했다.",
    avatarUrl: "https://picsum.photos/200?random=204",
  },
  {
    name: "중세 유럽 마녀 사냥꾼 보조원",
    title: "마녀 재판 및 체포 지원 하급 인력",
    era: "16세기, 중세 유럽",
    description: "마녀사냥이라는 사회적 광기 속에서 마녀 의심자를 체포하고 심문하는 일에 종사했다.",
    avatarUrl: "https://picsum.photos/200?random=205",
  },
  {
    name: "미국 대공황 실업자 구호 자원봉사 담당자",
    title: "대공황 시기 실업자 구호 활동 지원자",
    era: "1930년대, 미국",
    description: "경제 대공황으로 인한 대량 실업 상황에서 구호 물자 배분 및 사회복지 지원 업무를 수행했다.",
    avatarUrl: "https://picsum.photos/200?random=206",
  },
  {
    name: "프랑스 혁명 단두대 기술자",
    title: "혁명 시기 처형 장비 운영자",
    era: "1789년, 프랑스",
    description: "단두대 설치와 운영을 담당하며 혁명기의 정치적 처형을 집행하는 역할을 맡았다.",
    avatarUrl: "https://picsum.photos/200?random=207",
  },
  {
    name: "중국 명나라 과거 시험 감독관",
    title: "과거 시험의 공정한 시행 감독관",
    era: "15세기, 명나라",
    description: "과거 시험장에서 시험 진행과 부정 행위 감시를 담당하며 국가 인재 선발에 기여했다.",
    avatarUrl: "https://picsum.photos/200?random=208",
  },
  {
    name: "빅토리아 시대 빗자루 청소부",
    title: "산업화 시대 도시 청결 유지 노동자",
    era: "19세기, 영국",
    description: "급속한 도시화 속에서 거리와 주택을 청소하며 열악한 환경에서 일했다.",
    avatarUrl: "https://picsum.photos/200?random=209",
  },
  {
    name: "일본 에도시대 도시 경비원",
    title: "에도 시대 도시 치안 유지 담당자",
    era: "17세기, 일본 에도시대",
    description: "지역 치안과 질서 유지를 담당했으며, 때때로 길고양이 관리에도 관심을 보였다.",
    avatarUrl: "https://picsum.photos/200?random=210",
  },
  {
    name: "미국 서부 개척시대 도박사",
    title: "서부 개척 시대 도박장 운영자 및 딜러",
    era: "1870년대, 미국 서부",
    description: "개척지에서 도박을 운영하며 생활했으나 알코올 중독과 재정난에 시달리는 경우가 많았다.",
    avatarUrl: "https://picsum.photos/200?random=211",
  },
  {
    name: "남아프리카 광산 광부 안전 담당자",
    title: "광산 작업자의 안전 관리 책임자",
    era: "20세기 초, 남아프리카",
    description: "광산 내 노동자들의 안전을 감독했으나 부족한 장비와 지원으로 인한 위험을 완전히 방지하지 못했다.",
    avatarUrl: "https://picsum.photos/200?random=212",
  },
];


function App() {
  const [stepIndex, setStepIndex] = useState(-1);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [history, setHistory] = useState([]);

  const startPrediction = () => {
    if (stepIndex >= 0 || animating) return;
    setResult(null);
    setStepIndex(0);
  };

  useEffect(() => {
    if (stepIndex === -1) return;

    if (stepIndex < steps.length) {
      const timer = setTimeout(() => {
        setStepIndex(stepIndex + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setAnimating(true);
      const timer = setTimeout(() => {
        const job = jobs[Math.floor(Math.random() * jobs.length)];
        setResult(job);
        setAnimating(false);
        setStepIndex(-1);

        setHistory((prev) => [job, ...prev].slice(0, 5));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [stepIndex]);

  return (
    <div className="app-container">
      <main className="main-section">
        <h1>🧬 DNA 기반 전생 직업 추정기</h1>

        <div className="progress-steps">
          {steps.map((label, idx) => {
            const isActive = idx === stepIndex;
            const isCompleted = idx < stepIndex;
            return (
              <div
                key={idx}
                className={`step ${isActive ? "active" : ""} ${
                  isCompleted ? "completed" : ""
                }`}
              >
                <div className="circle">{isCompleted ? "✔" : idx + 1}</div>
                <div className="label">{label}</div>
                {idx !== steps.length - 1 && <div className="line" />}
              </div>
            );
          })}
        </div>

        {stepIndex >= 0 && stepIndex < steps.length && (
          <p className="status-text">{steps[stepIndex]}</p>
        )}

        {animating && (
          <div className="card-animation">
            <p>결과를 불러오는 중...</p>
          </div>
        )}

        {result && !animating && (
          <ProfileCard
            name={result.name}
            title={result.title}
            era={result.era}
            description={result.description}
            avatarUrl={result.avatarUrl}
            contactText="더 알아보기"
            showUserInfo={true}
            enableTilt={true}
          />
        )}

        <button
          className="predict-btn"
          onClick={startPrediction}
          disabled={stepIndex >= 0 || animating}
        >
          {stepIndex >= 0 || animating ? (
            <>
              <span className="spinner" /> 예측 중...
            </>
          ) : (
            "🔮 전생 예측 시작"
          )}
        </button>
      </main>

      <aside className="sidebar">
        <h2>앱 소개</h2>
        <p>
          이 앱은 전생 직업을 DNA 염기서열(?) 기반으로 예측해줍니다.
          <br />
          재미삼아 눌러보세요!
        </p>

        <h3>최근 예측 기록</h3>
        {history.length === 0 && <p>예측 결과가 아직 없습니다.</p>}
        {history.map((job, i) => (
          <div
            key={i}
            className="history-card"
            onClick={() => alert(`${job.name} (${job.era}) 더 알아보기 준비 중!`)}
          >
            <img src={job.avatarUrl} alt={job.name} />
            <div>
              <strong>{job.name}</strong>
              <p>{job.era}</p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}

export default App;
