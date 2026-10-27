# CRIS — protótipo do aplicativo

Protótipo navegável com foco no celular: empresas, comunidade, capacitação, fé e impacto social. Identidade em verde, creme e dourado, com logo em PNG transparente.

## Rodar localmente

Requisito: Node.js 18 ou superior. Não há dependências para instalar nem etapa de build.

```sh
git clone https://github.com/Vitorlocorreia/cris2.git
cd cris2
npm start
```

- Apresentação com moldura de celular: http://localhost:4187/
- App diretamente: http://localhost:4187/app/

O servidor usa apenas a interface local. A porta pode ser alterada pela variável de ambiente `PORT`.

## Experiências

- Home: impacto, busca, categorias, atalhos e cartões deslizantes.
- Marketplace: busca, filtros, favoritos, perfil empresarial e registro de interesse.
- Mural: necessidades e ofertas, publicação local e conexões.
- Conexões: acompanhamento de interesse, indicação, reunião e negócio.
- Cursos: três trilhas de leitura, progresso e filtros de andamento e conclusão.
- Bíblia: Salmo 23 e Provérbios 3:5–6, ajuste de texto, modo de foco e reflexão pessoal.
- Impacto: contribuições ilustrativas, notas pendentes e escolha de projeto.
- Nota fiscal: formulário, seleção de arquivo e cálculo ilustrativo de contribuição.
- Encontros: agenda conceitual e registro de interesse.
- Palavra do dia: prévia e preferência de horário.
- Perfil: dados pessoais e reinício da demonstração.

## Estrutura

- `dist/`: aplicativo estático, estilos, scripts e imagens locais.
- `apresentacao.html`: apresentação navegável com celular e atalhos de telas.
- `preview-server.mjs`: servidor local sem dependências.

Para servir somente o aplicativo em uma hospedagem estática, use `dist/` como diretório público. O modo de apresentação usa as rotas fornecidas pelo servidor local.

## Verificação

```sh
npm run check
```

As dez telas internas foram verificadas no navegador em largura de 360 px, sem transbordamento horizontal. Foram conferidos busca, filtros de empresas e cursos, abertura de conexão, ajuste de texto, modo de leitura e estimativa da contribuição. Isso não substitui testes em aparelhos físicos.

## Limites do protótipo

Dados e empresas são demonstrativos. Não há autenticação, banco de dados, pagamentos, doações reais, mensagens ou notificações push. Os registros ficam no `localStorage` do navegador; apenas o nome da nota fiscal é guardado, sem envio do arquivo. O total de impacto é ilustrativo e separado das notas pendentes. A Bíblia contém somente amostras. As fontes são carregadas do Google Fonts; as imagens estão incluídas no repositório.
