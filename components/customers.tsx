import Image from 'next/image'
import CustomerImg01 from '@/public/images/customer-01.jpg'
import CustomerImg02 from '@/public/images/customer-02.jpg'
import CustomerImg03 from '@/public/images/customer-03.jpg'
import CustomerImg04 from '@/public/images/customer-04.jpg'
import CustomerImg05 from '@/public/images/customer-05.jpg'
import CustomerImg06 from '@/public/images/customer-06.jpg'
import CustomerImg07 from '@/public/images/customer-07.jpg'
import CustomerImg08 from '@/public/images/customer-08.jpg'
import CustomerImg09 from '@/public/images/customer-09.jpg'

export default function Customers() {

  const items = [
    {
      img: CustomerImg01,
      quote: "처음엔 AI가 내 취향을 제대로 파악할 수 있을지 의심스러웠어요. 하지만 성심당 AI는 놀라워요! 제 취향을 정확히 분석해서 매번 새로운 빵을 발견하게 해줘요. 이제는 AI 추천 없이는 빵을 고르기 힘들 정도예요!",
      name: '김지영',
      twitter: {
        handle: '@jiyoung_kim',
        link: '#0'
      }
    },
    {
      img: CustomerImg02,
      quote: "AI 추천이 개인정보를 너무 많이 요구할까 봐 걱정했는데, 최소한의 정보만으로도 정확한 추천을 받을 수 있어요. 바쁜 직장인인 저에게 성심당 AI는 시간 절약의 해결사예요. 점심시간에 고민 없이 맛있는 빵을 즐길 수 있죠.",
      name: '이상훈',
      twitter: {
        handle: '@sanghoon_lee',
        link: '#0'
      }
    },
    {
      img: CustomerImg03,
      quote: "다이어트 중에 빵을 먹으면 살찔까 봐 망설였어요. 그런데 AI가 칼로리와 영양을 고려해서 추천해주니 죄책감 없이 즐길 수 있어요. 오히려 균형 잡힌 식단으로 건강해지는 느낌이에요!",
      name: '박서연',
      twitter: {
        handle: '@seoyeon_park',
        link: '#0'
      }
    },
    {
      img: CustomerImg04,
      quote: "AI 추천이 획일적일까는 우려가 있었는데, 오히려 다양성의 폭을 넓혀줬어요. 성심당 AI 덕분에 친구들과 빵 파티할 때 항상 인기 만점이에요! 새로운 맛을 발견하는 재미가 쏠쏠하고, 인스타에 올리기 좋은 예쁜 빵도 추천해줘요.",
      name: '최민서',
      twitter: {
        handle: '@minseo_choi',
        link: '#0'
      }
    },
    {
      img: CustomerImg05,
      quote: "단체 주문 시 여러 사람의 취향을 맞추는 것이 어려웠어요. 하지만 AI 추천 덕분에 모임이나 회식 때 성심당 빵 고르기가 쉬워졌어요. 다양한 취향을 고려해 추천해주니 항상 호평이에요. 선택의 스트레스는 줄고, 만족도는 높아졌죠!",
      name: '정우진',
      twitter: {
        handle: '@woojin_jung',
        link: '#0'
      }
    },
    {
      img: CustomerImg06,
      quote: "AI가 감정을 이해할 수 있을까 의문이었어요. 그런데 놀랍게도 제 기분에 따라 빵을 추천해주니 퇴근길이 더 즐거워졌어요. 직장 스트레스를 풀어주는 건 역시 성심당 빵이에요.",
      name: '강미래',
      twitter: {
        handle: '@mirae_kang',
        link: '#0'
      }
    },
    {
      img: CustomerImg07,
      quote: "손주들 선물로 성심당만한 게 없어요. AI가 아이들 취향을 잘 맞춰주니 할머니 인기가 날로 높아지네요. 요즘 애들 입맛을 어떻게 이렇게 잘 알아요?",
      name: '박순자',
      twitter: {
        handle: '@soonja_park',
        link: '#0'
      }
    },
    {
      img: CustomerImg08,
      quote: "알레르기가 있어서 빵 선택이 항상 조심스러웠어요. 성심당 AI는 제 알레르기 정보를 기억하고 안전한 빵만 추천해줘요. 이제는 걱정 없이 다양한 빵을 즐길 수 있어 정말 행복해요!",
      name: '윤서진',
      twitter: {
        handle: '@seojin_yoon',
        link: '#0'
      }
    },
    {
      img: CustomerImg09,
      quote: "빵 만드는 과정이 궁금해서 성심당 투어에 참여했는데, AI가 추천해준 빵들의 제조 과정을 자세히 볼 수 있었어요. 장인 정신과 첨단 기술의 조화를 직접 보니 성심당 빵이 더 특별하게 느껴져요!",
      name: '한도윤',
      twitter: {
        handle: '@doyoon_han',
        link: '#0'
      }
    },
  ]

  return (
    <section className="relative">
      {/* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-amber-500 rounded-full blur-[120px] opacity-50"></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">성심당 빵 AI 추천, 어떠세요?</h2>
            <p className="text-lg text-slate-400">매일 새로운 빵의 세계를 발견하세요. AI가 당신의 취향을 분석해 맞춤 추천을 제공합니다. 지금 바로 성심당의 특별한 맛을 경험해보세요!</p>
          </div>
          {/* Customers */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 max-w-xs mx-auto lg:max-w-none">

            {items.map((item, index) => (
              <div key={index} className="relative p-5 before:absolute before:inset-0 before:-z-10 before:border before:border-slate-300 before:bg-slate-700 before:opacity-10 before:rounded-xl">
                <div className="flex items-center justify-between space-x-2 mb-4">
                  <div className="flex items-center space-x-4">
                    <Image className="shrink-0 rounded-full" src={item.img} width={44} height={44} alt={item.name} />
                    <div className="grow truncate">
                      <div className="font-bold text-slate-100 truncate">{item.name}</div>
                      <a className="text-sm text-slate-500 hover:text-slate-300 font-medium truncate transition-colors" href={item.twitter.link}>{item.twitter.handle}</a>
                    </div>
                  </div>
                  <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="90" height="14">
                    <path className="fill-amber-500" d="M7 0 5.006 5.368H0l4.232 3.221L2.195 14 7 10.344 11.82 14 9.768 8.589 14 5.368H8.98zM26 0l-1.994 5.368H19l4.232 3.221L21.195 14 26 10.344 30.82 14l-2.052-5.411L33 5.368h-5.02zM45 0l-1.994 5.368H38l4.232 3.221L40.195 14 45 10.344 49.82 14l-2.052-5.411L52 5.368h-5.02zM64 0l-1.994 5.368H57l4.232 3.221L59.195 14 64 10.344 68.82 14l-2.052-5.411L71 5.368h-5.02zM83 0l-1.994 5.368H76l4.232 3.221L78.195 14 83 10.344 87.82 14l-2.052-5.411L90 5.368h-5.02z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-400">{item.quote}</p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}