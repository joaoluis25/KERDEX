# Arquitetura

`src/finance.js`: funções monetárias e calendário; `data.js`: sementes fictícias, validação e retenção optativa; `i18n.js`: dicionários PT/EN/ES; `ui.js`: escape e componentes HTML; `app.js`: rotas, formulários e ações. `tools/server.cjs`: servidor local com allowlist de arquivos públicos. `tools/build.cjs`: saída estática determinística. Recursos não implementados permanecem indisponíveis.

Fluxo de dados: entrada → validação → objeto em centavos → Store → render com escape. Nenhum registro sai do navegador. LocalStorage não é banco seguro e o usuário pode alterá-lo. Consentimento desativado mantém dados somente em memória.

Futuro backend: identidade gerenciada → API com autorização por objeto/tenant → serviço de domínio → PostgreSQL e trilha de auditoria. Dados externos: Provider → ingestão → normalização → proveniência → cache → domínio → API → UI. Somente URLs de provedores conhecidos; nunca fetch arbitrário de links de compra. Não há tal backend nesta entrega.
