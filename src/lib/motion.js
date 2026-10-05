// Curva e entrada padrão do site.
// Só títulos e imagens entram com movimento; o texto corrido já nasce visível
// (aparece na impressão, em capturas de página inteira e para quem rola rápido).
export const EASE_OUT = [0.23, 1, 0.32, 1]

export const REVELAR = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.45, ease: EASE_OUT },
}
