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
      quote: "처음에는 AI가 내 상황을 제대로 이해할 수 있을지 걱정했어요. 하지만 딥페이크 피해에 대해 물어봤을 때, 정말 자세하고 이해하기 쉽게 설명해줬어요. 플로라의 따뜻한 위로는 정말 큰 힘이 되었습니다. 앞으로도 계속 발전하길 바라요!",
      name: '김민지',
      twitter: {
        handle: '@minji_kim',
        link: '#0'
      }
    },
    {
      img: CustomerImg02,
      quote: "전세사기 피해를 당할 뻔했는데, Bubble Bubble 덕분에 막을 수 있었어요. 티모가 계약 시 주의사항을 꼼꼼히 알려줘서 정말 도움됐습니다. 앞으로 더 많은 사람들이 이 서비스를 알게 되면 좋겠어요!",
      name: '이정호',
      twitter: {
        handle: '@jungho_lee',
        link: '#0'
      }
    },
    {
      img: CustomerImg03,
      quote: "처음에는 기계랑 대화하는 게 어색했어요. 그런데 음성으로 물어볼 수 있어서 편했고, 보이스피싱 예방법을 쉽게 설명해줘서 좋았어요. 플로라가 내 걱정을 들어주는 것 같아 마음이 편안해졌어요.",
      name: '박영숙',
      twitter: {
        handle: '@youngsook_park',
        link: '#0'
      }
    },
    {
      img: CustomerImg04,
      quote: "회사에서 발생한 횡령 문제로 고민이 많았는데, Bubble Bubble의 조언이 큰 도움이 되었습니다. 법적 대응 방법을 명확히 알려줘서 좋았어요. 다만 더 구체적인 판례도 볼 수 있었으면 좋겠어요.",
      name: '최준혁',
      twitter: {
        handle: '@junhyuk_choi',
        link: '#0'
      }
    },
    {
      img: CustomerImg05,
      quote: "데이트폭력 피해를 겪고 있었는데, Bubble Bubble이 제 상황을 정확히 파악하고 도움을 줬어요. 처음에는 개인정보 유출이 걱정됐지만, 안전하다는 걸 알고 안심했어요. 플로라의 위로가 특히 힘이 되었습니다.",
      name: '송미라',
      twitter: {
        handle: '@mira_song',
        link: '#0'
      }
    },
    {
      img: CustomerImg06,
      quote: "투자 사기를 당했을 때 어떻게 대처해야 할지 몰랐는데, Bubble Bubble이 명확한 해결 방법을 제시해줬어요. 티모의 조언 덕분에 법적 대응을 할 수 있었습니다. 초기에 서비스 이용법을 익히는 게 조금 어려웠어요.",
      name: '강동훈',
      twitter: {
        handle: '@donghoon_kang',
        link: '#0'
      }
    },
    {
      img: CustomerImg07,
      quote: "학교폭력 문제로 고민하다 Bubble Bubble을 사용했어요. AI가 제 상황을 이해할 수 있을지 걱정했지만, 정말 잘 이해하고 도와줬어요. 게임처럼 배우는 기능이 재미있어서 계속 사용하게 돼요.",
      name: '이서연',
      twitter: {
        handle: '@seoyeon_lee',
        link: '#0'
      }
    },
    {
      img: CustomerImg08,
      quote: "사이버 범죄에 대해 전혀 몰랐는데, Bubble Bubble이 쉽게 설명해줘서 좋았어요. 음성으로 대화할 수 있어 정말 편리했어요. 앞으로 더 다양한 주제로 확장되면 좋겠어요!",
      name: '홍길동',
      twitter: {
        handle: '@gildong_hong',
        link: '#0'
      }
    },
    {
      img: CustomerImg09,
      quote: "저작권 침해 문제로 고민하다 Bubble Bubble을 찾았어요. 티모가 제시한 해결 방법이 정말 실용적이었어요. 앞으로 더 많은 실제 사례가 추가되면 더욱 유용할 것 같아요!",
      name: '정수민',
      twitter: {
        handle: '@sumin_jung',
        link: '#0'
      }
    },
  ]

  return (
    <section className="relative">
      {/* Radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
          <div className="absolute inset-0 translate-z-0 bg-sky-500 rounded-full blur-[120px] opacity-50"></div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Bubble Bubble과 함께한 법률 여정 어떠세요?</h2>
            <p className="text-lg text-slate-400">당신의 권리를 지키는 스마트한 동행. 법률 문제로 고민하신 적 있나요? Bubble Bubble이 여러분의 든든한 법률 파트너가 되어드립니다. AI 기술을 활용한 맞춤형 상담으로 복잡한 법적 문제를 쉽게 해결해드립니다. 전세사기부터 사이버 범죄까지, 다양한 법률 이슈에 대한 정확한 정보와 해결책을 제시합니다. 여러분의 권리를 지키는 가장 스마트한 방법, 지금 바로 Bubble Bubble과 함께하세요.</p>
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
                    <path className="fill-sky-500" d="M7 0 5.006 5.368H0l4.232 3.221L2.195 14 7 10.344 11.82 14 9.768 8.589 14 5.368H8.98zM26 0l-1.994 5.368H19l4.232 3.221L21.195 14 26 10.344 30.82 14l-2.052-5.411L33 5.368h-5.02zM45 0l-1.994 5.368H38l4.232 3.221L40.195 14 45 10.344 49.82 14l-2.052-5.411L52 5.368h-5.02zM64 0l-1.994 5.368H57l4.232 3.221L59.195 14 64 10.344 68.82 14l-2.052-5.411L71 5.368h-5.02zM83 0l-1.994 5.368H76l4.232 3.221L78.195 14 83 10.344 87.82 14l-2.052-5.411L90 5.368h-5.02z" />
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