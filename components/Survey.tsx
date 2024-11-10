'use client'
import React, { useState, useEffect } from 'react'
import { useSurveyStore } from '../app/store/surveyStore'
import breadData from '../bread.json'
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const questions = [{
  id: 'age',
  question: '몇 살이신지 살짝 물어봐도 될까요?',
  options: Array.from({length: 91}, (_, i) => (i + 11).toString()),
  multiSelect: false,
  type: 'number',
},
{
  id: 'category',
  question: '다음 중 관심 있는 분야를 선택해주세요.',
  options: [
    '🔞 성범죄', '💰 재산범죄', '🚗 교통사고/범죄', '⚖️ 형사절차', '👊 폭행/협박', 
    '🗣️ 명예훼손/모욕', '🔍 기타 형사범죄', '🏠 부동산/임대차', '💼 금전/계약 문제', 
    '📜 민사절차', '🔎 기타 민사문제', '👪 가족', '🏢 회사', '🏥 의료/세금/행정', 
    '💻 IT/지식재산/금융'
  ],
  multiSelect: false,
},
{
  id: 'subcategory',
  question: '선택한 분야의 세부 항목을 선택해주세요.',
  options: [],
  multiSelect: false,
},
{
  id: 'subsubcategory',
  question: '선택한 세부 항목의 구체적인 항목을 선택해주세요.',
  options: [],
  multiSelect: false,
},
];


const SkeletonLoader: React.FC = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="bg-slate-700 p-4 rounded-lg animate-pulse">
        <div className="h-6 bg-slate-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-600 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-slate-600 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-slate-600 rounded w-2/3"></div>
      </div>
    ))}
  </div>
)

