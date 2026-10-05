import { m } from 'framer-motion'
import LinkExterno from '../ui/LinkExterno'
import { whatsappUrl } from '../../data/contato'
import { REVELAR } from '../../lib/motion'

// Textos descritivos, sem promessa de resultado (Res. CFO-196/2019, art. 2º, §1º).
// A lista é precedida da qualificação "clínica geral" (Código de Ética, art. 43, §1º, I).
const tratamentos = [
  {
    title: 'Clareamento dental',
    description:
      'Clareamento profissional com avaliação prévia e acompanhamento da sensibilidade durante o tratamento.',
  },
  {
    title: 'Implantes dentários',
    description:
      'Reposição de dentes perdidos com implantes, planejada a partir da avaliação clínica e de exames.',
  },
  {
    title: 'Lentes de contato dental',
    description:
      'Lâminas ultrafinas para ajustar cor, forma e pequenas imperfeições, quando há indicação clínica.',
  },
  {
    title: 'Harmonização orofacial',
    description:
      'Procedimentos estéticos da face indicados após avaliação, com foco em equilíbrio e naturalidade.',
  },
  {
    title: 'Ortodontia',
    description:
      'Aparelhos convencionais ou alinhadores transparentes para alinhar os dentes e ajustar a mordida.',
  },
  {
    title: 'Próteses dentárias',
    description:
      'Próteses personalizadas para repor dentes e recuperar a mastigação, com acabamento de aparência natural.',
  },
]

function Tratamentos() {
  return (
    <section id="tratamentos" className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <m.div {...REVELAR}>
            <span className="eyebrow mb-6">Serviços</span>

            <h2 className="section-title mb-6 mt-6">Tratamentos</h2>
          </m.div>

          <p className="section-subtitle">
            Atendimento em clínica geral. Cada procedimento é avaliado caso a caso,
            com critério clínico e foco em saúde, função e naturalidade.
          </p>
        </div>

        {/* Lista editorial — filete inferior, sem card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-16">
          {tratamentos.map((item) => (
            <article key={item.title} className="py-8 border-b border-espresso/15">
              <h3 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-2">
                {item.title}
              </h3>
              <p className="font-body text-stone leading-relaxed text-sm md:text-base max-w-md">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <LinkExterno href={whatsappUrl()} className="btn-primary">
            Agendar avaliação
          </LinkExterno>
        </div>

      </div>
    </section>
  )
}

export default Tratamentos
