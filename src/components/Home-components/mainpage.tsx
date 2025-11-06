import React from 'react'
import HeroSection from './Hero-section'
import Services from './Services'
import AboutUs from './About-us'

export default function Mainpage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='w-11/12 flex flex-col justify-center items-center gap-3'>
        {/* heo */}
        <HeroSection />
      </div>
      {/* Services */}
      <Services />
      {/* AboutUs */}
      <AboutUs />
    </div>
  )
}

