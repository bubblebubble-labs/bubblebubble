'use client'
import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom.svg'
import { useState } from 'react';

export default function Hero() {
   const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/registerWaitList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('버블버블 서비스 소식을 받아보실 수 있습니다!');
        setEmail('');
      } else {
        setMessage('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <Particles className="absolute inset-0 -z-10" />

        {/* Illustration */}
        <div className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
            <Image src={Illustration} className="max-w-none" width={2146} priority alt="Hero Illustration" />
          </div>
        </div>

        <div className="pt-32 pb-16 md:pt-52 md:pb-32">

          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6" data-aos="fade-down">
              <div className="inline-flex relative before:absolute before:inset-0 before:bg-sky-500 before:blur-md">
                <a className="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.sky.500),_theme(colors.sky.500))_padding-box,_linear-gradient(theme(colors.sky.500),_theme(colors.sky.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow" href="#0">
                  <span className="relative inline-flex items-center">
                    버블버블 서비스 런칭!
                  </span>
                </a>
              </div>
            </div>
            <h1 className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" data-aos="fade-down">버블버블: 우주에서 온 당신만의 법률 수호자</h1>
            <p className="text-lg text-slate-200 mb-8" data-aos="fade-down" data-aos-delay="200">
              법률 문제로 고민이신가요? 복잡한 법률 용어에 지치셨나요? 복잡한 법을 Bubble Bubble 해결하세요! 플로라의 따뜻한 위로와 티모의 명쾌한 해결책으로 여러분의 법률 고민을 편안하고 쉽게 해결해드려요. 
            </p>
            <p className="text-sm text-slate-300 mb-6" data-aos="fade-down" data-aos-delay="300">
              지구로부터 250만 광년 떨어진 '네오 주리디카' 행성에서 온 플로라와 티모. 대한민국의 복잡한 법률 시스템을 보고 안타까움을 느낀 두 친구는 이 문제를 쉽게 해결하기 위해 왔습니다. 플로라의 따뜻한 공감 능력과 티모의 날카로운 분석력으로 무장한 그들은 이제 대한민국 시민들에게 독보적인 법률 자문과 위로를 제공합니다. 그들의 목표는 단 하나, 복잡한 법의 세계에서 길을 잃은 이들에게 빛이 되는 것입니다.
            </p>
          
            <br/>
            <div className="mt-4 max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="400">
              <div>
                <a className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group" href="/survey">
                  플로라와 티모에게 물어보기 <span className="tracking-normal text-sky-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </a>
              </div>
              {/* <div>
                <a className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out group" href="mailto:wks0968@gmail.com?subject=[버블버블]%20문의사항:%20&body=안녕하세요,%0D%0A%0D%0A버블버블에%20대한%20문의사항을%20아래에%20작성해%20주세요.%0D%0A%0D%0A1.%20문의%20유형:%20(예:%20서비스%20이용,%20기술적%20문제,%20제안사항%20등)%0D%0A2.%20상세내용:%0D%0A%0D%0A%0D%0A이름:%0D%0A연락처:%20(선택사항)%0D%0A%0D%0A감사합니다." target="_blank" rel="noopener noreferrer">
                  <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>협업 & 제안하기</span>
                </a>
              </div>
              <div>
                <a className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out group" href="https://somoim.friendscube.com/g/b66c90ac-1765-11ef-be8e-0a1883465d731" target="_blank" rel="noopener noreferrer">
                  <span>코딩 교육받기</span>
                  <span className="text-xs text-sky-500 ml-2 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out">(64명)</span>
                </a>
              </div> */}
               
            </div>
            {/* <p className="text-sm text-slate-100 mt-8" data-aos="fade-down" data-aos-delay="300">
              Powered by{' '}
              <a 
                href="https://somoim.friendscube.com/g/b66c90ac-1765-11ef-be8e-0a1883465d731" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:text-sky-500 hover:decoration-sky-500 transition-all duration-300"
              >
                [대전 IT] 나는 솔로프리너
              </a>
            </p> */}
          </div>

        </div>
      </div>
    </section>
  )
}
