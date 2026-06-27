import HeroSection from './HeroSection'
import Services from './Services'
import AboutUs from './BenefitsSection'
import { Container } from '@components/base/container'

export default function Mainpage() {
  return (
    <Container>
      <div className='w-full flex flex-col justify-center items-center gap-3'>
        {/* heo */}
        <HeroSection />
      </div>
      {/* Services */}
      <Services />
      {/* AboutUs */}
      <AboutUs />
    </Container>
  )
}

