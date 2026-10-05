import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import LinkExterno from '../ui/LinkExterno'
import { whatsappUrl } from '../../data/contato'

// Textos descritivos, sem promessa de resultado (Res. CFO-196/2019, art. 2º, §1º).
// A lista é precedida da qualificação "clínica geral" (Código de Ética, art. 43, §1º, I).
const tratamentos = [
  {
    numeral: '01',
    title: 'Clareamento Dental',
    description:
      'Clareamento profissional com avaliação prévia e acompanhamento da sensibilidade durante o tratamento.',
  },
  {
    numeral: '02',
    title: 'Implantes Dentários',
    description:
      'Reposição de dentes perdidos com implantes, planejada a partir da avaliação clínica e de exames.',
  },
  {
    numeral: '03',
    title: 'Lentes de Contato Dental',
    description:
      'Lâminas ultrafinas para ajustar cor, forma e pequenas imperfeições, quando há indicação clínica.',
  },
  {
    numeral: '04',
    title: 'Harmonização Orofacial',
    description:
      'Procedimentos estéticos da face indicados após avaliação, com foco em equilíbrio e naturalidade.',
  },
  {
    numeral: '05',
    title: 'Ortodontia',
    description:
      'Aparelhos convencionais ou alinhadores transparentes para alinhar os dentes e ajustar a mordida.',
  },
  {
    numeral: '06',
    title: 'Próteses Dentárias',
    description:
      'Próteses personalizadas para repor dentes e recuperar a mastigação, com acabamento de aparência natural.',
  },
]

function Tratamentos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            Serviços
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-6 mt-6"
          >
            Tratamentos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Atendimento em clínica geral. Cada procedimento é avaliado caso a caso,
            com critério clínico e foco em saúde, função e naturalidade.
          </motion.p>
        </div>

        {/* Lista editorial — filete inferior, sem card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-16">
          {tratamentos.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              className="flex gap-6 py-8 border-b border-espresso/15 group"
            >
              <p
                className="editorial-numeral text-3xl md:text-4xl shrink-0 w-16 group-hover:text-terracotta-dark transition-colors duration-300"
                aria-hidden="true"
              >
                {item.numeral}
              </p>
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-2 group-hover:text-terracotta-dark transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-stone leading-relaxed text-sm md:text-base max-w-md">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center"
        >
          <LinkExterno href={whatsappUrl()} className="btn-primary">
            Agendar avaliação
          </LinkExterno>
        </motion.div>

      </div>
    </section>
  )
}

export default Tratamentos
