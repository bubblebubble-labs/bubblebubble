'use client'
import Image from 'next/image'
import Particles from './particles'
import Illustration from '@/public/images/glow-bottom.svg'
import Animate from '@/components/Animate'
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
    <section className="bbstyle">
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
                <a className="box btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.sky.500),_theme(colors.sky.500))_padding-box,_linear-gradient(theme(colors.sky.500),_theme(colors.sky.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow" href="#0">
                  <span className="tit">신개념 법률지식 서비스</span>
                </a>
              </div>
            </div>
            <h3 className="h3 bg-clip-text bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" data-aos="fade-down">법을 더 가까이, 더 손쉽게!<span className="bb">'버블버블'</span></h3>
            <p className="text-lg mb-8" data-aos="fade-down" data-aos-delay="200">
              법률 문제로 고민이신가요?<br/>
              당신만의 <b>AI 법률 비서</b>가 모든 순간 함께합니다.
            </p>
            {/* <p className="text-sm text-slate-300 mb-6" data-aos="fade-down" data-aos-delay="300">
              ✨ 초간단 AI 법률 상담으로 시간과 비용 절약 <br/>
              💡 어려운 법률 용어를 쉽게 풀어드려요<br/>
              ⚡️ 언제 어디서나 즉시 답변 가능<br/>
              ✅ 변호사가 검증한 신뢰할 수 있는 정보<br/>
              </p> */}
          
            <Animate />
            <div className="max-w-xs mx-auto space-y-4" data-aos="fade-down" data-aos-delay="400">
                <a className="bbtn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group" href="/survey">
                  무료 법률상담 시작하기 
                </a>
              {/* <div>
                <a className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group" href="/game">
                  버블버블 게임하기 <span className="tracking-normal text-sky-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </a>
              </div> */}
              <br/>
              
           
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
