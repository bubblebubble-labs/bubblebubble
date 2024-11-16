export const metadata = {
  title: '버블버블 : AI 법률지식 서비스',
  description: '버블버블 : AI 법률지식 서비스',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features from '@/components/features'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import Features05 from '@/components/features-05'
import Keyword from '@/components/Keyword'

import TestimonialsCarousel from '@/components/testimonials-carousel'
import Features04 from '@/components/features-04'
import Pricing from './pricing-section'
import Testimonials from '@/components/testimonials'
import Cta from '@/components/cta'
import Customers from '@/components/customers'
import Faqs from '@/components/faqs'
import Cta03 from '@/components/cta-03'

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Keyword />   
      <Features />
      <Features05 />
      {/* <Features02 /> */}
      {/* <Features03 /> */}
      {/* <TestimonialsCarousel /> */}
      {/* <Features04 /> */}
      {/* <Pricing /> */}
      {/* <Customers />
      <Faqs />
      <Testimonials />
      <Cta />  */}

    </>
  )
}
