# Testes e aceite desta entrega

Execução em 24/10/2026, Node 24.19.0, npm 11.9.0, Chromium do sistema via Playwright. A primeira tentativa de baixar Chromium do CDN retornou 403; foi usado o navegador já instalado, sem desabilitar TLS ou verificações.

| Verificação | Resultado final |
|---|---|
| npm ci | Aprovado, instalação congelada repetida |
| npm run lint | Aprovado: checagem sintática Node, não lint semântico completo |
| npm run typecheck | Aprovado: checkJs no módulo financeiro; UI global legada não tipada integralmente |
| npm test | 8 testes aprovados, 0 falhas, 0 ignorados |
| npm run test:e2e | 8 testes aprovados, 0 falhas, 0 ignorados (15,2 s) |
| npm run build | Aprovado, site estático em dist |
| npm audit | 0 vulnerabilidades reportadas, incluindo desenvolvimento; não é garantia de segurança |
| HTTP funcional | / e /src/i18n.js retornam 200; /.env retorna 404 |

Unidade: centavos exatos, entradas inválidas, separação de mês, edição de valor, resultado negativo, virada de ano, calendário/leap day, metas ultrapassadas, aporte zero, extremos de projeção, total parcelado com custos, URLs negativas, escape XSS e paridade de chaves dos três idiomas.

Navegador: CRUD de movimentação com payload HTML literal; meta com excedente; compra com URL rejeitada/aceita e aporte zero; retenção, reload e revogação; idiomas PT/EN/ES; diálogo Escape e retorno de foco; histórico back; cálculo parcelado; cadastro/edição/exclusão no celular; metas e simulador mobile; falha de storage visível sem retenção ativa.

Responsividade: oito rotas nas larguras 320, 360, 375, 390, 414, 480, 600, 768, 820, 1024, 1280, 1440, 1920 e 2560 px, altura 900. Nenhum overflow horizontal do documento detectado. Fluxo móvel adicional em 320×640. Capturas reais em `screenshots/overview-390.png`, `overview-820.png` e `overview-1440.png`; inspecionados visualmente mobile e desktop.

Axe: oito rotas em tema claro sem achados graves/críticos na execução automatizada. Isso não certifica WCAG: teste manual com leitor de tela, zoom 200/400%, todas as combinações de tema/idioma e regressões visuais por pixel não foram executados. Core Web Vitals e Lighthouse não medidos. CI criada, mas execução remota não observada.

Falhas iniciais corrigidas: servidor não permitia nome i18n.js; seletor de tema do legado reconstruía tela em todo clique; contraste da prioridade alta; expectativa textual e acionamento do teste de erro de storage ajustados ao comportamento esperado. Última suíte completa terminou aprovada.

## Limites de aceite

O workflow de desenvolvimento demo está validado nesta máquina. Não se declara todos os requisitos P0 do mestre concluídos nem operação financeira de produção. Não há backend para executar testes negativos de autorização ou SSRF de rede; não são testes aprovados, são não aplicáveis ao app estático. Provedores, cotações, Open Finance e IA não conectados. Requisitos restantes em ROADMAP.md.

`install_script` e `start_skill` salvos no rascunho do ambiente. Publicação e restauração em nova tarefa não foram validadas; revisão/salvamento e publicação são ações do produto pelo usuário. Nenhum push/deploy foi realizado.
