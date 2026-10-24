# KERDEX Beta 2.0

Inteligência para evoluir. Demonstração interativa de planejamento financeiro, baseada nos protótipos do pacote fornecido pelo proprietário.

## Executar

Node.js 24 e npm. No diretório `/workspace/KERDEX`:

```sh
npm ci
npm run dev
```

O servidor usa a porta 3000 (sobrescreva com `PORT`). Não requer conta, segredo, banco ou serviço externo. É servidor de desenvolvimento, não hospedagem de produção.

```sh
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

E2E usa Chromium instalado em `/usr/bin/chromium`; defina `CHROMIUM_PATH` para outro executável. `dist/` contém o site estático para hospedagem com os cabeçalhos apropriados. O comando lint verifica sintaxe; a checagem TypeScript cobre o módulo financeiro, não toda a interface legada.

## Funcional nesta entrega

Home, dashboard mensal, histórico de seis meses do dataset fictício, CRUD de movimentações/compras/metas, pesquisa, filtros, ordenação, link manual de produto, prazo opcional, simulador de poupança e comparação nominal de parcelas com custos explícitos. Idiomas PT/EN/ES, temas, widgets e densidade ajustáveis. Navegação por hash com histórico do navegador.

Todos os registros são fictícios. Por padrão, alterações ficam apenas na memória e somem ao recarregar. Preferências ficam neste navegador; ativar armazenamento de demonstração guarda registros fictícios no localStorage. Revogar apaga os registros persistidos. Não coloque dados pessoais ou financeiros reais.

## Limitações

Não há backend, autenticação, isolamento entre usuários, banco, nuvem de dados, Open Finance, IA, ordens, notícias ou cotações integradas. Radar Global informa indisponibilidade e aponta uma fonte oficial. Links de produtos são manuais: não há captura de preço, scraping ou fetch de URL. A validação de URL não substitui proteção SSRF de um futuro servidor.

Não representa a conclusão de todos os requisitos P0 do documento mestre: migração completa para componentes tipados, SSR/SSG, exportação, cobertura e2e de todos os casos, auditoria manual com leitor de tela e medição de Core Web Vitals permanecem pendentes. Veja `docs/TESTES_E_ACEITE.md` e roadmap.

## Uso

Explore a demonstração na home. Em Finanças, escolha o mês e adicione uma movimentação; a data determina o período. Use os ícones com rótulos acessíveis para editar/excluir. Compras aceita preço estimado, reserva, aporte e link opcional; aporte zero significa prazo indeterminado. Metas admite excedente sem apagá-lo e limita a barra visual a 100%. Em Preferências, configure idioma, tema e retenção. Reset restaura os exemplos, preservando preferências.

## Migração e origem

Reaproveitados HTML, design tokens, ativos derivados do board, dicionários e módulos do Beta 2 parcial; Beta 1 consultado para comparação. Legado original e documentos de escopo preservados em `docs/insumos/`. Decisões e achados: `docs/AUDITORIA_LEGADO.md` e `docs/DECISOES_ARQUITETURA.md`. Alterações do projeto foram autorizadas pelo pedido explícito de montagem; não são alterações necessárias apenas ao onboarding.

Código sob LICENSE do repositório. Ativos KERDEX fornecidos pelo usuário, usados como referência autorizada neste protótipo; não se presume autorização para redistribuição de marcas de terceiros.

## Download e Windows 11

Instruções de instalação, execução no Windows e preservação no GitHub privado: [docs/EXECUTAR_NO_WINDOWS_11.md](docs/EXECUTAR_NO_WINDOWS_11.md). O pacote de entrega inclui um bundle Git para preservar o histórico local.
