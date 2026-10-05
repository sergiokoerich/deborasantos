// Link que abre em nova aba e avisa isso a leitores de tela.
// Se houver `aria-label`, o aviso entra nele (o rótulo substitui o conteúdo do link).
const AVISO = '(abre em nova aba)'

function LinkExterno({ href, children, 'aria-label': ariaLabel, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ? `${ariaLabel} ${AVISO}` : undefined}
      {...rest}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> {AVISO}</span>}
    </a>
  )
}

export default LinkExterno
