import './index.css'
import Nav            from './components/Nav'
import Hero           from './components/Hero'
import DashboardPreview from './components/DashboardPreview'
import Logos          from './components/Logos'
import TheProblem     from './components/TheProblem'
import APLifecycle    from './components/APLifecycle'
import Features       from './components/Features'

import OCREngine      from './components/OCREngine'
import ERPGrid        from './components/ERPGrid'
import DocumentVault  from './components/DocumentVault'
import CompareTable   from './components/CompareTable'
import ROICalculator  from './components/ROICalculator'
import Pricing        from './components/Pricing'
import Testimonials   from './components/Testimonials'
import CTA            from './components/CTA'
import Footer         from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DashboardPreview />
        <Logos />
        <TheProblem />
        <APLifecycle />
        <Features />
        <OCREngine />
        <ERPGrid />
        <DocumentVault />
        <CompareTable />
        <ROICalculator />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
