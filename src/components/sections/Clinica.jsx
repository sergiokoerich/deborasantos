import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiLocationMarker, HiClock, HiPhone } from 'react-icons/hi'
import foto1 from '../../assets/images/fotoconsultorio1.webp'
import foto2 from '../../assets/images/fotoconsultorio2.webp'
import foto3 from '../../assets/images/fotoconsultorio3.webp'
import foto4 from '../../assets/images/fotoconsultorio4.webp'
import LinkExterno from '../ui/LinkExterno'
import {
  PROFISSIONAL,
  TELEFONE,
  TELEFONE_URL,
  ENDERECO_LINHAS,
  ENDERECO_CURTO,
  HORARIO,
  MAPS_URL,
  MAPS_EMBED_URL,
  whatsappUrl,
} from '../../data/contato'

const fotos = [
  { src: foto1, alt: 'Vista da janela do consultório ao pôr do sol, com os prédios do bairro' },
  { src: foto2, alt: 'Copos e xícaras de vidro em bandeja espelhada, ao lado de cápsulas de café, na recepção' },
  { src: foto3, alt: 'Sacolas vermelhas com a marca Débora Santos – Odontologia Estética e Reabilitação Oral, na janela do consultório' },
  { src: foto4, alt: 'Mão segurando um par de placas dentárias transparentes contra a janela' },
]

const linkClasse = 'btn-link mt-3'

const contactInfo = [
  {
    icon: HiLocationMarker,
    title: 'Endereço',
    lines: ENDERECO_LINHAS,
    acao: (
      <LinkExterno href={MAPS_URL} className={linkClasse}>
        Como chegar <span aria-hidden="true">→</span>
      </LinkExterno>
    ),
  },
  {
    icon: HiClock,
    title: 'Horário de Funcionamento',
    lines: HORARIO.map((h) => `${h.dias}, ${h.horas}`),
  },
  {
    icon: HiPhone,
    title: 'Telefone / WhatsApp',
    lines: [],
    acao: (
      <span className="flex flex-wrap gap-x-6 gap-y-2">
        <a href={TELEFONE_URL} className={linkClasse}>
          Ligar: {TELEFONE.exibicao}
        </a>
        <LinkExterno href={whatsappUrl()} className={linkClasse}>
          WhatsApp <span aria-hidden="true">→</span>
        </LinkExterno>
      </span>
    ),
  },
]

function Clinica() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="clinica" className="py-24 lg:py-32 bg-sand relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative">

        {/* ── Parte 1: Header ── */}
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
          >
            Consultório
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-6 mt-6"
          >
            Um espaço pensado<br />
            para cada etapa
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle"
          >
            Ambiente confortável, tecnologia a favor do cuidado e atendimento que respeita
            o seu tempo.
          </motion.p>
        </div>

        {/* ── Parte 2: Galeria de fotos — gap-8, sem raio, sem borda ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {fotos.map((foto, i) => (
            <motion.div
              key={foto.src}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="aspect-4/3 overflow-hidden hover:scale-[1.01] transition-transform duration-500"
            >
              <img
                src={foto.src}
                alt={foto.alt}
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* ── Parte 3: Mapa retangular + Card abaixo ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          {/* Mapa retangular — sem raio, sem card sobreposto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="overflow-hidden">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa com a localização do consultório"
              />
            </div>

            <div className="mt-6 pl-6 border-l border-blush">
              <p className="font-display text-xl text-espresso">
                Consultório {PROFISSIONAL.nome}
              </p>
              <p className="text-sm text-stone font-body mt-1">
                {ENDERECO_CURTO.join(' · ')}
              </p>
            </div>
          </motion.div>

          {/* Informações de contato — layout horizontal com filete */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-10"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex gap-6 pl-6 border-l border-blush"
              >
                <info.icon className="w-6 h-6 text-terracotta shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-medium text-espresso mb-3">
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-stone font-body text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                  {info.acao}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default Clinica
