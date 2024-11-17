'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSurveyStore } from '../app/store/surveyStore'
import breadData from '../bread.json'
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const questions = [
{
  id: 'loan_evidence',
  question: '친구에게 돈을 빌려주었는데 증거가 없다면, 법적으로 돈을 돌려받을 수 없을까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '차용증이 없어도 카카오톡 대화내용, 계좌이체 내역 등 다양한 증거로 채권의 존재를 입증할 수 있습니다.',
  multiSelect: false,
}, {
  id: 'noise_complaint',
  question: '아파트 층간소음이 발생할 경우, 바로 경찰에 신고할 수 있을까요?',
  options: ['O', 'X'],
  correctAnswer: 'O',
  explanation: '경찰, 관리사무소, 환경공단 등에 신고 가능하며, 밤 10시 이후 소음은 경범죄처벌법 위반이 될 수 있습니다.',
  multiSelect: false,
}, {
  id: 'used_item_refund',
  question: '중고거래로 물건을 샀는데 하자가 있다면, 항상 환불을 요구할 수 있을까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '중고거래는 개인 간 거래로, 판매자가 하자를 고의로 숨기지 않았다면 반품이 어려울 수 있습니다.',
  multiSelect: false,
}, {
  id: 'wrong_delivery',
  question: '택배기사님이 실수로 다른 사람의 택배를 우리 집에 놓고 갔다면, 내가 써도 될까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '다른 사람의 물건을 가져다 쓰는 것은 절도죄에 해당할 수 있으며, 택배사에 연락하여 반송해야 합니다.',
  multiSelect: false,
}, {
  id: 'found_card',
  question: '길에서 주운 현금카드로 돈을 인출했다면, 주인을 모르더라도 범죄가 될까요?',
  options: ['O', 'X'],
  correctAnswer: 'O',
  explanation: '타인의 카드로 현금을 인출하는 것은 절도죄에 해당하며, 경찰서나 은행에 신고해야 합니다.',
  multiSelect: false,
}, {
  id: 'tree_branch',
  question: '이웃집 나무의 가지가 우리 집 마당으로 넘어왔을 때, 마음대로 자를 수 있을까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '이웃과 먼저 상의해야 하며, 상의 후에도 해결되지 않으면 법적 절차를 통해 해결해야 합니다.',
  multiSelect: false,
}, {
  id: 'restaurant_payment',
  question: '음식점에서 식사 후 "카드가 안 된다"며 나중에 가져다주겠다고 하고 나오면 범죄일까요?',
  options: ['O', 'X'],
  correctAnswer: 'O',
  explanation: '처음부터 지불할 의사가 없었다면 사기죄에 해당할 수 있습니다.',
  multiSelect: false,
}, {
  id: 'pizza_delivery',
  question: '피자를 주문했는데 배달이 1시간 넘게 지연됐다면, 무조건 환불을 요구할 수 있을까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '천재지변이나 불가피한 사정이 있었다면 완전한 환불은 어려울 수 있으며, 부분 환불이나 보상을 협의할 수 있습니다.',
  multiSelect: false,
}, {
  id: 'sns_photo',
  question: 'SNS에 다른 사람의 얼굴이 나온 사진을 올릴 때, 모자이크 처리를 했다면 동의가 필요 없을까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '모자이크를 했더라도 초상권 침해가 될 수 있어, 가급적 당사자의 동의를 받아야 합니다.',
  multiSelect: false,
}, {
  id: 'verbal_promise',
  question: '월세 계약할 때 집주인이 말로만 "리모델링 주겠다" 했는데 안 해줬다면, 법적으로 요구할 수 있을까요?',
  options: ['O', 'X'],
  correctAnswer: 'X',
  explanation: '구두 약속 입증이 어려우므로, 중요한 약속은 반드시 계약서에 명시해야 합니다.',
  multiSelect: false,
}];


// SkeletonLoader를 메모이제이션
const SkeletonLoader = React.memo(() => (
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
));

