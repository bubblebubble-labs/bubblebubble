import { useState } from 'react';

export default function Cta() {
 

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative px-8 py-12 md:py-20 rounded-[3rem] overflow-hidden">
          {/* Radial gradient */}
          <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
            <div className="absolute inset-0 translate-z-0 bg-sky-500 rounded-full blur-[120px] opacity-70" />
            <div className="absolute w-1/4 h-1/4 translate-z-0 bg-sky-400 rounded-full blur-[40px]" />
          </div>
          {/* Blurred shape */}
          <div className="absolute bottom-0 translate-y-1/2 left-0 blur-2xl opacity-50 pointer-events-none -z-10" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path fill="url(#bs5-a)" fillRule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
            </svg>
          </div>
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-200 pb-3">Bubble Bubble(버블버블): 생애주기별 시민체감형 법률 AI 원스톱 서비스</div>
            </div>
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">당신만을 위한 AI 법률 도우미</h2>
            <p className="text-lg text-slate-400 mb-8">AI 기술로 법률 서비스 취약계층을 보호하고, 범죄 예방 및 학습을 위한 솔루션을 제공합니다. 새로운 법률 서비스의 세계를 경험해보세요.</p>
           
            <div className="mt-4 max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="400">
              <div>
                <a className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group" href="/survey">
                  법률 맞춤 추천 받기 <span className="tracking-normal text-sky-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </a>
              </div>
              <div>
                <a className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out group" href="mailto:wks0968@gmail.com?subject=[버블버블]%20문의사항:%20&body=안녕하세요,%0D%0A%0D%0A버블버블에%20대한%20문의사항을%20아래에%20작성해%20주세요.%0D%0A%0D%0A1.%20문의%20유형:%20(예:%20서비스%20이용,%20기술적%20문제,%20제안사항%20등)%0D%0A2.%20상세내용:%0D%0A%0D%0A%0D%0A이름:%0D%0A연락처:%20(선택사항)%0D%0A%0D%0A감사합니다." target="_blank" rel="noopener noreferrer">
                  <svg className="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>협업 & 제안하기</span>
                </a>
              </div>
              {/* <div>
                <a className="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out group" href="https://somoim.friendscube.com/g/b66c90ac-1765-11ef-be8e-0a1883465d731" target="_blank" rel="noopener noreferrer">
                  <span>코딩 교육받기</span>
                  <span className="text-xs text-sky-500 ml-2 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out">(64명)</span>
                </a>
              </div> */}
            </div>
            {/* <p className="text-sm text-slate-100 mt-8" data-aos="fade-down" data-aos-delay="300">
              Powered by [대전 IT] 나는 솔로프리너 🍞💻❤️
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}