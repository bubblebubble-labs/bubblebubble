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
            <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-200 pb-3">성심당 빵 AI 추천 서비스</div>
          </div>
          <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">자주 묻는 질문</h2>
        </div>

        {/* Columns */}
        <div className="md:flex md:space-x-12 space-y-8 md:space-y-0">

          {/* Column */}
          <div className="w-full md:w-1/2 space-y-8">

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">성심당 빵 AI 추천 서비스란 무엇인가요?</h4>
              <p className="text-slate-400">성심당 빵 AI 추천 서비스는 대전의 유명 베이커리 브랜드인 성심당의 제품을 개인화된 AI 기술을 통해 고객에게 추천하는 혁신적인 웹 애플리케이션입니다. 고객의 취향, 건강 목표, 상황 등을 고려한 맞춤형 추천을 제공합니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">이 서비스는 어떤 기능을 제공하나요?</h4>
              <p className="text-slate-400">개인 취향 기반 추천 시스템, 시간대별 맞춤 추천, 소셜 기반 협업 필터링 추천, 건강 목표 기반 추천 시스템, 상황별 테마 추천 서비스 등 다양한 기능을 제공합니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">이 서비스는 무료인가요?</h4>
              <p className="text-slate-400">기본적인 서비스 이용은 무료입니다.</p>
            </div>

          </div>

          {/* Column */}
          <div className="w-full md:w-1/2 space-y-8">

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">개인정보는 안전하게 보호되나요?</h4>
              <p className="text-slate-400">네, 철저한 개인정보 보호 정책을 수립하고 시행하고 있습니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">고객 지원은 어떻게 이루어지나요?</h4>
              <p className="text-slate-400">24/7 챗봇 고객 지원 서비스를 운영 예정이며, 평일 오전 9시부터 오후 6시까지는 전담 고객 지원팀이 직접 응대해 드립니다.</p>
            </div>

            {/* Item */}
            <div className="space-y-2">
              <h4 className="font-semibold">이 서비스의 향후 계획은 무엇인가요?</h4>
              <p className="text-slate-400">AI 기술 고도화를 통한 추천 정확도 개선, 타 베이커리 브랜드와의 제휴를 통한 서비스 확장, 그리고 해외 시장 진출 등을 계획하고 있습니다.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
  )
}