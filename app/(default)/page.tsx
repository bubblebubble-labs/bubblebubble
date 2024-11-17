export const metadata = {
  title: '버블버블 : AI 법률지식 서비스',
  description: '버블버블 : AI 법률지식 서비스',
}

import Hero from '@/components/hero'
import Clients from '@/components/clients'
import Features from '@/components/features'
import Features05 from '@/components/features-05'
import Keyword from '@/components/Keyword'

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Keyword />   
      <Features />
      <Features05 />
    </>
  )
}
