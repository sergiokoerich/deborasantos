import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaInstagram } from 'react-icons/fa'
import DraDebora from '../../assets/images/FotoDaDraDebora.webp'
import LinkExterno from '../ui/LinkExterno'
import { INSTAGRAM, PROFISSIONAL } from '../../data/contato'

const highlights = [
  {
    title: 'Formação',
    description: 'Graduada pela UFSC e especializanda em Prótese e Dentística, com foco em reabilitação oral.',
  },
  {
    title: 'Dedicação',
    description: 'Escuta atenta, cuidado genuíno e um atendimento pensado para as necessidades de cada paciente.',
  },
  {
    title: 'Critério',
    description: 'Planejamento preciso, técnicas atuais e foco em resultados estéticos e funcionais.',
  },
]

function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Foto com moldura deslocada em areia */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative max-w-md mx-auto lg:max-w-none"
          >
            <div className="absolute inset-0 bg-sand translate-x-6 translate-y-6" aria-hidden="true" />

            <div className="relative overflow-hidden aspect-4/5">
              <img
                src={DraDebora}
                alt={`Retrato da ${PROFISSIONAL.nome} em consultório`}
                width={1120}
                height={1680}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <LinkExterno
              href={INSTAGRAM.url}
              className="relative mt-6 inline-flex items-center gap-3 text-espresso hover:text-terracotta-dark transition-colors duration-300 font-body font-medium"
            >
              <FaInstagram className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Instagram: </span>
              <span>{INSTAGRAM.usuario}</span>
            </LinkExterno>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="eyebrow mb-8">Sobre</span>

            <h2 className="section-title mb-8 mt-4">
              Quem cuida<br />
              de você
            </h2>

            <div className="space-y-4 text-stone font-body leading-relaxed mb-12">
              <p>
                Sou cirurgiã-dentista formada pela Universidade Federal de Santa Catarina (UFSC) e especializanda em <strong className="text-espresso">Prótese e Dentística com ênfase em Reabilitação Oral</strong>. Atuo também como clínica geral, porque um sorriso bonito precisa, antes de tudo, ser saudável e funcional.
              </p>
              <p>
                Meu trabalho é guiado por um princípio simples: entender você, planejar com cuidado e executar com precisão. Cada tratamento é pensado de forma personalizada, com atenção aos detalhes e foco em naturalidade e conforto.
              </p>
              <p>
                Aqui, saúde e estética caminham juntas — com atendimento acolhedor e um planejamento que traz segurança em cada etapa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-espresso/10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <h3 className="font-display text-xl font-medium text-espresso mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
