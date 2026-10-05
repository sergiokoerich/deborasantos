import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiStar } from 'react-icons/hi'
import LinkExterno from '../ui/LinkExterno'
import { AVALIACOES, NOTA_GOOGLE } from '../../data/avaliacoes'
import { GOOGLE_AVALIACOES_URL, GOOGLE_AVALIAR_URL } from '../../data/contato'

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function mesAno(dataIso) {
  const [ano, mes] = dataIso.split('-')
  return `${MESES[Number(mes) - 1]}/${ano}`
}

const LINK_CLARO = 'btn-link text-cream border-cream/50 hover:text-blush hover:border-blush'

function Estrelas({ className = '' }) {
  return (
    <span className={`inline-flex gap-0.5 text-blush ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <HiStar key={i} className="w-4 h-4" aria-hidden="true" />
      ))}
      <span className="sr-only">5 de 5 estrelas</span>
    </span>
  )
}

function Autor({ avaliacao }) {
  return (
    <figcaption className="flex items-center gap-3 mt-6">
      <img
        src={avaliacao.foto}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="flex flex-col">
        <span className="font-body text-sm font-medium text-cream">
          {avaliacao.nome}
        </span>
        <span className="font-body text-xs text-cream/70 mt-1">
          Google · <time dateTime={avaliacao.data}>{mesAno(avaliacao.data)}</time>
        </span>
      </span>
    </figcaption>
  )
}

function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const destaque = AVALIACOES.find((a) => a.destaque)
  const demais = AVALIACOES.filter((a) => a !== destaque)

  return (
    // Faixa escura da página: quebra a sequência de seções claras.
    <section id="depoimentos" className="on-dark py-24 lg:py-32 bg-espresso relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6 text-cream/80"
          >
            Avaliações
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-6 mt-6 text-cream"
          >
            O que pacientes dizem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle text-cream/80"
          >
            Depoimentos reais de nossos pacientes.
          </motion.p>
        </div>

        {/* Nota no Google + links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-end gap-8 md:gap-12 pb-10 mb-12 border-b border-cream/15"
        >
          <p className="flex items-end gap-5">
            <span className="font-display text-7xl leading-none text-cream">{NOTA_GOOGLE}</span>
            <span className="flex flex-col gap-2 pb-1">
              <Estrelas />
              <span className="font-body text-sm text-cream/80">
                no Google
              </span>
            </span>
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 md:ml-auto">
            <LinkExterno href={GOOGLE_AVALIACOES_URL} className={LINK_CLARO}>
              Ver todas no Google <span aria-hidden="true">→</span>
            </LinkExterno>
            <LinkExterno href={GOOGLE_AVALIAR_URL} className={LINK_CLARO}>
              Avaliar no Google <span aria-hidden="true">→</span>
            </LinkExterno>
          </div>
        </motion.div>

        {/* Avaliação em destaque */}
        {destaque && (
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mb-16"
          >
            <Estrelas className="mb-6" />
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-cream leading-snug whitespace-pre-line">
              “{destaque.texto}”
            </blockquote>
            <Autor avaliacao={destaque} />
          </motion.figure>
        )}

        {/* Demais avaliações — filete superior, sem card */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12">
          {demais.map((avaliacao, index) => (
            <motion.li
              key={avaliacao.nome}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
              className="py-8 border-t border-cream/15"
            >
              <figure>
                <Estrelas className="mb-4" />
                <blockquote className="font-body text-cream/90 leading-relaxed whitespace-pre-line">
                  “{avaliacao.texto}”
                </blockquote>
                <Autor avaliacao={avaliacao} />
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials
