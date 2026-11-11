# Site — Ronaldy Brito de Alcantara

Site estático em HTML, CSS e JavaScript puro. Basta abrir `index.html` no navegador.

## 1. Já preenchido

- Nome, status (Graduando em Direito · 9º semestre)
- WhatsApp (75) 9 8290-6676 → `https://wa.me/5575982906676`
- E-mail ronaldy07brito66@gmail.com
- Atendimento presencial em Conceição do Jacuípe - BA e online para todo o Brasil
- Foto (`assets/img/perfil.jpg` e `perfil-640.jpg`)
- Formação (UNEF, Feira de Santana, 2022–2027) e seção **Experiência** com os 4 estágios do currículo — para editar, procure `id="experiencia"` no `index.html`

## 2. Ainda falta preencher (em `index.html`)

| Campo | Onde |
|---|---|
| `[Link Instagram]`, `[Link LinkedIn]` | Rodapé |
| `OAB/[UF] nº` | Rodapé (comentado — ative só após a inscrição) |

Dica: Ctrl+H no VS Code para localizar e substituir.

## 3. WhatsApp e e-mail

Ficam no topo de `js/main.js`, no objeto `CONFIG`.

O formulário deixa o visitante escolher:
- **WhatsApp**: abre a conversa com a mensagem já montada.
- **E-mail**: envia direto para o seu Gmail via FormSubmit.co (gratuito, sem cadastro).

**Ativação do e-mail (uma única vez):** depois de publicar o site, envie um teste pelo formulário escolhendo "E-mail". O FormSubmit mandará uma mensagem de confirmação para ronaldy07brito66@gmail.com. Clique em "Activate Form". A partir daí, as mensagens chegam normalmente (confira também a caixa de spam).

## 4. Publicação gratuita

- **Netlify Drop**: arraste a pasta inteira em app.netlify.com/drop.
- **GitHub Pages**: suba os arquivos num repositório e ative Pages nas configurações.

## 5. Ética profissional

Enquanto não houver inscrição na OAB, o site se apresenta como "Graduando em Direito" e usa linguagem de orientação, não de prestação de serviço advocatício em nome próprio. Revise os textos com seu orientador ou supervisor de estágio antes de publicar (Provimento 205/2021 do CFOAB).
