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
  question: '몇 살이신지 살짝 물어봐도 될까요? 🙈',
  options: Array.from({length: 91}, (_, i) => (i + 11).toString()),
}];
// const questions = [
//   {
//     id: 'taste',
//     question: '어떤 맛의 빵이 당신의 입맛을 사로잡나요? 🤤 (여러 개 선택 가능)',
//     options: ['달콤한 🍯', '고소한 🥜', '담백한 🍞', '짭짤한 🧂', '풍미 있는 🌿', '새콤한 🍋'],
//     multiSelect: true,
//   },
//   {
//     id: 'texture',
//     question: '빵의 식감 중 어떤 게 가장 좋으세요? 😋 (여러 개 선택 가능)',
//     options: ['부드러운 ☁️', '촉촉한 💦', '겉바속촉 🥖', '바삭한 🥐', '쫄깃한 🍩', '푹신한 🧁'],
//     multiSelect: true,
//   },
//   {
//     id: 'allergies',
//     question: '혹시 알레르기가 있으신가요? 🤧 해당하는 항목을 모두 선택해주세요.',
//     options: [
//       '없음',
//       '밀 (글루텐) 🌾',
//       '우유 (유제품) 🥛',
//       '계란 🥚',
//       '견과류 (특히 아몬드, 호두) 🥜',
//       '대두 (콩) 🫘',
//       '참깨 🌰',
//       '효모 🍞',
//       '옥수수 🌽',
//       '설탕 (설탕 불내증) 🍬',
//       '방부제 및 첨가물 🧪',
//     ],
//     multiSelect: true,
//   },
//   {
//     id: 'age',
//     question: '몇 살이신지 살짝 물어봐도 될까요? 🙈',
//     options: Array.from({length: 91}, (_, i) => (i + 11).toString()),
//   },
//   {
//     id: 'gender',
//     question: '성별을 알려주시겠어요? 👫',
//     options: ['남성 👨', '여성 👩'],
//   },
//   {
//     id: 'nutritionalPreference',
//     question: '빵 고를 때 가장 신경 쓰는 영양 성분은 뭔요? 🍽️ (여러 개 선택 가능)',
//     options: ['저지방 🥛', '단백질 💪', '식이섬유 🌾', '저탄수화물 🥖', '통곡물 🌿', '비타민/미네랄 🍎', '글루텐 프리 🚫🌾'],
//     multiSelect: true, 
//   },
//   {
//     id: 'occasion',
//     question: '어떤 때 우리 빵을 즐기고 싶으세요? 🎉',
//     options: ['간식 타임 🍰', '아침 식사 🌅', '친구와 함께 👯', '혼자만의 시간 🧘', '가족 모임 👨‍👩‍👧‍👦', '데이트 💑', '피닉 🧺', '특별한 선물 🎁', '생일 파티 🎂'],
//   },
//   {
//     id: 'occasionDetails',
//     question: '방금 선택하신 상황에 대해 조금 더 자세히 들려주세요. 어떤 분위기나 특별한 점이 있나요? 🤔💭',
//     type: 'text',
//   },
//   {
//     id: 'purchaseTime',
//     question: '주로 언제 빵을 사러 오시나요? ⏰',
//     options: ['오전 중 (9-12시) ☀️', '점심 시간 (12-14시) 🍽️', '오후 (14-17시) 🌇', '아침 일찍 (6-9시) 🌄', '저녁 (17-20시) 🌙', '밤 (20시 이후) 🌠'],
//   },
//   {
//     id: 'frequency',
//     question: '얼마나 자주 성심당을 찾아주시나요? 😊',
//     options: ['일주일에 한 번 📅', '일주일에 2-3번 🚶‍♀️', '한 달에 한 번 🌙', '2주에 한 번 🗓️', '특별한 날에만 ✨', '매일 ‍♂'],
//   },
// ]

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

  const handleAnswer = (answer: string) => {
    const currentQ = questions[currentQuestion]
    if (currentQ.multiSelect) {
      const currentAnswers = answers[currentQ.id] || []
      let updatedAnswers
      if (answer === '없음 ✅') {
        updatedAnswers = ['없음 ✅']
      } else {
        updatedAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter((a: string) => a !== answer && a !== '없음 ✅')
          : [...currentAnswers.filter((a: string) => a !== '없음 ✅'), answer]
      }
      setAnswer(currentQ.id, updatedAnswers)
    } else {
      setAnswer(currentQ.id, answer)
      nextQuestion()
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

각 빵에 대해 다음 정보를 포함해 주세요:
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

  const currentQ = questions[currentQuestion]

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      getRecommendations();
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
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-400">맞춤 빵 추천 결과</h2>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SkeletonLoader />
            <p className="text-center mt-4 text-sky-400">빵요미가 당신만을 위한 빵을 고르고 있습니다... 🍞</p>
          </motion.div>
        ) : recommendations.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {recommendations.map((bread, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <h4 className="text-xl font-semibold text-sky-300">{bread.name}</h4>
                <div className="mt-2">
                  <p className="text-slate-300"><strong>가격:</strong> {bread.price}</p>
                  <p className="text-slate-300"><strong>특징:</strong> {bread.features}</p>
                  <p className="text-slate-300 mt-2"><strong>추천 이유:</strong> {bread.reason}</p>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center">추천 빵을 찾을 수 없습니다.</p>
        )}
        
        {/* 주문하기 버튼 추가 */}
        <a
          href="https://www.sungsimdang.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-150 ease-in-out w-full block text-center font-bold"
        >
          성심당에서 주문하기
        </a>
        
        {!feedbackSubmitted && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-sky-300 mb-2">별점 및 피드백을 남겨주세요</h3>
            <StarRating rating={rating} setRating={setRating} />
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 mt-4 bg-slate-700 text-white rounded"
              placeholder="어떤 점을 개선했으면 좋겠어요! 또는 추가적으로 제공해주실 정보가 있으실 경우 입력해주세요."
            />
            <input
              type="text"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full p-2 mt-4 bg-slate-700 text-white rounded"
              placeholder="전화번호 (선택 사항)"
            />
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full p-2 mt-4 bg-slate-700 text-white rounded"
              placeholder="이메일 (선택 사항)"
            />
            <button
              onClick={handleSubmitFeedback}
              className="mt-4 px-6 py-3 bg-sky-500 text-white rounded hover:bg-sky-600 transition duration-150 ease-in-out w-full font-bold"
            >
              피드백 제출
            </button>
          </div>
        )}

         {/* 다시 추천받기 버튼 추가 */}
        <button
          onClick={handleRecommendAgain}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out w-full font-bold"
        >
          새로 빵 추천 받기
        </button>
        
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out w-full"
        >
          {showAnswers ? '나의 응답 숨기기' : '나의 응답 보기'}
        </button>
        
        {showAnswers && (
          <div className="mt-8 space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-slate-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-sky-300">
                  {index + 1}. {q.question}
                </h3>
                <p className="mt-1 text-slate-200">
                  {Array.isArray(answers[q.id])
                    ? answers[q.id].join(', ')
                    : answers[q.id] || '응답 없음'}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    )
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
            {currentQ.options ? (
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
                type={currentQ.type || 'text'}
                value={answers[currentQ.id] || ''}
                onChange={(e) => setAnswer(currentQ.id, e.target.value)}
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