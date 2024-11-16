'use client'

import { useEffect } from 'react'
import Particles from './particles'

// Import Swiper
import Swiper, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
Swiper.use([Autoplay])

export default function Clients() {

  const crimes = [
    "전세사기",
    "교통사고 피해",
    "루머",
    "명예훼손",
    "허위사실 유포",
    "사이버 렉카 피해",
    "딥페이크 범죄",
    "디지털 성범죄",
    "사이버 범죄",
    "사이버 불링",
    "의료 사기",
    "투자 사기",
    "스토킹",
    "아동 대상 범죄",
    "가정폭력",
    "횡령 및 배임",
    "마약 관련 범죄",
    "보이스피싱",
    "음주운전",
    "데이트폭력",
    "학교폭력",
    "신용카드 사기",
    "보험 사기",
    "불법 도박",
    "저작권 침해",
    "신분 도용",
    "주가 조작",
  ]

  useEffect(() => {
    const carousel = new Swiper('.clients-carousel', {
      slidesPerView: 'auto',
      spaceBetween: 64,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      noSwiping: true,
      noSwipingClass: 'swiper-slide',
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
      },
    })
  }, [])

  return (
    <section className="bbstyle bbstyle_2">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-16">
          <div className="overflow-hidden">
            {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
            {/* * Custom styles in src/css/additional-styles/theme.scss */}
            <div className="clients-carousel swiper-container relative before:absolute before:inset-0 before:w-32 before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-slate-900 after:absolute after:inset-0 after:left-auto after:w-32 after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-slate-900">
              <div className="swiper-wrapper !ease-linear select-none items-center">
                {/* Carousel items */}
                {crimes.map((crime, index) => (
                  <div key={index} className="swiper-slide !w-auto">
                    <div className="text-xl font-bold">{crime}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}