export default function Faqs() {
  return (
  <section className="relative">

    {/* Blurred shape */}
    <div className="absolute top-0 -translate-y-1/3 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-50 pointer-events-none -z-10" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
        <defs>
          <linearGradient id="bs3-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#bs3-a)" fillRule="evenodd" d="m410 0 461 369-284 58z" transform="matrix(1 0 0 -1 -410 427)" />
      </svg>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20 border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1]">

        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <div>
            <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-200 pb-3">Bubble Bubble(버블버블) AI 법률 서비스</div>
          </div>
          <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">자주 묻는 질문</h2>
        </div>

        {/* Columns */}
        <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">

          {/* Column */}
          <div className="w-full md:w-1/2 space-y-8">

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">Bubble Bubble(버블버블) AI 법률 서비스란 무엇인가요?</h4>
              <p className="text-slate-400">Bubble Bubble은 AI 기술을 활용하여 모든 연령대의 시민들에게 접근 가능한 법률 정보와 범죄 예방 서비스를 제공하는 혁신적인 플랫폼입니다. 생애주기별 맞춤 서비스, 시민체감형 서비스, 원스톱 서비스를 통해 다양한 법률 문제에 대응합니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">이 서비스는 어떤 기능을 제공하나요?</h4>
              <p className="text-slate-400">생애주기별 맞춤 서비스, 음성 및 채팅 기반 인터페이스, 최신 사례 기반 피해 예방 정보, 게임형 학습 서비스, 사용자 위험도에 따른 맞춤형 안내 및 정서적 지원, 다양한 법률 문제에 대한 원스톱 서비스 등을 제공합니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              {/* <h4 className="font-semibold">이 서비스는 무료인가요?</h4> */}
              {/* <p className="text-slate-400">기본 서비스는 무료로 제공되며,</p> */}
            </div>

          </div>

          {/* Column */}
          <div className="w-full md:w-1/2 space-y-8">

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">개인정보는 안전하게 보호되나요?</h4>
              <p className="text-slate-400">네, 철저한 개인정보 보호 정책을 수립하고 시행하고 있습니다. 사용자의 데이터는 암호화되어 안전하게 저장되며, 법적 요구사항을 준수합니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">고객 지원은 어떻게 이루어지나요?</h4>
              <p className="text-slate-400">24/7 AI 기반 자동 응답 시스템을 운영하고 있으며, 필요한 경우 전문 고객지원팀이 추가적인 도움을 제공합니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">이 서비스의 향후 계획은 무엇인가요?</h4>
              <p className="text-slate-400">AI 기술 고도화를 통한 서비스 정확도 개선, 더 많은 법률 분야로의 서비스 확장, 그리고 국제적인 법률 지원 서비스로의 발전을 계획하고 있습니다.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
  )
}