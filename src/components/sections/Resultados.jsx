import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import caso1Antes from '../../assets/images/resultados/caso1-antes.webp'
import caso1Depois from '../../assets/images/resultados/caso1-depois.webp'
import caso2Antes from '../../assets/images/resultados/caso2-antes.webp'
import caso2Depois from '../../assets/images/resultados/caso2-depois.webp'
import caso3Antes from '../../assets/images/resultados/caso3-antes.webp'
import caso3Depois from '../../assets/images/resultados/caso3-depois.webp'
import LinkExterno from '../ui/LinkExterno'
import { PROFISSIONAL, whatsappUrl } from '../../data/contato'

// Legenda obrigatória em toda imagem de caso (Res. CFO-196/2019, art. 4º: nome e inscrição).
const LEGENDA = `${PROFISSIONAL.nome} · ${PROFISSIONAL.cro}`

// Antes e depois são os dois quadros das imagens originais, separados sem outro corte.
const casos = [
  {
    id: 'caso-1',
    title: 'Reabilitação estética',
    description:
      'Planejamento digital com mock-up funcional, restauração da harmonia do sorriso e ajuste de proporções dentárias. Resultado natural conduzido em etapas controladas.',
    antes: { src: caso1Antes, width: 1080, height: 525 },
    depois: { src: caso1Depois, width: 1080, height: 533 },
  },
  {
    id: 'caso-2',
    title: 'Lentes de contato dental',
    description:
      'Aplicação de lentes ultrafinas após avaliação criteriosa de indicação clínica. Foco em preservação de estrutura dental e durabilidade do trabalho.',
    antes: { src: caso2Antes, width: 952, height: 403 },
    depois: { src: caso2Depois, width: 952, height: 345 },
  },
  {
    id: 'caso-3',
    title: 'Clareamento profissional',
    description:
      'Protocolo clínico de clareamento com acompanhamento individual, atenção à sensibilidade e estabilidade do tom ao longo do tempo.',
    antes: { src: caso3Antes, width: 680, height: 359 },
    depois: { src: caso3Depois, width: 680, height: 336 },
  },
]

// As duas fotos do caso ficam no mesmo quadro (a altura da menor). A largura e a escala não mudam;
// a mais alta só perde um pouco das bordas de cima e de baixo.
function Foto({ foto, rotulo, titulo, proporcao }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-espresso/5" style={{ aspectRatio: proporcao }}>
      <img
        src={foto.src}
        alt={`${rotulo} — ${titulo}`}
        width={foto.width}
        height={foto.height}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      <span
        className="absolute left-3 top-3 rounded-soft bg-cream/90 px-2.5 py-1 font-body text-sm font-medium text-espresso"
        aria-hidden="true"
      >
        {rotulo}
      </span>
    </div>
  )
}

function Caso({ caso }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const headingId = `${caso.id}-titulo`
  const proporcao = `${caso.antes.width} / ${Math.min(caso.antes.height, caso.depois.height)}`

  return (
    <article ref={ref} aria-labelledby={headingId}>
      <motion.figure
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start"
      >
        <Foto foto={caso.antes} rotulo="Antes" titulo={caso.title} proporcao={proporcao} />
        <Foto foto={caso.depois} rotulo="Depois" titulo={caso.title} proporcao={proporcao} />
        <figcaption className="sm:col-span-2 font-body text-xs text-stone">{LEGENDA}</figcaption>
      </motion.figure>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-12"
      >
        <h3 id={headingId} className="lg:col-span-4 font-display text-2xl lg:text-3xl font-medium text-espresso">
          {caso.title}
        </h3>
        <p className="lg:col-span-8 font-body text-stone leading-relaxed max-w-2xl">
          {caso.description}
        </p>
      </motion.div>
    </article>
  )
}

function Resultados() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="resultados" className="py-24 lg:py-32 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        <header ref={headerRef} className="mb-14 lg:mb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            Resultados
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-6 mt-6"
          >
            Casos planejados
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Cada caso é conduzido com planejamento criterioso, técnica apurada e
            atenção aos detalhes que sustentam o resultado ao longo do tempo.
          </motion.p>
        </header>

        <div className="space-y-16 lg:space-y-24">
          {casos.map((caso) => (
            <Caso key={caso.id} caso={caso} />
          ))}
        </div>

        <footer className="mt-16 lg:mt-24 text-center">
          <LinkExterno href={whatsappUrl()} className="btn-primary">
            Agendar avaliação
          </LinkExterno>
        </footer>
      </div>
    </section>
  )
}

export default Resultados
