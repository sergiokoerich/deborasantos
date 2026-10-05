# Site da Dra. Débora Santos

Site de uma página da Dra. Débora Santos, cirurgiã-dentista (CRO-SC 23.001) em Florianópolis/SC.
React 19 + Vite 8 + Tailwind CSS 4, publicado no GitHub Pages.

Endereço atual: <https://sergiokoerich.github.io/deborasantos/>

## Rodar na máquina

Requer Node 24 (versão em `.nvmrc`; mínimo 22.12).

```bash
npm ci            # instala exatamente o que está no package-lock.json
npm run dev       # servidor de desenvolvimento
npm run build     # gera o site em dist/
npm run preview   # serve o dist/ para conferir o build
```

## Publicar

Todo push na branch `main` dispara `.github/workflows/deploy.yml`: o GitHub Actions roda `npm ci` e
`npm run build` e publica o `dist/` na branch `gh-pages`, que é a fonte do GitHub Pages.

Trabalhe numa branch, confira o build localmente e só então junte na `main`. Não commite `node_modules/`
nem `dist/`: os dois são gerados e estão no `.gitignore`.

## Endereço do site (`VITE_SITE_URL`)

O endereço público do site sai da variável `VITE_SITE_URL`. Sem ela, o padrão é
`https://sergiokoerich.github.io/deborasantos/`. O `vite.config.js` usa esse valor para:

- o `base` do Vite, ou seja, o caminho em que o site é servido (`/deborasantos/` no padrão, `/` num domínio próprio);
- as URLs absolutas do Open Graph (`og:url`, `og:image`) e do JSON-LD, que precisam do endereço final.

Ao mudar para um domínio próprio, defina a variável no passo de build do workflow:

```yaml
      - name: Build
        run: npm run build
        env:
          VITE_SITE_URL: https://www.exemplo.com.br/
```

## Onde mudar cada coisa

| O quê | Arquivo |
| --- | --- |
| Telefone, WhatsApp e mensagem padrão, endereço, horário, Instagram, links do Google e menu | `src/data/contato.js` |
| Título da página, descrição, Open Graph e JSON-LD | `src/data/seo.js` |
| Avaliações exibidas e nota do Google | `src/data/avaliacoes.js` |
| Casos de antes e depois (uma imagem para o antes e outra para o depois, mesma largura) | `src/components/sections/Resultados.jsx` e `src/assets/images/resultados/` |
| Cores, fontes e classes compartilhadas (`btn-primary`, `btn-link`, `eyebrow`, `section-title`…) | `src/index.css` |
| Curva e entrada padrão das animações (`EASE_OUT`, `REVELAR`) | `src/lib/motion.js` |
| Imagem de compartilhamento (1200×630) | `public/og-image.jpg` |

`contato.js` é a fonte única: componentes, rodapé, meta tags e JSON-LD leem dele. Ao mudar o horário, atualize também
`HORARIO_SCHEMA` no mesmo arquivo.

### Atualizar as avaliações

As avaliações são estáticas, copiadas do Perfil da Empresa no Google. Não há widget de terceiros.

1. Escolha a avaliação no Google e copie o nome, a data e o texto sem editar.
2. Salve a foto do avaliador em `src/assets/images/avaliacoes/`, em 96×96 px e `.webp`.
3. Inclua a avaliação em `AVALIACOES` (`src/data/avaliacoes.js`). Use `destaque: true` em uma só, que aparece em tamanho grande.
4. Confira a nota no Google e atualize `NOTA_GOOGLE` se ela mudar.
5. Não publique avaliação que fale de preço, forma de pagamento ou promoção (Código de Ética Odontológica, art. 44).

### Imagens

Reduza as imagens antes de colocá-las no projeto: até cerca de 2× o tamanho em que aparecem na tela, em `.webp`.
Guarde os originais fora do repositório. Toda `<img>` precisa de `alt` descritivo (ou `alt=""` se for decorativa),
de `width` e `height` com as dimensões reais e de `loading="lazy"` quando não aparece na primeira tela.

## Checklist CFO antes de publicar fotos e textos

Regras da Resolução CFO-196/2019 (fotos de diagnóstico e resultado) e do Código de Ética Odontológica
(Resolução CFO-118/2012, arts. 43 e 44). Cada item precisa da confirmação da Dra. Débora.

- [ ] Nome e número do CRO aparecem junto de qualquer anúncio, inclusive na legenda de cada caso de antes e depois.
- [ ] Os casos de antes e depois foram feitos pela própria Dra. Débora.
- [ ] Há termo de consentimento (TCLE) assinado pelo paciente de cada caso publicado.
- [ ] Nenhuma foto identifica o paciente além do necessário (boca e sorriso, sem rosto inteiro, salvo autorização expressa).
- [ ] Os textos não prometem resultado, não usam superlativos ("o melhor", "garantido", "sem dor") e não falam de preço,
      desconto, forma de pagamento ou brinde.
- [ ] Especialidade só é anunciada se registrada no CRO; enquanto não houver registro, use "especializanda" ou "clínica geral".
- [ ] Os tratamentos listados são realizados pela Dra. Débora.
- [ ] Os vídeos têm licença que permite uso comercial e não mostram procedimento em paciente de forma sensacionalista.
- [ ] As avaliações de pacientes reproduzem o texto original e não citam valores ou condições de pagamento.

## Acessibilidade

A meta é WCAG 2.2 nível AA. Antes de publicar uma mudança visual:

- texto pequeno precisa de contraste de pelo menos 4,5:1 com o fundo, e texto grande e ícones, 3:1. Sobre o vídeo do
  topo, o contraste depende do quadro: por isso o vídeo fica a 30% de opacidade sobre o fundo café-escuro (`espresso`);
- tudo deve funcionar só com teclado, com foco visível (terracota no claro, `blush` em fundo escuro com a classe `on-dark`);
- animações respeitam a preferência "reduzir movimento" do sistema (`MotionConfig reducedMotion="user"`); com ela
  ligada, o vídeo do topo nem é baixado até o visitante apertar Reproduzir;
- nada se repete em loop (WCAG 2.2.2): sem `animate-ping`, `animate-bounce` ou similares;
- texto corrido nasce visível; só títulos de seção e imagens entram com `REVELAR` (`src/lib/motion.js`). Use `m.div`,
  `m.a` etc. em vez de `motion.*`: o app roda dentro de `<LazyMotion strict>`, e um `motion.*` dá erro no `npm run dev`;
- botões e links só com ícone têm alvo de toque de pelo menos 44×44 px.
