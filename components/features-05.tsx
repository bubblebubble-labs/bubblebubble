import Image from 'next/image'
import Illustration from '@/public/images/pricing-illustration.svg'
import IllustrationTop from '@/public/images/pricing-illustration-top.svg'
import Icon01 from '@/public/images/pricing-icon-01.svg'
import Icon02 from '@/public/images/pricing-icon-02.svg'
import Icon03 from '@/public/images/pricing-icon-03.svg'
import Icon04 from '@/public/images/pricing-icon-04.svg'
import Icon05 from '@/public/images/pricing-icon-05.svg'
import Icon06 from '@/public/images/pricing-icon-06.svg'
import Icon07 from '@/public/images/pricing-icon-07.svg'
import Particles from '@/components/particles'

export default function Features05() {
  return (
    <section className="relative">

      {/* Particles animation */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-64 h-64 -mt-24">
        <Particles className="absolute inset-0 -z-10" quantity={6} staticity={30} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">플로라와 티모를 만나보세요</h2>
            <p className="text-lg text-slate-400">
              감성적인 플로라와 논리적인 티모가 함께하는 AI 법률 비서, Bubble Bubble. 모든 법률 문제를 쉽고 편리하게 해결해드립니다.
            </p>
          </div>

          {/* Rings illustration */}
          <div className="text-center pb-8">
            <div className="inline-flex items-center justify-center relative">
              {/* Particles animation */}
              <Particles className="absolute inset-0 -z-10" quantity={10} />
              <div className="inline-flex">
                <Image src={Illustration} width="334" height="334" alt="Features illustration" />
              </div>
              <Image className="absolute -mt-[40%]" src={IllustrationTop} width="396" height="328" alt="Features illustration top" aria-hidden="true" />
              <div className="absolute w-[200%] flex items-center justify-center space-x-5">
                <div className="-rotate-[4deg]">
                  <Image className="w-11 h-11 drop-shadow-lg animate-[float_2.6s_ease-in-out_infinite] opacity-10" src={Icon01} width={80} height={80} alt="Pricing icon 01" />
                </div>
                <div className="rotate-[4deg]">
                  <Image className="w-14 h-14 drop-shadow-lg animate-[float_2.4s_ease-in-out_infinite] opacity-25" src={Icon02} width={80} height={80} alt="Pricing icon 02" />
                </div>
                <div className="-rotate-[4deg]">
                  <Image className="w-16 h-16 drop-shadow-lg animate-[float_2.2s_ease-in-out_infinite] opacity-60" src={Icon03} width={80} height={80} alt="Pricing icon 03" />
                </div>
                <Image className="drop-shadow-lg animate-float" src={Icon04} width={80} height={80} alt="Pricing icon 04" />
                <div className="rotate-[4deg]">
                  <Image className="w-16 h-16 drop-shadow-lg animate-[float_2.2s_ease-in-out_infinite] opacity-60" src={Icon05} width={80} height={80} alt="Pricing icon 05" />
                </div>
                <div className="-rotate-[4deg]">
                  <Image className="w-14 h-14 drop-shadow-lg animate-[float_2.4s_ease-in-out_infinite] opacity-25" src={Icon06} width={80} height={80} alt="Pricing icon 06" />
                </div>
                <div className="rotate-[4deg]">
                  <Image className="w-11 h-11 drop-shadow-lg animate-[float_2.6s_ease-in-out_infinite] opacity-10" src={Icon07} width={80} height={80} alt="Pricing icon 07" />
                </div>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card #1 - Flora */}
            <div className="bg-gradient-to-tr from-slate-800/50 to-slate-800/10 rounded-3xl border border-slate-800">
              <div className="flex items-center space-x-4 p-4 h-full">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path className="fill-pink-500" fillOpacity=".24" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Z" />
                  <path className="fill-pink-400" fillRule="nonzero" d="M13 6.586 14.414 8l-5.747 5.748-3.081-3.081L7 9.252l1.667 1.667z" />
                </svg>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300 font-medium">플로라의 감성 케어</strong>: 법률 문제로 불안할 때 공감과 위로를 제공합니다.
                </p>
              </div>
            </div>
            {/* Card #2 - Timo */}
            <div className="bg-gradient-to-tr from-slate-800/50 to-slate-800/10 rounded-3xl border border-slate-800">
              <div className="flex items-center space-x-4 p-4 h-full">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path className="fill-blue-500" fillOpacity=".24" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Z" />
                  <path className="fill-blue-400" fillRule="nonzero" d="M13 6.586 14.414 8l-5.747 5.748-3.081-3.081L7 9.252l1.667 1.667z" />
                </svg>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300 font-medium">티모의 논리적 조언</strong>: 구체적인 법률 해결책과 행동 요령을 제시합니다.
                </p>
              </div>
            </div>
            {/* Card #3 */}
            <div className="bg-gradient-to-tr from-slate-800/50 to-slate-800/10 rounded-3xl border border-slate-800">
              <div className="flex items-center space-x-4 p-4 h-full">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path className="fill-sky-500" fillOpacity=".24" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Z" />
                  <path className="fill-sky-400" fillRule="nonzero" d="M13 6.586 14.414 8l-5.747 5.748-3.081-3.081L7 9.252l1.667 1.667z" />
                </svg>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300 font-medium">24/7 AI 법률 비서</strong>: 언제 어디서나 접근 가능한 법률 도우미를 만나보세요.
                </p>
              </div>
            </div>
            {/* Card #4 */}
            <div className="bg-gradient-to-tr from-slate-800/50 to-slate-800/10 rounded-3xl border border-slate-800">
              <div className="flex items-center space-x-4 p-4 h-full">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path className="fill-sky-500" fillOpacity=".24" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Z" />
                  <path className="fill-sky-400" fillRule="nonzero" d="M13 6.586 14.414 8l-5.747 5.748-3.081-3.081L7 9.252l1.667 1.667z" />
                </svg>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300 font-medium">음성 기반 상담</strong>: 편리한 음성 인터페이스로 신속한 법률 상담을 받아보세요.
                </p>
              </div>
            </div>
            {/* Card #5 */}
            <div className="bg-gradient-to-tr from-slate-800/50 to-slate-800/10 rounded-3xl border border-slate-800">
              <div className="flex items-center space-x-4 p-4 h-full">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path className="fill-sky-500" fillOpacity=".24" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Z" />
                  <path className="fill-sky-400" fillRule="nonzero" d="M13 6.586 14.414 8l-5.747 5.748-3.081-3.081L7 9.252l1.667 1.667z" />
                </svg>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300 font-medium">맞춤형 법률 솔루션</strong>: 개인화된 법률 서비스로 모든 연령대의 문제를 해결합니다.
                </p>
              </div>
            </div>
            {/* Card #6 */}
            <div className="bg-gradient-to-tr from-slate-800/50 to-slate-800/10 rounded-3xl border border-slate-800">
              <div className="flex items-center space-x-4 p-4 h-full">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path className="fill-sky-500" fillOpacity=".24" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0Z" />
                  <path className="fill-sky-400" fillRule="nonzero" d="M13 6.586 14.414 8l-5.747 5.748-3.081-3.081L7 9.252l1.667 1.667z" />
                </svg>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300 font-medium">원스톱 솔루션</strong>: 보이스피싱부터 학교폭력까지, 모든 법률 문제에 대응합니다.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}