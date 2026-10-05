import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Logo from '../../assets/images/LogoCream.svg'
import LinkExterno from '../ui/LinkExterno'
import {
  NAV_LINKS,
  PROFISSIONAL,
  TELEFONE,
  TELEFONE_URL,
  ENDERECO_CURTO,
  HORARIO,
  INSTAGRAM,
  MAPS_URL,
  whatsappUrl,
} from '../../data/contato'

const socialLinks = [
  { name: 'Instagram', icon: FaInstagram, href: INSTAGRAM.url },
  { name: 'WhatsApp', icon: FaWhatsapp, href: whatsappUrl() },
]

function Footer() {
  return (
    <footer data-oculta-whatsapp className="on-dark bg-espresso text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img
              src={Logo}
              alt={PROFISSIONAL.nome}
              className="h-14 w-auto mb-6"
            />
            <p className="text-cream/80 font-body leading-relaxed max-w-md">
              {PROFISSIONAL.profissao} · {PROFISSIONAL.qualificacao}.
              <br />
              Saúde bucal e estética com planejamento.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="rodape-navegacao">
            <h2 id="rodape-navegacao" className="font-display text-xl text-blush mb-6">Navegação</h2>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-cream transition-colors font-body text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h2 className="font-display text-xl text-blush mb-6">Contato</h2>
            <div className="space-y-4 text-cream/80 font-body text-sm">
              <p>
                <span className="text-blush">Endereço:</span>
                <br />
                {ENDERECO_CURTO[0]}
                <br />
                {ENDERECO_CURTO[1]}
                <br />
                <LinkExterno href={MAPS_URL} className="underline underline-offset-4 hover:text-cream">
                  Como chegar
                </LinkExterno>
              </p>
              <p>
                <span className="text-blush">Horário:</span>
                {HORARIO.map((h) => (
                  <span key={h.dias} className="block">
                    {h.dias}, {h.horas}
                  </span>
                ))}
              </p>
              <p>
                <span className="text-blush">Telefone e WhatsApp:</span>
                <br />
                <a href={TELEFONE_URL} className="underline underline-offset-4 hover:text-cream">
                  {TELEFONE.exibicao}
                </a>
              </p>
            </div>

            {/* Social Links — ícones simples, sem caixa; p-3 deixa o alvo de toque com 44 px */}
            <div className="flex -ml-3 mt-3">
              {socialLinks.map((social) => (
                <LinkExterno
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="p-3 text-cream/70 hover:text-blush transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </LinkExterno>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/70 text-sm font-body">
              © {new Date().getFullYear()} <span translate="no">{PROFISSIONAL.nome}</span>. Todos os direitos reservados.
            </p>
            <p translate="no" className="text-cream/70 text-sm font-body">{PROFISSIONAL.cro}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