const StarRating: React.FC<{ rating: number, setRating: (rating: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
};

export const Survey: React.FC = () => {
  const { currentQuestion, answers, setAnswer, nextQuestion, prevQuestion } = useSurveyStore()
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [contactInfo, setContactInfo] = useState({ phone: '', email: '' });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Reset survey when component mounts
    useSurveyStore.getState().resetSurvey();
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQ = questions[currentQuestion];
    if (currentQ?.id === 'category') {
      // Store category answer
      setAnswer('category', answer);
   
      // Define the type for subcategories
      const subcategories: Record<string, string[]> = {
        '🔞 성범죄': ['👠 성매매', '🚨 성폭력/강제추행 등', '👶 미성년 대상 성범죄', '💻 디지털 성범죄'],
        '💰 재산범죄': ['💼 횡령/배임', '📞 사기/공갈', '🔍 기타 재산범죄'],
        '🚗 교통사고/범죄': ['🚗 교통사고/도주', '🍷 음주/무면허'],
        '⚖️ 형사절차': ['📜 고소/소송절차', '🚔 수사/체포/구속'],
        '👊 폭행/협박': ['👊 폭행/협박/상해 일반'],
        '🗣️ 명예훼손/모욕': ['🗣️ 명예훼손/모욕 일반', '💻 사이버 명예훼손/모욕'],
        '🔍 기타 형사범죄': ['💊 마약/도박', '🏫 소년범죄/학교폭력', '⚖️ 형사일반/기타범죄'],
        '🏠 부동산/임대차': ['🏗️ 건축/부동산 일반', '🏢 재개발/재건축', '🏠 매매/소유권 등', '🏠 임대차'],
        '💼 금전/계약 문제': ['💰 손해배상', '💳 대여금/채권추심', '📄 계약일반/매매'],
        '📜 민사절차': ['⚖️ 소송/집행절차', '🔒 가압류/가처분', '📉 회생/파산'],
        '🔎 기타 민사문제': ['📜 공증/내용증명/조합/국제문제 등'],
        '👪 가족': ['💔 이혼', '🏡 상속', '👪 가사 일반'],
        '🏢 회사': ['🏢 기업법무', '👷 노동/인사'],
        '🏥 의료/세금/행정': ['💰 세금/행정/헌법', '🏥 의료/식품의약', '🪖 병역/군형법'],
        '💻 IT/지식재산/금융': ['🛍️ 소비자/공정거래', '💻 IT/개인정보', '🎨 지식재산권/엔터', '💰 금융/보험'],
      };
      const subcategoryQuestion = questions.find(q => q.id === 'subcategory');
      if (subcategoryQuestion) {
        subcategoryQuestion.options = subcategories[answer] || [];
      }
    } else if (currentQ?.id === 'subcategory') {
      // Store subcategory answer
      setAnswer('subcategory', answer);
 
      
      // Define the type for subsubcategories
      const subsubcategories: Record<string, string[]> = {
        '👠 성매매': ['📱 조건만남', '💬 랜덤채팅', '🎤 유흥업소', '🔞 유사성매매 등'],
        '🚨 성폭력/강제추행 등': ['🚨 성폭행', '💊 준강간', '💔 데이트폭력', '🗣️ 성희롱', '🙈 성추행 등'],
        '👶 미성년 대상 성범죄': ['👶 아동청소년보호법', '🔞 미성년성매매 등'],
        '💻 디지털 성범죄': ['📱 통신매체이용음란죄', '💻 웹하드', '📷 몰카', '📤 음란물유포 등'],
        '💼 횡령/배임': ['💼 업무상 횡령/배임', '💳 신용카드 범죄', '🔍 점유이탈물횡령 등'],
        '📞 사기/공갈': ['📞 보이스피싱', '🆔 명의 대여/도용', '💰 유사수신', '📦 중고사기 등'],
        '🔍 기타 재산범죄': ['🔑 절도', '🏠 주거침입', '🔨 재물손괴', '👜 장물 등'],
        '🚗 교통사고/도주': ['🚗 교통사고 합의', '📝 손해사정', '🚨 뺑소니', '🚗 보복운전 등'],
        '🍷 음주/무면허': ['🍷 음주운전', '🚗 음주사고', '🚫 무면허운전 등'],
        '📜 고소/소송절차': ['🤝 합의', '❌ 무혐의', '⏳ 공소시효', '🖋️ 고소대리', '📜 약식명령', '⚖️ 즉결심판 등'],
        '🚔 수사/체포/구속': ['🚔 체포/구속', '📜 현행법', '🔍 영장', '🔍 압수수색', '💻 포렌식 등'],
        '👊 폭행/협박/상해 일반': ['👊 폭행', '🗣️ 협박', '💥 상해', '🔒 감금', '🚫 유기', '👶 학대', '⚠️ 과실치상상', '🚔 공무집행방해 등'],
        '🗣️ 명예훼손/모욕 일반': ['🗣️ 명예훼손죄', '🗣️ 모욕죄', '❌ 허위사실유포', '🗣️ 언어폭력 등'],
        '💻 사이버 명예훼손/모욕': ['💻 정보통신망법', '💬 악성댓글 등'],
        '💊 마약/도박': ['💊 항정신성의약품', '🌿 대마', '🎲 사설토토', '🎮 사행성게임', '✈️ 원정도박 등'],
        '🏫 소년범죄/학교폭력': ['👶 아동학대', '🏫 학교폭력', '🚫 왕따', '👶 소년사건 등'],
        '⚖️ 형사일반/기타범죄': ['📜 위증', '🚫 무고', '💰 뇌물', '📄 문서위조', '🚶 스토킹', '🔥 실화/방화 등'],
        '🏗️ 건축/부동산 일반': ['🏗️ 건축법', '🔧 하자담보책임', '💧 누수', '🔊 층간소음', '💰 공사대금 등'],
        '🏢 재개발/재건축': ['🏢 재개발', '🏗️ 재건축', '🏘️ 지역주택조합', '🏠 수용', '💰 보상 등'],
        '🏠 매매/소유권 등': ['🏠 부동산매매', '🔒 유치권', '🏗️ 지상권', '🏠 경매', '📝 명의신탁 등'],
        '🏠 임대차': ['🏠 주택/상가임대차', '💰 계약금', '💳 관리금', '💰 보증금', '🏠 전세계약 등'],
        '💰 손해배상': ['💰 손해배상청구', '💔 정신적피해보상', '💰 위자료', '⚖️ 불법행위', '⚠️ 과실 등'],
        '💳 대여금/채권추심': ['💰 대여금반환청구', '💳 채권양류 및 추심', '🤝 연대보증 등'],
        '📄 계약일반/매매': ['📜 계약해지', '📝 계약서검토', '💰 계약금', '💰 중도금', '❌ 이중계약', '🚗 중고차매매 등'],
        '⚖️ 소송/집행절차': ['📜 지급명령', '📄 등기/등록', '🤝 조정/화해/중재', '🔄 재심', '💰 공탁 등'],
        '🔒 가압류/가처분': ['🔒 가처분/가압류 절차', '📜 가등기', '❌ 이의신청', '❌ 취소 등'],
        '📉 회생/파산': ['📉 개인회생', '🏢 법인회생', '📉 파산', '📉 도산', '❌ 면책 등'],
        '📜 공증/내용증명/조합/국제문제 등': ['📜 증여', '🔧 도급/용역', '🏢 조합/사단', '💰 부당이득', '🌍 국제', '⛪ 종교', '📜 공증 등'],
        '💔 이혼': ['💔 합의이혼', '⚖️ 재판이혼', '💰 재산분할', '👶 양육권', '💔 상간', '💰 위자료', '🚫 외도 등'],
        '🏡 상속': ['🏡 상속재산분할', '💰 증여세', '⚖️ 유류분', '❌ 한정승인', '🚫 상속포기 등'],
        '👪 가사 일반': ['👪 친족', '👴 성년후견', '💰 부양료', '👶 친자확인', '👪 친권', '⚖️ 가사소송 등'],
        '🏢 기업법무': ['🚫 경업금지', '🏢 합병', '🏢 영업양도', '🚀 스타트업', '📝 계약서검토', '🚫 부정경쟁방지법 등'],
        '👷 노동/인사': ['👷 노무', '🚫 직장 내 괴롭힘', '💰 임금체불', '🚫 부당해고', '💰 실업급여', '⚠️ 산업재해보상 등'],
        '💰 세금/행정/헌법': ['💰 세금', '💰 과태료', '🌿 환경', '🏢 인허가', '📜 헌법', '🛂 이민/비자', '🗳️ 선거', '📺 연금/방송', '⚖️ 행정소송 등'],
        '🏥 의료/식품의약': ['💉 의료사고', '⚖️ 의료소송', '💊 약사법', '🍽️ 식품위생법 등'],
        '🪖 병역/군형법': ['🪖 국방/병역', '⚖️ 군형법', '🎖️ 유공자/보훈', '⚖️ 군인징계 등'],
        '🛍️ 소비자/공정거래': ['🛍️ 소비자피해', '⚖️ 집단소송', '💻 전자상거래', '🚫 불공정거래', '📜 약관', '❌ 허위/과대광고 등'],
        '💻 IT/개인정보': ['🔒 개인정보유출/침해', '📞 감청', '📜 통신비밀보호법', '🤖 인공지능', '💬 SNS 등'],
        '📜 지식재산권/엔터': ['📜 상표권', '📜 저작권', '📜 특허', '📺 방송', '🎵 음악', '🎬 영화 등'],
        '💰 금융/보험': ['💰 가상화폐', '💰 투자', '📈 마진거래', '🛡️ 보험 등'],
      };
      const subsubcategoryQuestion = questions.find(q => q.id === 'subsubcategory');
      if (subsubcategoryQuestion) {
        subsubcategoryQuestion.options = subsubcategories[answer] || [];
      }
    } else if (currentQ?.id === 'subsubcategory') {
      // Store subsubcategory answer
      setAnswer('subsubcategory', answer);
 
    } else if (currentQ?.id === 'age') {
      // Store age answer
      setAnswer('age', answer);
 
    }

    if (currentQ?.multiSelect) {
      // Ensure we're working with an array
      const currentAnswers = Array.isArray(answers[currentQ.id]) 
        ? answers[currentQ.id] as string[]
        : [];

      let updatedAnswers: string[];
      if (answer === '없음 ✅') {
        updatedAnswers = ['없음 ✅'];
      } else {
        updatedAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(a => a !== answer && a !== '없음 ✅')
          : [...currentAnswers.filter(a => a !== '없음 ✅'), answer];
      }
      setAnswer(currentQ.id, updatedAnswers);
    } else {
      setAnswer(currentQ?.id ?? '', answer);
      nextQuestion();
    }
  }

  const handleNextQuestion = () => {
    nextQuestion();
  }
// 빵요미 세계관의 재미있는 허구적 에피소드를 포함시켜주세요. 빵을 의인화하해주세요.
// 빵요미 세계관에서 허구적이고 창의적인 방식으로, 걱정되는 점과 좋은 점을 포함시켜주세요.
  const getRecommendations = async () => {
    setIsLoading(true)
const prompt = `다음은 사용자의 성심당 빵 선호도 설문 결과입니다:
${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

이 정보를 바탕으로 다음 빵 목록에서 가장 적합한 5개의 빵을 추천해주세요:
${JSON.stringify(breadData['빵 목록'])}

성심당 빵요리사인 빵요미 캐릭터의 귀여운 말투로 해주세요. 이모지는 적절히 사용해주세요. 

각 빵에 대해 다음 정보를 포함 세요:
1. 이름
2. 가격
3. 특징 (맛, 텍스처, 크기/중량 등) - 이모지를 적절히 활용하여 구체적으로 설명해주세요.
4. 추천 이유 - 사용자의 연령, 성별, 선호도, 구매 시간, 구매 빈도, 영양 선호도 등을 고려하여 상세히 설명해주세요.

응답은 다음과 같은 JSON 형식으로만 제공해 주세요:
[
  {
    "name": "빵 이름",
    "price": "가격",
    "features": "특징 (맛, 텍스처, 크기/중량 등)",
    "reason": "추천 이유"
  },
  ...
]`;

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      console.log('text', text);
      
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const jsonString = jsonMatch ? jsonMatch[0] : '[]';
        const recommendedBreads = JSON.parse(jsonString);
        console.log('recommendedBreads', recommendedBreads);
        setRecommendations(recommendedBreads);

        // 추천 결과를 Slack으로 전송
        await sendResponseToSlack(recommendedBreads);
      } catch (jsonError) {
        console.error('JSON 파싱 중 오류 발생:', jsonError);
        setRecommendations([]);
      }

    } catch (error) {
      console.error('빵 추천 중 오류 발생:', error);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }

  const sendResponseToSlack = async (recommendedBreads: any[]) => {
    try {
      const response = await axios.post('/api/sendResponseToSlack', { answers, recommendedBreads });
      console.log('설문 결과와 추천 빵이 서버로 전송되었습니다.', response.data);
    } catch (error) {
      console.error('서버로 설문 결과 및 추천 빵 전송 중 오류 발생:', error);
    }
  };

  const sendQuestionToSlack = async () => {
    try {
      const response = await axios.post('/api/sendQuestionToSlack', { answers });
      console.log('설문 결과가 서버로 전송되었습니다.', response.data);
    } catch (error) {
      console.error('서버로 설문 결과 전송 중 오류 발생:', error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post('/api/submitFeedback', { rating, feedback, contactInfo });
      console.log('피드백이 서버로 전송되었습니다.', response.data);
      toast.success('피드백을 제출해주셔서 감사합니다! 😊');
      setFeedbackSubmitted(true); // 피드백 제출 상태 업데이트
    } catch (error) {
      console.error('서버로 피드백 전송 중 오류 발생:', error);
      toast.error('피드백 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const currentQ = questions[currentQuestion];

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      sendQuestionToSlack(); // 설문 결과 전송
      window.location.href = '/chat'; // 채팅 페이지로 리다이렉트
    }
  }, [currentQuestion]);

  const handleRecommendAgain = () => {
    // Reset the survey to the first question
    useSurveyStore.getState().resetSurvey();
    // Clear recommendations
    setRecommendations([]);
    // Reset loading state
    setIsLoading(false);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-slate-800 rounded-lg shadow-xl text-white">
        <ToastContainer />
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-400">채팅 페이지로 이동합니다...</h2>
        <div className="text-center">
          <p className="text-center mt-4 text-sky-400">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-slate-800 rounded-lg shadow-xl text-white">
      <ToastContainer />
      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div
            className="bg-sky-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-slate-400 mt-2">
          {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">{currentQ.question}</h2>
          {/* 이전, 다음 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50 hover:bg-slate-600 transition duration-150 ease-in-out mr-2"
          >
            이전
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-150 ease-in-out font-bold"
          >
            다음
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentQ?.options ? (
              <div className={`grid ${currentQ.id === 'age' ? 'grid-cols-5' : 'grid-cols-2'} gap-2 ${currentQ.id === 'age' ? 'mt-4' : ''}`}>
                {currentQ.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`p-2 text-center rounded transition duration-150 ease-in-out ${
                      answers[currentQ.id]?.includes(option)
                        ? 'bg-sky-400 hover:bg-sky-500 text-slate-800'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type={currentQ?.type || 'text'}
                value={answers[currentQ?.id ?? ''] || ''}
                onChange={(e) => setAnswer(currentQ?.id ?? '', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNextQuestion()}
                className="w-full p-2 border rounded bg-slate-700 text-white"
              />
            )}
          </motion.div>
        </AnimatePresence>
        
      
      </div>
    </div>
  )
}