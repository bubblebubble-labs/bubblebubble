export const metadata = {
  title: 'AI 빵요미',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features from '@/components/features'
import Features02 from '@/components/features-02'
import Features03 from '@/components/features-03'
import Features05 from '@/components/features-05'

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
      <Features />
       <Features05 />
      {/* <Features02 /> */}
      {/* <Features03 /> */}
      {/* <TestimonialsCarousel /> */}
      {/* <Features04 /> */}
      {/* <Pricing /> */}
      <Customers />
      <Faqs />
      <Testimonials />
      <Cta />

    </>
  )
}
