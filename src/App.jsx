import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Sobre from './components/sections/Sobre'
import Clinica from './components/sections/Clinica'
import Tratamentos from './components/sections/Tratamentos'
import Resultados from './components/sections/Resultados'
import Avaliacoes from './components/sections/Avaliacoes'
import WhatsAppButton from './components/ui/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-cream focus:text-espresso focus:px-4 focus:py-3 focus:rounded-soft focus:shadow-lg font-body text-sm"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Sobre />
        <Resultados />
        <Avaliacoes />
        <Tratamentos />
        <Clinica />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