// StarRating을 메모이제이션
const StarRating = React.memo(({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
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
});

// FeedbackModal을 메모이제이션
const FeedbackModal = React.memo(({ isCorrect, explanation, onClose }: {
  isCorrect: boolean;
  explanation: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-left text-black
        md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        fixed bottom-0 left-0 right-0"
    >
      {/* 아이콘 */}
      <div className="flex justify-start mb-4">
        {isCorrect ? (
          <img 
            src="/images/svg_yes.svg" 
            alt="정답" 
            className="w-16 h-16"
          />
        ) : (
          <img 
            src="/images/svg_no.svg" 
            alt="오답" 
            className="w-16 h-16"
          />
        )}
      </div>
      
      {/* 결과 텍스트 - 색상 변경 */}
      <div className="text-2xl font-bold mb-4">
        <span className={isCorrect ? 'text-[#1B65D7]' : 'text-[#EE4553]'}>
          {isCorrect ? '정답입니다!' : '오답입니다'}
        </span>
      </div>
      
      {/* 설명 */}
      <div className="text-lg font-semibold mb-6 text-black">
        {explanation}
      </div>
      
      {/* 다음 버튼 */}
      <button
        onClick={onClose}
        className="bbbg w-full px-4 py-3 rounded-lg text-white font-bold text-lg"
      >
        다음 문제로
      </button>
    </motion.div>
  </div>
));

export const Quiz: React.FC = () => {
  const { currentQuestion, answers, setAnswer, nextQuestion, prevQuestion } = useSurveyStore()
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [contactInfo, setContactInfo] = useState({ phone: '', email: '' });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset survey when component mounts
    useSurveyStore.getState().resetSurvey();
  }, []);

  // 콜백 함수들을 메모이제이션
  const handleAnswer = useCallback((answer: string) => {
    const currentQ = questions[currentQuestion];
    setAnswer(currentQ.id, answer);
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));
    
    setIsCorrect(answer === currentQ.correctAnswer);
    setCurrentExplanation(currentQ.explanation);
    setShowModal(true);
  }, [currentQuestion]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    if (currentQuestion < questions.length - 1) {
      nextQuestion();
    } else {
      setShowResults(true);
    }
  }, [currentQuestion]);

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

  const handleSubmitFeedback = useCallback(async () => {
    try {
      const response = await axios.post('/api/submitFeedback', { rating, feedback, contactInfo });
      toast.success('피드백을 제출해주셔서 감사합니다! 😊');
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('서버로 피드백 전송 중 오류 발생:', error);
      toast.error('피드백 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [rating, feedback, contactInfo]);

  // 자주 사용되는 계산값을 메모이제이션
  const currentQ = useMemo(() => questions[currentQuestion] || null, [currentQuestion]);
  
  const incorrectAnswers = useMemo(() => {
    if (!showResults) return [];
    return questions.filter(q => userAnswers[q.id] !== q.correctAnswer);
  }, [showResults, userAnswers]);

  const correctCount = useMemo(() => {
    if (!showResults) return 0;
    return questions.length - incorrectAnswers.length;
  }, [showResults, incorrectAnswers]);

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      setShowResults(true);
    }
  }, [currentQuestion]);

  if (!currentQ) {
    return null;
  }

  const handleRecommendAgain = () => {
    // Reset the survey to the first question
    useSurveyStore.getState().resetSurvey();
    // Clear recommendations
    setRecommendations([]);
    // Reset loading state
    setIsLoading(false);
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-slate-800 rounded-lg shadow-xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-sky-400">퀴즈 결과</h2>
        <div className="text-center mb-8">
          <p className="text-2xl mb-4">
            총 {questions.length}문제 중 {correctCount}문제 정답!
          </p>
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
            <div
              className="bbbg h-2.5 rounded-full"
              style={{ width: `${(correctCount / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {incorrectAnswers.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">오답 노트</h3>
            <div className="space-y-6">
              {incorrectAnswers.map((q) => (
                <div key={q.id} className="bg-slate-700 p-4 rounded-lg">
                  <p className="font-bold mb-2">{q.question}</p>
                  <p className="text-red-400 mb-2">나의 답: {userAnswers[q.id]}</p>
                  <p className="text-green-400 mb-2">정답: {q.correctAnswer}</p>
                  <p className="text-gray-300">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleRecommendAgain}
          className="bbbg px-4 py-2 rounded-lg text-white font-bold mt-8 mx-auto block"
        >
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div className="bbstyle">
    <div className="bbox max-w-4xl mx-auto mt-20 p-6 bg-slate-800 rounded-lg shadow-xl text-white">
      <ToastContainer />
      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full rounded-full h-2.5">
          <div
            className="bbbg h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="num text-right text-sm mt-2">
          {currentQuestion + 1} / <b>{questions.length}</b>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">{currentQ.question}</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentQ?.options ? (
              <div className={`grid grid-cols-2 gap-4 ${currentQ.id === 'age' ? 'mt-4' : ''}`}>
                {currentQ.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition duration-150 ease-in-out aspect-square ${
                      option === 'O'
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : answers[currentQ.id]?.includes(option)
                        ? 'bg-red-100 hover:bg-red-200 text-red-600'
                        : 'bg-red-100 hover:bg-red-200 text-red-600'
                    }`}
                  >
                    <img 
                      src={option === 'O' ? '/images/svg_yes.svg' : '/images/svg_no.svg'} 
                      alt={option} 
                      className="w-16 h-16 mb-2"
                    />
                    <span className="font-bold text-lg">
                      {option === 'O' ? '그렇다' : '아니다'}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={answers[currentQ?.id ?? ''] || ''}
                onChange={(e) => setAnswer(currentQ?.id ?? '', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNextQuestion()}
                className="w-full p-2 border rounded bg-slate-700 text-white"
                pattern="\d*"
                inputMode="numeric"
              />
            )}
          </motion.div>
        </AnimatePresence>
        
      
      </div>
      <AnimatePresence>
        {showModal && (
          <FeedbackModal
            isCorrect={isCorrect}
            explanation={currentExplanation}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}